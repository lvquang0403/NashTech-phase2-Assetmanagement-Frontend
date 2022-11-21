import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';
const CreateUserForm = ({ user }) => {
    const { register, watch, handleSubmit, trigger, setValue, formState: { errors } } = useForm({ mode: "onChange" });
    const [isDisable, setDisable] = useState(true)
    const [roles, setRoles] = useState([])
    const navigate = useNavigate();
    const locationId = 1;
    const onSubmit = (data) => {

        if (user) {
            UserService.updateById(data, user.id)
                .then(res => {
                    navigate("/manage-user");
                })
        } else {
            UserService.createUser(data, locationId)
                .then(res => {
                    navigate("/manage-user");
                })
                .catch(res => console.log(res))
        }
    }
    const watchAllFields = watch();
    useEffect(() => {
        if (user && user.id) {
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("birth", user.birth);
            setValue("gender", user.gender);
            setValue("joinedDate", user.joinedDate);
            setValue("roleId", user.role.id);
        }
    }, [user])
    useEffect(() => {
        if (watchAllFields.joinedDate) {
            trigger("joinedDate")
        }
    }, [watchAllFields.birth])

    useEffect(() => {
        onChangeButton();
    }, [watchAllFields])

    useEffect(() => {
        RoleService.getRoles()
            .then(res => setRoles(res.data))
    }, [])
    const onChangeButton = () => {

        const isEmpty = Object.keys(errors).length === 0;
        if (watchAllFields.birth !== "" && watchAllFields.firstName !== ""
            && watchAllFields.gender !== null && watchAllFields.joinedDate !== ""
            && watchAllFields.lastName !== "" && watchAllFields.roleId !== "" && isEmpty) {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }

    const specialCharCondition = (string) => {
        const specialChars = /^[a-zA-Z\\s   ]+$/;
        return specialChars.test(string)
    }



    const joinedDateCondition = (date) => {
        if(watchAllFields.birth){
            const joinedDate = new Date(date);
            const dateOfBirth = new Date(watchAllFields.birth)
            return joinedDate.getTime() > dateOfBirth.getTime()
        }
        return true
    }
    console.log(watchAllFields)

    const joinedDateConditionNotSatAndSun = (date) => {
        const joinedDate = new Date(date);
        return joinedDate.getDay() !== 0 && joinedDate.getDay() !== 6;
    }

    const ageCondition = (date) => {
        const dob = new Date(date);
        const ageNumber = Date.now() - dob;
        return (ageNumber / 31536000000) >= 18
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-50">
                <div>{
                    user ? <h4 className="text-danger">Edit User</h4> :
                        <h4 className="text-danger">Create New User</h4>
                }
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto pe-4">
                            <label className="col-form-label">First Name</label>
                        </div>
                        <div className="col-auto">
                            <input
                                disabled={user ? true : false}
                                maxlength="30"
                                type="text"
                                {...register("firstName", { required: true, validate: { specialCharCondition } })}
                                className="form-control ms-3"
                            />
                        </div>
                        <div style={{ marginLeft: "124px" }} >
                            {
                                errors.firstName && errors.firstName.type === "required" && (
                                    <div className="text-danger">This is required field</div>
                                )
                            }
                            {
                                errors.firstName && errors.firstName.type === "specialCharCondition" && (
                                    <div className="text-danger">Only accept word</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto pe-4">
                            <label className="col-form-label">Last Name</label>
                        </div>
                        <div className="col-auto">
                            <input
                                disabled={user ? true : false}
                                maxlength="30"
                                type="text"
                                {...register("lastName", { required: true, validate: { specialCharCondition } })}
                                className="form-control ms-3" />
                        </div>
                        <div style={{ marginLeft: "124px" }} >
                            {
                                errors.lastName && errors.lastName.type === "required" && (
                                    <div className="text-danger">This is required field</div>
                                )
                            }
                            {
                                errors.lastName && errors.lastName.type === "specialCharCondition" && (
                                    <div className="text-danger">Only accept wordr</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto pe-4">
                            <label className="col-form-label">Date of Birth</label>
                        </div>
                        <div className="col-auto">
                            <input
                                style={{ width: "225px" }}
                                type="date"
                                {...register("birth", { validate: { ageCondition }, required: true })}
                                className="form-control pe-4" />
                            {
                                errors.birth && errors.birth.type === "ageCondition" && (
                                    <div className="error text-danger">User is under 18. Please select a different date</div>
                                )
                            }
                            {
                                errors.birth && errors.birth.type === "required" && (
                                    <div className="error text-danger">This is required field</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto pe-5">
                            <label className="col-form-label">Gender</label>
                        </div>
                        <div className="col-auto">
                            <input
                                type="radio"
                                style={{ accentColor: "red" }}
                                {...register("gender")}
                                value="FEMALE"
                                // checked={user ? "" : "checked"}
                                className='ms-3 me-1' />
                            <label >Female</label>
                        </div>
                        <div className="col-auto">
                            <input
                                style={{ accentColor: "red" }}
                                type="radio"
                                value="MALE"
                                {...register("gender")}
                                className='me-1' />
                            <label for="html">Male</label>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto">
                            <label className="col-form-label pe-4">Joined Date</label>
                        </div>
                        <div className="col-auto">
                            <input
                                style={{ width: "222px" }}
                                type="date"
                                {...register("joinedDate", { validate: { joinedDateConditionNotSatAndSun, joinedDateCondition }, required: true })}
                                className="form-control" />
                        </div>
                        <div style={{ marginLeft: "122px" }}>  {
                            errors.joinedDate && errors.joinedDate.type === "joinedDateCondition" && (
                                <div className="error text-danger">Joined date is not later than Date of Birth. Please select a different date</div>
                            )

                        }
                            {
                                errors.joinedDate && errors.joinedDate.type === "joinedDateConditionNotSatAndSun" && (
                                    <div className="error text-danger">Joined date is Saturday or Sunday. Please select a different date</div>
                                )
                            }
                            {
                                errors.joinedDate && errors.joinedDate.type === "required" && (
                                    <div className="error text-danger">This is required field</div>
                                )
                            }</div>
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto pe-4">
                            <label className="col-form-label">Type</label>
                        </div>
                        <div className="col-auto" style={{ marginLeft: "58px", width: "238px" }}>
                            <select class="form-select" {...register("roleId", { required: true })} aria-label="Default select example">
                                <option value=""></option>
                                {roles.length > 0 && roles.map(role => (
                                    <option value={role.id}>{role.name}</option>
                                    // selected={user && user.roleId === role.id && "selected"}
                                ))}
                            </select>
                            {
                                errors.roleId && errors.roleId.type === "required" && (
                                    <div className="error text-danger">This is required field</div>
                                )
                            }

                        </div>
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div>
                            <input type="submit" disabled={isDisable} value="Save" className='btn btn-danger' style={{ border: "solid 1px black", marginLeft: "182px" }}></input>
                            <Link to="/manage-user">
                                <input type="button" value="Cancel" className='btn btn-light' style={{ border: "solid 1px black", marginLeft: "32px" }}></input>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateUserForm
