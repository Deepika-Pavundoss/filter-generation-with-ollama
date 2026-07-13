import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { StreamService } from '../../service/stream-service';

@Component({
  selector: 'app-search-component',
  standalone: false,
  templateUrl: './search-component.html',
  styleUrl: './search-component.scss',
})
export class SearchComponent implements OnDestroy {

  prompt = '';
  response = '';
  streaming = false;
  isFocused = false;
  showTable: boolean = false;
  prevCharacter: string = '';
  tableFilters: any[] = [];

  private closeStream?: () => void;

  constructor(
    private streamService: StreamService,
    private cdr: ChangeDetectorRef,
  ) { }

  private hasSpecialChars(str: string) {
    // Regex explanation:
    // [^\w\s] -> Matches any character that is NOT a word character (\w) or a space (\s)
    //          This includes punctuation, symbols, etc.
    // [^\d\w\s] -> An alternative that excludes digits as well, focusing purely on symbols.
    // .test(str) -> Returns true if a match is found, false otherwise.
    const specialCharsRegex = /[^\d\w\s]/;
    return specialCharsRegex.test(str);
  }

  start() {
    if (!this.prompt.trim()) return;

    this.response = '';
    this.showTable = false;
    this.streaming = true;
    this.cdr.detectChanges();

    this.closeStream = this.streamService.stream(
      this.prompt,
      chunk => {
        this.response += (this.hasSpecialChars(this.prevCharacter) ? '' : '') + chunk;
        this.cdr.detectChanges();
        this.prevCharacter = chunk;
      },
      () => {
        this.streaming = false;
        this.cdr.detectChanges();
      },
      () => {
        const jsonString = this.extractJson(this.response);
        const parsed = JSON.parse(jsonString);
        this.tableFilters = parsed.filters ?? [];
        this.streaming = false;
        this.showTable = true;
        console.log('show table')
        this.cdr.detectChanges();
      }
    );
  }

  extractJson(text: string): string {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');

    if (start === -1 || end === -1) {
      throw new Error('No valid JSON found');
    }

    return text.substring(start, end + 1);
  }

  stop() {
    this.closeStream?.();
    this.streaming = false;
    
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.closeStream?.();
  }

}
