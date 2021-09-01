import React, { Fragment, useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [isCheckout, setIsCheckout] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const RemoveHandler = (id) => {
		cartCtx.renoveItem(id);
	};

	const addHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const sendCartItems = async (cart) => {
		setIsSubmitting(true);
		try {
			const response = await fetch(
				'https://hopeful-b618d.firebaseio.com/orders/json',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						orders: cart,
						orderedItems: cartCtx.items,
					}),
				}
			);
			if (!response.ok) {
				throw new Error('Something went wrong');
			}
		} catch (err) {
			setError(err.message);
		}

		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
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

	const cartModal = (
		<Fragment>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onSubmitCart={sendCartItems} onClose={props.onClose} />
			)}
			{!isCheckout && modalItems}
		</Fragment>
	);

	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<div className={styles.actions}>
				<button className={styles.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	const errorModal = (
		<React.Fragment>
			<p className={styles.error}>Failed to submit cart </p>
			<div className={styles.actions}>
				<button className={styles.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	const subMittingModal = <p>Submitting.....</p>;

	return (
		<Modal onClose={props.onClose}>
			{error && errorModal}
			{!error && !isSubmitting && !didSubmit && cartModal}
			{!error && isSubmitting && subMittingModal}
			{!error && !isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
