import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [cats,setCats]=useState([])

    useEffect(() => {
      const getCats = async ()=>{
        const res = await axios.get('/categories');
        setCats(res.data)
      }
      getCats()
    }, [])
    
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="./nature.jfif" alt=""></img>
        <p>
        This is a place where we share our thoughts, ideas, and experiences on different topics.We are passionate and dedicated to provide you with insightful and informative content that you can use to improve your life.</p>
      </div>

      {/* <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c)=>(
            <Link to={`/?cat=${c.name}` } className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
          
        </ul>
      </div> */}

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
        </div>
      </div>
    </div>
  );
}
