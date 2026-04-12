import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.callcapture.cc"),
  title: "CallCapture — Turn Missed Calls Into Captured Clients",
  description:
    "CallCapture instantly responds to missed inbound calls, captures caller information, and delivers qualified leads so you never lose another opportunity.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CallCapture — Turn Missed Calls Into Captured Clients",
    description:
      "CallCapture instantly responds to missed inbound calls, captures caller information, and delivers qualified leads so you never lose another opportunity.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "CallCapture — Turn Missed Calls Into Captured Clients",
    description:
      "CallCapture instantly responds to missed inbound calls, captures caller information, and delivers qualified leads so you never lose another opportunity.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
