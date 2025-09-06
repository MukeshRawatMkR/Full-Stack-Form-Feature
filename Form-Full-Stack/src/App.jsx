import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

export default function App() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [data, setData] = useState([]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/form", form);
    setForm({ name: "", email: "" });
    fetchData();
  };

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/form");
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Stored Data</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Created At</th></tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{new Date(row.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
