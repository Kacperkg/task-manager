import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTasks, addTask, updateTask, deleteTask } from '../../api/taskApi'

// Task has a Id, title and completion status
interface Task {
  id: number
  title: string
  completed: boolean
}

// TaskState is a type of array of Tasks, loading status and error messege as a string if any else null
interface TasksState {
  items: Task[]
  loading: boolean
  error: string | null
}

// Initially empty array, loading is false and no errors
const initialState: TasksState = {
  items: [],
  loading: false,
  error: null
}

export const getTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const response = await fetchTasks()
  return response.data
})

export const createTask = createAsyncThunk(
  'tasks/create',
  async (title: string) => {
    const response = await addTask({ title, completed: false })
    return response.data
  }
)

export const toggleTask = createAsyncThunk(
  'tasks/toggle',
  async (task: Task) => {
    const updated = { ...task, completed: !task.completed }
    const response = await updateTask(task.id, updated)
    return response.data
  }
)

export const removeTask = createAsyncThunk(
  'tasks/delete',
  async (id: number) => {
    await deleteTask(id)
    return id
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        )
        state.items[index] = action.payload
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload)
      })
  }
})

export default tasksSlice.reducer
