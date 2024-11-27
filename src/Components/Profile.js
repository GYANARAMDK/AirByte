import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LogOutUser, LoginUser, UpdateUser } from '../Redux/UserSlice'
export default function Profile() {
    const Navigate = useNavigate()
    const Dispatch = useDispatch();
    const User = useSelector((state) => state.User)
    const [isEditing, setIsEditing] = useState(false);
    const [userDetails, setUserDetails] = useState({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 890",
      address: "123 Main Street, City, Country",
    });

    console.log(User.UserInfo);

    const handleEditToggle = () => {
      setIsEditing(!isEditing);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserDetails({ ...userDetails, [name]: value });
    };
  
    const handleSave = () => {
      setIsEditing(false);
      // Save updated details to the database or Redux store
      console.log("Updated User Details:", userDetails);
    };
    useEffect(() => {
        if (!User.IsloggedIn) {
            Navigate('/Login');
        }
    }, [User.IsloggedIn, Navigate])
    return (
        <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full h-32 w-32 object-cover border border-gray-300"
          />
          <button className="mt-2 text-blue-500 hover:underline">Change</button>
        </div>

        {/* User Information */}
        <div className="w-full bg-gray-100 p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={User.UserInfo.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            ) : (
              <p>{userDetails.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            ) : (
              <p>{userDetails.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            ) : (
              <p>{userDetails.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            ) : (
              <p>{userDetails.address}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
    )
}
