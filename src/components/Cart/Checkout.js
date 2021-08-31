import { useRef, useReducer } from 'react';
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const loginReducer = (state, action) => {
	switch (action.type) {
		case 'CHECKOUT':
			return {
				name: !isEmpty(action.values.nameInput),
				street: !isEmpty(action.values.streetInput),
				postalCode: isFiveChars(action.values.postalCodeInput),
				city: !isEmpty(action.values.cityInput),
			};
		default:
			break;
	}
	return state;
};

const initialState = {
	name: true,
	street: true,
	postalCode: true,
	city: true,
};

const Checkout = (props) => {
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();
	const [state, dispatch] = useReducer(loginReducer, initialState);

	const { name, street, postalCode, city } = state;

	const formIsValid = name && street && postalCode && city;
	const confirmHandler = (event) => {
		event.preventDefault();

		const nameInput = nameInputRef.current.value;
		const streetInput = streetInputRef.current.value;
		const postalCodeInput = postalCodeInputRef.current.value;
		const cityInput = cityInputRef.current.value;
		dispatch({
			type: 'CHECKOUT',
			values: { nameInput, streetInput, postalCodeInput, cityInput },
		});

		if (!formIsValid) {
			return;
		}
	};

	const nameClasses = `${styles.form} ${name ? '' : styles.invalid}`;
	const streetClasses = `${styles.form} ${street ? '' : styles.invalid}`;
	const postalClasses = `${styles.form} ${postalCode ? '' : styles.invalid}`;
	const cityClasses = `${styles.form} ${city ? '' : styles.invalid}`;

	return (
		<form className={nameClasses} onSubmit={confirmHandler}>
			<div className={styles.control}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!name && <p>Please enter a valid name</p>}
			</div>
			<div className={streetClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!street && <p>Please enter a valid street</p>}
			</div>
			<div className={postalClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeInputRef} />
				{!postalCode && <p>Please enter a valid postalCode</p>}
			</div>
			<div className={cityClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!nacityme && <p>Please enter a valid city</p>}
			</div>
			<div className={styles.actions}>
				<button type="button" onClick={props.onClose}>
					Cancel
				</button>
				<button className={styles.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
