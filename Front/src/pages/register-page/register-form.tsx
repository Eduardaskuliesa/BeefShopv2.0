import React from 'react';
import { RegisterFormFields } from 'types/register-form';
import { Link } from 'react-router-dom';
import apiServices from 'services/api-services';
import classes from './index.module.scss';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormFields) => void
}

type FormFields = {
  name: HTMLInputElement,
  email: HTMLInputElement,
  password: HTMLInputElement,
  passwordConfirmation: HTMLInputElement
};

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const {
      name, email, password, passwordConfirmation,
    } = form;
    apiServices.register(onSubmit({
      email: email.value,
      password: password.value,
      name: name.value,
      passwordConfirmation: passwordConfirmation.value,
    }));
  };
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1 className={classes.h1}>Register Form</h1>
        <form onSubmit={handleSubmit}>
          <input className={classes.input} name="name" type="text" placeholder="name" required />
          <input className={classes.input} name="email" type="email" placeholder="email" required />
          <input className={classes.input} name="password" type="password" placeholder="password" required />
          <input className={classes.input} name="passwordConfirmation" type="password" placeholder="confirm password" required />
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

export default RegisterForm;
