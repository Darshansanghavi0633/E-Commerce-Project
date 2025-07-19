import {useState, useEffect} from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {useLoginMutation} from '../../redux/api/userApiSlice.js';
import { setCredentials } from '../../redux/features/Auth/AuthSlice.js';
import {toast} from 'react-toastify';
import Loader from '../../components/Loader.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Redux
    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector(state => state.auth);
    const dispatch= useDispatch();
    
    // Redirect logic
    const navigate = useNavigate();
    const {search} = useLocation();
    const sp= new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    },[userInfo, redirect, navigate]);


    // Function to handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();     
        try {
            const res = await login({email, password}).unwrap();   // Unwrap the response to get the data
            console.log("Sending credentials",res);
            dispatch(setCredentials({... res}));
            navigate(redirect);
            toast.success("Login Successful");
        }catch (error) {
            toast.error(error?.data?.message || error.error);
        }   
    }



  return (
    <div>
         
        <section className=" pl-[10rem] mx-auto flex flex-wrap">
            <div className='mr-[4rem] mt-[5rem] w-[100%] '>
                <h1 className="text-2xl font-semibold mb-4 text-black">Sign In</h1> 

                <form onSubmit={submitHandler} className='container w-[40rem] '>

                    <div className='my-[2rem]'>
                        <label htmlFor="email" className='block text-sm font-medium'>Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className='mt-1 p-2 border rounded w-full' 
                            required
                        />
                    </div> 

                    <div className='my-[2rem]'>
                        <label htmlFor="password" className='block text-sm font-medium'>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className='mt-1 p-2 border rounded w-full' 
                            required
                        />
                    </div> 
                
                    <button disabled={isLoading} type="submit" className='bg-pink-500 px-4 py-2 rounded cursor-pointer my-[1rem] text-white'>
                        {isLoading? "Signing In...": "Sign In"}
                    </button>

                    

                    {isLoading && <Loader/>}

                </form>
                    <div className='mt-4'>
                        <p className='text-sm font-medium text-gray-600'>
                            New Customer?{' '}
                            <Link to={`/register?redirect=${redirect}`} className="text-pink-500 hover:underline">
                                Create your account
                            </Link>
                        </p>
                    </div>

            </div>
        </section>
        
    </div>
  )
}

export default Login