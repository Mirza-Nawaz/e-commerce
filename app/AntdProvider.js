// app/AntdProvider.js
"use client"; // This will be a Client Component

import { ConfigProvider } from "antd";
import { createCache, StyleProvider } from "@ant-design/cssinjs";
// import theme from './themeConfig'; // Import the custom theme

export default function AntdProvider({ children }) {
  const cache = createCache();

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          token: {
            colorText: "black",
            fontSize: "18px", // Specify units for font size
            fontFamily:
              "geistSansFont, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Arial",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
