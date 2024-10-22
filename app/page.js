"use client";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout";
import { theme } from "antd";
import { Content } from "antd/es/layout/layout";

export default function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <DefaultLayout>
      <Content
        style={{
          marginTop: "15px",
          padding: "0 48px",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Home
        </div>
      </Content>
    </DefaultLayout>
  );
}
