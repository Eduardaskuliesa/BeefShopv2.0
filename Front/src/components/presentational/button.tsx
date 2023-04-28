import React, { ReactEventHandler } from 'react';
import { Navigate } from 'react-router-dom';
import classes from './button.module.scss';

type ButtonProps = {
  children: React.ReactNode,
};

const Button: React.FC<ButtonProps> = ({ children }) => (
  <button type="submit" className={classes.button}>{children}</button>
);

export default Button;
