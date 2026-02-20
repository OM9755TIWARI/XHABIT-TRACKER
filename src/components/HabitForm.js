import React, { useState, useEffect } from "react";

function HabitForm({
  addHabit,
  updateHabit,
  editHabit,
  closeForm,
  show,
}) {

  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const [reading, setReading] = useState(false);
  const [exercise, setExercise] = useState(false);
  const [meditation, setMeditation] = useState(false);

  // Load edit data
  useEffect(() => {
    if (editHabit) {
      setDate(editHabit.date);
      setDesc(editHabit.description);
      setReading(editHabit.reading);
      setExercise(editHabit.exercise);
      setMeditation(editHabit.meditation);
    }
  }, [editHabit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const habitData = {
      id: editHabit ? editHabit.id : Date.now(),
      date,
      description: desc,
      reading,
      exercise,
      meditation,
    };

    if (editHabit) {
      updateHabit(habitData);
    } else {
      addHabit(habitData);
    }

    closeForm();
  };

  return (
   <div className={`modal ${show ? "show" : "hide"}`}>

      <h2>Update Today's Progress</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter a short description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <div className="checks">
          <label>
            <input
              type="checkbox"
              name="reading"
              checked={reading}
              onChange={() => setReading(!reading)}
            />
            Reading
          </label>

          <label>
            <input
              type="checkbox"
              name="exercise"
              checked={exercise}
              onChange={() => setExercise(!exercise)}
            />
            Exercise
          </label>

          <label>
            <input
              type="checkbox"
              name="meditation"
              checked={meditation}
              onChange={() => setMeditation(!meditation)}
            />
            Meditation
          </label>
        </div>

        <button type="submit">
          {editHabit ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default HabitForm;
