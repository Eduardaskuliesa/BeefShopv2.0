import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { register, reset } from 'features/auth/authSlice';
import { useAppDispatch } from 'app/store';
import classes from './index.module.scss';

const defaultFormData = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const RegisterPage = () => {
  const [formData, setFormData] = React.useState(defaultFormData);
  const [error, setError] = React.useState('');

  const {
    name, email, password, passwordConfirmation,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    user, isError, isSuccess, message,
  } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isError) {
      setError(message);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      passwordConfirmation,
      password,
    };
    dispatch(register(userData));
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1 className={classes.h1}>Register Form</h1>
        <form onSubmit={registerHandler}>
          <input className={classes.input} value={name} onChange={onChange} type="text" id="name" placeholder="name" required />
          <input className={classes.input} value={email} onChange={onChange} type="email" id="email" placeholder="email" required />
          <input className={classes.input} value={password} onChange={onChange} type="password" id="password" placeholder="password" required />
          <input className={classes.input} value={passwordConfirmation} onChange={onChange} type="password" id="passwordConfirmation" placeholder="confirm password" required />
          {error === '' ? '' : <span>{error}</span> }
          <button className={classes.button} type="submit">Create Account</button>
        </form>
        <div className={classes.member}>
          Already have account?
          {' '}
          <Link to="../login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
