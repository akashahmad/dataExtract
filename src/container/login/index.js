import React, {useState} from 'react'
import './style.css'
import {withRouter} from 'react-router-dom';
import HeaderImage from '../../assets/images/bitmap.png';
import config from '../../config/config.json'
import Header from '../../components/header/container';
import cookie from 'react-cookies'

const Login = (props) => {
  let {history, dispatch} = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userAuthentication = e => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }
    else {
      let registeredUser = config.registeredUsers.find(singleUser => singleUser.login === username && singleUser.password === password);
      if (registeredUser) {
        localStorage.setItem("age", 86400);
        cookie.save('token', new Date().toISOString(), {maxAge: (86400), path: "/"});
        localStorage.setItem('currentUser', JSON.stringify({userName: registeredUser.login}));
        dispatch({
          type: "USER_DATA",
          payload: true,
          user: {userName: registeredUser.login}
        });
        history.push("/");
        setUsername("");
        setPassword("");
        history.push("/");

      } else {
        setError("Invalid User Name or Password");
      }
    }
  };
  return (
    <>
    <Header hideLoginHeader={true}/>
    <div className="container-fluid">
      <div className="Signin-main-div">
        <form className="d-flex justify-content-center" onSubmit={(event) => userAuthentication(event)}>
          <div className="inside-form d-flex">
            {/* left-side-image */}
            <div className="left-side-form-img">
              <div className="logo d-flex justify-content-center align-items-center logo-fixed">
                <img src={HeaderImage} alt="logo"/>
              </div>
            </div>
            {/* right side of input fields and heading */}
            <div className="right-side-main-div">
              {/* heading */}
              <div className="right-side-heading d-flex justify-content-center align-items-center">
                <h4 className="text-align-center">Adaptive Data File Extract Login</h4>
              </div>
              {/* input fields of UserName*/}
              <div className="d-flex justify-content-center  align-items-center flex-column">
                <div className="signin-input-field login-feild">
                  <div className="label-main-dev">
                    <label>User Name</label>
                  </div>
                  <input placeholder="" value={username ? username : ""} required onChange={event => {
                    setUsername(event.target.value)
                  }}/>
                </div>
              </div>
              {/* input fields of Password*/}
              <div
                className="d-flex justify-content-center input-field-password-main-div align-items-center flex-column">
                <div className="signin-input-field login-feild">
                  <div className="label-main-dev">
                    <label>Password</label>
                  </div>
                  <input placeholder="" type="password" value={password ? password : ""} onChange={event => {
                    setPassword(event.target.value)
                  }}/>
                  <div style={{color: "red"}}>
                    {error}
                  </div>
                </div>
              </div>
              {/* button */}
              <div className="d-flex justify-content-center cursor-pointer align-items-center mrg-top-40">
                <button className="btn-common btn-blue">Login</button>
              </div>

              {/* forgot Password */}
              <div className="d-flex forgot-password justify-content-center align-items-center mrg-top-10">
                <h6>Forgot Password</h6>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default withRouter(Login);
