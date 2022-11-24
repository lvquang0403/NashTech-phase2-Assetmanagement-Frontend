import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ChangePassFirst from '../../components/modal/ChangePassFirst';

const HomePage = () => {
  const[active, setActive] = useState(false)
  useEffect(() => {
    if (window.sessionStorage.getItem('user')) {
      const userJson = window.sessionStorage.getItem('user')
      const status = JSON.parse(userJson).status
      console.log(status)
      if(status === ""){
        setActive(true)
      }
    }
  }, [])
  return (
    <>
    <ChangePassFirst active={active} setActive={setActive}></ChangePassFirst>
      <div>HomePage</div>
    </>
  );
};

export default HomePage;