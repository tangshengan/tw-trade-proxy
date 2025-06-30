export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '僅支援 POST' });
  }

  const league = req.query.league || '特拉特斯聯盟';

  try {
    const result = await fetch(
      `https://pathofexile.tw/api/trade/search/${encodeURIComponent(league)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    const json = await result.json();
    res.status(200).json({
      id: json.id,
      url: `https://pathofexile.tw/trade/search/${encodeURIComponent(league)}/${json.id}`,
    });

  } catch (e) {
    res.status(500).json({ error: '查詢失敗', message: e.message });
  }
}
