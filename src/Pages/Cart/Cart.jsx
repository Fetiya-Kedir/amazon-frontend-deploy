import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/Dataproducer/DataProducer";
import ProductList from "../../components/Product/ProductList";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from './cart.module.css'
import { Type } from "../../Utility/action.type";
import { BsChevronDoubleDown } from 'react-icons/bs';
import { BsChevronDoubleUp } from 'react-icons/bs';

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price *item.amount + amount
  }, 0)

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }
  return (
		<Layout>
			<section className={classes.container}>
				<div className={classes.cart_contanier}>
					<h2>Hello</h2>
					<h3>Your Shopping Basket</h3>
					<hr></hr>
					{basket?.length == 0 ? (
						<p>Oops😮 ! No item in the cart</p>
					) : (
						basket?.map((item, index) => {
							return (
								<section className={classes.cart_proudect}>
									<ProductList
										product={item}
										renderDesc={true}
										flex={true}
										renderAdd={false}
										key={index}
									/>

									<div className={classes.btn_contanier}>
										<button
											className={classes.btn}
											onClick={() => increment(item)}
										>
											{' '}
											<BsChevronDoubleUp size={20} />{' '}
										</button>
										<span>{item.amount}</span>
										<button
											className={classes.btn}
											onClick={() => decrement(item.id)}
										>
											<BsChevronDoubleDown size={20} />
										</button>
									</div>
								</section>
							);
						})
					)}
				</div>

				{basket?.length !== 0 && (
					<div className={classes.subtotal}>
						<div>
							<p>subtotal ({basket?.length} item) </p>
							<CurrencyFormat amount={total} />
						</div>
						<span>
							<input type="checkbox" />
							<small>This order contains a gift</small>
						</span>
						<button className={classes.checkout_button}>
							<Link to="/payments">Continue the Checkout</Link>
						</button>
					</div>
				)}
			</section>
		</Layout>
	);
}

export default Cart;
