import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initalTask = localStorage.getItem('task')
	? JSON.parse(localStorage.getItem('task'))
	: null;

const initialState = {
	TaskData: initalTask,
	AllTasks: {},
};

export const taskSlice = createSlice({
	name: 'Task',
	initialState,
	reducers: {
		taskAddedSuccessfully: (state, action) => {
			state.TaskData = action.payload;
		},
		taskAddFailure: (state) => {
			return state;
		},
		getAllTaskSuccess: (state, action) => {
			state.AllTasks = action.payload;
		},
		getAllTaskFailure: (state) => {
			return state;
		},
		editTaskSuccess: (state, action) => {
			state.TaskData = action.payload;
		},
		deleteSuccess: (state, action) => {
			state.TaskData = action.payload;
		},
		deletefail: (state) => {
			return state;
		},
	},
});

export const {
	taskAddFailure,
	taskAddedSuccessfully,
	getAllTaskFailure,
	getAllTaskSuccess,
	deleteSuccess,
	deletefail,
	editTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask = (task, id) => async (dispatch) => {
	const taskData = {
		task,
		id,
	};
	try {
		const response = await axios.post('http://localhost:4000/task/add', taskData);
		if (response.status === 201) {
			localStorage.setItem('task', JSON.stringify(response.data));
			dispatch(taskAddedSuccessfully(response.data));
			toast.success('Task added successfully');
			window.location.reload();
		} else {
			dispatch(taskAddFailure());
			toast.error('Failed to add task');
		}
	} catch (error) {
		dispatch(taskAddFailure());
		toast.error('Failed to add task');
	}
};

export const getAllTasks = (id) => async (dispatch) => {
	try {
		const response = await axios.get(`http://localhost:4000/task/tasks?id=${id}`);

		if (response.status === 200) {
			dispatch(getAllTaskSuccess(response.data));
		} else {
			dispatch(getAllTaskFailure());
			toast.error('Failed to fetch tasks');
		}
	} catch (error) {
		dispatch(getAllTaskFailure());
		toast.error('Failed to fetch tasks');
	}
};
export const arrowClick = (item, string) => async () => {
	let taskData = {
		id: item._id,
		status: item.status,
		string,
	};

	let response = await axios.put(
		`http://localhost:4000/task/${taskData.id}`,
		taskData
	);

	if (response) {
		window.location.reload();
	}

};

export const deleteItem = (id) => async (dispatch) => {
	let res = await axios.delete(`http://localhost:4000/task/${id}`);

	if (res) {
		dispatch(deleteSuccess());
		toast.success('task deleted successfully');

		window.location.reload();
	} else {
		dispatch(deletefail());
	}
};
