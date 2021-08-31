import styles from './Checkout.module.css';

const Checkout = (props) => {
	return (
		<form>
			<div className={styles.control}>
				<lable htmlFor="name">Your name</lable>
				<input type="text" id="name" />
			</div>
			<div className={styles.control}>
				<lable htmlFor="street">Street</lable>
				<input type="text" id="street" />
			</div>
			<div className={styles.control}>
				<lable htmlFor="code">Postal Code</lable>
				<input type="text" id="code" />
			</div>
			<div className={styles.control}>
				<lable htmlFor="city">City</lable>
				<input type="text" id="city" />
			</div>
			<button type="button" onClick={props.onClose}>
				Close
			</button>
			<button>Confrm</button>
		</form>
	);
};

export default Checkout;
