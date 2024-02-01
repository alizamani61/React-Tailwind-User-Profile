import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import useToken from "../../Services/tokenService";

import { BsKey, BsPerson, BsEnvelope } from 'react-icons/bs';

const Register = props => {
    const navigate = useNavigate();
    const { token, errors, setToken } = useToken();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    useEffect(() => {
        if (token)
            navigate(`/`);

        console.log(errors);
    }, [token, errors]);

    const register = async (credentials) => {
        return await fetch(`${process.env.REACT_APP_BASE_URL}/register?user_name=${credentials.username}&email=${credentials.email}&password=${credentials.password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(credentials)
        }).then(data => data.json())

    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const login_data = await register({ user_name: username, email: email, password: password, password_confirmation: confirmation });

        if (login_data && login_data != undefined)
            setToken(login_data);
    }



    return (
        <section dir="rtl" className={`flex flex-col md:flex-row items-center h-screen`}>
            <div className={`basis-5/12 p-5 md:p-20 w-full`}>
                {/* <div className="relative w-full flex justify-center mx-auto"> */}
                <div className={`w-full flex justify-center mx-auto`}>
                    <img className="rounded-full ring-2 ring-white outline outline-offset-4 outline-orange-500" src="https://cdn.karlancer.com/assets/images/ghorbanix94.png" alt="" />
                </div>

                <h2 className={`w-full text-center pt-5`}>ثبت نام</h2>
                <br />
                <form onSubmit={onSubmitForm}>
                    <div className={`group field-group`}>
                        <label>آدرس ایمیل</label>
                        <BsEnvelope className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                        <input className={`placeholder-style`} onChange={e => setEmail(e.target.value)} dir="ltr" type="text" aria-label="آدرس ایمیل" placeholder="آدرس ایمیل" />

                    </div>
                    {errors?.email &&
                        <div className="alert">
                            {errors?.email}
                            <div className="arrow"></div>
                        </div>
                    }
                    <div className={`group field-group`}>
                        <label>نام کاربری</label>
                        <BsPerson className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                        <input className={`placeholder-style`} onChange={e => setUsername(e.target.value)} dir="ltr" type="text" aria-label="نام کاربری" placeholder="نام کاربری" />
                    </div>
                    {errors?.user_name &&
                        <div className="alert">
                            {errors?.user_name}
                            <div className="arrow"></div>
                        </div>
                    }
                    <div className={`group field-group`}>
                        <label>رمز عبور</label>
                        <BsKey className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                        <input type="password" onChange={e => setPassword(e.target.value)} aria-label="رمز عبور" placeholder="رمز عبور" />
                    </div>
                    {errors?.password &&
                        <div className="alert">
                            {errors?.password}
                            <div className="arrow"></div>
                        </div>
                    }
                    <div className={`group field-group`}>
                        <label>تایید رمز عبور</label>
                        <BsKey className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                        <input type="password" onChange={e => setConfirmation(e.target.value)} aria-label="تایید رمز عبور" placeholder="تایید رمز عبور" />
                    </div>
                    {errors?.password_confirmation &&
                        <div className="alert">
                            {errors?.password_confirmation}
                            <div className="arrow"></div>
                        </div>
                    }
                    <button className={`float-left btn mt-5`} type="submit">ثبت نام</button>
                    <div className="clear-both"></div>
                    {errors?.message &&
                        <div className="alert">
                            {errors?.message}
                            <div className="arrow"></div>
                        </div>
                    }
                    <hr className="mt-5" />
                    <div className="block mt-2">
                        <Link to="/login" className="text-slate-400 text-xs font-thin float-right">حساب کاربری دارم</Link>
                        <Link to="/forgetpass" className="text-slate-400 text-xs font-thin float-left">فراموشی رمز عبور</Link>
                    </div>


                </form>
            </div>
            <div className={`hidden md:block basis-7/12`}>
                <img className="w-full" src="https://cdn.karlancer.com/assets/images/login-background-img.jpg" alt="" />
            </div>

        </section>
    )
};
export default Register;

