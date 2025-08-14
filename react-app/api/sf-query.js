// sf-query.js
export default async function handler(req, res) {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ error: 'Missing access token' });
  }

  const soql = req.body.query;
  const url = req.body.url;

  try {
    const sfResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!sfResponse.ok) {
      const errorData = await sfResponse.json();
      return res.status(sfResponse.status).json(errorData);
    }

    const data = await sfResponse.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Salesforce request failed', details: err.message });
  }
}
