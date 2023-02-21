import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Read = () => {
  const [data, setData] = useState([]);

  function getData() {
    axios
      .get('https://63f1fbf04f17278c9a1dcbf5.mockapi.io/crud-operation')
      .then((res) => {
        setData(res.data);
      });
  }

  const handleDelete = (id) => {
    axios
      .delete(
        `https://63f1fbf04f17278c9a1dcbf5.mockapi.io/crud-operation/${id}`
      )
      .then(() => {
        getData();
      });
  };

  const setLocalStorage = (id, name, email, password) => {
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="inner-container">
        <div className="d-flex justify-content-between m-3">
          <h2 className="register-now">Registered Data</h2>
          <Link to="/">
            <Button variant="contained">Register</Button>
          </Link>
        </div>
        <div class="table-responsive">
          <table className="table table-condensed">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            {data.map((userData) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td>{userData.id}</td>
                      <td>{userData.username}</td>
                      <td>{userData.email}</td>
                      <td>{userData.password}</td>
                      <td>
                        <Link to="/update">
                          <Button
                            className="edit-icon"
                            onClick={() =>
                              setLocalStorage(
                                userData.id,
                                userData.username,
                                userData.email,
                                userData.password
                              )
                            }
                          >
                            <EditIcon />
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          className="delete-icon"
                          onClick={() => handleDelete(userData.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Read;
