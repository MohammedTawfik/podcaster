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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Third Party Tools

### Convex

It is a web application supporting handling back-end functionality using typescript. it provide database, storage and more features.

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

#### Actions

- Actions used to call third party services
- (Docs)[https://docs.convex.dev/functions/actions]
- Will be used in this project to call OpenAi api

### Clerk

- New middleware architecture https://clerk.com/docs/upgrade-guides/core-2/nextjs#new-middleware-architecture

### Create Clerk WebHook key

1. As mentioned in Convex Docs https://docs.convex.dev/functions/http-actions the HTTP actions are exposed at https://<your deployment name>.convex.site (e.g. https://happy-animal-123.convex.site).
2. Check **_.env.local_** and get the value of **NEXT_PUBLIC_CONVEX_URL** and replace _cloud_ with _site_
3. Go to Clerk dashboard and click on **Webhooks** from the right side menu and click **Add Endpoint**
4. Use the url that you get from step **2** and add _/clerk_ at the end for the **Endpoint URL** field (url must look like https://yourdeploymentname.convex.site/clerk)
   1. /clerk added because this is the path that is configured in **http.ts** file in http.route method to listen to.
5. Select the events you want tot listen to
6. Click Create
7. When the webhook created you will be redirected to another page search for **Signing Secret** and copy its value to be used as WebHook Secret
8. Add new item in .env.local and store the WebHook Secret and update the name in **http.ts**
9. Go to your application on Convex and click **Settings** from the left side menu then **Environment Variables** and copy the key and value of WebHook Secret from **.env.local** file and save

## Shadcn/ui

### Form

- docs https://ui.shadcn.com/docs/components/form

### Toast

- to update the toast style go to **toast.tsx** file under "components/ui" and set your styles in the _variant_ value

### Progress

- to be used in the player

## OpenAi

- Used to handle audio and thumbnail generation
- Install using hte following command `npm install openai`

## UploadStuff

- Used to upload files to Convex
- (Docs)[https://uploadstuff.dev/introduction]

## Embla Carousel

- https://www.embla-carousel.com/examples/generator/
- `npm install embla-carousel-react --save`
- `npm install embla-carousel-autoplay --save`
