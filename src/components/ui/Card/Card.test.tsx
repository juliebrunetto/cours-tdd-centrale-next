import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";
import Card from "./Card";

describe("<Card>", () => {
	it("affiche le titre", () => {
		render(<Card title="Je suis le titre" release="owner" />);
		const title = screen.getByRole("heading", { level: 2 });
		expect(title).toBeVisible();
		expect(title).toHaveTextContent("Je suis le titre");
	});

	it("affiche le contenu", () => {
		render(
			<Card title="Je suis le titre" release="owner">
				<p>Lorem ipsum dolor sit amet.</p>
			</Card>,
		);
		expect(screen.getByText("Lorem ipsum dolor sit amet.")).toBeVisible();
	});

	it("affiche la date de release de la carte", () => {
		render(<Card title="Je suis le titre" release="15/12/2020" />);

		expect(screen.getByText("15/12/2020")).toBeVisible();
	});
});
