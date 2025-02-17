'use client'; // rendering on client side

import { useState, useEffect } from 'react';

// declaring tha task attributes
type Task = {
    id: number;
    activity: string;
    price: number;
    type: 
      'education' | 
      'recreational' | 
      'social' | 
      'diy' |
      'charity' |
      'cooking' |
      'relaxation' |
      'music' | 
      'busywork' ;
    bookingRequired: boolean;
    accessibility: number;
};

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]); // initialize the task with an empty array
  const [activity, setActivity] = useState(''); // initilize the activity with an empty string
  const [price, setPrice] = useState<number>(0); // initialize and ensure the price is a number
  const [type, setType] = useState<
        'education' | 'recreational' | 'social' | 
        'diy' | 'charity' |'cooking' |
        'relaxation' | 'music' | 'busywork'>('education'); // initiliaze the variable with educational and limited to this options only
  const [bookingRequired, setBookingRequired] = useState(false); // initialize the state as unchecked
  const [accessibility, setAccessibility] = useState(0.5); // initialize the slider to 0.5

  // load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (activity.trim() === '') return; // exits the add function if the activity name is not entered
    const newTask: Task = {
      id: Date.now(),
      activity,
      price,
      type,
      bookingRequired,
      accessibility,
    };

    setTasks([...tasks, newTask]); // append new task to the array of tasks
    setActivity(''); // reset to default values
    setPrice(0); // reset to default values
    setType('education'); // reset to default values
    setBookingRequired(false); // reset to default values
    setAccessibility(0.5); // reset to default values
  };

  // delete the task with matching id
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>
      <p className="mb-4">Total Items: {tasks.length}</p>
      <div className="flex flex-col gap-2 mb-4">
        Activity: <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="eg: Running" />
        Price: <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        Type: <select value={type} onChange={(e) => setType(e.target.value as Task['type'])}>
            <option value="education">Education</option>
            <option value="recreational">Recreational</option>
            <option value="social">Social</option>
            <option value="diy">Diy</option>
            <option value="charity">Charity</option>
            <option value="cooking">Cooking</option>
            <option value="relaxation">Relaxation</option>
            <option value="music">Music</option>
            <option value="busywork">Busywork</option>
        </select>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={bookingRequired} onChange={(e) => setBookingRequired(e.target.checked)} />
          Booking Required
        </label>
        <label>
          Accessibility 
          <input type="range" min="0" max="1" step="0.1" value={accessibility} onChange={(e) => setAccessibility(Number(e.target.value))} />
        </label>
        <button onClick={addTask} className="p-2 text-blue-950 bg-slate-400">Add</button>
      </div>
      <div> 
        <ul className="list-none p-0">
        {tasks.map((task) => (
            <li key={task.id} className="mb-2 p-3 border rounded-lg shadow-md">
            <p><strong>Activity:</strong> {task.activity}</p>
            <p><strong>Price:</strong> ${task.price}</p>
            <p><strong>Type:</strong> {task.type}</p>
            <p><strong>Booking Required:</strong> {task.bookingRequired ? 'Yes' : 'No'}</p>
            <p><strong>Accessibility:</strong> {task.accessibility.toFixed(1)}</p>
            <button onClick={() => deleteTask(task.id)} className="p-2 text-red-500">
                Delete
            </button>
            </li>
        ))}
        </ul>
      </div>
    </div>
  );
}