"use client";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout";
import { Button, Card, Flex, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from 'react';

export default function Checkout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/payfort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'AED',
          customerEmail: email,
          returnUrl: 'http://localhost:3000/',
        }),
      });

      const data = await response.json();
      if (response.ok) { // Check if the response is successful
        window.location.href = data.redirectUrl; // Redirect to PayFort payment page
      } else {
        console.error('Payment failed:', data.error);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1>Payment</h1>
        </div>
        <Card>
          <div>
            <h1>Pay with Amazon Payment Services</h1>
            <form onSubmit={handlePayment}>
              <div>
                <label>Amount (AED): </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email: </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        </Card>
      </Content>
    </DefaultLayout>
  );
}
