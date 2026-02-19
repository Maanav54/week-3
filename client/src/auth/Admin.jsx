import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedOnce, setFetchedOnce] = useState(false);

  const navigate = useNavigate();
  const abortRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Abort previous request if any
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError("");
      setFetchedOnce(true);

      const res = await fetch("http://localhost:4040/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });

      if (res.status === 401 || res.status === 403) {
        logout();
        return;
      }

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Failed to fetch users (HTTP ${res.status})`);
      }

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err?.message || "Something went wrong");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      logout();
      return;
    }

    try {
      const res = await fetch(`http://localhost:4040/api/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        logout();
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || "Failed to delete user");
        return;
      }

      alert("User deleted successfully!");
      // Refresh list
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting user");
    }
  };

  // Optional: keep page protected (redirect if token missing)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login", { replace: true });

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-600">Manage and view all registered users.</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Fetching..." : fetchedOnce ? "Refresh Users" : "Get Users"}
            </button>

            <button
              onClick={() => {
                setUsers([]);
                setError("");
                setFetchedOnce(false);
              }}
              disabled={loading}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Clear
            </button>

            <button
              onClick={logout}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="mt-6 rounded-2xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-slate-200">
          {/* Status */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {!fetchedOnce && !error && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Click <span className="font-semibold">Get Users</span> to load data.
            </div>
          )}

          {loading && (
            <div className="mt-4 text-sm text-slate-600">Loading users...</div>
          )}

          {!loading && fetchedOnce && !error && users.length === 0 && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              No users found.
            </div>
          )}

          {/* Table */}
          {!loading && users.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-700">
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr
                      key={u.id ?? u._id ?? idx}
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-slate-700">
                        {u.id ?? u._id ?? "-"}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {u.name ?? u.username ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {u.email ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-700 flex gap-2">
                        <button
                          onClick={() => navigate(`/update/${u.id}`)}
                          className="rounded-lg bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-yellow-600 transition-colors"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-3 text-xs text-slate-500">
                Total users: <span className="font-semibold">{users.length}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
