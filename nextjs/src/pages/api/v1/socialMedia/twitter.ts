import Twitter from 'twitter';
import { NextApiRequest, NextApiResponse } from 'next';

const client = new Twitter({
  consumer_key: '05yEeHHQ5RZLO0ppe2O4Ypttt',
  consumer_secret: 'V5c0EQ08MxiK0homegkSxNBIQg7eTy6BgdToUrpcZXyqPwBxJ8',
  access_token_key: '1643796249521582082-Z5PStmoQLYfaEmAzsjjlwXxnZqQPuz',
  access_token_secret: 'xKljl2kZOIgTKo1IYZi4pAPgi3bvlJZUwoEPpgtDIurpz',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const stockSymbol = req.query.symbol; // Assuming the stock symbol is passed as a query parameter

  try {
    const tweets = await client.get('search/tweets', {
      q: stockSymbol,
    });

    const mentionCount = tweets.statuses.length;

    res.status(200).json({ mentions: mentionCount });
  } catch (error) {
    console.error('Error fetching stock mentions:', error);
    res.status(500).json({ error: 'Failed to fetch stock mentions' });
  }
}
