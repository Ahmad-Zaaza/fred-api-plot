// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const params = req.query;


    const url = new URL("https://api.stlouisfed.org/fred/series/observations");

    url.searchParams.append("api_key", process.env.API_KEY as string);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key] as string))
    const response = await fetch(url);
    const json = await response.json();


    res.status(200).json(json)
}
