package com.ai.ollama.service;

import com.ai.ollama.dto.OllamaGenerateResponse;

import reactor.core.publisher.Flux;

public interface OllamaClientInterface {

	public static final String SYSTEM = """
			Convert user queries into structured JSON filters for a data grid. Trim trailing space in JSON key/value of response. Use ONLY these fields: deviceName, deviceType, status, location, ipAddress, lastSeen, vendor, model. Use ONLY these operators: eq, ne, contains, startsWith, endsWith, gt, lt, gte, lte. Output MUST be valid JSON ONLY in this format:
			{"filters":[{"field":"<field>","operator":"<operator>","value":"<value>"}],"logic":"AND|OR"}
			Rules: do not invent fields or operators, no explanations or markdown, default logic is AND unless OR is explicit, dates must be YYYY-MM-DD. If multiple conditions exist, return multiple filter objects. Start your response directly with '{' and end with '}'. Do not include any text before or after JSON.""";

	public Flux<OllamaGenerateResponse> generate(String prompt);

}
