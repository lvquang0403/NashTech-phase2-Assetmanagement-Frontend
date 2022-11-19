import React, { useEffect, useState } from 'react'
import CreateUserForm from '../components/user/CreateUserForm'
import UserService from '../services/UserService'
import { useParams } from 'react-router-dom'

const EditUserPage = () => {
    let { id } = useParams();
    const[user, setUser] = useState({})
    useEffect(()=>{
        UserService.getById(id).then(res => setUser(res.data))
    },[])
    return (
        <>
            <CreateUserForm user={user}></CreateUserForm>
        </>
    )
}

export default EditUserPage
