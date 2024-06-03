import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { isAuth } from '../../../store/usersSlice';
import { useAppDispatch } from '../../../utils/hooks/hook';
import './LoginPage.css';

type FormValues = {
  email: string;
  password: string;
};
const initialValues: FormValues = {
  email: 'user@user.com',
  password: '12345',
};
const loginValidationSchema = yup.object({
  email: yup.string().email('Неверный формат email').required('Email обязателен'),
  password: yup.string().min(5, 'Длина пароля должна быть минимум 5 символов.').required('Password обязателен'),
});

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(isAuth(values));
    },
  });

  return (
    <form className={'form-login'} onSubmit={formik.handleSubmit}>
      <h1>Log In</h1>
      <p>email: admin@admin.com password: 67890</p>
      <input
        id={'email'}
        type={'email'}
        placeholder={'e-mail'}
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}
      <input
        id={'password'}
        type={'password'}
        placeholder={'password'}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.password && formik.touched.password && <p>{formik.errors.password}</p>}
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginPage;
