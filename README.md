# cpdsa-site

Website for the Central Park Dance Skaters Association (CPDSA), built with Next.js 14 and TypeScript. Content is pulled from a WordPress backend via GraphQL.

## Tech stack

- **Next.js 14** — React framework
- **TypeScript**
- **Tailwind CSS v4**
- **graphql-request** — fetches content from the WordPress GraphQL API

## Getting started

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env.local` file in the `frontend/` directory:
   ```
   NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=<wordpress graphql endpoint>
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`.

## Project structure

```
frontend/
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # React components
│   └── lib/         # Utilities and GraphQL queries
├── public/          # Static assets
└── .env.local       # Local environment variables (not committed)
```
