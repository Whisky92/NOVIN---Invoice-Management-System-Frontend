import type { Metadata } from "next";
import "./globals.css";
import MyProvider from "@utils/my-redux-store/my_providers";

export const metadata: Metadata = {
  title: "Invoice management system",
  description: "An invoice management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MyProvider>
        <body>
            <header className="main_header"/>
            <section className="main_section">
                {children}
            </section>
        </body>
      </MyProvider>
    </html>
  );
}
