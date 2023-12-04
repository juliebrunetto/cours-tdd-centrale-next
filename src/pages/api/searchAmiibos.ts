import { NextApiRequest, NextApiResponse } from "next";
import { Amiibo } from '@/dto/amiibo.type';

export interface AmiiboListResponse {
	amiibo: Array<AmiiboResponse>;
}

export interface AmiiboResponse {
	head: string;
	name: string;
	image: string;
	type: "card" | "figure" | "yarn";
	amiiboSeries: string;
	character: string;
	gameSeries: string;
	release: {
		au: string | null;
		eu: string | null;
		jp: string | null;
		na: string | null;
	};
	tail: string;
}


export default async function searchAmiibos(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {

	if (req.method !== "GET") {
		return res
			.status(401)
			.json({ code: 401, message: "Accès aux données non autorisé" });
	}
	try {
		const apiResponse = await fetch(
			`https://www.amiiboapi.com/api/amiibo/?name=${req.query.name}`,
			{
				method: "GET",
			},
		);
		const amiibosResponse = await apiResponse.json() as AmiiboListResponse;

		const responseMapped: Array<Amiibo> = amiibosResponse.amiibo.map((data: AmiiboResponse): Amiibo => ({
			name: data.name,
			image: data.image,
			id: `${data.head}${data.tail}`,
			releaseEurope: data.release.eu ?? undefined,
			type: data.type,
			serie: data.amiiboSeries
		}));

		return res.status(200).json(responseMapped);
	} catch (error) {
		console.log(error)
	}
}
