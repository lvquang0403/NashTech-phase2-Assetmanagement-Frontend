import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { Loading } from "notiflix/build/notiflix-loading-aio";
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';
import { ToastContainer, toast } from 'react-toastify';
import getLocationInSession from '../../utils/getLocationInSession';
import formatDate from '../../utils/formatDate';
const CreateUserForm = ({ user }) => {
    const { register, watch, handleSubmit, trigger, setValue, control, formState: { errors } } = useForm({ mode: "onChange" });
    const [isDisable, setDisable] = useState(true)
    const [roles, setRoles] = useState([])
    const navigate = useNavigate();
    const submitBtn = useRef();

    const onSubmit = (data) => {
        data.lastName = data.lastName.trim()
        data.firstName = data.firstName.trim()
        submitBtn.current.disabled = true
        Loading.standard("Loading...");
        // check location id
        let locationID = getLocationInSession();
        if (locationID === null) {
            alert("The administrator's location could not be found");
            Loading.remove();
            return null;
        }
        if (user) {
            UserService.updateById(data, user.id)
                .then(res => {
                    Loading.remove();
                    navigate("/manage-user");
                })
        } else {
            UserService.createUser(data, locationID)
                .then(res => {
                    navigate("/manage-user");
                })
                .catch(res => {
                    Loading.remove();
                    toast.error('Error !!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
        }
    }
    const watchAllFields = watch();
    console.log(watchAllFields.birth)
    useEffect(() => {
        if (user && user.id) {
            let gender = ''
            if (user.gender === 'Female') {
                gender = 'FEMALE'
            }
            else {
                gender = 'MALE'
            }
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("birth", user.birth);
            setValue("gender", gender);
            setValue("joinedDate", user.joinedDate);
            setValue("roleId", user.role.id);
        }
        else {
            setValue("gender", "FEMALE");
        }
    }, [user, roles])
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

    const requiredCondition = (string) => {
        return string.trim() !== '';
    }

    const validDateConfidtion = (date) => {
        const day = new Date(date);
        const min = new Date('1900-01-01');
        const max = new Date('3000-01-01');
        return day.getTime() < max.getTime() && day.getTime() > min.getTime()
    }

    const joinedDateCondition = (date) => {
        if (watchAllFields.birth) {
            const joinedDate = new Date(date);
            const dateOfBirth = new Date(watchAllFields.birth)
            return joinedDate.getTime() > dateOfBirth.getTime()
        }
        return true
    }
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
            <ToastContainer></ToastContainer>
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
                                maxLength="30"
                                type="text"
                                {...register("firstName", { validate: { requiredCondition, specialCharCondition } })}
                                className="form-control ms-3"
                            />
                        </div>
                        <div style={{ marginLeft: "124px" }} >
                            {
                                errors.firstName && errors.firstName.type === "requiredCondition" && (
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
                                maxLength="30"
                                type="text"
                                {...register("lastName", { validate: { requiredCondition, specialCharCondition } })}
                                className="form-control ms-3" />
                        </div>
                        <div style={{ marginLeft: "124px" }} >
                            {
                                errors.lastName && errors.lastName.type === "requiredCondition" && (
                                    <div className="text-danger">This is required field</div>
                                )
                            }
                            {
                                errors.lastName && errors.lastName.type === "specialCharCondition" && (
                                    <div className="text-danger">Only accept word</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto pe-4">
                            <label className="col-form-label">Date of Birth</label>
                        </div>
                        <div className="col-auto">
                            {/* <Controller
                                control={control}
                                name='date-input'
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        format="DD/MM/YYYY"
                                        placeholder='dd/mm/yyyy'
                                        style={{padding: "18px 0px", paddingLeft: "12px", paddingRight:"27px"}}
                                    />
                                )}
                            /> */}
                            <input
                                style={{ width: "228px" }}
                                type="date"
                                min="1900-01-01"
                                max="3000-01-01"
                                {...register("birth", { validate: { ageCondition, validDateConfidtion }, required: true })}
                                className="form-control pe-3 __input-date" />
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
                            {
                                errors.birth && errors.birth.type === "validDateConfidtion" && (
                                    <div className="error text-danger">Invalid date</div>
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
                                min="1900-01-01"
                                max="3000-01-01"
                                style={{ width: "222px" }}
                                type="date"
                                {...register("joinedDate", { validate: { joinedDateConditionNotSatAndSun, joinedDateCondition, validDateConfidtion }, required: true })}
                                className="form-control __input-date" />
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
                            }
                           {
                                errors.joinedDate && errors.joinedDate.type === "validDateConfidtion" && (
                                    <div className="error text-danger">Invalid date</div>
                                )
                            }
                            
                            </div>
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto pe-4">
                            <label className="col-form-label">Type</label>
                        </div>
                        <div className="col-auto" style={{ marginLeft: "58px", width: "238px" }}>
                            <select class="form-select" {...register("roleId", { required: true })} aria-label="Default select example">
                                <option value=""></option>
                                {roles.length > 0 && roles.map(role => (
                                    <option value={role.id} key={role.id}>{role.name}</option>
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
                            <input type="submit" disabled={isDisable} ref={submitBtn} value="Save" className='btn btn-danger' style={{ border: "solid 1px black", marginLeft: "182px" }}></input>
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
