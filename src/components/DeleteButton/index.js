import { useState } from "react";

import Button from "../IconButton";
import Modal from "../Modal.js";

import "./styles.css";

const DeleteButton = ({ handleOnConfirm, children, ...rest }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  return (
    <Button {...rest} onClick={() => setIsDeleteModalVisible(true)}>
      {children}
      <Modal
        isOpen={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      >
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this item?</p>
        <div className="modal-actions">
          <button
            className="btn-cancel"
            onClick={() => setIsDeleteModalVisible(false)}
          >
            Cancel
          </button>
          <button className="btn-confirm" onClick={handleOnConfirm}>
            Delete
          </button>
        </div>
      </Modal>
    </Button>
  );
};

export default DeleteButton;
