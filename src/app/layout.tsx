import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { TimelineProvider } from "./timectx/Context";
import ReactFlowProviderWrapper from "./ReactFlowProviderWrapper";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Triply",
  description: "A trip planning app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <ReactFlowProviderWrapper>
              <TimelineProvider>{children}</TimelineProvider>
            </ReactFlowProviderWrapper>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
