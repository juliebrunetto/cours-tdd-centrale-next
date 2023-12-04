import React, { FormEvent, useState, useId } from "react";
import Card from "@/components/ui/Card/Card";
import Image from "next/image";
import styles from "./RechercheAmiibos.module.css";
import { Amiibo } from '@/dto/amiibo.type';

export default function RechercheAmiibos() {
	const [listAmiibo, setListAmiibo] = useState<Array<Amiibo>>([]);
	const inputId = useId();

	async function onHandleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const inputValue = data.get('searchInput');

		if (inputValue && inputValue !== "value") {
			const response = await fetch(`/api/searchAmiibos?name=${inputValue}`, {
				method: "GET",
			});
			const amiibos = await response.json();

			setListAmiibo(amiibos);
		}
	}

	return (
		<main>
			<h1 className={styles.title}>Rechercher un Amiibo</h1>

			<form onSubmit={onHandleSubmit}>
				<label htmlFor={inputId}>Nom de l‘Amiboo (Champ obligatoire)</label>
				<input type={"text"} name={"searchInput"} id={inputId} required/>
				<button type="submit">Rechercher</button>
			</form>

			{listAmiibo.length > 0 && (
				<>
					<h2>Résultats</h2>
					<ul aria-label="Liste des Amiibos">
						{listAmiibo.map((amiibo: Amiibo) => {
							return (
								<li className={styles.card} key={amiibo.id}>
									<Card title={amiibo.name} release={`Sortie en Europe le ${amiibo.releaseEurope}`}>
										<div className={styles.cardImage}>
											<Image src={amiibo.image} alt="" objectFit="contain" layout="fill"/>
										</div>
										<dl>
											<div className={styles.caracteristique}>
												<dt className={styles.definition}>
													Type
												</dt>
												<dd>
													{amiibo.type}
												</dd>
											</div>
											<div className={styles.caracteristique}>
												<dt className={styles.definition}>
													Série
												</dt>
												<dd>
													{amiibo.serie}
												</dd>
											</div>
										</dl>
									</Card>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</main>
	);
}
