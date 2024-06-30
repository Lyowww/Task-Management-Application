import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../redux/taskSlice';
import ListCard from './ListCard';
import './tasklist.scss';

const TaskList = () => {
    const auth = useSelector((state) => state.auth);
    const tasks = useSelector((state) => state.task);

    const { currentUser } = auth;
    const { AllTasks } = tasks;

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser && currentUser.token) {
            dispatch(getAllTasks(currentUser.id));
        }
    }, [dispatch, currentUser]);

    return (
        <div>
            <ul className='list-header'>
                <li>
                    <h5>Id</h5>
                </li>
                <li>
                    <h5>Issue Name</h5>
                </li>
                <li>
                    <h5>Status</h5>
                </li>
                <li>
                    <h5>Action</h5>
                </li>
            </ul>
            {Array.isArray(AllTasks) && AllTasks.length > 0 ? (
                AllTasks.map((item) => (
                    <ListCard key={item._id} item={item} />
                ))
            ) : (
                <p style={{textAlign:"center", color: "white", marginTop: "5%"}}>No tasks found</p>
            )}
        </div>
    );
};

export default TaskList;
