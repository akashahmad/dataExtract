import React from 'react'
import './style.css'
import CloseImg from '../../assets/images/close.png';

export default (props) => {

    let {setSubmissionPopup, submissionPopup} = props;

    return (
        <>
            {submissionPopup === true ?
                <div className="container-fluid main-div-of-popup-component">
                    <div className="popup-background-color d-flex justify-content-center align-items-center">
                        <div className="main-div-of-popup">
                            <div className="d-flex justify-content-end mrg-top-30 mrg-right-40">
                                <img className="cursor-pointer" src={CloseImg} width="20" alt="cross-img"
                                    onClick={() => setSubmissionPopup(false)}
                                />
                            </div>
                            <div className="text-align-center mrg-top--20">
                                <h5 className="heading-h5 ">Thank You for Submission</h5>
                            </div>
                            <div className="msg-below-heading text-align-center">
                                <h6>Your Request has been processed Succesfully</h6>
                            </div>
                            <div className="btns-of-popup d-flex flex-column btn-fixed">
                                {/* download CSV button */}
                                <div className="d-flex justify-content-center ">
                                    <a href="">
                                        <button className="btn-common btn-blue cursor-pointer">Download</button>
                                    </a>
                                </div>
                                {/* Start new Simulation button */}
                                <div className="d-flex justify-content-center mrg-top-15">
                                    <button className="btn-common btn-green cursor-pointer"
                                    >Start New
                            </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""}
        </>
    );
}
