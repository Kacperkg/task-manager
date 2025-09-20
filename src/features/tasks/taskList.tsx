import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getTasks, toggleTask, removeTask } from './tasksSlice'

export default function TaskList() {
  const { items, loading } = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  if (loading) return <p className="text-white">Loading...</p>

  return (
    <ul className="space-y-2">
      {items.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between rounded-lg bg-zinc-700 p-3"
        >
          <span
            className={`flex-1 cursor-pointer ${
              task.completed ? 'text-gray-400 line-through' : 'text-white'
            }`}
            onClick={() => dispatch(toggleTask(task))}
          >
            {task.title}
          </span>
          <button
            onClick={() => dispatch(removeTask(task.id))}
            className="ml-2 p-1 text-red-400 hover:text-red-300 focus:outline-none"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  )
}
