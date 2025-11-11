import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useNavigate, useNavigation,
} from "react-router";
import type { Route } from "./+types/root";
import React, { useEffect, useState } from "react";

import "./app.css";
import "./src/assets/fonts/fonts.css";
import {AppStateController} from "~/src/Views/Core/AppStateController";
import {controllers} from "~/src/Controllers/Controllers";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
        rel: "stylesheet",
        href:
            "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@" +
            "0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
        </head>
        <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    const [ready, setReady] = useState(false);

    const NaviUse = () => {
        const navigation = useNavigation()
        navigator().setNavigation(navigation)
        return null;
    }

    const navigate = useNavigate();
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                console.log('APP RENDER')
                await AppStateController.restoreData();
                if (!controllers().auth.isLogin) {
                    navigate("/home", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            } catch (ex) {
                console.log('controllers().auth.isLogin ex', ex)
            } finally {
                if (!cancelled) setReady(true);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    if (!ready) {
        return (
            <div style={s.splash}>
                <div style={s.spinner} aria-label="loading" />
            </div>
        );
    }

    return <Outlet />;
}

const s: Record<string, React.CSSProperties> = {
    splash: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#17181E",
    },
    spinner: {
        width: 42,
        height: 42,
        borderRadius: "50%",
        border: "4px solid rgba(255,255,255,0.2)",
        borderTopColor: "#196FFD",
        animation: "spin 1s linear infinite",
    },
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}