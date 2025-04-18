# CodeSnippet Context - Collaborative Snippet Library & Explainer

> A web application focused on saving, discovering, and collaboratively discussing code snippets with structured context and explanations.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Built With](#built-with)
- [Project Plan / Roadmap](#project-plan--roadmap)
- [Getting Started](#getting-started)
- [License](#license)
- [Contact](#contact)

## About The Project

As developers, we frequently reuse or share small code snippets. However, the crucial context – the _why_, potential edge cases, or alternative approaches – is often lost or requires separate communication. CodeSnippet Context aims to solve this by providing a centralized platform where code snippets are stored _with_ structured, mandatory explanations.

This project goes beyond simple storage (like Gists) by creating a searchable, collaborative knowledge base focused on **understanding** small code units, not just copying them. It addresses the common pain point of finding uncommented or poorly explained code examples online and facilitates targeted discussion around specific implementations.

## Key Features

- **User Authentication:** Secure signup and login.
- **Snippet Creation:** Save code snippets with structured context fields:
  - The Code (with syntax highlighting)
  - Purpose/Goal
  - Usage Example
  - Key Concepts/Why it Works
  - Potential Gotchas/Alternatives
- **Snippet Discovery:** Search snippets by language, keywords, or concepts.
- **Collaboration:** Comment on snippets to ask questions or suggest improvements.
- **Context-Rich:** Mandates context to ensure understandability.

## Built With

This project utilizes the following core technologies:

- **Frontend:** <!-- TODO: e.g., React, Vite, CSS -->
- **Backend:** <!-- TODO: e.g., Node.js, Express -->
- **Database:** <!-- TODO: e.g., PostgreSQL, MongoDB -->
- **Authentication:** <!-- TODO: e.g., JWT, Passport.js -->
- **Code Highlighting:** <!-- TODO: e.g., Prism.js, Highlight.js -->
- **Deployment:** <!-- TODO: e.g., Vercel, Render, AWS -->

## Project Plan / Roadmap

**Overall Goal:** Establish the basic structure for user management and the core snippet creation/viewing functionality, evolving towards a feature-rich application hitting Capstone requirements.

**Initial Phase (Days 1-4):**

- **Day 1:**
  - Task: Finalize GitHub repo setup (README, branch, PR, CodiumAI review - this task!).
  - Task: Create Low-Fidelity wireframes in Figma (Signup/Login, Submit Form, View Snippet, List View).
  - Task: Set up GitHub Project board (Kanban) with initial Epics (User Auth, Snippet Management, etc.).
  - _Concept Focus: Setting up Github project, Created low-fid design._
- **Day 2:**
  - Task: Initialize backend framework (e.g., Node.js/Express).
  - Task: Start High-fidelity design in Figma.
  - Task: Define core database schema (Users, Snippets).
  - Task: Implement User Registration & Login API endpoints (POST methods) with JWT.
  - _Concept Focus: Initialized backend, Database schema created, POST API used, DB read/write, Using JWTs._
- **Day 3:**
  - Task: Initialize frontend framework (e.g., React/Vite) & basic routing.
  - Task: Create basic reusable UI components (Input, Button, Textarea).
  - Task: Implement frontend Signup/Login pages & API integration, setup protected routing.
  - _Concept Focus: Initialized frontend, Created frontend components, Implemented authentication (username/password)._
- **Day 4:**
  - Task: Backend: Create API endpoint (POST /api/snippets) to submit a new snippet linked to the logged-in user.
  - Task: Frontend: Create the 'Submit Snippet' form page and connect to the backend API.
  - _Concept Focus: POST API used, DB read/write, Implemented relationship between entities._

**Broader Roadmap (Weekly Goals Estimate):**

- **Week 1-2:** Complete initial phase tasks. Implement backend GET endpoints for snippets (list/detail). Implement frontend list/detail view pages (incl. syntax highlighting). Basic search/filter. Deploy initial versions. _Concepts: GET API used, More frontend components, Deployment, Initial design matching._
- **Week 3:** Implement commenting system (Backend APIs, DB changes, Frontend display/form). Implement Update/Delete functionality for user's own snippets. _Concepts: More CRUD, Implementing 'update'/'delete', Update API templates._
- **Week 4:** Refine UI/UX based on High-fidelity designs. Improve search capabilities (e.g., multi-keyword). Add user profiles showing submitted snippets. Focus on polishing and basic tagging. _Concepts: Matching design and end state._
- **Week 5 onwards:** Implement Level 2 concepts: Unit testing (Jest), Dockerization, upvoting/ratings, snippet forking/editing suggestions, seek user feedback, potential OS contributions. _Concepts: Level 2 goals._

_Project management tracked via GitHub Issues/Projects. Daily commits and documentation of concepts covered._

## Getting Started

_Instructions to be added._

## License

Distributed under the MIT License. See `LICENSE` file for more information.
