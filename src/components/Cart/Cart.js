import React, { useContext } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const RemoveHandler = (id) => {
		cartCtx.renoveItem(id);
	};

	const addHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItems = (
		<ul className={styles['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					amount={item.amount}
					price={item.price}
					name={item.name}
					onRemove={RemoveHandler.bind(null, item.id)}
					onAdd={addHandler.bind(null, item)}
				></CartItem>
			))}
		</ul>
	);

	const hasCartItems = cartCtx.items.length > 0;
	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button className={styles['button--alt']} onClick={props.onClose}>
					Close
				</button>
				{hasCartItems && <button>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
