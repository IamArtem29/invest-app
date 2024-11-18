import axios from 'axios';

export default async function handler(req, res) {
  // Проверяем метод запроса
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Отправляем запрос для создания песочницы
    const response = await axios.post(
      `${process.env.SANDBOX_API_URL}/sandbox/openSandboxAccount`,
      {}, // Этот метод не требует тела запроса
      {
        headers: {
          Authorization: `Bearer ${process.env.SANDBOX_TOKEN}`, // Указываем токен
        },
      }
    );

    // Возвращаем успешный ответ с ID созданного аккаунта
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      'Error creating sandbox account:',
      error.response?.data || error.message
    );
    return res.status(500).json({ error: 'Failed to open sandbox account' });
  }
}
