import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page, size);
  }, [page, size]);

  const fetchUsers = async (pageNumber, pageSize) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4040/api/users/page?page=${pageNumber}&size=${pageSize}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Pagination Demo</h2>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={handlePrev} 
              disabled={page === 0}
              style={{ padding: '8px 16px', cursor: page === 0 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            
            <span>
              Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
            </span>
            
            <button 
              onClick={handleNext} 
              disabled={page >= totalPages - 1}
              style={{ padding: '8px 16px', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label>Rows per page: </label>
            <select 
              value={size} 
              onChange={(e) => {
                setSize(Number(e.target.value));
                setPage(0); // Reset to first page when changing size
              }}
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
