import React from "react";

export default () => {
  return (<div className="mainWrapper">
    <img className="loader" src={require('../../assets/images/loader.gif')} alt="" />
    <h2>Please wait ...</h2>
  </div>)
}
