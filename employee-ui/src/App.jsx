import { useEffect, useState } from 'react';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch employees
  const fetchEmployees = () => {
    setLoading(true);
    fetch('https://employee-backend-h8xx.onrender.com/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const showMsg = (msg, time = 1800) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), time);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      showMsg('Provide valid email!');
      return;
    }
    if (form.name.length < 2) {
      showMsg('Name too short!');
      return;
    }
    if (form.role.length < 2) {
      showMsg('Role too short!');
      return;
    }
    setLoading(true);
    const method = editing ? 'PUT' : 'POST';
    const url = editing
      ? `https://employee-backend-h8xx.onrender.com/employees/${editing.id}`
      : 'https://employee-backend-h8xx.onrender.com/employees';
    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error('API Error');
        return res;
      })
      .then(() => {
        setForm({ name: '', email: '', role: '' });
        setEditing(null);
        fetchEmployees();
        showMsg(editing ? 'Updated!' : 'Added!');
      })
      .catch(() => showMsg('Operation failed!'))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this employee?")) return;
    setLoading(true);
    fetch(`https://employee-backend-h8xx.onrender.com/employees/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchEmployees();
        showMsg('Deleted!');
      })
      .catch(() => showMsg('Delete failed!'))
      .finally(() => setLoading(false));
  };

  const handleEdit = (emp) => {
    setForm({ name: emp.name, email: emp.email, role: emp.role });
    setEditing(emp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100 py-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-700 text-center">Employee Dashboard</h1>

        {message && <div className="mb-4 text-center text-white bg-indigo-400 py-2 px-4 rounded">{message}</div>}

        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end mb-10">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name"
            className="border p-2 rounded flex-1 min-w-[140px]" autoFocus required autoComplete="off" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email"
            className="border p-2 rounded flex-1 min-w-[180px]" required autoComplete="off" />
          <input name="role" value={form.role} onChange={handleChange} placeholder="Role"
            className="border p-2 rounded flex-1 min-w-[120px]" required autoComplete="off" />
          <button type="submit" disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60">{editing ? "Update" : "Add"}</button>
          {editing && <button type="button" disabled={loading}
            className="ml-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={() => { setEditing(null); setForm({ name: '', email: '', role: '' }); }}>Cancel</button>}
        </form>

        {loading && <div className="text-center my-2">Loading...</div>}

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-100">
              <th className="p-2 text-indigo-700">Name</th>
              <th className="p-2 text-indigo-700">Email</th>
              <th className="p-2 text-indigo-700">Role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-b hover:bg-indigo-50">
                <td className="p-2 font-semibold">{emp.name}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">{emp.role}</td>
                <td className="p-2">
                  <button onClick={() => handleEdit(emp)}
                    className="mr-2 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded">Edit</button>
                  <button onClick={() => handleDelete(emp.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400 italic">No employees yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="mt-10 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Employee Management App &mdash; Powered by Spring Boot + React + Tailwind
      </footer>
    </div>
  );
}
