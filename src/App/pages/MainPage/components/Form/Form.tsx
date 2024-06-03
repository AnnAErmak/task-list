import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { addTask, tasksSelector } from '../../../../../store/tasksSlice';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks/hook';
import { Status, Task } from '../../../../../utils/tasks';
import './Form.css';

type FormTask = {
  name: string;
  email: string;
  text: string;
};

const Form = () => {
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector(tasksSelector);

  const initialValues: FormTask = {
    name: '',
    email: '',
    text: '',
  };
  const taskValidationSchema = yup.object({
    name: yup
      .string()
      .min(3, 'Должно содержать больше 3 символов')
      .max(25, 'Должно содержать не более 25 символов')
      .required('Обязательное поле'),
    email: yup.string().email('Неверный формат email').required('Email обязателен'),
    text: yup.string(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: taskValidationSchema,
    onSubmit: (values) => {
      const task: Task = {
        id: allTasks.length + 1,
        name: values.name,
        email: values.email,
        text: values.text,
        status: Status.NOT_COMPLETED,
      };
      dispatch(addTask(task));
    },
  });

  return (
    <form className={'form__task'} onSubmit={formik.handleSubmit}>
      <h4> Добавить новую задачу</h4>
      <fieldset className={'form__task_fields'}>
        <div className={'input-wrapper'}>
          <input
            id={'name'}
            type={'text'}
            placeholder={'Название задачи'}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && <p>{formik.errors.name}</p>}
        </div>
        <div className={'input-wrapper'}>
          <input
            id={'email'}
            type={'email'}
            placeholder={'email'}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}
        </div>
        <input
          id={'text'}
          type={'text'}
          value={formik.values.text}
          onChange={formik.handleChange}
          placeholder={'Текст задачи'}
        />
      </fieldset>

      <fieldset className={'form__task_actions'}>
        <button type={'submit'}>Добавить задачу</button>
      </fieldset>
    </form>
  );
};
export default Form;
