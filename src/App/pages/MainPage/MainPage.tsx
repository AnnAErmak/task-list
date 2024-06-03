import * as React from 'react';
import { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';
import { activeTasksSelector, filterTasksSelector, setActiveTasks, tasksSelector } from '../../../store/tasksSlice';
import { logout, Role, roleSelector } from '../../../store/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/hook';
import Filter from './components/Filter/Filter';
import Form from './components/Form/Form';
import ItemTask from './components/ItemTask/ItemTask';
import './MainPage.css';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(activeTasksSelector);

  const filterTasks = useAppSelector(filterTasksSelector);
  const allTasks = useAppSelector(tasksSelector);
  const role = useAppSelector(roleSelector);

  const [activePage, setActivePage] = useState(1);
  const [countPages, setCountPages] = useState<number>(filterTasks.length);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(setActiveTasks(activePage));
  }, [activePage]);

  useEffect(() => {
    if (filterTasks.length > 0) setCountPages(filterTasks.length);
    if (filterTasks.length === 0) setCountPages(0);
    setActivePage(1);
    dispatch(setActiveTasks(activePage));
  }, [filterTasks]);

  useEffect(() => {
    dispatch(setActiveTasks(activePage));
  }, [allTasks]);

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
      <Form />
      <Filter />
      {tasks.length > 0 ? (
        <ul className={'list'}>
          {tasks.map((task) => (
            <ItemTask task={task} editable={role === Role.ADMIN} key={task.id} />
          ))}
        </ul>
      ) : (
        <p>Нет задач</p>
      )}
      <Pagination
        count={countPages}
        limit={3}
        page={activePage}
        indent={1}
        onChangePage={(page) => {
          setActivePage(page);
        }}
      />
    </div>
  );
};

export default MainPage;
