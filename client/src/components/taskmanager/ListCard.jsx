import './listcard.scss';
import { arrowClick, deleteItem } from '../../redux/taskSlice';
import { useDispatch } from 'react-redux';
import chevronLeft from '../../images/chevron_left.png';
import chevronRight from '../../images/chevron_right.png';
import trash from '../../images/trash.svg'

const ListCard = (items) => {
	const { item } = items;

	const dispatch = useDispatch();

	const ArrowClick = (string) => {
		dispatch(arrowClick(item, string));
	};
	const handleDelete = () => {
		dispatch(deleteItem(item._id));
	};

	return (
		<div>
			<ul className={` ${item.status === 'done' ? 'completed menu' : 'menu'}`}
				>
				<li>
					<p>{item._id}</p>
				</li>
				<li>
					<p>{item.task}</p>
				</li>
				<li>
					<p>{item.status}</p>
				</li>
				<li style={{display: "flex"}}>
					<div
						className='action'
						onClick={() => ArrowClick('left')}
					>
						<img src={chevronLeft} width={20} />
					</div>
					<div
						className='action'
						onClick={() => ArrowClick('right')}
					>
						<img src={chevronRight} width={20} />
					</div>
					<div onClick={handleDelete} className='action'>
					<img src={trash} width={20} />
					</div>
				</li>
			</ul>
		</div>
	);
};

export default ListCard;
