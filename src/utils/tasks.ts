export enum Status {
  NOT_COMPLETED = 'not completed',
  COMPLETED = 'completed',
}
export interface Task {
  id: number;
  name: string;
  email: string;
  text: string;
  status: Status;
}

export const tasks = [
  { id: 1, name: '1', email: 'user@user.com', text: '123451111111111111', status: Status.NOT_COMPLETED },
  { id: 2, name: '2', email: 'user@user.com', text: '12345', status: Status.NOT_COMPLETED },
  { id: 3, name: '3', email: 'user@user.com', text: '12345', status: Status.COMPLETED },
  { id: 4, name: '333', email: 'user@user.com', text: '12345', status: Status.NOT_COMPLETED },
  { id: 5, name: '4', email: 'user@user.com', text: '12345', status: Status.NOT_COMPLETED },
  { id: 6, name: '6', email: 'user@user.com', text: 'текст 1', status: Status.NOT_COMPLETED },
  { id: 7, name: '89', email: 'user@user.com', text: '2 текст', status: Status.NOT_COMPLETED },
  { id: 8, name: '42', email: 'user@user.com', text: '12345', status: Status.COMPLETED },
  { id: 9, name: '1', email: 'user@user.com', text: '12345', status: Status.NOT_COMPLETED },
  { id: 10, name: '1', email: 'user@user.com', text: '12345', status: Status.NOT_COMPLETED },
  { id: 11, name: '1', email: 'user@user.com', text: '', status: Status.COMPLETED },
];
