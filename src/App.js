// import React from 'react';
import { useState, useEffect } from "react"
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

// function syntax
function App() {
  const [fetching, setFetching] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  // useEffect requires a synchronous function
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
      setFetching(false);
    };
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    return await res.json();
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });

    setTasks(tasks.filter(task => task.id !== id));
  }

  const toggleReminderTask = async (id) => {
    const talkToToggle = tasks.find(task => task.id === id);

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reminder: !talkToToggle.reminder }),
    });
    const toggledTask = await res.json();

    setTasks(tasks.map(task => task.id === id ? toggledTask : task));
  }

  const toggleShowAdd = () => {
    setShowAdd(!showAdd);
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();

    setTasks([...tasks, newTask]);
  }

  return (
    <div className='container'>
      <Header title='Task Tracker' showAdd={showAdd} onToggleShowAdd={toggleShowAdd} />
      {showAdd && <AddTask onAdd={addTask} />}
      {fetching
        ? 'Loading tasks...'
        : tasks.length > 0
        ? <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleReminderTask} />
        : 'No tasks. Add one!'
      }
    </div>
  );
}

// class syntax
// class App extends React.Component {
//   render() {
//     return <Header />
//   }
// }

export default App;
