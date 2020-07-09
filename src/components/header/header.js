import React from 'react'
import HeaderImage from '../../assets/images/bitmap.png'
import './style.css'

export default () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between main-header-div head-color">
        {/* header image */}
        <div className="img-header">
          <img src={HeaderImage} alt="RiverSide Insight pic" />
        </div>
        {/* header links */}
        <div>
          <ul className="d-flex justify-content-between main-div-list">
            <li className="cursor-pointer">Hello!</li>
            {/* empty div for Vertical line */}
            <div className="vertical-line"></div>
            <li className="cursor-pointer">Home
            </li>
            {/* empty div for Vertical line */}
            <div className="vertical-line"></div>
            <li className="cursor-pointer" >Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
