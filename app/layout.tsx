import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UpdateSubContextProvider from "./context/UpdateSubContext";
import { CreateSubContextProvider } from "./context/CreateSubContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="corporate" lang="en">
      <body className={inter.className}>
        <CreateSubContextProvider>
          <UpdateSubContextProvider>{children}</UpdateSubContextProvider>
        </CreateSubContextProvider>
      </body>
    </html>
  );
}
