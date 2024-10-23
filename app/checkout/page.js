"use client";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout";
import { Button, Card, Input, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from 'react';
import crypto from 'crypto';
import amazonLogo from '@/assets/amazonLogo.png';
export default function Checkout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const amount = 10.00;
  // const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const MERCHANT_IDENTIFIER = process.env.NEXT_PUBLIC_MERCHANT_IDENTIFIER;
  const ACCESS_CODE = process.env.NEXT_PUBLIC_ACCESS_CODE;
  const SHA_REQUEST_PHRASE = process.env.NEXT_PUBLIC_SHA_REQUEST_PHRASE; // Replace with your actual SHA Request Phrase
  const PAYFORT_URL = 'https://sbcheckout.payfort.com/FortAPI/paymentPage'; // Sandbox URL, replace with live URL in production
  const RETURN_URL = process.env.NEXT_PUBLIC_RETURN_URL; // Sandbox URL, replace with live URL in production

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderReference = `ORDER_${Date.now()}`;
      const payload = {
        command: 'AUTHORIZATION', // Use 'PURCHASE' if needed
        access_code: ACCESS_CODE,
        merchant_identifier: MERCHANT_IDENTIFIER,
        merchant_reference: orderReference,
        amount: amount * 100, // Convert to minor units
        currency: 'AED',
        language: 'en',
        customer_email: email,
        return_url:RETURN_URL , // Replace with your return URL
      };

      const signature = createSignature(payload, SHA_REQUEST_PHRASE);

      // Dynamically create and submit the form
      const form = document.createElement('form');
      form.action = PAYFORT_URL;
      form.method = 'POST';

      // Add form fields for all the payload data
      Object.keys(payload).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payload[key];
        form.appendChild(input);
      });

      // Add signature field
      const signatureInput = document.createElement('input');
      signatureInput.type = 'hidden';
      signatureInput.name = 'signature';
      signatureInput.value = signature;
      form.appendChild(signatureInput);

      // Append the form to the body and submit it
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to create SHA-256 signature
  function createSignature(data, phrase) {
    const dataString = Object.keys(data)
      .sort()
      .reduce((acc, key) => acc + `${key}=${data[key]}`, '');

    const signatureString = `${phrase}${dataString}${phrase}`;
    return crypto.createHash('sha256').update(signatureString).digest('hex');
  }

  return (
<DefaultLayout>
      <Content
        style={{
          marginTop: "15px",
          padding: "0 48px",
        }}
      >
        <Card
          style={{
            width: "400px",
            margin: "5% auto",
            padding: "20px",
            borderRadius: borderRadiusLG,
            backgroundColor: colorBgContainer,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s ease",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Corrected from alignContents
            }}
          >
            <img
            style={{
              height: "10%",
              width: "90%",
            }} 
            src={amazonLogo.src} alt="Amazon Logo" />
            <form onSubmit={handlePayment}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  alignItems: "center",
                  fontSize: "18px",
                }}
              >
                <h4
                  style={{
                    fontWeight: "bolder ",
                  }}
                >Total</h4>
                <h4
                  style={{
                    color: "gray",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    AED
                  </span>
                  {amount}
                </h4>
              </div>
              <div style={{
                display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  alignItems: "center",
  
              }}>
                <label style={{
                  fontSize: "18px",
                  color: "gray",
                  fontWeight: "bold",
                }}>Email: </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    fontSize: "16px",
                    margin: "1%",
                    width:"35vh"  
                  }}
                  required
                />
              </div>
              <Button type="primary" htmlType="submit" loading={loading} style={{ marginTop: "10%", marginLeft:"30%" ,backgroundColor:"black", width:"90px"}}>
                {loading ? "Processing..." : "Pay Now"}
              </Button>
            </form>
          </div>
        </Card>
      </Content>
    </DefaultLayout>
  );
}
