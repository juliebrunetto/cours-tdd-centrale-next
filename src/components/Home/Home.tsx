import React, { FormEvent, useState, useId } from "react";
import Card from "@/components/Card/Card";
import Image from "next/image";
import style from "./Home.module.css";
import { Amiibo } from '@/dto/amiibo.type';

export default function Home() {
	const [listAmiibo, setListAmiibo] = useState<Array<Amiibo>>([]);
	const inputId = useId();

	async function onHandleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const inputValue = event.currentTarget["searchInput"].value;

		if (inputValue !== "") {
			const response = await fetch(`/api/searchAmiibos?name=${inputValue}`, {
				method: "GET",
			});
			const amiibos = await response.json();

			setListAmiibo(amiibos);
		}
	}

	return (
		<main>
			<h1 className={style.title}>Rechercher un Amiibo</h1>

			<form onSubmit={onHandleSubmit}>
				<label htmlFor={inputId}>Nom de l‘Amiboo</label>
				<input type={"text"} name={"searchInput"} id={inputId}/>
				<button type="submit">Rechercher</button>
			</form>
			{listAmiibo.length > 0 && (
				<>
					<h2>Résultats</h2>
					<ul>
						{listAmiibo.map((amiibo: Amiibo) => {
							console.log(amiibo.id);
							return (
								<li className={style.card} key={amiibo.id}>
									<Card title={amiibo.name} release={amiibo.releaseEurope}>
										<div className={style.cardContent}>
											<Image src={amiibo.image} alt="" objectFit="contain" layout="fill"/>
										</div>
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
