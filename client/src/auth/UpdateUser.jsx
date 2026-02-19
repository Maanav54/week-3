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
    <div style={{ padding: "20px" }}>
      <h2>Update User (ID: {id})</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <br />
          <input
            type="text"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
