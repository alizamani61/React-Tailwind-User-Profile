import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { appendData } from "../Redux/action";
import useToken from "../Services/tokenService";
import { useNavigate } from "react-router-dom";
import { BsHeart, BsHouse, BsCheck2All, BsChevronDown, BsChevronUp, BsList, BsAlarm } from 'react-icons/bs';


const Home = props => {
    const navigate = useNavigate();
    const { token, removeToken } = useToken();
    const { color } = props;

    useEffect(() => {
        if (!token)
            navigate(`/login`);
    }, []);

    const onClickHandler = (e) => {
        e.preventDefault();


        props.appendData({
            color: "success",
        });
    }



    return (
        <div>

            <div className={`card`}>
                <h5 className="card-header">
                    <BsHouse className={`card-icon`} size={25}/>
                    داشبورد
                </h5>
                <hr className={`header-line`}/>
                <p>Home &nbsp;{color}</p>
                <BsAlarm />
                <button className={`btn btn-${color}`} onClick={onClickHandler}>Green Color</button>
            </div>


        </div>
    )
};
const mapDispatchToProps = {
    appendData
}

const mapStateToProps = state => ({
    color: state.color,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);