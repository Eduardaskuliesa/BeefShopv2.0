import React from 'react';
import Button from 'components/presentational/button';
import { useNavigate } from 'react-router-dom';
import classes from './index.module.scss';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <button type="submit" className={classes.button} onClick={() => navigate('register')}>Register</button>
      <button type="submit" className={classes.button}>Login</button>
    </div>
  );
};

export default HomePage;
