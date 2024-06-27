import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { TimelineProvider } from "./Context";
const inter = Inter({ subsets: ["latin"] });
import "reactflow/dist/style.css";
export const metadata: Metadata = {
  title: "ClassAI - Votre nouveau carnet de notes.",
  description:
    "ClassAI est un carnet de notes intelligent qui vous permet de suivre la progression de vos élèves. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TimelineProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
          />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </TimelineProvider>
  );
}
