import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const stockSymbol = req.query.symbol; // Assuming the stock symbol is passed as a query parameter
  const subreddit = req.query.subreddit; // Assuming the subreddit is passed as a query parameter

  try {
    // Fetch stock mentions from Reddit on a specific subreddit
    const redditResponse = await axios.get(
      `https://api.reddit.com/r/${subreddit}/search.json?q=${stockSymbol}&restrict_sr=1&sort=new`
    );

    const stockMentions = redditResponse.data.data.children.map((mention: any) => ({
      title: mention.data.title,
      author: mention.data.author,
      subreddit: mention.data.subreddit,
      url: mention.data.url,
    }));

    res.status(200).json({ stockMentions });
  } catch (error) {
    console.error('Error fetching stock mentions on Reddit:', error);
    res.status(500).json({ error: 'Failed to fetch stock mentions on Reddit' });
  }
}
