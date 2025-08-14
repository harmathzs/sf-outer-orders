export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  try {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.REACT_APP_EXTERNAL_CLIENT_APP_CONSUMER_KEY,
      client_secret: process.env.REACT_APP_EXTERNAL_CLIENT_APP_CONSUMER_SECRET,
      redirect_uri: 'https://sf-outer-orders.vercel.app/oauth/callback'
    });

    const tokenResponse = await fetch('https://login.salesforce.com/services/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await tokenResponse.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Token exchange failed' });
  }
}
