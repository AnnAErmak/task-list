import * as React from 'react';
import { useState } from 'react';
import { editTask } from '../../../../../store/tasksSlice';
import { useAppDispatch } from '../../../../../utils/hooks/hook';
import { Status, Task } from '../../../../../utils/tasks';
import './ItemTask.css';

type TaskProps = {
  task: Task;
  editable?: boolean;
};

const ItemTask: React.FC<TaskProps> = ({ task, editable = false }) => {
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState(task.status);
  const [text, setText] = useState(task.text);
  const dispatch = useAppDispatch();
  const handleEditor = () => {
    setEdit(true);
  };
  const handleSave = (task) => {
    dispatch(editTask({ ...task, text, status: checked }));
    setEdit(false);
  };
  const handleChecked = (value) => {
    if (value) setChecked(Status.COMPLETED);
    if (!value) setChecked(Status.NOT_COMPLETED);
  };
  return (
    <li className={'list__item'}>
      <div className={'item__id'}>{task.id}</div>
      <div className={'item__name'}>{task.name}</div>
      <div className={'item__email'}>{task.email}</div>
      <div className={`text ${edit && 'disabled'}`}>{text}</div>
      <textarea
        className={`edit-text ${edit && 'edit'}`}
        onChange={(e) => setText(e.target.value)}
        value={text}
        maxLength={25}
      >
        {text}
      </textarea>
      <div className={`status ${edit && 'disabled'}`}>{checked}</div>
      <input
        className={`edit-status ${edit && 'edit'}`}
        type={'checkbox'}
        value={checked}
        checked={checked === Status.COMPLETED ? true : false}
        onChange={(e) => handleChecked(e.target.checked)}
      />
      <button onClick={handleEditor} className={`btn-edit ${editable && 'active'} ${edit && 'disabled'}`}>
        редактировать
      </button>
      <button className={`btn-save ${edit && 'active'}`} onClick={() => handleSave(task)}>
        Сохранить
      </button>
    </li>
  );
};
export default ItemTask;
