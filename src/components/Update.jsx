import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
const Update = () => {
  // Ham data ko update 2 tarike se kar sakte hai, first tarika hai jisme ham database se direct data get karke usme update kare and dusra tarika hai jisme ham edit button par click karne par us data ko loalstorage me save kar lenege or phir is local storage se is data ko get karke usko update waale page me update kar denge (hame ye edit button waala kaam Read component ke ander karna hai kyuki wahi par hamara all data hoga), or yaha ham local storage waala tarika he use kar rahe hai data ko update karne ke liye.

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem('id'));
    setName(localStorage.getItem('name'));
    setEmail(localStorage.getItem('email'));
    setPassword(localStorage.getItem('password'));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`https://63f1fbf04f17278c9a1dcbf5.mockapi.io/crud-operation/${id}`, {
        username: name,
        email: email,
        password: password,
      })
      .then(() => {
        navigate('/read');
      });
  };

  return (
    <>
      <div className="inner-container">
        <div className="d-flex justify-content-between my-3">
          <h2 className="register-now">Update Data</h2>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            className="btn-green mx-2"
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </Button>

          <Link to="/read">
            <Button variant="contained" className="mx-2">
              Back
            </Button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Update;
