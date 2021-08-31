import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [isCheckout, setIsCheckout] = useState(false);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const RemoveHandler = (id) => {
		cartCtx.renoveItem(id);
	};

	const addHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const orderHandler = () => {
		setIsCheckout(true);
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

	const modalItems = (
		<div className={styles.actions}>
			<button className={styles['button--alt']} onClick={props.onClose}>
				Close
			</button>
			{hasCartItems && <button onClick={orderHandler}>Order</button>}
		</div>
	);
	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && <Checkout onClose={props.onClose} />}
			{!isCheckout && modalItems}
		</Modal>
	);
};

export default Cart;
