import React from 'react'
import { Link } from 'react-router-dom';
import "./topbar.css"
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function Topbar() {
    const {user, dispatch} = useContext(Context) 
    const PF = "http://localhost:5000/images/"

const handleLogout=()=>{
    dispatch({type:"LOGOUT"})
}

    return (
    <div className='top'>
        <div className="topLeft">
            <i className="topIcon fa-brands fa-square-facebook"></i>
            <i className="topIcon fa-brands fa-square-instagram"></i>
            <i className="topIcon fa-brands fa-square-twitter"></i>
            <i className="topIcon fa-brands fa-square-pinterest"></i>
            </div>
        <div className="topCenter">
            <ul className='topList'>
                <li className='topListItem'><Link to='/' className='link'>HOME</Link></li>
                {/* <li className='topListItem'><Link to='/about' className='link'>ABOUT</Link></li> */}
                {/* <li className='topListItem'><Link to='/contacts' className='link'>CONTACT</Link></li> */}
                <li className='topListItem'><Link to='/write' className='link'>WRITE</Link></li>
                <li className='topListItem' onClick={handleLogout} >{user && 'LOGOUT'}</li>
            </ul>
        </div>
        <div className="topRight"> 
{/*         if user has loggedIn then only his profile picture will be shown. */}
            {
                user ? (
                    <Link to="/settings">
                {/* <img className='topImg' src={PF + user.profilePic} alt=''></img> */}
                <img className='topImg' src="empty-pp" alt=''></img>
                    </Link>
                ) :(
                    <>
                    <ul className='topList'>
                        <li className='topListItem'>
                        <Link to='/login' className='link'>Login</Link>
                        </li>
                        <li className='topListItem'>
                        <Link to='/register' className='link'>Register</Link>
                        </li>
                    </ul>                  
                    </>
                )
            }
            
            <i className=" topSearchIcon  fa-solid fa-magnifying-glass"></i>
        </div>
        </div>
  )
}
