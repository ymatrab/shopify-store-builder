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

## Shopify Integration Setup

Currently, the application uses a **manual connection method** via a Custom App. You do not strictly need a Shopify Partner account, but it is recommended for creating free development stores for testing. You can also use a regular trial store.

### 1. Create a Custom App in Shopify
1.  Log in to your Shopify Store Admin (`your-store.myshopify.com/admin`).
2.  Go to **Settings** > **Apps and sales channels**.
3.  Click **Develop apps** (you may need to "Allow custom app development" first).
4.  Click **Create an app**. Name it "AI Store Builder".
5.  Click **Configure Admin API scopes**.
6.  Select the following scopes:
    - `read_products`, `write_products`
    - `read_themes`, `write_themes`
    - `read_content`, `write_content` (if available/needed)
7.  Click **Save**.
8.  Go to the **API credentials** tab and click **Install app**.
9.  Reveal and copy the **Admin API access token** (starts with `shpat_...`).

### 2. Link Store to Database
Since the automated OAuth flow is under development, you must manually insert your store credentials into the database.

1.  Ensure your Docker containers are running (`docker-compose up`).
2.  Open a new terminal and run:
    ```bash
    npx prisma studio
    ```
3.  This will open a web interface at `http://localhost:5555`.
4.  Select the **Shop** model.
5.  Click **Add record** and fill in:
    - **shopDomain**: `your-store.myshopify.com` (e.g., `my-test-store.myshopify.com`)
    - **accessToken**: Paste your Admin API access token (`shpat_...`)
6.  Click **Save**.

Now the agent can authenticate with your store using the `shopDomain` you provided.

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
