import './tailwind.css'
import { ClerkApp, ClerkErrorBoundary } from '@clerk/remix'
import { rootAuthLoader } from '@clerk/remix/ssr.server'
import { type LoaderFunctionArgs } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

export async function loader(args: LoaderFunctionArgs) {
  return rootAuthLoader(args, ({ request }) => {
    const { userId } = request.auth

    return { userId }
  })
}

export const ErrorBoundary = ClerkErrorBoundary()

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        <Outlet />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  )
}

export default ClerkApp(App)
