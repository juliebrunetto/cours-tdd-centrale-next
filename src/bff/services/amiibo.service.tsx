import { NextApiResponse } from "next";
import { AmiiboResponse } from "../dto/amiiboResponse.type";
import { Amiibo } from '@/bff/dto/amiibo.type';

export default class AmiiboService {
	constructor() {}

	public formatAmiibos(response: Array<AmiiboResponse>): Array<Amiibo> {
		//TODO: DO STUFF HERE
		return response.map((data: AmiiboResponse) => ({
			name: data.character,
			image: data.image,
			id: `${data.head}${data.tail}`,
			releaseEurope: data.release.eu ?? undefined,
		}));
	}
}
