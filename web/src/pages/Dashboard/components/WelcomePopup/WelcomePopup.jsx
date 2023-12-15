import React,{useState} from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import w1 from '../../../../assets/dashboardimg/welcomevector.png'
import Button from '../../../../components/Button/Button';

const WelcomePopup = ({
    showPreview,
setShowPreview,
}) => {
    const handlePreviewClose = () => setShowPreview(false);
   
  return (
    <Modal
      show={showPreview}
      onHide={handlePreviewClose}
      animation={true}
      centered
      className='welcome-modal'
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
            <div className="vector-image">
              <img src={w1} alt="" className='img-fluid' />
            </div>
            <div className="content-box text-center">
               <h3>Welcome to the thinkkk dashboard</h3>
               <p>Thinkkk application is used to show the different ideas associated with a particular concept. It is a useful tool for brainstorming. The concept is usually shown in the middle, while the different ideas are shown branching off in different directions. </p>
               <div className="get-start">
                <Button isLink={true} commonClass="common-btn" text="Get Started" type="button" onClick={()=>handlePreviewClose()}/>
               </div>
            </div>
      </Modal.Body>
    </Modal>
  )
}

export default WelcomePopup