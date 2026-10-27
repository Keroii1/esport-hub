// Proxy PandaScore : cache la clé et évite les soucis de CORS.
module.exports = async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const path = url.searchParams.get('path') || '';
  if (!/^[a-z0-9_\/-]+$/i.test(path)) return res.status(400).json({ error: 'path invalide' });
  url.searchParams.delete('path');
  try {
    const r = await fetch(`https://api.pandascore.co/${path}?${url.searchParams}`, {
      headers: { Authorization: `Bearer ${process.env.PANDASCORE_TOKEN}` },
    });
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(r.status).send(await r.text());
  } catch (e) { res.status(502).json({ error: String(e) }); }
};
