import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	redirect,
} from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Payment from './Pages/Payment/Payment';
import Order from './Pages/Order/Order';
import Cart from './Pages/Cart/Cart';
import Result from './Pages/Result/Result';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Auth from './Pages/Auth/Auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
function Routering() {
	const stripePromise = loadStripe(
		'pk_test_51PfKzzAygxCQrlD9dIXAlk2lBDajjfxFNR8hc491mTybk7x5Fq6olFo8pnqXjJVD8AXTXqS1sukGsA3XSnPW0Dj500T6HNwBeb'
	);
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/auth" element={<Auth />} />
				<Route
					path="/payments"
					element={
						<ProtectedRoute
							msg={'You must Login to Pay!🙂'}
							redirect={'/payments'}
						>
							<Elements stripe={stripePromise}>
								<Payment />
							</Elements>
						</ProtectedRoute>
					}
				/>

				<Route
					path="/order"
					element={
						<ProtectedRoute
							msg={'You must Login to access your Order!🙂'}
							redirect={'/order'}
						>
							<Elements stripe={stripePromise}>
								<Order />
							</Elements>
						</ProtectedRoute>
					}
				/>
				<Route path="/category/:categoryName" element={<Result />} />
				<Route path="/products/:productId" element={<ProductDetail />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</Router>
	);
}

export default Routering;
