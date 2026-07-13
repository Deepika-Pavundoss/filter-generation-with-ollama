package com.ai.ollama.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.ai.ollama.dto.OllamaGenerateRequest;
import com.ai.ollama.dto.OllamaGenerateResponse;

import reactor.core.publisher.Flux;

@Service
public class OllamaClientService implements OllamaClientInterface {

	private WebClient webClient;

	@Value("${ollama.base-url}")
	private String baseUrl;

	@Value("${ollama.model}")
	private String model;

	public OllamaClientService(WebClient webClient) {
		this.webClient = webClient;
	}

	@Override
	public Flux<OllamaGenerateResponse> generate(String prompt) {
		OllamaGenerateRequest request = new OllamaGenerateRequest(model, SYSTEM, prompt, true);

		return webClient.post().uri(baseUrl).bodyValue(request).retrieve().bodyToFlux(OllamaGenerateResponse.class)
				.takeUntil(OllamaGenerateResponse::done)
				.doOnComplete(() -> System.out.println("✅ Ollama stream completed"))
				.doFinally(signal -> System.out.println("🔚 HTTP connection closed: " + signal));
	}
}
