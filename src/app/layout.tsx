import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/RQProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

type Props = Readonly<{ children: React.ReactNode }>;

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ko">
      <body>
        <Suspense fallback={<>... 로딩</>}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
