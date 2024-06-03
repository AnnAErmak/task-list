import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, tasks } from '../utils/tasks';
import { RootState } from './store';

export interface TasksState {
  activeTasks: Task[];
  filterTasks: Task[];
  tasks: Task[];
}

const initialState: TasksState = {
  activeTasks: [],
  filterTasks: tasks,
  tasks: tasks,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setActiveTasks: (state, action: PayloadAction<number>) => {
      const start = action.payload * 3 - 3;
      state.activeTasks = state.filterTasks.slice(start, start + 3);
    },

    setFilterTasks: (state, action: PayloadAction<Record<string, string>>) => {
      state.filterTasks = state.tasks.filter((item) => {
        let isValid = true;
        for (const key in action.payload) {
          if (action.payload[key] !== '' && action.payload[key] !== item[key]) {
            isValid = false;
            break;
          }
        }
        return isValid;
      });
    },

    sortedTasks: (state, action: PayloadAction<boolean>) => {
      action.payload ? state.activeTasks.sort((a, b) => a.id - b.id) : state.activeTasks.sort((a, b) => b.id - a.id);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.activeTasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[index] = {
        ...state.tasks[index],
        ...action.payload,
      };

      state.filterTasks[index] = {
        ...state.filterTasks[index],
        ...action.payload,
      };
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.filterTasks = state.tasks;
    },
  },
});

export const { setActiveTasks, setFilterTasks, sortedTasks, editTask, addTask } = tasksSlice.actions;
export const tasksSelector = (state: RootState) => state.tasks.tasks;
export const activeTasksSelector = (state: RootState) => state.tasks.activeTasks;
export const filterTasksSelector = (state: RootState) => state.tasks.filterTasks;
export default tasksSlice.reducer;
