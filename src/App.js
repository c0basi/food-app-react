import React, { useState } from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

import Header from './components/Layout/Header';

function App() {
	const [isCartShown, setIsCartShown] = useState(false);

	const showCartHandler = () => {
		setIsCartShown(true);
	};

	const removeCartHandler = () => {
		setIsCartShown(false);
	};

	return (
		<CartProvider>
			{isCartShown && <Cart onClose={removeCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
