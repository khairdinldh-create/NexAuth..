import { useEffect, useState } from "react";
import Axios from "axios";


import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom"; 


export default function Admin() {


  const navigate = useNavigate();


  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");





  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await Axios.get("http://localhost:8000/admin/users", {
          headers: { Authorization: "Bearer " + token },
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);









  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await Axios.delete("http://localhost:8000/admin/deleteuser/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };





  const handleView = (id) => {
  navigate("/admin/profile/user/" + id); // ✅ no page reload, state preserved
};





  const formatDate = (raw) => {
    if (!raw) return "—";
    const d = new Date(raw);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };









  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    const matchRole = roleFilter ? u.role === roleFilter : true;
    return matchSearch && matchRole;
  });





  const renderBadge = (role) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium ";
    const style =
      role === "admin"
        ? "bg-purple-100 text-purple-700"
        : "bg-green-100 text-green-700";
    return <span className={base + style}>{role}</span>;
  };




  
  const renderTable = () => {
    if (loading) {
      return (
        <p className="text-center py-10 text-gray-500 text-sm">
          Loading users...
        </p>
      );
    }
    if (error) {
      return (
        <p className="text-center py-10 text-red-500 text-sm">{error}</p>
      );
    }
    if (filtered.length === 0) {
      return (
        <p className="text-center py-10 text-gray-400 text-sm">
          No users found
        </p>
      );
    }
    return (
      <table className="w-full text-sm">
        <thead className="bg-stone-100 border-b border-stone-200">
          <tr>
            <th className="text-left px-5 py-3 font-medium text-gray-500">
              User
            </th>
            <th className="text-left px-5 py-3 font-medium text-gray-500">
              Role
            </th>
            <th className="text-left px-5 py-3 font-medium text-gray-500">
              Joined
            </th>
            <th className="text-left px-5 py-3 font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u, i) => (
            <tr
              key={u._id}
              className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
            >
              <td className="px-5 py-3">
                <p className="font-medium text-gray-800">{u.name}</p>
                <p className="text-gray-400 text-xs">{u.email}</p>
              </td>
              <td className="px-5 py-3">{renderBadge(u.role)}</td>
              <td className="px-5 py-3 text-gray-400">
                {formatDate(u.createdAt)}
              </td>
              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(u._id)}
                    className="px-3 py-1 text-xs rounded-md bg-stone-100 text-stone-600 hover:bg-stone-200 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="min-h-screen bg-stone-200 p-8">
      <h1 className="text-3xl font-bold text-center mb-2">Admin Page</h1>
      <p className="text-center text-gray-600 mb-8">
        Manage all registered users
      </p>

      <div className="max-w-5xl mx-auto flex gap-3 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        <div className="flex gap-3 mb-4 justify-center">
  <button
    onClick={() => setRoleFilter("")}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
      roleFilter === ""
        ? "bg-stone-700 text-white"
        : "bg-white text-stone-600 border border-stone-300 hover:bg-stone-100"
    }`}
  >
    All roles
  </button>
  <button
    onClick={() => setRoleFilter("admin")}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
      roleFilter === "admin"
        ? "bg-purple-600 text-white"
        : "bg-white text-purple-600 border border-purple-200 hover:bg-purple-50"
    }`}
  >
    Admin
  </button>
  <button
    onClick={() => setRoleFilter("user")}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
      roleFilter === "user"
        ? "bg-green-600 text-white"
        : "bg-white text-green-600 border border-green-200 hover:bg-green-50"
    }`}
  >
    User
  </button>
</div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200">
        {renderTable()}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        {filtered.length} user(s) shown
      </p>
    </div>
  );
}