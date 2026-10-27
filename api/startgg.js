// Proxy start.gg (GraphQL) pour Street Fighter 6.
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { query, variables } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  try {
    const r = await fetch('https://api.start.gg/gql/alpha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.STARTGG_TOKEN}` },
      body: JSON.stringify({ query, variables }),
    });
    res.status(r.status).send(await r.text());
  } catch (e) { res.status(502).json({ error: String(e) }); }
};
