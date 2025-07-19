import React from 'react'
import { Outlet,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { userInfo } = useSelector(state => state.auth);
    // Check if user is logged in and is an admin
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AdminRoute