import React, { useContext, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import classes from './payment.module.css';
import { DataContext } from '../../components/Dataproducer/DataProducer';
import ProductList from '../../components/Product/ProductList';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
function Payment() {
	const [{ basket, user }, dispatch] = useContext(DataContext);

	// total items
	const totalamount = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);

	// total price
	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);

	const [cardError, setCardError] = useState(null);
	const [processing, setProcessing] = useState(false);

	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const handleChange = (e) => {
		e?.error?.message ? setCardError(e?.error?.message) : setCardError('');
	};

	const handlePayment = async (e) => {
		e.preventDefault();
		try {
			setProcessing(true);
			// 1. backend || function --> contact to the client secret
			const response = await axiosInstance({
				method: 'POST',
				url: `/payment/create?total=${total * 100}`,
			});
			const clientSecret = response.data?.clientSecret;

			// 2. client side (react side confirmation)
			const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});

			// 3. after confirmation --> order firestore database save and clear basket
			await setDoc(
				doc(collection(db, 'users'), user.uid, 'orders', paymentIntent.id),
				{
					basket: basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created,
				}
			);
			// empty the basket
			dispatch({ type: Type.EMPTY_BASKET });

			setProcessing(false);
			navigate('/order', { state: { msg: 'You have placed an order' } });
		} catch (error) {
			console.log(error);
			setProcessing(false);
		}
	};

	return (
		<Layout>
			{/* header */}
			<div className={classes.Payment_header}>
				Checkout ({totalamount}) items{' '}
			</div>
			{/* payment method */}
			<section className={classes.payment}>
				<div className={classes.flex}>
					<h3>Delivery address</h3>
					<div>
						<div>{user?.email}</div>
						<div>123 React Lane</div>
						<div>Chicago, IL</div>
					</div>
				</div>
				<hr />
				{/* product */}
				<div className={classes.flex}>
					<h3>Review items and Delivery</h3>
					<div>
						{basket?.map((item) => (
							<ProductList product={item} flex={true} key={item.id} />
						))}
					</div>
				</div>
				<hr />
				{/* card form */}
				<div className={classes.flex}>
					<h3>Payment Method</h3>
					<div className={classes.payment_card_container}>
						<div className={classes.payment_details}>
							<form onSubmit={handlePayment}>
								{/* errror */}
								{cardError && (
									<small style={{ color: 'red' }}>{cardError}</small>
								)}
								{/* card element */}
								<CardElement onChange={handleChange} />
								{/* price */}
								<div className={classes.payment_price}>
									<div>
										<span style={{ display: 'flex', gap: '10px' }}>
											Total Order | <CurrencyFormat amount={total} />
										</span>
									</div>
									<button type="submit">
										{processing ? (
											<div className={classes.loading}>
												<ClipLoader color="gray" size={12} />
												<p>Please wait ...</p>
											</div>
										) : (
											'Pay Now'
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default Payment;
