import React from 'react'
import HeaderImage from '../../assets/images/bitmap.png'
import './style.css'
import {withRouter} from 'react-router-dom';
import cookie from 'react-cookies'


const Header = (props) => {
    let {history, hideLoginHeader, user} = props;


    const logout = () => {
        let age = localStorage.getItem("age");
        cookie.remove('token', {
            maxAge: parseInt(age),
            path: "/"
        });
        localStorage.removeItem("age");
        localStorage.removeItem("currentUser");
        history.push("/login");
    };
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between main-header-div head-color">
                {/* header image */}
                <div className="img-header">
                    <img src={HeaderImage} alt="RiverSide Insight pic"/>
                </div>
                {/* header links */}
                {!hideLoginHeader && <div>
                    <ul className="d-flex justify-content-between main-div-list">
                        <li className="cursor-pointer">Hello! {user && user.userName ? user.userName : ""}</li>
                        {/* empty div for Vertical line */}
                        <div className="vertical-line"></div>
                        <li className="cursor-pointer" onClick={() => {
                            history.push("/");
                        }}>Home
                        </li>
                        {/* empty div for Vertical line */}
                        <div className="vertical-line"></div>
                        <li className="cursor-pointer" onClick={() => logout()}>Logout</li>
                    </ul>
                </div>}
            </div>
        </div>
    );
}

export default withRouter(Header)

