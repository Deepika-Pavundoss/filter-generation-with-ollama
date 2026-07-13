# AI-Powered Natural Language Filter Generator

An end-to-end AI application that converts natural language queries into structured JSON filters using a locally hosted Large Language Model (LLM) with **Ollama**, **Spring Boot WebFlux**, and **Angular**.

The application demonstrates real-time AI response streaming from the backend to the frontend using **Server-Sent Events (SSE)** and applies the generated filters to a PrimeNG data table.

---

## Features

* 🤖 Natural language to structured JSON filter conversion
* ⚡ Real-time streaming AI responses using Server-Sent Events (SSE)
* 🦙 Local LLM inference using Ollama (Llama 3 / Gemma / Mistral supported)
* 🚀 Reactive backend built with Spring Boot WebFlux
* 🎨 Modern Angular UI with PrimeNG
* 📊 Dynamic table filtering using AI-generated filters
* 🔄 End-to-end streaming from Ollama → Spring Boot → Angular

---

## Architecture

```text
+-------------+        SSE        +-------------------+       HTTP        +-------------+
|  Angular UI | <---------------- | Spring Boot API   | <---------------> |   Ollama    |
| (PrimeNG)   |                   | (WebFlux)         |                   | Local LLM   |
+-------------+                   +-------------------+                   +-------------+

        User Prompt
              │
              ▼
     AI generates JSON Filters
              │
              ▼
     Angular applies filters
              │
              ▼
      PrimeNG Data Table
```

---

## Technology Stack

### Backend

* Java 21
* Spring Boot
* Spring WebFlux
* WebClient
* Project Reactor (Flux)

### Frontend

* Angular
* PrimeNG
* TypeScript
* Server-Sent Events (EventSource)

### AI

* Ollama
* Llama 3 / Gemma / Mistral (configurable)

---

## Example

### User Prompt

```text
Show active Cisco routers in Chennai
```

### AI Response

```json
{
  "filters": [
    {
      "field": "vendor",
      "operator": "eq",
      "value": "Cisco"
    },
    {
      "field": "deviceType",
      "operator": "eq",
      "value": "Router"
    },
    {
      "field": "status",
      "operator": "eq",
      "value": "Active"
    },
    {
      "field": "location",
      "operator": "contains",
      "value": "Chennai"
    }
  ],
  "logic": "AND"
}
```

The generated filters are applied directly to the PrimeNG table.

---

## Streaming Flow

1. User enters a natural language query.
2. Angular sends the request to Spring Boot.
3. Spring Boot forwards the prompt to Ollama using WebClient.
4. Ollama streams the response token by token.
5. Spring Boot relays the stream via SSE.
6. Angular renders the streamed response in real time.
7. After completion, the JSON is parsed and applied as table filters.

---

## Project Structure

```text
backend/
 ├── controller
 ├── service
 ├── dto
 ├── config

frontend/
 ├── components
 ├── services
 ├── models
 ├── assets
```

---

## Getting Started

### Prerequisites

* Java 21+
* Node.js
* Angular CLI
* Ollama

### Install Ollama

```bash
ollama pull llama3:8b
```

or

```bash
ollama pull gemma3
```

Start Ollama:

```bash
ollama serve
```

---

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

---

### Frontend

```bash
cd frontend
npm install
ng serve
```

Open:

```text
http://localhost:4200
```

---

## Configuration

```yaml
server:
  port: 8080

ollama:
  base-url: http://localhost:11434/api/generate
  model: llama3:8b
```

---

## Future Enhancements

* Support OR and nested filter groups
* Multiple table integrations
* Conversation history
* AI-generated filter suggestions
* Support for SQL and GraphQL generation
* Retrieval-Augmented Generation (RAG)
* Semantic search over enterprise datasets

---

## Learning Outcomes

This project demonstrates:

* Spring WebFlux streaming
* Server-Sent Events (SSE)
* Reactive programming with Flux
* WebClient integration
* Local LLM integration using Ollama
* Prompt engineering
* Angular real-time UI updates
* AI-assisted structured data generation

---

## License

This project is intended for learning and demonstration purposes.
