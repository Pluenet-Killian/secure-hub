import type { Metadata } from "next";
import "./global.css"
import { QueryProvider } from "../wrappers/providers/QueryProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Secure back-end",
  description: "A secure authentification method.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <QueryProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_API_GOOGLE_ID as  string}>
      <html lang="en">
        <body>{children}</body>
      </html>
      </GoogleOAuthProvider>
    </QueryProvider>
  );
}
