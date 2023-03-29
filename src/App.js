import './App.css';
import { useState } from "react";

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const currentDayOfWeek = daysOfWeek[new Date().getDay()];

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
          onClick={() => setTodos([
            ...toDos, {
              id: Date.now(),
              text: toDo,
              status: false
            }
          ])
          }
          className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {
          toDos.map((obj) => {
            return (
              <div key={obj.id} className="todo">
                <div className="left">
                  <input
                    onChange={(e) => {
                      setTodos(toDos.map((todo) => {
                        if (todo.id === obj.id) {
                          todo.status = e.target.checked;
                        }
                        return todo;
                      }));
                    }}
                    value={obj.status}
                    type="checkbox"
                    name="" 
                    id="" />
                  <p>{obj.text}</p>
                </div>
                <div className="right">
                  <i
                    onClick={() => setTodos(toDos.filter((todo) => todo.id !== obj.id))}
                    className="fas fa-times"></i>
                </div>
              </div>
            );
          })
        }
        {
          toDos.map((obj) => {
            if (obj.status) {
              return <h1 key={obj.id}>{obj.text}</h1>;
            }
            return null;
          })
        }
      </div>
    </div>
  );
}

export default App;
