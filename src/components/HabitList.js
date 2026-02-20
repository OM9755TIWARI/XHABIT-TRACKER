import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function HabitList({ habits, deleteHabit, startEdit }) {
  return (
    <div className="list">
      <h2>Recent Habit Completions</h2>

      {habits.length === 0 && <p>No data yet</p>}

      {habits.map((h) => (
        <div key={h.id} className="card">
          <p>
            <strong>Date:</strong> {h.date}
          </p>

          <p>{h.description}</p>

          <p>
            {h.reading && "📖 Reading "}
            {h.exercise && "🏃 Exercise "}
            {h.meditation && "🧘 Meditation"}
          </p>

          <div className="card-actions">
            <button
              className="edit-btn"
              onClick={() => startEdit(h)}
            >
              <FaEdit /> Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteHabit(h.id)}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HabitList;
