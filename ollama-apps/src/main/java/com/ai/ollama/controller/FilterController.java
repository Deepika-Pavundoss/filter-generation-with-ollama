package com.ai.ollama.controller;

import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ai.ollama.dto.OllamaGenerateResponse;
import com.ai.ollama.service.OllamaClientInterface;

import reactor.core.publisher.Flux;

@CrossOrigin
@RestController
@RequestMapping("/api/filter")
public class FilterController {

	private OllamaClientInterface ollamaClientInterface;

	public FilterController(OllamaClientInterface ollamaClientInterface) {
		this.ollamaClientInterface = ollamaClientInterface;
	}

	@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<ServerSentEvent<String>> ask(@RequestParam String prompt) {

		return ollamaClientInterface.generate(prompt).map(OllamaGenerateResponse::response)
				.filter(chunk -> chunk != null && !chunk.isBlank())
				.map(chunk -> ServerSentEvent.builder(chunk).build());
	}

}
