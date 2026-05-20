import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {GlobalContext} from "./GlobalContext";


import Home from "./Home";
export default function Navbar({user}) {

    const { logout } = useContext(GlobalContext);


  
  return (
    

     


        
  <header className="sticky top-0 z-50 bg-stone-200 border-b border-stone-300">
    <div className="mx-auto flex h-[60px] max-w-[1480px] items-center justify-between px-10">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0 no-underline">
        <span className="text-[22px] font-bold tracking-tighter">
          AUTHY.
        </span>
      </Link>

      {/* Right actions */}
      <div className="flex flex-shrink-0 items-center gap-6">


      {(user.isconnected===false) ? (
          < Link to="/login" className="group relative text-[13.5px] font-normal text-zinc-700 no-underline whitespace-nowrap">Login</Link>
        ) : ""}

       {(user.isconnected===false) ? (
         < Link to="/register" className="group relative text-[13.5px] font-normal text-zinc-700 no-underline whitespace-nowrap">Sign Up</Link>
        ) : ""}

        



        
        

{/* Admin link */}

        {(user.isconnected===true && user.role === 'admin') ? (
          <Link to="/admin" className="group relative text-[13.5px] font-normal text-zinc-700 no-underline whitespace-nowrap">
            Admin Dashboard
          </Link>
        ) : ""}



          {(user.isconnected===true && user.role === 'admin' || user.role === 'user') ? (
          <Link to="/" onClick={logout} className="group relative text-[13.5px] font-normal text-zinc-700 no-underline whitespace-nowrap">
            logout
          </Link>
        ) : ""}


        <Link to="/"  className="group relative text-[13.5px] font-normal text-zinc-700 no-underline whitespace-nowrap">
            Home 
          </Link>

        

        

        <Link to="/profile" className="group relative text-[13.5px] font-normal text-zinc-700 no-underline whitespace-nowrap">
         <button className="h-9 cursor-pointer rounded border border-zinc-900 bg-transparent px-5 text-[13px] font-normal text-zinc-900 transition-all duration-150 hover:bg-zinc-900 hover:text-white whitespace-nowrap">
          See Your Profile
        </button>
        </Link  >
        <div className="h-5 w-px bg-zinc-300" />
        
      </div>
    </div>
  </header>


  
  );
}