import React, { useId } from "react";
import style from "./Card.module.css";
import classNames from "classnames";

interface CardProps extends React.ComponentPropsWithoutRef<"article"> {
	title: string;
	release?: string;
}

export default function Card({
															 title,
															 release,
															 children,
															 className,
															 ...rest
														 }: CardProps) {
	const labelId = useId();

	return (
		<article
			className={classNames(style.card, className)}
			aria-labelledby={labelId}
			{...rest}
		>
			<h2 id={labelId} className="title">
				{title}
			</h2>
			{release && (
				<div className={style.ownerInformation}>
					Sortie en Europe le {release}
				</div>
			)}
			{children}
		</article>
	);
}
