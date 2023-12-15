import React from "react";
import {Modal } from "react-bootstrap";
import request from "../../util/request";
import bin from "../../assets/images/deletebin.png";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { thoughtDeleteAction } from "../../Redux/Actions/ThoughtAction";
import { userDeleteAction } from "../../Redux/Actions/UserActions";
import {thoughtmanagement,usermanagement} from '../../config/routingConsts'
const DeleteModal = ({ show, setShow, currentId, title }) => {

  const navigate= useNavigate()
  const dispatch= useDispatch()
  const location = useLocation()

  const handleClose = () => setShow(false);

  const handleDelete = () => {
    console.log(currentId,"id get from delete modal:");
  //   dispatch(thoughtDeleteAction({thoughtId:currentId},()=>{
  //     navigate(thoughtmanagement,{state:"deleteThought"})
  // }))
  //   handleClose();

      if (currentId) {
      dispatch(thoughtDeleteAction({ thoughtId: currentId },()=>{
          navigate(thoughtmanagement , {state : "currentId"})
      }));
      handleClose();
    }
  };

  const handleDelete2 = () => {
      // dispatch(userDeleteAction({userId:currentId},()=>{
      //   navigate(usermanagement,{state:"currentId"})
      //  }))
      // handleClose();
        console.log(currentId , "user mana delete id from delete modal : : : ");
       dispatch(userDeleteAction({ userId: currentId },()=>{
          navigate(usermanagement , {state : "currentId"})
      }));
      handleClose();
};

  switch (title) {
    case (title = "deletethought"):
      return (
        <Modal
        key="1"
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="delete-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Body>
            <div className="detelemodal-box">
              <div className="delete-image">
                <img src={bin} alt="" />
              </div>
              <h4>
                Are you sure you want to <br /> delete this thought?
              </h4>
              <div class="quescbtn-box dismiss-modal">
                <button className="common-btn yes" onClick={()=>handleDelete()}>
                  Yes
                </button>
                <button className="common-btn no" onClick={handleClose}>
                  No
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );

    case (title = "deleteuser"):
      return (
        <Modal
        key="2"
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="delete-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Body>
            <div className="detelemodal-box">
              <div className="delete-image">
                <img src={bin} alt="" />
              </div>
              <h4>
                Are you sure you want to <br /> delete this user?
              </h4>
              <div class="quescbtn-box dismiss-modal">
                <button className="common-btn yes" onClick={handleDelete2}>
                  Yes
                </button>
                <button className="common-btn no" onClick={handleClose}>
                  No
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );

    default:
      break;
  }
};

export default React.memo(DeleteModal);
