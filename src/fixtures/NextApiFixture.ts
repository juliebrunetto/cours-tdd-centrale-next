import { NextApiRequest, NextApiResponse } from 'next';

export function anNextApiRequest(override?: Partial<NextApiRequest>): NextApiRequest {
	return {
		method: "GET",
		query: {
			name: 'toto',
		},
		...override,
	} as unknown as NextApiRequest
}

export function anNextApiResponse(override?: Partial<NextApiResponse>): NextApiResponse {
	return {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
		...override,
	} as unknown as NextApiResponse
}
