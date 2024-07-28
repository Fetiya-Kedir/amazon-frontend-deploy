import React, { useState, useContext } from 'react';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import classes from './signup.module.css';
import { auth } from '../../Utility/firebase';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { DataContext } from '../../components/Dataproducer/DataProducer';
import { Type } from '../../Utility/action.type';
import { ClipLoader } from 'react-spinners';

function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState({
		signIn: false,
		signUp: false,
	});
	const [{ user }, dispatch] = useContext(DataContext);
	const navigate = useNavigate();
	const navStateData = useLocation();
	console.log(navStateData);

	// console.log(user);

	const authHandler = async (e) => {
		e.preventDefault();
		if (e.target.name == 'signin') {
			setLoading({ ...loading, signIn: true });
			signInWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setLoading({ ...loading, signIn: false });
					navigate(navStateData?.state?.redirect ||'/');
				})
				.catch((err) => {
					setError(err.message);
					setLoading({ ...loading, signIn: false });
				});
		} else {
			setLoading({ ...loading, signUp: true });
			createUserWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setLoading({ ...loading, signUp: false });
					navigate(navStateData?.state?.redirect || '/');
				})
				.catch((err) => {
					setError(err.message);
					setLoading({ ...loading, signUp: false });
				});
		}
	};

	return (
		<section className={classes.login}>
			{/* logo */}
			<Link to="/">
				<img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" />
			</Link>
			{/* form */}
			<div className={classes.login_container}>
				<h1>Sign In</h1>
				{navStateData?.state?.msg && (
					<small
						style={{
							padding: '5px',
							textAlign: 'center',
							color: 'red',
							fontWeight: 'bold',
						}}
					>
						{navStateData.state.msg}
					</small>
				)}
				<form action="">
					<div>
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
						/>
					</div>
					<button
						type="submit"
						name="signin"
						onClick={authHandler}
						className={classes.login_signInButton}
					>
						{loading.signIn ? <ClipLoader color="#000" size={15} /> : 'Sign In'}
					</button>
				</form>
				{/* /agreement */}
				<p>
					By signing-in, you agree to the <strong>AMAZON FAKE CLONE</strong>{' '}
					Condition of Use and Sale. Please see our Privacy Notice, our Cookies
					Notice, and our Interest-Based Ads Notice.
				</p>
				{/* create account button */}
				<p>New to Amazon?</p>
				<button
					type="submit"
					name="signup"
					onClick={authHandler}
					className={classes.login_registerButton}
				>
					{loading.signUp ? (
						<ClipLoader color="#000" size={15} />
					) : (
						'Create your Amazon Account'
					)}
				</button>
				{error && (
					<small style={{ paddingTop: '5px', color: 'red' }}>{error}</small>
				)}
			</div>
		</section>
	);
}

export default Auth;
