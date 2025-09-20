import { Provider } from 'react-redux'
import { store } from 'utils/store'
import TaskForm from 'features/tasks/taskForm'
import TaskList from 'features/tasks/taskList'

function App() {
  return (
    <Provider store={store}>
      <div className="relative h-screen overflow-hidden bg-zinc-800">
        <h1 className="p-4 text-2xl font-bold text-white">Task Manager</h1>
        <div className="p-4">
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </Provider>
  )
}

export default App
