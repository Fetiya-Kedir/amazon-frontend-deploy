import React, { useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { SlLocationPin } from 'react-icons/sl';
import { BiCart } from 'react-icons/bi';
import classes from './header.module.css';
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { DataContext } from '../Dataproducer/DataProducer';
import {auth} from '../../Utility/firebase'

function Header() {
	const [{ user, basket }, dispatch] = useContext(DataContext);
	const totalamount = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);

	return (
		<section className={classes.fixed}>
			<section>
				<div className={classes.header_container}>
					<div className={classes.logo_contaniner}>
						{/* {logo} */}
						<Link to="/">
							<img
								src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
								alt="amazonlog"
							/>
						</Link>
					</div>
					{/* {delivery} */}
					<div className={classes.delivery_contanier}>
						<span>
							<SlLocationPin />
						</span>
						<div>
							<p>Delivered to</p>
							<span>Ethiopia</span>
						</div>
					</div>
					{/* {search} */}
					<div className={classes.search_contanier}>
						<select name="" id="">
							<option value="">All</option>
						</select>
						<input type="text" name="" id="" placeholder="Search Product" />
						<BsSearch size={17} />
					</div>

					{/* {rigth side link} */}
					<div className={classes.order_contanier}>
						<Link to="" className={classes.language}>
							<img
								src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
								alt=""
							/>
							<select name="" id="">
								<option value="">EN</option>
							</select>
						</Link>
						<Link to={!user && '/auth'}>
							<div>
								{user ? (
									<>
										<p>Hello {user?.email?.split('@')[0]}</p>
										<span onClick={() => auth.signOut()}>Sign Out</span>
									</>
								) : (
									<>
										<p>Hello, Sign In</p>
										<span>Account&List</span>
									</>
								)}
							</div>
						</Link>
						{/* {orders} */}
						<Link to="/order">
							<p>returns</p>
							<span>&Orders</span>
						</Link>
						{/* {cart} */}
						<Link to="/cart" className={classes.cart}>
							<BiCart size={35} />
							<span>{totalamount}</span>
						</Link>
					</div>
				</div>
			</section>
			<LowerHeader />
		</section>
	);
}

export default Header;
