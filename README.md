# Company-Research-Assistant-Account-Plan-Generator-
An AI-powered Company Research Assistant that gathers data from multiple sources through natural conversation, surfaces conflicts, and generates editable account plans via chat or voice.
📘 Company Research Assistant (Account Plan Generator)

An AI-powered assistant that researches companies through natural conversation, gathers information from multiple sources, detects data conflicts, and generates structured, editable Account Plans.
Supports chat and voice interaction modes in a modern ChatGPT-style UI.

🚀 Features
🔎 Multi-Source Research

Pulls company data from web search, documents, and integrated systems.

Synthesizes: overview, challenges, work culture, tech stack, news, history, opportunities, risks.

⚖️ Conflict Detection

Alerts user when sources provide conflicting data.

Asks: “Should I dig deeper or pick the most reliable source?”

🧩 Account Plan Generation

Creates structured sections:

Company Overview

Strategic Initiatives & Challenges

Stakeholders

SWOT

Tech Stack

Opportunities & Risks

Next Steps

✏️ Section-Level Editing

Users can update one section without changing the entire plan:

“Update only the Risks section.”

“Add a Competitive Landscape section.”

💬🎙 Dual Interaction Modes

Chat mode with ChatGPT-like UI

Voice mode (optional) with STT/TTS integration

🧠 Adaptive AI Behaviour

Optimized for different user types:

Confused users

Efficient users

Chatty users

Edge-case / invalid input users

🏗️ System Overview

Frontend: ChatGPT-style dark UI with company dropdown

Backend: LLM-powered research orchestrator

Features: conflict detection, section updates, structured plan generation

📄 Usage

Select or type a company name

Agent begins research and notifies on conflicts

Generates account plan

User edits specific sections via natural conversation

📦 Tech Stack

Frontend: React

Backend: Node.js / Python (LLM-enabled)

Optional: Voice using Web Speech API

Data storage: JSON/DB hybrid

🧪 Evaluation Criteria (Project Requirement)

Conversational Quality

Agentic Behaviour

Technical Implementation

Intelligence & Adaptability

Includes demo scenarios:

Confused User

Efficient User

Chatty User

Edge-Case User
📜 License

MIT License
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:  
   `npm install`

2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key

3. Run the app:  
   `npm run dev`

