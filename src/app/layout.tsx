import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clickwrap Templates — ClickTerm",
  description: "Build consistent, compliant clickwrap templates for fast deployment.",
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
