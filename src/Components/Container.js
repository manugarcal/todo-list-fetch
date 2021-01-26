import { useEffect, useRef, useState } from "react"
import CreateUser from "./CreateUser"
import DeleteAll from "./DeleteAll"
import Header from "./Header"
import InputTask from "./InputTask"
import TaskList from "./TaskList"


const Container = () => {
    
    
    const [urlApi] = useState("https://assets.breatheco.de/apis/fake/todos/user/manugarcal");

    useEffect(() => {
        getTask(urlApi)
    }, []);
//fetch metodo get//
   const getTask = url => {
       
       fetch(url)
       .then(Response => Response.json())
       .then(data => console.log(data))
       .catch(error => console.log(error))
   };
//fetch metodo post//
   const getUser = url => {
       fetch(url, {
           method: 'POST',
           body: JSON.stringify([]),
           headers: {
               'Content-Type': 'application/json'
           }
       })
       .then(Response => Response.json())
       .then(data => console.log(data.result))
       .catch(error => console.log(error));
   };
//fetch metodo put //
   const [task, setTask] = useState([]);
   const updateTask = (url, task) => {

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'content-type': 'application/json'
      }
    }).then (response => response.json()
    ).then (data => console.log(data)
    ).catch(error => console.log(error))

  }

  const dltAll = urlApi => {
    fetch(urlApi, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      }).then (response => response.json()
      ).then (data => console.log(data)
      ).catch(error => console.log(error))
  }


    let inputRef = useRef(null);
    let emptyLiRef = useRef(null);

    const [items, setItems] = useState([]);
    const newItem = (e) => {
        if (inputRef.value !== "" && e.keyCode === 13) {
            setItems(items.concat(inputRef.value));
            let newTask = [...task, {label:inputRef.value, done: false}]
            setTask(newTask)
            updateTask(urlApi, newTask)
            inputRef.value = "";
            emptyLiRef.current.className = "newClass"
        } else if (inputRef.value !== "" && e.type === "click") {
            setItems(items.concat(inputRef.value));
            let newTask = [...task, {label:inputRef.value, done: false}]
            setTask(newTask)
            updateTask(urlApi, newTask)
            inputRef.value = "";
            emptyLiRef.current.className = "newClass"
            
        }
        
    }
    const iref = (r) => {
        inputRef = r
    }

    const dlt = (i) => {
        items.splice(i, 1);
        setItems([...items]);
        task.splice(i, 1);
        setTask([...task]);
        updateTask(urlApi, task);
    }

    

    const deleteAll = () => {
        setItems([]);
        setTask([]);
        dltAll(urlApi);
    }

    const liGenerator = items.map((newValue, i) => {
        return <li key={i} className="list-group-item list-group-item-action list-group-item-success">{newValue}<i onClick={() => dlt(i)} className="float-right fas fa-trash"></i></li>
    })
    const emptyLi = <li ref={emptyLiRef} className="list-group-item list-group-item-action list-group-item-danger">No task</li>

    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className="container card w-75 mt-3">
            <Header  />
            <CreateUser getUser={() =>getUser(urlApi)}   />
    
            <InputTask handleSubmit={handleSubmit} newItem={newItem} item={items} iRef={iref} inputRef={inputRef} />
            <TaskList emptyLi={emptyLi} liGenerator={liGenerator} />
            <DeleteAll deleteAll={deleteAll} />
        </div>
    )
}
export default Container;