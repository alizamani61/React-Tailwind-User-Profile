import { Link } from "react-router-dom";

const ProfileTabs = ({ activePage }) => {

    return (
        <>
            <li>
                <Link to="/profile" className={`${activePage == "edit" ? "active" : ""}`}>ویرایش</Link>
            </li>
            <li>
                <Link className={`${activePage == "images" ? "active" : ""}`} to="/profile/images">تصاویر</Link>
            </li>
            <li>
                <Link className={`${activePage == "skills" ? "active" : ""}`} to="/profile/skills">مهارت</Link>
            </li>
            <li>
                <Link className={`${activePage == "portfolio" ? "active" : ""}`} to="/profile/portfolio">نمونه کار</Link>
            </li>
            <li>
                <Link className={`${activePage == "resume" ? "active" : ""}`} to="/profile/resume">رزومه</Link>
            </li>
            <li>
                <Link className={`${activePage == "introduced" ? "active" : ""}`} to="/profile/introduced">معرف</Link>
            </li>
        </>
    )
};

export default ProfileTabs;