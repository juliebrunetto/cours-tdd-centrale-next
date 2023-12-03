import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";
import Card from "./Card";

describe("<Card>", () => {
	it("affiche le titre", () => {
		render(<Card title="Je suis le titre" ownerName="owner" />);
		const title = screen.getByRole("heading", { level: 2 });
		expect(title).toBeVisible();
		expect(title).toHaveTextContent("Je suis le titre");
	});

	it("affiche le contenu", () => {
		render(
			<Card title="Je suis le titre" ownerName="owner">
				<p>Lorem ipsum dolor sit amet.</p>
			</Card>,
		);
		expect(screen.getByText("Lorem ipsum dolor sit amet.")).toBeVisible();
	});

	it("affiche le propriétaire de l'article", () => {
		render(<Card title="Je suis le titre" ownerName="Julie" />);

		expect(screen.getByText("Publié par Julie")).toBeVisible();
	});

	it("affiche le bouton de like", () => {
		render(<Card title="Je suis le titre" ownerName="owner" />);

		expect(screen.getByRole("button", { name: "Liker" })).toBeVisible();
	});
});
