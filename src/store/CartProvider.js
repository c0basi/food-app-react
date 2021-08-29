import React, { useReducer } from 'react';
import CartContext from './cart-context';

const initialCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CART_ITEM':
			const updatedItems = state.items.concat(action.item);
			const updatedTotal =
				state.totalAmount + action.item.price * action.item.amount;
			return {
				items: updatedItems,
				totalAmount: updatedTotal,
			};
	}

	return initialCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		initialCartState
	);
	const addItemToCart = (item) => {
		dispatchCartAction({ type: 'ADD_CART_ITEM', item: item });
	};

	const removeItemFromCart = (id) => {
		dispatchCartAction({ type: 'REMOVE_CART_ITEM', id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCart,
		renoveItem: removeItemFromCart,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
