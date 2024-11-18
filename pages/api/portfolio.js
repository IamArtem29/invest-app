import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Проверяем метод запроса
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const response = await axios.get(
      `${process.env.SANDBOX_API_URL}/sandbox/portfolio`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SANDBOX_TOKEN}`, // Используем токен из .env
        },
      }
    );

    return res.status(200).json(response.data); // Возвращаем данные портфеля
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
