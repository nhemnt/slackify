# Slackify

This repository was bootstrapped from [taxonomy](https://github.com/shadcn/taxonomy) by [shadcn](https://github.com/shadcn) and serves as a starting point for our own project. We want to give proper credit to [shadcn](https://github.com/shadcn) for their work and inspiration. Thank you for making your code available and for allowing us to build upon it. Any additional changes or contributions made by us will be noted in the commit history.

## About this project

![og](https://user-images.githubusercontent.com/26481508/209088627-6d6b1b3b-8f53-4df7-b52e-c03563073245.jpg)

This project is a slack bot that pushes daily notifications to a slack channel about the progress of the users in the Advent of Code event. It also gives announcements about the event and generates certificates for the users who have completed the event.



https://github.com/user-attachments/assets/fe9ae08e-5e97-4752-b322-a5f052bad43d


## Note on Performance

> **Warning**
> This app is using the canary releases for Next.js 13 and React 18. The new router and app dir is still in beta and not production-ready.
> NextAuth.js, which is used for authentication, is also not fully supported in Next.js 13 and RSC.
> **Expect some performance hits when testing the dashboard**.
> If you see something broken, you can ping me [@nhemnt](https://twitter.com/nhemnt).

## Demo
![Untitled design](https://user-images.githubusercontent.com/26481508/209655597-3e433e36-65c2-4feb-ba07-56bb0f760b00.png)

![certificates](https://user-images.githubusercontent.com/26481508/210970063-7078a8e2-7e16-4b0a-9379-d5e081d01600.jpg)


## Features

- Private leaderboard slack bot
- Slack custom announcements
- Generate certificate
- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Server and Client Components
- API Routes and Middlewares
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Database on **PlanetScale**
- UI Components built using **Radix UI**
- Documentation and blog using **MDX** and **Contentlayer**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Roadmap

- [x] ~Add MDX support for basic pages~
- [x] ~Build marketing pages~
- [ ] Subscriptions using Stripe~
- [x] ~Responsive styles~
- [x] ~Add OG image for blog using @vercel/og~
- [ ] Add tests
- [ ] Dark mode
- [ ] Choose template for certificate
- [ ] Login using gmail and map oranisations

## Known Issues

A list of things not working right now:

1. ~GitHub authentication (use email)~
2. ~[Prisma: Error: ENOENT: no such file or directory, open '/var/task/.next/server/chunks/schema.prisma'](https://github.com/prisma/prisma/issues/16117)~
3. ~[Next.js 13: Client side navigation does not update head](https://github.com/vercel/next.js/issues/42414)~

## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm dev
```

## License

Licensed under the [MIT license](https://github.com/nhemnt/slackify/blob/main/LICENSE.md).
