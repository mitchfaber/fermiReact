import React, { useState, useEffect } from "react";

export default function HintsBox({ hint, reset, count, nums, changeReset }) {
	const [guesses, setGuesses] = useState([]);
	useEffect(() => {
		setGuesses((prevGuesses) => {
			return [...prevGuesses, { hint: hint[0], count: count, nums: nums }];
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hint]);

	useEffect(() => {
		if (reset) {
			resetGame().then(() => {
				changeReset();
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reset]);

	async function resetGame() {
		setGuesses([]);
	}

	return (
		<div className="box">
			<div>
				<p>
					Previous Guesses
					<br />
					============
				</p>
				<br />
				{guesses.map((guess) => {
					return guess.count > 0 ? (
						<div key={guess.count}>
							Guess #{guess.count} ({guess.nums}): {guess.hint}
						</div>
					) : (
						<div key={guess.count}></div>
					);
				})}
			</div>
		</div>
	);
}
