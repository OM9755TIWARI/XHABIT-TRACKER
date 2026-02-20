import "./App.css";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Charts from "./components/Charts";
import { useState, useEffect } from "react";

function App() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // For Edit
  const [editHabit, setEditHabit] = useState(null);

  // Load from storage
  useEffect(() => {
    const data = localStorage.getItem("habits");
    if (data) {
      setHabits(JSON.parse(data));
    }
  }, []);

  // Save to storage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Add new
  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  // Update
  const updateHabit = (updated) => {
    const newList = habits.map((h) =>
      h.id === updated.id ? updated : h
    );

    setHabits(newList);
    setEditHabit(null);
  };

  // Delete
  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  // Edit handler
  const startEdit = (habit) => {
    setEditHabit(habit);
    setShowForm(true);
  };

  return (
    <div className="container">
      <h1>Habit Tracker</h1>

      <button
        className="add-btn"
        onClick={() => {
          setEditHabit(null);
          setShowForm(true);
        }}
      >
        + Add data
      </button>

      {showForm && (
        <HabitForm
          addHabit={addHabit}
          updateHabit={updateHabit}
          editHabit={editHabit}
          closeForm={() => setShowForm(false)}
        />
      )}

      <Charts habits={habits} />

      <HabitList
        habits={habits}
        deleteHabit={deleteHabit}
        startEdit={startEdit}
      />
    </div>
  );
}

export default App;
