import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const Create = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((formValues) => {
      return {
        ...formValues,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (
      formValues.username !== '' &&
      formValues.email !== '' &&
      formValues.password !== ''
    ) {
      axios
        .post('https://63f1fbf04f17278c9a1dcbf5.mockapi.io/crud-operation', {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
        })
        .then(() => {
          navigate('/read');
        });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = 'Username is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters';
    }
    return errors;
  };

  return (
    <>
      <div className="inner-container">
        <div className="d-flex justify-content-between my-3">
          <h2 className="register-now">Register Now</h2>
          <Link to="/read">
            <Button variant="contained">Show Data</Button>
          </Link>
        </div>
        <div>
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="success-message">Registered Successfully!!!</div>
          ) : null}
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formValues.username}
              onChange={handleChange}
            />
            <div className="error-message">{formErrors.username}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formValues.email}
              onChange={handleChange}
            />
            <div className="error-message">{formErrors.email}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formValues.password}
              onChange={handleChange}
            />
            <div className="error-message">{formErrors.password}</div>
          </div>

          <Button
            variant="contained"
            className="btn-green"
            type="submit"
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Create;
