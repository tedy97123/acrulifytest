import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const options = {
    headers: {
        'X-RapidAPI-Key': '5ce3259baamsh927e932246a4b9bp13b280jsne1e7b7bc0238',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
}
  try {
    const response = await axios.get('https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=MSFT&datatype=json&output_size=compact',options);
    const financialData = response.data;
    res.status(200).json(financialData);


    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch financial data' });
  }
}