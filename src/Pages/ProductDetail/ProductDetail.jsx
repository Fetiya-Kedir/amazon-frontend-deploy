import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../components/Api/endPonit';
import ProductList from '../../components/Product/ProductList';
import Loader from '../../components/Loader/Loader';

function ProductDetail() {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const { productId } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${productUrl}/products/${productId}`)
			.then((res) => {
				setProduct(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [productId]);

	return (
		<Layout>
			{loading ? (
				<Loader />
			) : (
				<ProductList
					product={product}
					flex={true}
					renderDesc={true}
					renderAdd={true}
				/>
			)}
		</Layout>
	);
}

export default ProductDetail;
