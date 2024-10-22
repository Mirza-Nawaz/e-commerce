import axios from 'axios';
import crypto from 'crypto';

const MERCHANT_IDENTIFIER = 'YOUR_MERCHANT_IDENTIFIER';
const ACCESS_CODE = 'YOUR_ACCESS_CODE';
const SHA_REQUEST_PHRASE = '}(';
const PAYFORT_URL = 'https://sbcheckout.payfort.com/FortAPI/paymentPage'; // Sandbox URL, replace with live URL in production

export async function POST(req) {
  try {
    const { amount, currency, customerEmail, returnUrl } = await req.json();

    // Generate a unique order reference
    const orderReference = `ORDER_${Date.now()}`;

    // Prepare the request payload
    const payload = {
      command: 'AUTHORIZATION', // Use 'PURCHASE' if needed
      access_code: ACCESS_CODE,
      merchant_identifier: MERCHANT_IDENTIFIER,
      merchant_reference: orderReference,
      amount: amount * 100, // Convert to minor units
      currency: currency,
      language: 'en',
      customer_email: customerEmail,
      return_url: returnUrl,
    };

    // Create SHA-256 signature
    const signature = createSignature(payload, SHA_REQUEST_PHRASE);

    const requestData = {
      ...payload,
      signature,
    };

    const response = await axios.post(PAYFORT_URL, requestData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response.request.res.responseUrl);
    return new Response(JSON.stringify({ redirectUrl: response.data }), { status: 200 });
  } catch (error) {
    console.error('Error initiating payment:', error);
    return new Response(JSON.stringify({ error: 'Payment initiation failed.' }), { status: 500 });
  }
}

// Helper function to create SHA-256 signature
function createSignature(data, phrase) {
  const dataString = Object.keys(data)
    .sort()
    .reduce((acc, key) => acc + `${key}=${data[key]}`, '');

  const signatureString = `${phrase}${dataString}${phrase}`;
  return crypto.createHash('sha256').update(signatureString).digest('hex');
}
