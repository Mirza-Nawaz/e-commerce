"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Spin, Result } from "antd";
import crypto from 'crypto';
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout";

export default function PaymentStatus() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const SHA_RESPONSE_PHRASE = process.env.NEXT_PUBLIC_SHA_RESPONSE_PHRASE; // Your actual SHA Response Phrase

  useEffect(() => {
    if (router.isReady) {
      const queryParams = router.query;
      
      if (queryParams) {
        const { status, response_message, signature, ...restParams } = queryParams;

        // Validate the response signature
        const validSignature = validateSignature(restParams, SHA_RESPONSE_PHRASE, signature);

        setIsValid(validSignature);
        setPaymentStatus(status);
        setMessage(response_message);
        setLoading(false);
      }
    }
  }, [router.isReady, router.query]);

  // Helper function to validate the SHA-256 signature
  function validateSignature(data, phrase, responseSignature) {
    const dataString = Object.keys(data)
      .sort()
      .reduce((acc, key) => acc + `${key}=${data[key]}`, "");

    const signatureString = `${phrase}${dataString}${phrase}`;
    const generatedSignature = crypto.createHash("sha256").update(signatureString).digest("hex");

    return generatedSignature === responseSignature;
  }

  const handleRetry = () => {
    router.push("/checkout"); // Redirect to the checkout page for retry
  };

  const handleHome = () => {
    router.push("/"); // Redirect to home page
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}>
          <Spin size="large" />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Card
        style={{
          width: "400px",
          margin: "5% auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isValid ? (
          paymentStatus === "14" ? ( // Assuming 14 is the status code for success
            <Result
              status="success"
              title="Payment Successful"
              subTitle={message || "Thank you for your purchase!"}
              extra={[
                <Button type="primary" onClick={handleHome} key="home" style={{
                    backgroundColor:"black",
                    padding:10,
                }}>
                  Go to Home
                </Button>,
              ]}
            />
          ) : (
            <Result
              status="error"
              title="Payment Failed"
              subTitle={message || "Something went wrong with the payment."}
              extra={[
                <Button type="primary" onClick={handleRetry} key="retry" style={{
                    backgroundColor:"black",
                    padding:10,
                }}>
                  Try Again
                </Button>,
                <Button onClick={handleHome} key="home" style={{
                    backgroundColor:"black",
                    padding:10,
                    color:'white'
                }}>
                  Go to Home
                </Button>,
              ]}
            />
          )
        ) : (
          <Result
            status="error"
            title="Invalid Signature"
            subTitle="The response signature is not valid. Please contact support."
            extra={[
              <Button onClick={handleHome} key="home" style={{
                backgroundColor:"black",
                padding:10,
                color:'white'
            }}>
                Go to Home
              </Button>,
            ]}
          />
        )}
      </Card>
    </DefaultLayout>
  );
}
