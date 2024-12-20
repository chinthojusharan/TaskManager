import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import{ v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";




function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const toggleFinished = (e)=>{
    setshowFinished(!showFinished)
  }


  const handleEdit=(e,id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS();
  }


  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS();

  }


  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4() ,todo, isCompleted: false}])
    setTodo("")
    saveToLS();

  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }


  const handleCheckbox=(e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id==id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS();

  }
  
  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-slate-200 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-2xl">Task Manager - Manage Your todos at one place</h1>
        <div className="addTodo my-4 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} className="w-full rounded-lg px-5 py-2" type="text" />
            <button onClick={handleAdd} disabled={todo.length<=3} className="bg-slate-700 hover:bg-slate-900 disabled:bg-slate-300 text-white p-4 py-1  font-medium text-sm mx-2  rounded-lg">Save</button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} />Show Finished
        <div className="h-[1px] bg-black opacity-40 w-[90%] mx-auto m-3"></div>
        <h2 className="text-xl font-bold my-4">Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className="m-5">No todos to display</div>}
          {todos.map(item=>{

           return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">
            <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className="bg-slate-700 hover:bg-slate-900 text-white p-4 py-1 mx-1 text-sm font-medium rounded-lg"><CiEdit />
              </button>
              <button onClick={(e)=>handleDelete(e,item.id)} className="bg-slate-700 hover:bg-slate-900 text-white p-4 py-1 mx-1 text-sm font-medium rounded-lg"><MdDelete />
              </button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
