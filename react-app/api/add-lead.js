// /api/add-lead.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessToken = req.headers.authorization?.split(' ')[1];
  const { instanceUrl, lead } = req.body;

  console.log('req.body', req.body);
  console.log('accessToken', accessToken);
  console.log('instanceUrl', instanceUrl);
  console.log('lead', lead);

  if (!accessToken || !instanceUrl) {
    return res.status(400).json({ error: 'Missing access token or instance URL' });
  }

  try {
    const sfResponse = await fetch(`${instanceUrl}/services/data/v57.0/sobjects/Lead/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    const data = await sfResponse.json();

    if (!sfResponse.ok) {
      return res.status(sfResponse.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create Lead', details: error.message });
  }
}
