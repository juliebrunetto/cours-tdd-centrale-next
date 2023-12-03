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
