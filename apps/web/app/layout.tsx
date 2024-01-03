import type { Metadata } from "next";
import "./global.css"
import { QueryProvider } from "../wrappers/providers/QueryProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navbar } from "../components/auth/NavBar";

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
        <body>
          <Navbar/>
          {children}</body>
      </html>
      </GoogleOAuthProvider>
    </QueryProvider>
  );
}
