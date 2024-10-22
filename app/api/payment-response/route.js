// app/api/payment-response/route.js
import crypto from 'crypto';

const SHA_RESPONSE_PHRASE = '98bcCRiFfkEF38asfnLcOD-(';

export async function POST(req) {
  const { signature, ...responseData } = await req.json();

  // Validate the response signature
  const validSignature = validateSignature(responseData, SHA_RESPONSE_PHRASE);

  if (signature === validSignature) {
    if (responseData.status === '14') {
      return new Response(JSON.stringify({ message: 'Payment successful!' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Payment failed.' }), { status: 400 });
    }
  } else {
    return new Response(JSON.stringify({ message: 'Invalid signature.' }), { status: 400 });
  }
}

// Helper function to validate the response signature
function validateSignature(data, phrase) {
  const dataString = Object.keys(data)
    .sort()
    .reduce((acc, key) => acc + `${key}=${data[key]}`, '');

  const signatureString = `${phrase}${dataString}${phrase}`;
  return crypto.createHash('sha256').update(signatureString).digest('hex');
}
