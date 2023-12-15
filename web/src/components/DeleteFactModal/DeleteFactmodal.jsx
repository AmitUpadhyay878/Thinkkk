import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import binImg from "../../assets/dashboardimg/dustbin.png";
import { actionItemDeleteAction } from "../../Redux/Actions/ActionItemActions";
import { thoughDeleteAction } from "../../Redux/Actions/ThoughAction";
import Button from "../Button/Button";
import { useNavigate,useLocation } from "react-router";
import { home, thoughts } from "../../config/routingConsts";
import axios from "axios";
import { factDeleteAction } from "../../Redux/Actions/Facts";

const DeleteFactmodal = ({
  show,
  setShow,
  deleteFactId
}) => {

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state.Auth);
 
  const handleClose2 = () => setShow(false);


  const deleteFact = async () =>{
    if(deleteFactId){
      dispatch(factDeleteAction({factId:deleteFactId}))
      setShow(false)
    // await axios.post(`http://192.168.1.158:3007/api/v1/fact/delete`,{factId: deleteFactId},{ headers: { Authorization: `Bearer ${auth.tokenData}` } })
    // .then((res)=>(res.data))
    // .catch((err)=>console.log("err",err))
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="delete-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="detelemodal-box">
            <div className="delete-image">
              <img src={binImg} alt="" loading="lazy" />
            </div>
            <h4>
              Are you sure you want to delete this fact?
            </h4>
            <div className="quescbtn-box dismiss-modal">
              <Button
                text="Yes"
                addedClass="yes"
                onClick={deleteFact}
              />
              <Button text="No" addedClass="no" onClick={handleClose2} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(DeleteFactmodal);
