import './App.css';
import { useState } from "react";

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');
  const [deletedTodos, setDeletedTodos] = useState([]);
  const currentDayOfWeek = new Date().toLocaleString("default", {
    weekday: "long",
  });

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
            setTodos([
              ...toDos, {
                id: Date.now(),
                text: toDo,
                status: false
              }
            ]);
            setTodo(""); // Clear input field
          }}
          className="fas fa-plus" title="Add"></i>
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
                      setDeletedTodos([...deletedTodos, obj]); 
                      setTodos(toDos.filter((todo) => todo.id !== obj.id));
                    }}
                    className="fas fa-times" style={{color:'red'}} title="Delete"></i>

                </div>
              </div>
            );
          })
        }

      </div>
      <div className="deleted-todos">
        <h3 style={{color:'red', marginTop: 30}}>Removed Todos:</h3>
        {
          deletedTodos.map((obj) => {
            return (
              <div key={obj.id} className="deleted-todo">
                <p>{obj.text}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
