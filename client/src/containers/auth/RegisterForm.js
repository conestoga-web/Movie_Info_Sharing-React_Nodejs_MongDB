import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // event handler for input change
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // event handler for form submit
  const onSubmit = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    // fill all fields
    if ([username, password, passwordConfirm].includes('')) {
      setError('Fill all fields');
      return;
    }
    // no match of password
    if (password !== passwordConfirm) {
      setError('The password has no consistency.');
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(register({ username, password }));
  };

  // initialize form
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // signup success / failure
  useEffect(() => {
    if (authError) {
      // account already exists
      if (authError.response.status === 409) {
        setError('The account already exists.');
        return;
      }
      setError('Signup Failure');
      return;
    }

    if (auth) {
      console.log('Signup Success');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // check user setting
  useEffect(() => {
    console.log(user);
    if (user) {
      history.push('/'); // move to home
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
