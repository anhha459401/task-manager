import { useState, useEffect } from "react";
import dayjs from "dayjs";

const STORAGE_KEY = "taskManagerData";

export const useTasks = (currentUser) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : {};
    setTasks(data[currentUser] || []);
  }, [currentUser]);

  const saveTasks = (newTasks) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : {};
    data[currentUser] = newTasks;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setTasks(newTasks);
  };

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      ...task,
      createdAt: dayjs().toISOString(),
    };
    saveTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    saveTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)));
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter((t) => t.id !== id));
  };

  const moveTask = (id, newStatus, newIndex) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const filtered = tasks.filter((t) => t.id !== id);
    const sameStatusTasks = filtered.filter((t) => t.status === newStatus);
    sameStatusTasks.splice(newIndex, 0, { ...task, status: newStatus });

    const otherTasks = filtered.filter((t) => t.status !== newStatus);
    saveTasks([...otherTasks, ...sameStatusTasks]);
  };

  return { tasks, addTask, updateTask, deleteTask, moveTask };
};
