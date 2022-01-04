import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './user.css'

const User = () => {
    return (
        <div className='user'>
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                <button className="userAddButton">Create</button>
                </Link>  
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvYIgYetvV0RIbjbir2482RbqjLlLDVmhH7i6_o9XviVHL9j9zWbJlZpfoquJo9b2vqo&usqp=CAU" alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">Edward Newgate</span>
                            <span className="userShowUserTitle">Yonko Pirate</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className='userShowIcon' />
                            <span className="userShowInfoTitle">Whitebeard</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className='userShowIcon' />
                            <span className="userShowInfoTitle">10.12.1950</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className='userShowIcon' />
                            <span className="userShowInfoTitle">+1 123 456 7890</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className='userShowIcon' />
                            <span className="userShowInfoTitle">enewgate@gmail.com</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className='userShowIcon' />
                            <span className="userShowInfoTitle">The Moby Dick</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form  className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input 
                                type="text" 
                                placeholder='Whitebeard'
                                className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input 
                                type="text" 
                                placeholder='Edward Newgate'
                                className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input 
                                type="text" 
                                placeholder='enewgate@gmail.com'
                                className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input 
                                type="text" 
                                placeholder='+1 123 456 7890'
                                className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input 
                                type="text" 
                                placeholder='The Moby Dick'
                                className="userUpdateInput" />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img className="userUpdateImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvYIgYetvV0RIbjbir2482RbqjLlLDVmhH7i6_o9XviVHL9j9zWbJlZpfoquJo9b2vqo&usqp=CAU" alt="" className="userUpdateImg" />
                                <label htmlFor='file'><Publish className="userUpdateIcon"/></label>
                                <input type="file" id="file" style={{display: "none"}}></input>
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User
