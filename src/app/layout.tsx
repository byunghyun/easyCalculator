import { RootLayoutPropsInterface } from "@/types";
import "./globals.scss";

export default function RootLayout({
  children,
}: RootLayoutPropsInterface) {
  return (
    <html lang="ko">
      <head />
      <body>{children}</body>
    </html>
  );
}
