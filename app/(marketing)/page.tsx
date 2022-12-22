import Link from "next/link"
import Image from "next/image"

import hero from "../../public/images/hero.png"
import { siteConfig } from "@/config/site"

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/nhemnt/slackify",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch (error) {
    return null
  }
}

export default async function IndexPage() {
  const stars = await getGitHubStars()

  return (
    <>
      <section className="container grid items-center justify-center gap-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-16 lg:pb-24">
        <Image src={hero} width={250} alt="Hero image" priority />
        <div className="mx-auto flex flex-col items-start gap-4 lg:w-[52rem]">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-5xl md:text-6xl">
            What&apos;s going on here?
          </h1>
          <p className="max-w-[42rem] leading-normal text-slate-700 sm:text-xl sm:leading-8">
            I&apos;m building a web app to play around with slack and open
            sourcing everything. Follow along as we figure this out together.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="relative inline-flex h-11 items-center rounded-md border border-transparent bg-brand-500 px-8 py-2 font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Get Started
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex h-11 items-center rounded-md border border-slate-200 bg-white px-8 py-2 font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            GitHub
          </Link>
        </div>
      </section>
      <hr className="border-slate-200" />
      <section className="container grid justify-center gap-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex flex-col gap-4 md:max-w-[52rem]">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-slate-700 sm:text-lg sm:leading-7">
            This web application utilizes the Slack API to post daily messages
            to a public channel. It includes features such as announcements and
            custom message layouts, as well as daily reminders to keep users
            informed and on track. This project is a hands-on exploration of how
            a modern app integrates with the Slack API to enhance communication
            and productivity
          </p>
        </div>
        <div className="grid justify-center gap-4 sm:grid-cols-2 md:max-w-[56rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-2xl">
            <div className="flex h-[180px] flex-col justify-between rounded-md bg-[#000000] p-6 text-slate-200">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-100">Next.js 13</h3>
                <p className="text-sm text-slate-100">
                  App dir, Routing, Layouts, Loading UI and API routes.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-2xl">
            <div className="flex h-[180px] flex-col justify-between rounded-md bg-[#000000] p-6 text-slate-200">
              <svg viewBox="0 0 50 50" className="h-12 w-12 fill-current">
                <path d="M 19 2 C 16.250484 2 14 4.2504839 14 7 C 14 9.7495161 16.250484 12 19 12 L 23 12 A 1.0001 1.0001 0 0 0 24 11 L 24 7 C 24 4.2504839 21.749516 2 19 2 z M 31 2 C 28.250484 2 26 4.2504839 26 7 L 26 19 C 26 21.749516 28.250484 24 31 24 C 33.749516 24 36 21.749516 36 19 L 36 7 C 36 4.2504839 33.749516 2 31 2 z M 19 4 C 20.668484 4 22 5.3315161 22 7 L 22 10 L 19 10 C 17.331516 10 16 8.6684839 16 7 C 16 5.3315161 17.331516 4 19 4 z M 31 4 C 32.668484 4 34 5.3315161 34 7 L 34 19 C 34 20.668484 32.668484 22 31 22 C 29.331516 22 28 20.668484 28 19 L 28 7 C 28 5.3315161 29.331516 4 31 4 z M 7 14 C 4.2504839 14 2 16.250484 2 19 C 2 21.749516 4.2504839 24 7 24 L 19 24 C 21.749516 24 24 21.749516 24 19 C 24 16.250484 21.749516 14 19 14 L 7 14 z M 43 14 C 40.250484 14 38 16.250484 38 19 L 38 23 A 1.0001 1.0001 0 0 0 39 24 L 43 24 C 45.749516 24 48 21.749516 48 19 C 48 16.250484 45.749516 14 43 14 z M 7 16 L 19 16 C 20.668484 16 22 17.331516 22 19 C 22 20.668484 20.668484 22 19 22 L 7 22 C 5.3315161 22 4 20.668484 4 19 C 4 17.331516 5.3315161 16 7 16 z M 43 16 C 44.668484 16 46 17.331516 46 19 C 46 20.668484 44.668484 22 43 22 L 40 22 L 40 19 C 40 17.331516 41.331516 16 43 16 z M 7 26 C 4.2504839 26 2 28.250484 2 31 C 2 33.749516 4.2504839 36 7 36 C 9.7495161 36 12 33.749516 12 31 L 12 27 A 1.0001 1.0001 0 0 0 11 26 L 7 26 z M 19 26 C 16.250484 26 14 28.250484 14 31 L 14 43 C 14 45.749516 16.250484 48 19 48 C 21.749516 48 24 45.749516 24 43 L 24 31 C 24 28.250484 21.749516 26 19 26 z M 31 26 C 28.250484 26 26 28.250484 26 31 C 26 33.749516 28.250484 36 31 36 L 43 36 C 45.749516 36 48 33.749516 48 31 C 48 28.250484 45.749516 26 43 26 L 31 26 z M 7 28 L 10 28 L 10 31 C 10 32.668484 8.6684839 34 7 34 C 5.3315161 34 4 32.668484 4 31 C 4 29.331516 5.3315161 28 7 28 z M 19 28 C 20.668484 28 22 29.331516 22 31 L 22 43 C 22 44.668484 20.668484 46 19 46 C 17.331516 46 16 44.668484 16 43 L 16 31 C 16 29.331516 17.331516 28 19 28 z M 31 28 L 43 28 C 44.668484 28 46 29.331516 46 31 C 46 32.668484 44.668484 34 43 34 L 31 34 C 29.331516 34 28 32.668484 28 31 C 28 29.331516 29.331516 28 31 28 z M 27 38 A 1.0001 1.0001 0 0 0 26 39 L 26 43 C 26 45.749516 28.250484 48 31 48 C 33.749516 48 36 45.749516 36 43 C 36 40.250484 33.749516 38 31 38 L 27 38 z M 28 40 L 31 40 C 32.668484 40 34 41.331516 34 43 C 34 44.668484 32.668484 46 31 46 C 29.331516 46 28 44.668484 28 43 L 28 40 z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-100">Slack API</h3>
                <p className="text-sm text-slate-100">
                  Announcements and Reminders, Custom Layouts
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-2xl">
            <div className="flex h-[180px] flex-col justify-between rounded-md bg-[#000000] p-6 text-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 fill-current"
                viewBox="0 0 172.8 113.18"
              >
                <defs>
                  <style
                    dangerouslySetInnerHTML={{ __html: ".cls-1{fill:#fff;}" }}
                  />
                </defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      className="cls-1"
                      d="M140.25,40.27A57.84,57.84,0,0,0,85.56,0,56.75,56.75,0,0,0,35.24,29.9a42.79,42.79,0,0,0-10.33,81l1.08.5h.06V99.23a31.95,31.95,0,0,1,13.31-59l3-.31,1.31-2.74A46,46,0,0,1,85.56,10.85a46.83,46.83,0,0,1,45.19,35.79l1,4.11,4.23.07a26.56,26.56,0,0,1,26,26.44c0,10.11-5.83,18.36-15.72,22.55v11.55l.71-.24c15.95-5.21,25.86-18.19,25.86-33.86A37.49,37.49,0,0,0,140.25,40.27Z"
                    />
                    <path
                      className="cls-1"
                      d="M64.56,110l2.38,2.38a.47.47,0,0,1-.34.81H47.84a8.53,8.53,0,0,1-8.54-8.53V68.14a.47.47,0,0,0-.47-.47H34.76a.48.48,0,0,1-.34-.81L50.35,50.94a.46.46,0,0,1,.67,0L66.94,66.86a.47.47,0,0,1-.34.81H62.53a.47.47,0,0,0-.47.47V104A8.53,8.53,0,0,0,64.56,110Z"
                    />
                    <path
                      className="cls-1"
                      d="M99.76,110l2.38,2.38a.47.47,0,0,1-.34.81H83a8.53,8.53,0,0,1-8.54-8.53V77.32a.47.47,0,0,0-.47-.48H70a.48.48,0,0,1-.34-.81L85.55,60.11a.46.46,0,0,1,.67,0L102.14,76a.47.47,0,0,1-.34.81H97.73a.47.47,0,0,0-.47.48V104A8.53,8.53,0,0,0,99.76,110Z"
                    />
                    <path
                      className="cls-1"
                      d="M135,110l2.38,2.38a.47.47,0,0,1-.33.81H118.24a8.54,8.54,0,0,1-8.54-8.53V86.49a.47.47,0,0,0-.47-.47h-4.07a.47.47,0,0,1-.33-.81l15.92-15.93a.48.48,0,0,1,.67,0l15.92,15.93A.47.47,0,0,1,137,86h-4.08a.47.47,0,0,0-.47.47V104A8.53,8.53,0,0,0,135,110Z"
                    />
                  </g>
                </g>
              </svg>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-100">Cloudinary</h3>
                <p className="text-sm text-slate-100">
                  UI components built using Radix UI and styled with Tailwind
                  CSS.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-2xl">
            <div className="flex h-[180px] flex-col justify-between rounded-md bg-[#000000] p-6 text-slate-200">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M0 12C0 5.373 5.373 0 12 0c4.873 0 9.067 2.904 10.947 7.077l-15.87 15.87a11.981 11.981 0 0 1-1.935-1.099L14.99 12H12l-8.485 8.485A11.962 11.962 0 0 1 0 12Zm12.004 12L24 12.004C23.998 18.628 18.628 23.998 12.004 24Z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-100">Database</h3>
                <p className="text-sm text-slate-100">
                  ORM using Prisma and deployed on PlanetScale.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-2xl">
            <div className="flex h-[180px] flex-col justify-between rounded-md bg-[#000000] p-6 text-slate-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="h-12 w-12 fill-current"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-100">Authentication</h3>
                <p className="text-sm text-slate-100">
                  Authentication using NextAuth.js and middlewares.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-2xl">
            <div className="flex h-[180px] flex-col justify-between rounded-md bg-[#000000] p-6 text-slate-200">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-100">Subscriptions</h3>
                <p className="text-sm text-slate-100">
                  Free and paid subscriptions using Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex flex-col gap-4 md:max-w-[52rem]">
          <p className="max-w-[85%] leading-normal text-slate-700 sm:text-lg sm:leading-7">
            Slackify also includes a blog and a full-featured documentation site
            built using Contentlayer and MDX.
          </p>
        </div>
      </section>
      <hr className="border-slate-200" />
      <section className="container grid justify-center gap-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex flex-col gap-4 md:max-w-[52rem]">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-slate-700 sm:text-lg sm:leading-7">
            Slackify is open source and powered by open source software. The
            code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
            <Link href="/docs" className="underline underline-offset-4">
              I&apos;m also documenting everything here
            </Link>
            .
          </p>
        </div>
        {stars && (
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex"
          >
            <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-slate-600 bg-slate-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 border-y-8 border-r-8 border-l-0 border-solid border-y-transparent border-r-slate-800"></div>
              <div className="flex h-10 items-center rounded-md border border-slate-800 bg-slate-800 px-4  font-medium text-slate-200">
                {stars} stars on GitHub
              </div>
            </div>
          </Link>
        )}
      </section>
    </>
  )
}
