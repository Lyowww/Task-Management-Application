import './Sidebar.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;

	return (
		<div>
			<ul className='sidebar'>
				<li className='list-item'>
					<h5>{currentUser.username}</h5>
				</li>
				<li className='list-item2'>
					<Link to='/dashboard'>Dashboard</Link>
				</li>
				<li className='list-item2'>
					<Link to='/taskmanager'>Tasks</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
