import React, { useState,} from 'react'
import { useDispatch,} from 'react-redux';
import { LoginUser } from '../Redux/UserSlice';


import { useLocation, useNavigate } from 'react-router'
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
export default function Login() {
  const Navigate = useNavigate()
  const Locaction=useLocation();
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    password: "",
    phone: ""
  })
  const [error, setError] = useState({});
  const HandleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value })
    setError({ ...error, [name]: '' });
  }
  const validationform = () => {
    const newErrors = {}
    if (!formdata.phone.trim()) newErrors.phone = "required"
    if (!formdata.password.trim()) newErrors.password = "required"
    return newErrors;
  }

  const Handlelogin = async (e) => {
    e.preventDefault();
    const validationerror = validationform();
    if (Object.keys(validationerror).length > 0) {
      setError(validationerror);
      return;
    }

    try {
      const response = await axios.post('https://airbytebackend.onrender.com/user/login',
        { Password: formdata.password, phone: formdata.phone });

      alert(response.data.message);
      
      if(response.status===200){
        const {user,token}= response.data;
        dispatch(LoginUser({
          UserInfo:{
            name:user.name,
            phone:user.phone
          }
          ,AuthToken:token
        }));
       
      }
      
      const redirected=Locaction.state?.from || '/Profile'
      Navigate(redirected)
    } catch (error) {
      if(error.response){
        alert(error.response.data.message)
      }
      console.log(error);

    }
  }
  return (
    <div>
      <div className='flex justify-center items-center relative top-2 gap-4'>
        <h1 className='text-2xl bg-yellow-400 p-2 rounded'>AirByte</h1>
      </div>
      <div className='  flex relative top-5 left-[38vw] h-[62vh] w-[25vw]  rounded border border-black flex-col p-4 gap-6'>
        <button className='absolute top-2 right-2 ' onClick={() => { Navigate('/AirByte') }}><FaTimes /></button>
        <h1 className='text-xl'>Login </h1>



        <div className='flex flex-col gap-2'>
          <h2>Phone No.</h2>
          <div className='flex'>
            <input type="text" placeholder='enter your phone no.' className={`rounded  border w-[20vw] h-8 ${error.phone ? 'border-red-500 ' : 'border-black'}`} value={formdata.phone}
              name='phone' onChange={HandleChange} />
            {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
          </ div>
        </div>

        <div className='flex flex-col gap-2'>
          <h2>Password</h2>
          <div className='flex'>
            <input type="text" placeholder='enter your password ' className={`rounded  border w-[20vw] h-8 ${error.password ? 'border-red-500' : 'border-black'}`} value={formdata.password}
              name='password' onChange={HandleChange} />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}

          </div>
        </div>

        <button className='bg-yellow-400 rounded h-10' onClick={Handlelogin}>
          login
        </button>
      </div>
      <span className='flex justify-center items-center relative top-6 gap-1 '>

        Don't have an account?   
        <button className='underline ' onClick={() => Navigate('/SignUp')}>sign up</button>
      </span>
    </div>
  )
}
