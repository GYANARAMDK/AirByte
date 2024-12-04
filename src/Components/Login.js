import React, { useState, } from 'react'
import { useDispatch, } from 'react-redux';
import { LoginUser } from '../Redux/UserSlice';
import { useLocation, useNavigate } from 'react-router'
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
export default function Login() {


  const Navigate = useNavigate()
  const Locaction = useLocation();
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    password: "",
    phone: ""
  })
  const [error, setError] = useState({});
  const redirected = Locaction.state?.from || '/Profile'   //if user not come from any other page send the user to the profile by default to the profile page



  const Handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;                   // if any change occured set  error to none 
    setformdata({ ...formdata, [name]: value })
    setError({ ...error, [name]: '' });
  }

  const validationform = () => {
    const newErrors = {}
    if (!formdata.phone.trim()) newErrors.phone = "required"           //data validation before send to backend
    if (!formdata.password.trim()) newErrors.password = "required"
    return newErrors;
  }

  const Handlelogin = async (e) => {
    e.preventDefault();
    const validationerror = validationform();             //function call to validate
    if (Object.keys(validationerror).length > 0) {
      setError(validationerror);
      return;
    }

    try {
      const response = await axios.post('https://airbytebackend.onrender.com/user/login',
        { Password: formdata.password, phone: formdata.phone });

      alert(response.data.message);   // message from database or server 

      if (response.status === 200) {
        const { user, token } = response.data;
        dispatch(LoginUser({
          UserInfo: {
            name: user.name,             // set user as loggedin with userinformation and authtoken
            phone: user.phone
          }
          , AuthToken: token
        }));
        Navigate(redirected) //redirected if user get successed response from backend else don't
      }


    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      }
      console.log(error)          // if user send request if function is write then give no error from us you check your network 
    }
  }
  return (
    <div>
      <div className=' min-h-screen flex flex-col justify-center items-center relative '>

        <div className='relative bg-white shadow-lg rounded-lg p-6 w-[90%] sm:w-[70%] md:w-[40%] lg:w-[24%] border border-black'>
          <button className='absolute top-3 right-3 text-xl text-gray-600 hover:text-black ' onClick={() => { Navigate('/AirByte') }}><FaTimes /></button>
          <h1 className='text-xl mb-6 text-center font-semibold'>Login </h1>
          <form className="flex flex-col gap-4" onSubmit={Handlelogin}>
            <div >
              <label htmlFor='phone' className="block mb-1 font-medium">Phone No.</label>
              <input type="text" placeholder='enter your phone no.' className={`rounded border w-full h-10 px-2 ${error.phone ? 'border-red-500' : 'border-black'
                }`} value={formdata.phone}
                name='phone' onChange={Handlechange} />
              {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
            </div>

            <div >
              <label htmlFor='password' className="block mb-1 font-medium">Password</label>
              <input type="text" placeholder='enter your password ' className={`rounded  border w-full h-10 px-2 ${error.password ? 'border-red-500' : 'border-black'}`} value={formdata.password}
                name='password' onChange={Handlechange} />
              {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
            </div>

            <button type="submit"
            className='bg-blue-400 text-white rounded h-10 mt-4 hover:bg-blue-500' >
              login
            </button>
          </form>

          <div className="mt-4 text-center">

            Don't have an account?
            <button className='underline text-blue-600 hover:text-blue-800 ' onClick={() => Navigate('/SignUp', { state: { from: redirected } })}>
              Sign Up
            </button>   {/* redireted to sign page with state from where user come*/}
          </div>
        </div>
      </div >
    </div>
  )
}
