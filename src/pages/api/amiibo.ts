import { NextApiResponse } from "next";
import AmiiboService from "../../bff/services/amiibo.service";

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

  const responseMapped = response.amiibo.map((data: AmiiboResponse) => ({
	name: data.character,
	image: data.image,
	id: `${data.head}${data.tail}`,
	releaseEurope: data.release.eu ?? undefined,
}));

  return res.status(200).json(responseMapped);
}
