import '@/styles/globals.css';
import {Metadata, Viewport} from 'next';
import {siteConfig} from '@/config/site';
import {fontSans} from '@/config/fonts';
import {Providers} from './providers';
import {Navbar} from '@/components/navbar';
import clsx from 'clsx';
import React from "react";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png'
    },
};

export const viewport: Viewport = {
    themeColor: [
        {media: '(prefers-color-scheme: light)', color: 'white'},
        {media: '(prefers-color-scheme: dark)', color: 'black'},
    ]
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        </head>
        <body
            className={clsx(
                'min-h-screen bg-background font-sans antialiased',
                fontSans.variable
            )}
        >
        <Providers themeProps={{attribute: 'class', defaultTheme: 'dark'}}>
            <div className="relative flex flex-col h-screen">
                <Navbar/>
                <main>
                    <section className="flex flex-col justify-center">
                        <div className="text-center justify-center">
                            {children}
                        </div>
                    </section>
                </main>
                <Footer></Footer>
            </div>
        </Providers>
        </body>
        </html>
    );
}
