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
        alert("hello")
      }
      console.log(error)
    }
  }
  return (
    <>
      
      <div className="min-h-screen flex flex-col items-center justify-center">

        <div className='  relative bg-white shadow-lg rounded-lg p-6 w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%] border border-black'>
          <button className='absolute top-3 right-3 text-xl text-gray-600 hover:text-black ' onClick={() => { Navigate('/AirByte') }}><FaTimes /></button>
          <h1 className='text-xl mb-6 text-center font-semibold'>Sign Up </h1>
          <form className="flex flex-col gap-4" onSubmit={signupHandle}>

            <div >
              <label className="block mb-1 font-medium">Name</label>
              <input type="text" placeholder='enter your name' className={`rounded border w-full h-10 px-2 ${error.name ? 'border-red-500 bg-red-100' : 'border-black'}`} value={formdata.name}
                name='name' onChange={Handlechange} />
              {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
            </div>

            <div >
              <label className='block mb-1 font-medium'>Phone No.</label>
              <input type="text" placeholder='enter your phone no.' className={`rounded  border  w-full h-10 px-2 ${error.phone ? 'border-red-500 ' : 'border-black'}`} value={formdata.phone}
                name='phone' onChange={Handlechange} />
              {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
            </div>

            <div >
              <label className='block mb-1 font-medium'>Password</label>
              <input type="text" placeholder='Atleast 6 charactor ' className={`rounded  border w-full h-10 px-2 ${error.password ? 'border-red-500' : 'border-black'}`} value={formdata.password}
                name='password' onChange={Handlechange} />
              {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
            </div>


            <p className='text-sm text-gray-700'>
              To verify your number, we will send you a text message with a temporary code. Message and data rates may apply
            </p>
            <button className='bg-blue-400 text-white rounded h-10 mt-4 hover:bg-blue-500' type='submit'>
              Create Account
            </button>
          </form>
        </div>
        <div className="text-center mt-4">

          Already have an account?
          <button className='underline text-blue-600 hover:text-blue-800 ' onClick={() => Navigate('/Login', { state: { from: redirected } })}>login</button>
        </div>
      </div>
    </>
  )
}
