import searchAmiibos from './searchAmiibos';
import { anNextApiRequest, anNextApiResponse } from '@/fixtures/nextApi.fixture';
import clearAllMocks = jest.clearAllMocks;

global.fetch = jest.fn(() => Promise.resolve({
	json: () => Promise.resolve({
		amiibo: [],
	}),
}) as Promise<Response>);

describe('searchAmiibos', () => {
	beforeEach(() => {
		clearAllMocks()
	});

	it('lorsque la requete est incorrecte, n‘appelle pas l‘api et renvoie un accès aux données non autorisé', () => {
		const status = jest.fn();
		const json = jest.fn()
		searchAmiibos(anNextApiRequest({
			method: "POST",
			query: {
				name: 'toto'
			}
		}), anNextApiResponse({
			status: status.mockReturnThis(),
			json: json,
		}))

		expect(fetch).toHaveBeenCalledTimes(0)
		expect(status).toHaveBeenCalledWith(401)
		expect(json).toHaveBeenCalledWith({ code: 401, message: "Accès aux données non autorisé" })
	});
});
