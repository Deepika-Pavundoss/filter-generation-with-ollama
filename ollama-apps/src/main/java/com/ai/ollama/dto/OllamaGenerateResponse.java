package com.ai.ollama.dto;

public record OllamaGenerateResponse(String model, String created_at, String response, String thinking, Boolean done,
		String done_reason, Long total_duration, Long load_duration, Integer prompt_eval_count,
		Long prompt_eval_duration, Integer eval_count, Long eval_duration) {
}
