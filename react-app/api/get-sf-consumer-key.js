export default function handler(req, res) {
    // Read environment variable on the server
    const consumerKey = process?.env?.REACT_APP_EXTERNAL_CLIENT_APP_CONSUMER_KEY;
    console.log('consumerKey length', consumerKey?.length);
    
    // Send it to frontend (make sure this key is safe to expose)
    res.status(200).json({ sfConsumerKey: consumerKey });
}