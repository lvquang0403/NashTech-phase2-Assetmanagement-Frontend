import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useForm } from "react-hook-form";
import UserService from '../../services/UserService';
import { Loading } from "notiflix/build/notiflix-loading-aio";

const ChangePassFirst = ({ active, setActive }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: "onChange" });
    // const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChangePass = () => {
        Loading.standard("Loading...");
        const watchAllFields = watch();
        console.log(watchAllFields)
        window.sessionStorage.getItem('user')
        const userJson = window.sessionStorage.getItem('user')
        const user = JSON.parse(userJson)
        const id = user.id
        //set status
        user.status = "Active"
        //restore into section
        sessionStorage.clear();
        sessionStorage.setItem("user", JSON.stringify(user));
        setActive(false)
        UserService.changePassFirst(watchAllFields.password)
        .then(res => {
            Loading.remove()
        })
        .catch(res => {
            console.log(res)
            Loading.remove()
        })
    }
    const numCharCondition = (string) => {
        console.log(string.lenght)
        return string.length < 21 && string.length > 5
    }
    return (
        <div
            className={"modal fade " + (active ? "show d-block bg-dark p-2 text-dark bg-opacity-50" : " d-none")}
            tabIndex="-1"
            role="dialog"
        // style={{opacity:"0.5"}}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-sm  border border-dark">
                    <div className="modal-header">
                        <h5 className="modal-title text-danger">Change Password</h5>
                    </div>
                    <div className="modal-body">
                        <div className="text  ms-3 mb-3">
                            <h6>
                                This is a first time you logged in. <br /> You have to change
                                password to continue.
                            </h6>
                        </div>
                        <div className="change-password mt-2 ms-3">
                            <label htmlFor="pass" className="pe-2">
                                New Password
                            </label>
                            <div style={{ position: "absolute", right: "171px", bottom: "72px", with: "20px", height: "20px" }}>
                                {!showPassword ? (
                                    <AiFillEye
                                        onClick={() => setShowPassword(true)}
                                    ></AiFillEye>
                                ) : (
                                    <AiFillEyeInvisible
                                        onClick={() => setShowPassword(false)}
                                    ></AiFillEyeInvisible>
                                )}
                            </div>
                            <input
                                placeholder='Enter password'
                                type={showPassword ? "text" : "password"}
                                id="pass"
                                className='position-relative'
                                // value={newPassword}
                                {...register("password", { validate: { numCharCondition } })}
                            // onChange={(e) => setNewPassword(e.target.value)}

                            />

                        </div>
                        <div>
                            {
                                errors.password && errors.password.type === "numCharCondition" && (
                                    <span className="text-danger">this is</span>
                                )
                            }
                        </div>
                        <div className="button-save d-flex justify-content-center mt-2 ms-5">
                            <button style={{ marginLeft: "64px" }}
                                type="button"
                                className="btn btn-danger "
                                onClick={handleChangePass}
                                id="btnSave"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassFirst
