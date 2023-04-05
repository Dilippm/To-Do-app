import './App.css';
import { useState } from "react";

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');
 
  const currentDayOfWeek = new Date().toLocaleString(
    "default",
    { weekday: "long" }
  );

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDayOfWeek}🌝 ☕</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..." />
        <i
         onClick={() => {
          let toD = toDo.trim();
          if (!toD) {
            window.swal({
              title: "Sorry",
              text: "Please enter a valid input.",
              icon: "error",
              button: "Ok",
            });
            return;
          }
          if (toDos.some((todo) => todo.text === toD)) {
            window.swal({
              title: "Duplicate Item",
              text: "This item already exists in the list. Do you want to add it again?",
              icon: "warning",
              buttons: ["Cancel", "Add"],
            }).then((add) => {
              if (add) {
                setTodos([
                  ...toDos, {
                    id: Date.now(),
                    text: toDo,
                    status: false
                  }
                ]);
                setTodo(""); 
              }
            });
          } else {
            setTodos([
              ...toDos, {
                id: Date.now(),
                text: toDo,
                status: false
              }
            ]);
            setTodo(""); // Clear input field
          }
        }}
          className="fas fa-plus"
          title="Add"></i>
      </div>

      <div className="todos">
        {
          toDos.map((obj) => {
            return (
              <div key={obj.id} className="todo">
                <div className="left">
                  <button
                    className={obj.status
                      ? 'completed'
                      : 'incomplete'}
                    onClick={() => {
                      setTodos(toDos.map((todo) => {
                        if (todo.id === obj.id) {
                          todo.status = !obj.status;
                        }
                        return todo;
                      }));
                    }}>
                    {obj.text}
                  </button>

                </div>
                <div className="right">
                  <i
                   onClick={() => {
                   
                    window.swal({
                      title: 'Are you sure?',
                      text: 'Do you want to delete this item?',
                      icon: 'warning',
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                     
                      if (willDelete) {
                        setTodos(toDos.filter((todo) => todo.id !== obj.id));
                        window.swal('Deleted!', 'Item has been deleted.', 'success');
                      } 
                    });
                  }}
                  
                  
                  
                    className="fas fa-times"
                    style={{
                      color: 'red'
                    }}
                    title="Delete"></i>

                </div>
              </div>
            );
          })
        }

      </div>
   
    </div>
  );
}

export default App;
