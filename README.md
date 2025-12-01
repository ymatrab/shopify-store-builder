# AI Shopify Store Builder Backend

This is the backend for an AI-powered Shopify Store Builder. It uses a multi-agent architecture to orchestrate the creation of Shopify stores, including branding, layout planning, and theme implementation.

## Prerequisites

- **Docker** and **Docker Compose**

## Setup & Running

The entire application (backend + database) is dockerized.

1.  **Environment Configuration**
    Create a `.env` file in the root directory with your API keys:

    ```env
    SHOPIFY_API_KEY=your_shopify_api_key
    SHOPIFY_API_SECRET=your_shopify_api_secret
    SHOPIFY_SCOPES=write_products,write_themes,write_content,read_products,read_themes,read_content
    SHOPIFY_APP_URL=http://localhost:3000
    OPENAI_API_KEY=your_openai_api_key
    ```
    *(Note: `DATABASE_URL` is configured automatically in `docker-compose.yml`)*

2.  **Start the Application**
    ```bash
    docker-compose up --build
    ```

    This command will:
    - Build the Node.js application image.
    - Start a PostgreSQL container.
    - Run database migrations.
    - Start the backend server on port 3000.

## Testing the Agent

Once the containers are running, you can test the API.

### 1. Start a Store Generation

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

```bash
curl http://localhost:3000/api/generation/<generation_id>
```

## Architecture Overview

- **`src/agents/`**: Contains the logic for Discovery, Planner, and Implementation agents.
- **`src/domain/services/generateStoreService.ts`**: Orchestrates the agents.
- **`src/shopify/`**: Services for interacting with Shopify APIs.
- **`src/infra/`**: Database repositories and LLM client.
