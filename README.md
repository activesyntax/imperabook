# ImperaBook

## Command-Based Home Library Management System

ImperaBook is a minimalist, high-performance home library management and cataloging ecosystem. Designed for power users, researchers, and collectors, it combines the speed of a keyboard-driven, command-based control interface with a highly polished typography-driven visual hierarchy.

<img src="./ux/imperabook-ui-concept.jpg" alt="ImperaBook UI Concept" width="100%">

## What Makes ImperaBook Unique?

Unlike traditional click-heavy library apps, ImperaBook treats your catalog like an efficient command center:

- **Command-Based Fluid Control**: A built-in command bar lets you query, catalog, and batch-edit your library by typing plain-text commands—no shortcuts, no special syntax. Any input that isn't a recognized command falls through to instant full-text search, so finding a book and running an operation share the same line.
- **Typography-Driven Aesthetic**: A dark, modern, minimalist user interface designed to maximize text legibility, screen real estate, and scannability.
- **Type-Driven Domain Modeling**: A pure, immutable C# core using closed sealed-record hierarchies, smart-constructor value objects, and phantom-typed identifiers to make invalid library states literally unrepresentable.

---

## Tech Stack & Architecture

ImperaBook is built as a monorepo demonstrating modern **Clean Architecture**, **CQRS (Command Query Responsibility Segregation)**, and **type-driven domain modeling** in C#.

### Frontend

- **Angular**: Structured single-page application utilizing reactive **Signals** for fine-grained state management and fast rendering.

### Backend (.NET 10, C#)

- **ImperaBook.Domain**: Pure, immutable domain core capturing the business rules and library invariants. Algebraic data types are modeled as closed sealed-record hierarchies, constrained values are wrapped in smart-constructor value objects returning explicit `Result` types, and identities are phantom-typed (`Id<TEntity>`)—keeping invalid states unrepresentable and the core free of side effects.
- **ImperaBook.Application**: Orchestrates the use cases, explicitly separating write operations (**Commands**) from read operations (**Queries**), with flat read models projected for the query side.
- **ImperaBook.Infrastructure.Data**: Isolates persistence behind repository interfaces and leverages **Entity Framework Core (EF Core)** for robust migrations and LINQ queries, keeping EF Core's mutable, change-tracking model out of the domain.
- **ImperaBook.API**: High-performance ASP.NET Core **Minimal APIs** exposed as clean, composable HTTP pipelines.

### Database & Cloud Infrastructure

- **PostgreSQL**: Relational database maximizing data integrity, deep JSONB querying for dynamic book metadata, and advanced full-text search.
- **AWS (Cloud-Native Deployment)**: Automated infrastructure managed via AWS CDK, utilizing Amazon RDS for PostgreSQL and low-latency API hosting.

---

## MVP Plan

### MVP1: Keyboard-Driven Core Management & Dashboard

- **Command Execution**: Core CRUD operations driven by a deliberately minimal plain-text command engine. Commands are bare verbs (e.g., typing `add book`); the interactive shell then prompts for each parameter in turn—no flags, no special characters, nothing to memorize.
- **Relational Dashboard**: Real-time analytical widgets showing category distributions, language breakdowns, and total collection metrics.
- **Advanced Query Engine**: Multi-token full-text search combined with strict dynamic filtering (language, publication year, custom metadata tags). Invoked explicitly via the `search` command, or implicitly whenever input doesn't match a known command.

### MVP2: Power-User Syntax, Automation & AI Enrichment (Pro Tiers)

- **Parameterized Commands**: Advanced users can pass arguments inline (e.g., `add book "The Hobbit" --author "Tolkien"`), skipping the interactive prompts for faster, scriptable entry—while the simple bare commands remain the default for everyone else.
- **ISBN Smart Scan**: Camera-based mobile barcode scanning coupled with instant metadata population from external APIs (Google Books, Open Library).
- **AI-Powered Cover/Page Inference**: Image ingestion through OpenAI API to extract title, publishing data, or cataloging records from a photo of a book cover.
- **Advanced Export Utilities**: High-fidelity, print-ready document rendering alongside strict e-book configuration outputs (EPUB, PDF layouts).

---

## Monetization Model (Open-Core & Managed SaaS)

ImperaBook operates on a **Commercial Open Source (COSS)** / Open-Core methodology:

- **Self-Hosted Core**: The entire architecture is completely open and free to self-host for personal use under the AGPLv3 terms.
- **Managed SaaS (Subscription)**: A subscription tier providing instant infrastructure deployment, automatic cloud backups (AWS S3), cross-device cloud synchronization, real-time collaboration, and metered AI assistant allocations.

---

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPLv3)**.

*Note: For closed-source commercial deployments, alternative hosting models, or enterprise white-labeling that bypasses the AGPL network-disclosure requirements, a separate **Commercial License** must be obtained from the author.*

---

**ImperaBook** — Your library, at your fingertips.
