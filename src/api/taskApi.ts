import axios from 'axios'

const API_URL = 'http://localhost:4000/tasks'

export const fetchTasks = () => axios.get(API_URL)

// Input of Task ( task has a title and completed status) and returns a post to the api url with that task
export const addTask = (task: { title: string; completed: boolean }) =>
  axios.post(API_URL, task)

// Input of Task Id with input of said Task and returns a update to the api url/ ID of task and passes the task changes
export const updateTask = (
  id: number,
  task: { title: string; completed: boolean }
) => axios.put(`${API_URL}/${id}`, task)

// Input of Task id and returns a deletion of api url/ ID of task to be deleted
export const deleteTask = (id: number) => axios.delete(`${API_URL}/${id}`)
