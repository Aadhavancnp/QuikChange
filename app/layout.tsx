import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

const archive = localFont({
  src: "../public/assets/fonts/archive-webfont.woff2",
  display: "swap",
});

export const metadata = {
  title: "QuikChange",
  description: "A tool for quickly money changing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${archive.className} flex flex-col justify-center items-center`}
      >
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
