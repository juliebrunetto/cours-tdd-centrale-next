import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import RechercheAmiibos from "./RechercheAmiibos";
import { userEvent } from '@testing-library/user-event';
import { anAmiibo } from '@/fixtures/amiibo.fixture';
import clearAllMocks = jest.clearAllMocks;

describe("<RechercheAmiibos/>", () => {
	beforeEach(() => {
		clearAllMocks()
	});

	it("je vois le titre de la page", () => {
		render(<RechercheAmiibos/>);

		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Rechercher un Amiibo",
		);
	});

	it("je vois le champ de recherche", () => {
		render(<RechercheAmiibos/>);

		expect(screen.getByRole("textbox", { name: "Nom de l‘Amiboo (Champ obligatoire)" })).toBeVisible();
	});

	it("je vois le bouton de recherche", () => {
		render(<RechercheAmiibos/>);

		expect(screen.getByRole('button', { name: 'Rechercher' })).toBeVisible();
	});

	it('lorsque je ne lance pas de recherche, n‘appelle pas l‘api et n‘affiche pas les résultats', () => {
		global.fetch = jest.fn(() => Promise.resolve({
			json: () => Promise.resolve([]),
		}) as Promise<Response>);

		render(<RechercheAmiibos/>);

		expect(fetch).not.toHaveBeenCalled()
		expect(screen.queryByRole('list', { name: 'Liste des Amiibos' })).not.toBeInTheDocument()
	});

	it('lorsque je lance une recherche sans avoir donné de nom, n‘appelle pas l‘api et n‘affiche pas les résultats', async () => {
		const user = userEvent.setup()
		global.fetch = jest.fn(() => Promise.resolve({
			json: () => Promise.resolve([]),
		}) as Promise<Response>);

		render(<RechercheAmiibos/>);

		await user.click(screen.getByRole('button', { name: 'Rechercher' }))

		expect(fetch).not.toHaveBeenCalled()
		expect(screen.queryByRole('list', { name: 'Liste des Amiibos' })).not.toBeInTheDocument()
	});

	describe('lorsque je fais une recherche', () => {
		it('appelle l‘api', async () => {
			global.fetch = jest.fn(() => Promise.resolve({
				json: () => Promise.resolve([]),
			}) as Promise<Response>);

			const user = userEvent.setup()
			render(<RechercheAmiibos/>);

			const inputName = screen.getByRole("textbox", { name: "Nom de l‘Amiboo (Champ obligatoire)" });
			await user.type(inputName, 'mario');

			await user.click(screen.getByRole('button', { name: 'Rechercher' }))

			expect(fetch).toHaveBeenCalledWith('/api/searchAmiibos?name=mario', { "method": "GET" })
		});

		it('je vois les résultats', async () => {
			global.fetch = jest.fn(() => Promise.resolve({
				json: () => Promise.resolve([anAmiibo(), anAmiibo({
					name: "Zelad",
					id: '123456',
				})]),
			}) as Promise<Response>);

			const user = userEvent.setup()
			render(<RechercheAmiibos/>);

			const inputName = screen.getByRole("textbox", { name: "Nom de l‘Amiboo (Champ obligatoire)" });
			await user.type(inputName, 'mario');

			await user.click(screen.getByRole('button', { name: 'Rechercher' }))

			expect(screen.getByRole('heading', { level: 2, name: 'Résultats' })).toBeVisible()
			expect(screen.getByRole('list', { name: 'Liste des Amiibos' })).toBeVisible()
			expect(screen.getAllByRole('listitem')).toHaveLength(2)
		});

		it('je vois les caractéristiques de l‘amiibo', async () => {
			global.fetch = jest.fn(() => Promise.resolve({
				json: () => Promise.resolve([anAmiibo({
					name: "Zelda",
					type: "Card",
					serie: 'Legend Of Zelda',
					releaseEurope: '2016-12-02'
				})]),
			}) as Promise<Response>);

			const user = userEvent.setup()
			render(<RechercheAmiibos/>);

			const inputName = screen.getByRole("textbox", { name: "Nom de l‘Amiboo (Champ obligatoire)" });
			await user.type(inputName, 'mario');
			await user.click(screen.getByRole('button', { name: 'Rechercher' }))

			const zeldaCard = screen.getAllByRole('listitem')[0]

			expect(within(zeldaCard).getByText('Card')).toBeVisible()
			expect(within(zeldaCard).getByText('Legend Of Zelda')).toBeVisible()
			expect(within(zeldaCard).getByText(/Sortie en Europe le 2016-12-02/)).toBeVisible()
		});
	});
});
