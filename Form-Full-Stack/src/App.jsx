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


/*
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/form");
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/form/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/form", form);
    }
    setForm({ name: "", email: "" });
    fetchData();
  };

  const handleEdit = row => {
    setForm({ name: row.name, email: row.email });
    setEditingId(row.id);
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/form/${id}`);
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{editingId ? "Edit Entry" : "Add Entry"}</h1>
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
        <button type="submit">{editingId ? "Update" : "Submit"}</button>
      </form>

      <h2>Stored Data</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Created At</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{new Date(row.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(row)}>Edit</button>
                <button onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

*/