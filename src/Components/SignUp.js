import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { FaTimes } from 'react-icons/fa';
import axios from 'axios'

export default function SignUp() {
  const Location = useLocation()
  const redirected = Location.state.from
  const Navigate = useNavigate();
  const [formdata, setformdata] = useState({
    name: "",
    phone: "",
    password: ""
  })
  const [error, setError] = useState({});


  const Handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value })        // fill value to form data and set error to none if changesomthing  
    setError({ ...error, [name]: '' });
  }


  const validationform = () => {
    const newErrors = {}
    const phoneRegex = /^\d{10}$/
    if (!formdata.name.trim()) newErrors.name = "required"
    if (!formdata.phone.trim()) newErrors.phone = "required"
    if (!phoneRegex.test(formdata.phone)) newErrors.phone = "must be 10 digit"            //validation before send to backned
    if (!formdata.password.trim()) newErrors.password = "required"
    if (formdata.password.length < 6) newErrors.password = "must be 6 character"
    return newErrors;
  }


  const signupHandle = async (e) => {
    e.preventDefault();

    const validationerror = validationform();             //validation call 
    if (Object.keys(validationerror).length > 0) {
      setError(validationerror);
      return;
    }

    try {
      const response = await axios.post('https://airbytebackend.onrender.com/user/signup',
        formdata);
      
      alert(response.data.message);   // response from database 

      if (response.status === 201) {
        Navigate('/Login', { state: { from: redirected } })     // if person successed in registration then redirected it to the login else not 
      }

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      }
      console.log(error)
    }

    Navigate('/Login')
  }
  return (
    <div>
      <div className='flex justify-center items-center relative top-2 gap-4'>
        <h1 className='text-2xl bg-blue-400 p-2 rounded'>AirByte</h1>
      </div>
      <div className='  flex relative top-5 left-[35vw] h-[82vh] w-[30vw]  rounded border border-black flex-col p-4 gap-4'>
        <button className='absolute top-2 right-2 ' onClick={() => { Navigate('/AirByte') }}><FaTimes /></button>
        <h1 className='text-xl'>Sign Up </h1>

        <div className='flex flex-col gap-2'>
          <h2>Name</h2>
          <div className='flex'>
            <input type="text" placeholder='enter your name' className={`rounded  border w-[20vw] h-8 ${error.name ? 'bg-red-500' : 'border-black'}`} value={formdata.name}
              name='name' onChange={Handlechange} />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <h2>Phone No.</h2>
          <div className='flex'>
            <input type="text" placeholder='enter your phone no.' className={`rounded  border w-[20vw] h-8 ${error.phone ? 'border-red-500 ' : 'border-black'}`} value={formdata.phone}
              name='phone' onChange={Handlechange} />
            {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}

          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <h2>Password</h2>
          <div className='flex'>
            <input type="text" placeholder='Atleast 6 charactor ' className={`rounded  border w-[20vw] h-8 ${error.password ? 'border-red-500' : 'border-black'}`} value={formdata.password}
              name='password' onChange={Handlechange} />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          </div>
        </div>
        <h1>
          To verify your number, we will send you a text message with a temporary code. Message and data rates may apply
        </h1>
        <button className='bg-blue-400 rounded h-10' onClick={signupHandle}>
          Create Account
        </button>
      </div>
      <span className='flex justify-center items-center relative top-6 gap-1 '>

        Already have an account?
        <button className='underline ' onClick={() => Navigate('/Login', { state: { from: redirected } })}>login</button>
      </span>
    </div>
  )
}
