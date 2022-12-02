import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";


const tabList = [
  {
    id: 1,
    name: "Home",
    link: "/",
    role: "Staff",
  },
  {
    id: 2,
    name: "Home",
    link: "/",
    role: "Admin",
  },
  {
    id: 2,
    name: "Manage User",
    link: "/manage-user",
    role: "Admin",
  },
  {
    id: 3,
    name: "Manage Asset",
    link: "/manage-asset",
    role: "Admin",
  },
  {
    id: 4,
    name: "Manage Assignment",
    link: "/manage-assignment",
    role: "Admin",
  },
  {
    id: 5,
    name: "Request for Returning",
    link: "/manage-request",
    role: "Admin",
  },
  {
    id: 6,
    name: "Report",
    link: "/report",
    role: "Admin",
  },
];

const Main = () => {
  const navigate = useNavigate()
  const[tabs, setTabs] = useState([])
  const[header, setHeader] = useState(tabList[0].name)

  const handleNavigate = (name) => {
    setHeader(name)
  }
  useEffect(() => {
    if(!header){
      setHeader(tabList[0].name)
    }
  },[header])

  useEffect(()=> {
    if(window.sessionStorage.getItem('user')){
      const userJson = window.sessionStorage.getItem('user')
      const role = JSON.parse(userJson).role
      setTabs(tabList.filter(tab => tab.role === role))
      setHeader(tabs[0])
      // navigate("/")
    }
    else{
      navigate("/login")
    }
  },[])
  return (
    <>
      <Header title={header}></Header>
      <div style={{ display: "flex" }}>
        <Sidebar tabs={tabs} handleNavigate={handleNavigate}></Sidebar>

        {/* Outlet dùng để nested những cái nằm trong Main (để muốn Route nào cũng có Header nên phải dùng Outlet như này) */}
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Main;
