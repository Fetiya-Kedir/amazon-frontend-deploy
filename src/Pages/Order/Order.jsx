import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import classes from './order.module.css';
import { db } from '../../Utility/firebase';
import { DataContext } from '../../components/Dataproducer/DataProducer';
import ProductList from '../../components/Product/ProductList';
import {
	collection,
	doc,
	orderBy,
	onSnapshot,
	query,
} from 'firebase/firestore';

function Order() {
	const [{ user }] = useContext(DataContext);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			const ordersRef = collection(db, 'users', user.uid, 'orders');
			const ordersQuery = query(ordersRef, orderBy('created', 'desc'));

			const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
				setOrders(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});

			return () => unsubscribe();
		} else {
			setOrders([]);
		}
	}, [user]);

	return (
		<Layout>
			<section className={classes.container}>
				<div className={classes.orders_container}>
					<h2>Your Orders</h2>
					<div>
						{orders?.length === 0 && (
							<div style={{ padding: '20px' }}>You don't have orders yet😒.</div>
						)}
						{orders?.map((eachOrder, i) => {
							return (
								<div key={i} className={classes.order}>
									<p className={classes.order_id}>Order ID: {eachOrder?.id}</p>
									<hr />
									{eachOrder?.data?.basket?.map((order) => {
										return (
											<div key={order.id} className={classes.product_list}>
												<ProductList flex={true} product={order} />
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default Order;
