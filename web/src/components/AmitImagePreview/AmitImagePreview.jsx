import React from "react";
import { Modal } from "react-bootstrap";

const AmitImagePreview = ({
  showPreview,
  setShowPreview,
  imagePrev,
  setImagePrev,
}) => {
  const handlePreviewClose = () => setShowPreview(false);

  return (
    <Modal
      show={showPreview}
      onHide={handlePreviewClose}
      animation={false}
      centered
      className="previewmodal"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="thought-image">
          {imagePrev ? (
            <img src={imagePrev} alt="" width="100%" height="100%" centered />
          ) : (
            "No Image"
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AmitImagePreview;
