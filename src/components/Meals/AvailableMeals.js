import React, { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
/* const DUMMY_MEALS = [
	{
		id: 'm1',
		name: 'Sushi',
		description: 'Finest fish and veggies',
		price: 22.99,
	},
	{
		id: 'm2',
		name: 'Schnitzel',
		description: 'A german specialty!',
		price: 16.5,
	},
	{
		id: 'm3',
		name: 'Barbecue Burger',
		description: 'American, raw, meaty',
		price: 12.99,
	},
	{
		id: 'm4',
		name: 'Green Bowl',
		description: 'Healthy...and green...',
		price: 18.99,
	},
];
 */
const AvailableMeals = () => {
	const [originalMeals, setOriginalMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMealsHandler = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				'https://hopeful-b618d.firebaseio.com/meals'
			);
			if (!response.ok) {
				throw new Error('Soemthing went wrong');
			}
			const mealObj = await response.json();
			console.log(mealObj);

			const mealArray = [];
			for (const key in mealObj) {
				mealArray.push({
					id: key,
					name: mealObj[key].name,
					description: mealObj[key].description,
					price: mealObj[key].price,
				});
			}
			setOriginalMeals(mealArray);
		} catch (err) {
			console.log(err.message);
			setError(err.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchMealsHandler();
	}, []);

	if (isLoading) {
		return (
			<section className={styles.loading}>
				<p>Loading ...</p>
			</section>
		);
	}

	return (
		<section className={styles.meals}>
			<Card>
				{!error && (
					<ul>
						{originalMeals.map((meals) => (
							<MealItem
								key={meals.id}
								id={meals.id}
								price={meals.price}
								name={meals.name}
								description={meals.description}
							/>
						))}
					</ul>
				)}
				{error && <p className={styles.error}>{error}</p>}
			</Card>
		</section>
	);
};
export default AvailableMeals;
