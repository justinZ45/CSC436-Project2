import Container from './Container';
import { NavLink as RouterLink } from 'react-router-dom';

const Header = () => {
	const getClassName = (props) => {
		return `${
			// eslint-disable-next-line react/prop-types
			props.isActive ? 'font-bold' : ''
		} hover:underline hover:text-gray-600 transition duration-300 `;
	};

	return (
		<Container>
			<nav className="flex gap-4 text-2xl">
				<RouterLink className={getClassName} to="/">
					Home
				</RouterLink>
				<RouterLink className={getClassName} to="/create">
					Create
				</RouterLink>
			</nav>
		</Container>
	);
};

export default Header;
