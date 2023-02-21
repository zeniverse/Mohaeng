import "./globals.css";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <Header />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
