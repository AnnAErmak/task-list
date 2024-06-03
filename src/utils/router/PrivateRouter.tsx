import * as React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import { authSelector } from '../../store/usersSlice';
// import { useAppSelector } from '../hooks/hook';

type PrivateRouterProps = {
  auth: boolean;
};
const PrivateRouter: React.FC<PrivateRouterProps> = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to={'login'} />;
};
export default PrivateRouter;
