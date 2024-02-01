import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { BsHeart, BsHouse, BsCheck2All, BsChevronDown, BsChevronUp, BsList, BsPerson } from 'react-icons/bs';
import nprogress from "nprogress";
import progstype from "./Styles/nprogress.css";
import Styles from './Styles/layout.module.css';
import useToken from "./Services/tokenService";


const Layout = props => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState();
    const [topmenu, setTopMenu] = useState(false);
    const [sideMenu, setSideMenu] = useState(false);
    const { token, removeToken } = useToken();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // showing progress bar when a route changed
    let location = useLocation();

    useEffect(() => {
        nprogress.start();
       
        nprogress.done();
        
    }, [location.pathname]);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!token)
            navigate(`/login`);
    }, [token]);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const toggleMenu = (e) => {
        e.preventDefault();
        setSideMenu(!sideMenu);
    }

    const setTopMenuHandler = () => {
        setTimeout(() => {
            setTopMenu(false);
        }, 200);
    }
    return (
        <div className={`${Styles.primary}`}>
            <div className={`${Styles.layout} `}>
                <div className={`${Styles.logo} shadow-lg`}>
                    <img src="https://parscoders.com/assets/admin/layout2/img/logo-default.png" alt="" />
                </div>
                <div className={`${Styles.topbar} shadow-lg`}>
                    {/*className="flex-1 pr-5 md:hidden"*/}
                    <div className={`${Styles.mb_menu}`}>
                        <a href="#" onClick={ e => toggleMenu(e)}>
                            <BsList size={30} />
                        </a>
                    </div>

                    <div className={`${Styles.mb_logo} sm:block md:hidden`}>
                        <a href="#">
                            <img className="w-50" src="https://cdn.karlancer.com/assets/karlancer-logo.png" alt="" />
                        </a>
                    </div>

                    <div className={`${Styles.user_menu}`}>
                        <a onClick={() => !topmenu ? setTopMenu(true) : setTopMenu(false)}>
                            
                            <BsPerson size={25} />
                            

                            <span className={`${Styles.user_name} hidden`}>{token && token.user_name}</span>
                            <BsChevronDown className={`${Styles.fdown} hidden`} size={10} />
                        </a>
                        <ul className={`${!topmenu ? "hidden" : ""} ${Styles.user_submenu} shadow-lg`}>
                            <li><Link to="/profile" onClick={setTopMenuHandler}>پروفایل</Link></li>
                            <li><Link to="#" onClick={setTopMenuHandler}>ویرایش رزومه</Link></li>
                            <li><Link to="/profile" onClick={setTopMenuHandler}>تغییر کلمه عبور</Link></li>
                            <li><Link to="/profile" onClick={setTopMenuHandler}>آمار</Link></li>
                            <li><Link to="/profile" onClick={removeToken}>خروج</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={`hidden ${Styles.side_menu} ${sideMenu ? Styles.active_side_menu : ""}`} onClick={setTopMenuHandler}>
                    <ul>
                        <li>
                            <a href="#">
                                <BsHouse size={25} />
                                داشبورد

                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <BsHeart size={25} />
                                دنبال کننده ها
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => menu != 'f' ? setMenu('f') : setMenu('')}>
                                <BsCheck2All size={25} />
                                <div className={`${Styles.dropdown}`}>
                                    فعالیت های من
                                    {menu != 'f' ?
                                        <BsChevronDown size={15} />
                                        :
                                        <BsChevronUp size={15} />
                                    }
                                </div>
                            </a>
                            <ul className={`${menu != 'f' && "hidden"}`}>
                                <li>
                                    <a href="#" >
                                        فعالیت ها
                                    </a>
                                </li>
                                <li>
                                    <a href="#" >
                                        درخواست جدید
                                    </a>
                                </li>
                                <li>
                                    <a href="#" >
                                        درخواست ها
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <BsHouse size={25} />
                                داشبورد
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <BsHouse size={25} />
                                داشبورد
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <BsHouse size={25} />
                                داشبورد
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={`${Styles.main}`} onClick={setTopMenuHandler}>
                    <div className={`${Styles.content}`}>
                        <Outlet />
                    </div>

                </div>

            </div>


        </div>


    )
};
export default Layout;
