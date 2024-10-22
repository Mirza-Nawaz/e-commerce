// app/layout.js

import "./globals.css"; // Import global styles if any
import AntdProvider from "./AntdProvider"; // Import the new AntdProvider component

export const metadata = {
  title: "My Next.js App",
  description: "Next.js with Ant Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroundColor:"#f5f5f5"}}>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
