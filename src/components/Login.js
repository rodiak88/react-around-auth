import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function Login({ onLogin }) {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const { email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <div className='auth-form'>
      <form className='auth-form__form' onSubmit={handleSubmit}>
        <h2 className='auth-form__title'>Log in</h2>
        <input
          type='email'
          name='email'
          value={email || ''}
          onChange={handleChange}
          id='email-input'
          className='auth-form__input'
          placeholder='Email'
          required
        />
        <input
          type='password'
          name='password'
          value={password || ''}
          onChange={handleChange}
          id='password-input'
          className='auth-form__input'
          placeholder='Password'
          required
        />
        <button className='auth-form__button' type='submit'>
          Log in
        </button>
        <p className='auth-form__text'>
          Not a member yet?{' '}
          <Link className='auth-form__link' to='/signup'>
            Sign up here!
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
