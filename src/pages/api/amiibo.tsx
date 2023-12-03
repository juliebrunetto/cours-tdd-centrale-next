import { NextApiResponse } from "next";
import AmiiboService from "../../bff/services/amiibo.service";

const amiiboService = new AmiiboService();
export default async function amiibo(
	req: any,
	res: NextApiResponse,
): Promise<void> {
	let response;

	if (req.method !== "GET") {
		return res
			.status(401)
			.json({ code: 401, message: "Accès aux données non autorisé" });
	}

	try {
		response = await fetch(
			`https://www.amiiboapi.com/api/amiibo/?name=${req.query.name}`,
			{
				method: "GET",
			},
		);
		response = await response.json();
	} catch (error) {
		throw error;
	}

	const responseMapped = amiiboService.formatAmiibos(response.amiibo);
	return res.status(200).json(responseMapped);
}
