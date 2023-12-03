import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "./Home";

describe("<Home/>", () => {
	it("je vois le titre de la page", () => {
		render(<Home />);

		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Rechercher un Amiibo",
		);
	});
	it("je vois le champ de recherche", () => {
		render(<Home />);

		expect(
			screen.getByRole("textbox", { name: "Nom de l‘Amiboo" }),
		).toBeVisible();
	});
});
