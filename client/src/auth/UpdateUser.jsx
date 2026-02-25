import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    // Optionally fetch user data to pre-fill the form
    // For now, we'll start with empty fields or you can implement fetch logic
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4040/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User updated successfully!");
        navigate("/admin");
      } else {
        alert(data.msg || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  return (
    <div className="stack-center">
      <div className="glass-card pad" style={{ width: 420, maxWidth: '92vw' }}>
        <h2 className="glass-title">Update User (ID: {id})</h2>
        <div style={{ height: 12 }} />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="glass-input"
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ height: 12 }} />
          <div>
            <input
              className="glass-input"
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ height: 12 }} />
          <div>
            <input
              className="glass-input"
              type="text"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ height: 16 }} />
          <button className="glass-btn primary" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
