import React, { useEffect, useState } from 'react'
import CreateUserForm from '../../components/user/CreateUserForm'
import UserService from '../../services/UserService'
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { useParams } from 'react-router-dom'

const EditUserPage = () => {
    let { id } = useParams();
    const[user, setUser] = useState({})

    useEffect(()=>{
        Loading.standard("Loading...");
        UserService.getById(id).then(res => {
            Loading.remove();
            setUser(res.data)
        })
    },[])
    return (
        <>
            <CreateUserForm user={user}></CreateUserForm>
        </>
    )
}

export default EditUserPage
