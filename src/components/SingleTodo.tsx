import React, {useState, useRef, useEffect} from 'react'
import {Todo} from '../model'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import "./styles.css"



type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props>= ({todo, todos, setTodos}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleDone = (id:number) => {
    setTodos(todos.map((t) => t.id === id ? {...todo, isDone:!todo.isDone} : t))}

  const handleDelete = (id:number) => {
      setTodos(todos.filter((t) => t.id !== id ))
  }

  const handleSubmit = (e:React.FormEvent, id:number) => {
    e.preventDefault()
    setTodos(todos.map((t) => t.id === id ? {...t, todo: editTodo} : t))
    setEdit(false)
  }
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
      inputRef.current?.focus()
   }, [edit])
  
  return (
    <form className='todos_single' onSubmit={(e) => handleSubmit(e, todo.id)}>
      {edit ? (<input ref= {inputRef} value={editTodo} onChange={(e) => { setEditTodo(e.target.value)}} className="todos_single--text"/>): (
      todo.isDone ? (<s className="todos_single--text">{todo.todo}</s>) : (<span className="todos_single--text">{todo.todo}</span>))}
      
      <div>
        <span className="icon" onClick={() => {if(!edit && !todo.isDone) {
          setEdit(!edit)
        }}}><AiFillEdit/></span>
        <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete/></span>
        <span className="icon" onClick={() => handleDone(todo.id)}><MdDone/></span>
      </div>
    </form>
  )
}

export default SingleTodo
