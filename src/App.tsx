import React, { useEffect, useState } from "react"
import { DiaryFormProps, Entries, Visibility, Weather, newEntry } from "./types";
import { createDiary, getDiaries } from "./entryService";

const FormEntry: React.FC<DiaryFormProps> = ({addDiaryEntry}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>();
  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (date && visibility && weather && comment) {
      const entry: newEntry = {
        date,
        visibility,
        weather,
        comment
      };
      createDiary(entry).then(data => {
        addDiaryEntry(data as Entries);
      });
      setDate('');
      setComment('')
    }; 
  };
  
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <h1>Add a new entry</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="date">date: </label>
          <input
            type="date"
            onChange={handleDateChange}
          />
        </div>
        <label>visibility: </label>
        <div>
          great
          <input
            type="radio"
            name="visibility"
            value={Visibility.Great}
            onChange={handleVisibilityChange}
          />
          good
          <input
            type="radio"
            name="visibility"
            value={Visibility.Good}
            onChange={handleVisibilityChange}
          />
          ok
          <input
            type="radio"
            name="visibility"
            value={Visibility.Ok}
            onChange={handleVisibilityChange}
          />
          poor
          <input
            type="radio"
            name="visibility"
            value={Visibility.Poor}
            onChange={handleVisibilityChange}
          />
        </div>
        <label>weather: </label>
        <div>
          sunny
          <input
            type="radio"
            name="weather"
            value={Weather.Sunny}
            onChange={handleWeatherChange}
          />
          rainy
          <input
            type="radio"
            name="weather"
            value={Weather.Rainy}
            onChange={handleWeatherChange}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            value={Weather.Cloudy}
            onChange={handleWeatherChange}
          />
          stormy
          <input
            type="radio"
            name="weather"
            value={Weather.Stormy}
            onChange={handleWeatherChange}
          />
          windy
          <input
            type="radio"
            name="weather"
            value={Weather.Windy}
            onChange={handleWeatherChange}
          />
        </div>
        <label htmlFor="comment">comment: </label>
        <div>
          <input
            type="text"
            onChange={handleCommentChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

const PrintEntries = ({ entries }: { entries: Entries[] }) => {
  return (
    <div>
      <h1>Dairy entries</h1>
      <ul>
        {entries.map(diary =>
          <li key={diary.id}>
            <h4>{diary.date}</h4>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </li>
        )}
      </ul>
    </div>
  );
};

function App() {
  const [entries, setEntries] = useState<Entries[]>([]);

  useEffect(() => {
    getDiaries().then(data => {
      setEntries(data)
    })
  }, [])

  const addDiaryEntry = (newEntry: Entries) => {
    setEntries((entries) => entries.concat(newEntry));
  };

  return (
    <div>
      <FormEntry addDiaryEntry={addDiaryEntry}/>
      <PrintEntries entries={entries} />
    </div>
  );
}

export default App
