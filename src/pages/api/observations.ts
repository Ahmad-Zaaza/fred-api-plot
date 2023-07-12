// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IObservationsResponse } from '@/hooks/data/fred/fred.types';
import { httpClient } from '@/lib/configs/axios';
import type { NextApiRequest, NextApiResponse } from 'next'


const url = new URL("https://api.stlouisfed.org/fred/series/observations");

url.searchParams.append("api_key", process.env.API_KEY as string);
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IObservationsResponse>
) {
    const params = req.query;
    if (params.series_id && params.series_id === "DGS10-T10YIE") {
        const result = await Promise.all([httpClient.get<IObservationsResponse>(
            url.href, { params: { ...params, series_id: "DGS10", observation_start: params.observation_start || "2003-01-02" } }
        ), httpClient.get<IObservationsResponse>(
            url.href, { params: { ...params, series_id: "T10YIE", observation_start: params.observation_start || "2003-01-02" } }
        )])


        const DGS10Data = result[0].data.observations;

        const T10YIEData = result[1].data.observations;

        const data: IObservationsResponse['observations'] = [];
        for (let index = 0; index < DGS10Data.length; index++) {
            data.push({ ...DGS10Data[index], value: (parseFloat(DGS10Data[index].value) - parseFloat(T10YIEData[index].value)).toFixed(2) })
        }

        res.status(200).json({ ...result[0].data, observations: data })
    } else {
        const response = await httpClient.get(url.href, {
            params,
        });
        res.status(200).json(response.data)
    }





}
