import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import "animate.css";
import { ColorProvider } from "@/context/colorContext";
import { SignUpProvider } from "@/context/signUpFormContext";
import { LoginProvider } from "@/context/loginFormContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const inter = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Capital Nexus | Best Digital Banking Platform",
  description:
    "Experience cutting-edge banking with our innovative financial service.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SignUpProvider>
          <LoginProvider>
            <ColorProvider>
              <Toaster richColors position="top-center" />
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </ColorProvider>
          </LoginProvider>
        </SignUpProvider>

        {/* Smartsupp Live Chat */}
        <Script
          id="smartsupp-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _smartsupp = _smartsupp || {};
              _smartsupp.key = 'e9f8564ccc5d9a36cc53362e713832483c3f9109';
              window.smartsupp||(function(d) {
                var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                c.type='text/javascript';c.charset='utf-8';c.async=true;
                c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
              })(document);
            `,
          }}
        />
      </body>
    </html>
  );
}
