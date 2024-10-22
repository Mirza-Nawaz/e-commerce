"use client";
import React from "react";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { menuItems } from "../MenuItems/menuItems";
import Link from "next/link";
import { useRouter } from "next/navigation";
const { Header, Content, Footer } = Layout;

const DefaultLayout = ({ children }) => {
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleNavigation = (e) => {
    const selectedItem = menuItems.find((item) => item.key === e.key);
    if (selectedItem && selectedItem.path) {
      router.push(selectedItem.path);
    }
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={(e) => handleNavigation(e)}
        />
        <Link href="/cart" style={{ textDecoration: "none" }}>
          <div
            style={{
              padding: 5,
              fontWeight: "lighter",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4.46785 10.2658C4.47574 10.3372 4.48376 10.4094 4.49187 10.4823L4.61751 11.6131C4.7057 12.4072 4.78218 13.0959 4.91562 13.6455C5.05917 14.2367 5.29582 14.7937 5.78931 15.2354C6.28281 15.6771 6.86251 15.8508 7.46598 15.9281C8.02694 16.0001 8.71985 16 9.51887 16H14.8723C15.4201 16 15.9036 16 16.3073 15.959C16.7448 15.9146 17.1698 15.8162 17.5785 15.5701C17.9872 15.324 18.2731 14.9944 18.5171 14.6286C18.7422 14.291 18.9684 13.8637 19.2246 13.3797L21.7141 8.67734C22.5974 7.00887 21.3879 4.99998 19.5 4.99998L9.39884 4.99998C8.41604 4.99993 7.57525 4.99988 6.90973 5.09287C6.5729 5.13994 6.24284 5.21529 5.93326 5.34375L5.78941 4.04912C5.65979 2.88255 4.67375 2 3.5 2H3C2.44772 2 2 2.44771 2 3C2 3.55228 2.44772 4 3 4H3.5C3.65465 4 3.78456 4.11628 3.80164 4.26998L4.46785 10.2658Z"
                fill="#323232"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 19.5C14 18.1193 15.1193 17 16.5 17C17.8807 17 19 18.1193 19 19.5C19 20.8807 17.8807 22 16.5 22C15.1193 22 14 20.8807 14 19.5Z"
                fill="#323232"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 19.5C5 18.1193 6.11929 17 7.5 17C8.88071 17 10 18.1193 10 19.5C10 20.8807 8.88071 22 7.5 22C6.11929 22 5 20.8807 5 19.5Z"
                fill="#323232"
              />
            </svg>
            Cart
          </div>
        </Link>
      </Header>
      {children}
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  );
};
export default DefaultLayout;
