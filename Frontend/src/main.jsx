import ReactDom from 'react-dom/client';
import App from './App.jsx';
import "./main.css";
import {Route, RouterProvider, createRoutesFromElements} from 'react-router';
import {createBrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store.js';

// Auth
import Login from './pages/Auth/login.jsx';
import Register from './pages/Auth/Register.jsx';

//Private Route
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/User/Profile.jsx';

//Admin
import AdminRoute from './pages/Admin/AdminRoute';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from './pages/Admin/productList.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>                                //parent route
      
      <Route path='/login' element={<Login />} />                     //child route
      <Route path='/register' element={<Register />} />               //child route 

      <Route path='' element={<PrivateRoute />}>                     //private route 
        <Route path='/profile' element={<Profile/>}/>                //child route of private route          
      </Route> 

      //AdminRoute
      <Route path='/admin' element={<AdminRoute />}>                       //admin route
        <Route path='/admin/userlist' element={<UserList />} />         //child route of admin route
        <Route path='/admin/categorylist' element={<CategoryList/>} />
        <Route path='/admin/productlist' element={<ProductList />} />   //child route of admin route
        <Route path='/admin/product/update/:id' element={<ProductUpdate />} /> //child route of admin route
      </Route>

    </Route >
  )
);

ReactDom.createRoot(document.getElementById('root')).render(<Provider store={store}><RouterProvider router={router} /></Provider>);