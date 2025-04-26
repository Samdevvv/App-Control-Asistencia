import React, { useState, createContext, useContext } from "react";
import "../estilos/ModalManager.css";
import { FaCheckCircle, FaExclamationCircle, FaQuestionCircle } from "react-icons/fa";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ type: "", message: "", onConfirm: null, isOpen: false });

  const showModal = (type, message, onConfirm = null) => {
    setModal({ type, message, onConfirm, isOpen: true });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleConfirm = () => {
    if (modal.onConfirm) modal.onConfirm();
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {modal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">
              {modal.type === "success" && <FaCheckCircle className="success-icon" />}
              {modal.type === "error" && <FaExclamationCircle className="error-icon" />}
              {modal.type === "confirmation" && <FaQuestionCircle className="confirmation-icon" />}
              {modal.type === "welcome" && <FaCheckCircle className="welcome-icon" />}
            </div>
            <h2>
              {modal.type === "success" && "Success"}
              {modal.type === "error" && "Error"}
              {modal.type === "confirmation" && "Confirm Action"}
              {modal.type === "welcome" && "Welcome!"}
            </h2>
            <p>{modal.message}</p>
            <div className="modal-buttons">
              {modal.type === "confirmation" ? (
                <>
                  <button className="btn-confirm" onClick={handleConfirm}>Confirm</button>
                  <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                </>
              ) : (
                <button className="btn-close" onClick={closeModal}>Close</button>
              )}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;