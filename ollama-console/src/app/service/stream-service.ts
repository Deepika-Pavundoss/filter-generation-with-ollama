import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StreamService {

  constructor(private zone: NgZone) { }

  stream(
    prompt: string,
    onChunk: (chunk: string) => void,
    onComplete?: () => void,
    onError?: (err: any) => void
  ): () => void {

    const url = `http://localhost:8080/api/filter/stream?prompt=${encodeURIComponent(prompt)}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = event => {
      this.zone.run(() => {
        onChunk(event.data);   // 🔥 UI updates immediately
      });
    };

    eventSource.onerror = err => {
      this.zone.run(() => {
        eventSource.close();
        onError?.(err);
      });
    };

    return () => {
      eventSource.close();
      this.zone.run(() => onComplete?.());
    };
  }

}
