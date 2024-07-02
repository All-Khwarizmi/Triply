import { TimelineProvider } from "./Context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TimelineProvider>{children}</TimelineProvider>;
}
