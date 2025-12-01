# AI Shopify Store Builder Backend

This is the backend for an AI-powered Shopify Store Builder. It uses a multi-agent architecture to orchestrate the creation of Shopify stores, including branding, layout planning, and theme implementation.

## Prerequisites

- **Node.js** (v18 or v20+)
- **PostgreSQL** (running locally or accessible via URL)
- **npm**

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Configuration**
    Create a `.env` file in the root directory (if not already present) with the following variables:

    ```env
    SHOPIFY_API_KEY=your_shopify_api_key
    SHOPIFY_API_SECRET=your_shopify_api_secret
    SHOPIFY_SCOPES=write_products,write_themes,write_content,read_products,read_themes,read_content
    SHOPIFY_APP_URL=http://localhost:3000
    OPENAI_API_KEY=your_openai_api_key
    DATABASE_URL="postgresql://user:password@localhost:5432/shopify_ai_builder?schema=public"
    PORT=3000
    ```

3.  **Database Setup**
    Run the Prisma migrations to create the database schema:
    ```bash
    npx prisma migrate dev
    ```

## Running the Server

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## Testing the Agent

The agent flow is triggered via a REST API. You can use `curl` or Postman to test it.

### 1. Start a Store Generation

This endpoint triggers the multi-agent flow:
1.  **Discovery Agent**: Analyzes the shop (stubbed).
2.  **Planner Agent**: Generates branding and layout using LLM (stubbed).
3.  **Implementation Agent**: Creates a new theme and updates settings (stubbed).

**Request:**

```bash
curl -X POST http://localhost:3000/api/generation \
  -H "Content-Type: application/json" \
  -H "x-test-shop-domain: test-shop.myshopify.com" \
  -d '{
    "inputs": {
      "niche": "Sustainable Coffee",
      "positioning": "premium",
      "trafficFocus": ["SEO", "Instagram"],
      "needLogo": true
    }
  }'
```

**Response:**
```json
{
  "generationId": "clp..."
}
```

### 2. Check Generation Status

Use the `generationId` from the previous response to check the progress.

**Request:**

```bash
# Replace <generation_id> with the actual ID
curl http://localhost:3000/api/generation/<generation_id>
```

**Response (In Progress):**
```json
{
  "id": "...",
  "status": "IN_PROGRESS",
  "currentStep": "PLANNER",
  ...
}
```

**Response (Done):**
```json
{
  "id": "...",
  "status": "DONE",
  "currentStep": "DONE",
  "previewUrl": "/?preview_theme_id=987654321"
}
```

## Architecture Overview

- **`src/agents/`**: Contains the logic for Discovery, Planner, and Implementation agents.
- **`src/domain/services/generateStoreService.ts`**: Orchestrates the agents.
- **`src/shopify/`**: Services for interacting with Shopify APIs.
- **`src/infra/`**: Database repositories and LLM client.
