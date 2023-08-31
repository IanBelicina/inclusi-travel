import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Modal, Button } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import BootstrapCarouselComponent from "./BootstrapCarouselComponent";

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!authContext.token) {
        setShowModal(true);
      }
    }, 5000);

    return () => clearTimeout(delay);
  }, [authContext.token]);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowSignUpForm(false);
  };

  const handleShowSignUpForm = () => {
    setShowSignUpForm(true);
  };

  if (!authContext.token) {
    return (
      <div>
        
        <div>
          
          <BootstrapCarouselComponent />
        </div>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="customModal"
        >
          {/* <Modal.Header>
            <Modal.Title>Login/Signup</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <LoginForm />
            <div>
              {!showSignUpForm && (
                <Button variant="primary" onClick={handleShowSignUpForm}>
                  Register Here
                </Button>
              )}
              {showSignUpForm && <SignUpForm />}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      
      <BootstrapCarouselComponent />
    </div>
  );
};

export default HomePage;
