import * as React from 'react';
import { setFilterTasks, sortedTasks } from '../../../../../store/tasksSlice';
import { useAppDispatch } from '../../../../../utils/hooks/hook';
import { Status } from '../../../../../utils/tasks';
import './Filter.css';

const Filter = () => {
  const dispatch = useAppDispatch();

  const handelChangeFilter = (e) => {
    e.preventDefault();
    const options = {
      name: e.target.name.value.toLocaleLowerCase().trim(),
      email: e.target.email.value.trim(),
      status: e.target.status.value === 'All' ? '' : e.target.status.value,
    };
    dispatch(setFilterTasks(options));
  };

  const handelChangeSort = (value) => {
    value === 'По зозрастанию' ? dispatch(sortedTasks(true)) : dispatch(sortedTasks(false));
  };

  return (
    <>
      <form onSubmit={handelChangeFilter} className={'form-filter'}>
        <h4> Фильры </h4>
        <fieldset className={'form-filter__fields'}>
          <input placeholder={'назавие задачи'} name="name" id={'filter-name'} />
          <input placeholder={'email'} name="email" id={'filter-email'} />
          <select name="status" id={'filter-status'}>
            <option>All</option>
            <option>{Status.COMPLETED}</option>
            <option>{Status.NOT_COMPLETED}</option>
          </select>
          <select onChange={(e) => handelChangeSort(e.target.value)} id={'sort-id'}>
            <option>По зозрастанию</option>
            <option>По убыванию</option>
          </select>
        </fieldset>
        <fieldset className={'form-filter__action'}>
          <button type={'submit'}> Применить </button>
        </fieldset>
      </form>
    </>
  );
};
export default Filter;
