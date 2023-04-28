import React from 'react';
import { Link } from 'react-router-dom';
import apiServices from 'services/api-services';
import { RegisterFormFields } from 'types/register-form';
import classes from './index.module.scss';

const defaultFormData = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const RegisterPage = () => {
  const [formData, setFormData] = React.useState(defaultFormData);

  const {
    name, email, password, passwordConfirmation,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiServices.register(formData);
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
