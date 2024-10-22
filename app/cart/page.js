"use client";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout";
import { Button, Card, Flex, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import Link from "next/link";
// import watch from "/assets/watch.jpeg";
export default function Cart() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      id: 1,
      name: "Watch 1 Pro",
      price: 100,
      image:
        "https://th.bing.com/th/id/OIP.Rsb21Y85XeQKONiNLztQhgHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      name: "Watch 2 Pro",
      price: 150,
      image:
        "https://th.bing.com/th/id/OIP.vXoGb7pSUQ5l-r6sN5Ku4QAAAA?rs=1&pid=ImgDetMain",
    },
  ];
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
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>Cart</h1>
          <Link
            href="/checkout"
            type="button"
            style={{
              fontFamily: "geistSansFont, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Arial",
              backgroundColor: "black",
              borderRadius: borderRadiusLG,
              color: "white",
              fontWeight: "light",
              fontSize: "16px",
              padding: "1.25%",
            }}
          >
            Checkout
            {/* <Icon type="arrow-right" style={{ marginLeft: "5px" }} /> */}
  
          </Link>
        </div>
        {items.map((item) => {
          return (
            <Card
              key={item.id} // It's good to add a unique key for each element when mapping
              style={{
                width: "90%",
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 20,
              }}
            >
              <Flex>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    height: "75px",
                  }}
                />
                <div>
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    ${item.price}
                  </p>
                  <p
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Total: ${item.price}
                  </p>
                </div>
              </Flex>
            </Card>
          );
        })}
      </Content>
    </DefaultLayout>
  );
}
