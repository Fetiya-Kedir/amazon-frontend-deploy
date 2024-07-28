import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Dataproducer/DataProducer';

const ProtectedRoute = ({ children, msg, redirect }) => {
	const navigate = useNavigate();
	const [{ user }] = useContext(DataContext); // Removed dispatch as it is not used

	useEffect(() => {
		if (!user) {
			navigate('/auth', { state: { msg, redirect } });
		}
	}, [user, navigate, msg, redirect]); // Added necessary dependencies

	return children;
};

export default ProtectedRoute;
