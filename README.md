This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Third Party Tools

### Convex

- Sign up and create an account
- Follow the steps in this url https://docs.convex.dev/quickstart/nextjs
- To Define database schema check this URL https://docs.convex.dev/database/schemas
- Integrate Clerk with Convex https://docs.convex.dev/auth/clerk
- To create web hocks to link Clerk with Convex follow the following steps
  - go to [convex.dev/templates](https://www.convex.dev/templates?search=clerk)
  - Search for Clerk and click on Clerk Starter template
  - Click on "View Repo" to go to the original repo
  - Create a file called "http.ts" under convex folder
  - Copy this file content https://github.com/thomasballinger/convex-clerk-users-table/blob/main/convex/http.ts to "http.ts" file

### Clerk

- New middleware architecture https://clerk.com/docs/upgrade-guides/core-2/nextjs#new-middleware-architecture
