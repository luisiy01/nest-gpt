# Nest GPT - Scalable AI Backend Service

This is a robust, production-ready backend service built with **NestJS**. It acts as a secure middleware between frontend applications and OpenAI's API, providing structured endpoints, error handling, and scalable architecture for AI-driven features.

## 🔗 Project Ecosystem
- **Backend (This Repo):** [https://github.com/luisiy01/nest-gpt](https://github.com/luisiy01/nest-gpt)
- **Frontend Client:** [https://github.com/luisiy01/react-gpt](https://github.com/luisiy01/react-gpt)

---

## 🛠️ Technical Stack

- **Framework:** [NestJS](https://nestjs.com/) (Node.js)
- **Language:** TypeScript
- **AI Integration:** OpenAI SDK
- **Architecture:** Controller-Service-Module pattern
- **Validation:** Class-validator & Class-transformer
- **Configuration:** @nestjs/config (Dotenv)

## 🚀 Key Features

- **Secure Proxy:** Protects your OpenAI API keys by keeping them server-side.
- **Modular Architecture:** Easy to extend with new AI providers (Claude, Gemini, etc.) or RAG (Retrieval-Augmented Generation) capabilities.
- **RESTful API:** Clean and predictable endpoints for chat completions and image generation.
- **Input Validation:** Strict DTO (Data Transfer Object) validation to ensure data integrity.
- **CORS Configured:** Ready to communicate with the `react-gpt` frontend.

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/luisiy01/nest-gpt.git](https://github.com/luisiy01/nest-gpt.git)
   cd nest-gpt
