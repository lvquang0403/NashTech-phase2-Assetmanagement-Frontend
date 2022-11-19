import React, { useEffect, useState } from 'react'
import CreateUserForm from '../components/user/CreateUserForm'
import UserService from '../services/UserService'
import { useParams } from 'react-router-dom'

const EditUserPage = () => {
    let { userId } = useParams();
    const[user, setUser] = useState({})
    userId = "SD0001"
    useEffect(()=>{
        UserService.getById(userId).then(res => setUser(res.data))
    },[])
    return (
        <>
            <CreateUserForm user={user}></CreateUserForm>
        </>
    )
}

export default EditUserPage
