import searchAmiibos from './searchAmiibos';
import { anNextApiRequest, anNextApiResponse } from '@/fixtures/NextApiFixture';
import clearAllMocks = jest.clearAllMocks;

global.fetch = jest.fn(() => Promise.resolve({
	json: () => Promise.resolve({
		amiibo: []
	}),
}));
describe('searchAmiibos', () => {
	beforeEach(() => {
		clearAllMocks()
	});

	it('lorsque la requete est correcte, appelle l‘api', () => {
		searchAmiibos(anNextApiRequest({
			method: "GET"
		}), anNextApiResponse())

		expect(fetch).toHaveBeenCalledTimes(1)
		//todo FINIR
	});
});
