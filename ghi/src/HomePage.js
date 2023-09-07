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
      <div className="home-page">
        <h1>Welcome to Your Website</h1>
        <p>
          This is a description of your website. You can provide information
          about what your website offers, its purpose, and more.
        </p>
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
    <div className="home-page">
      <div className="website-description">
        <h1>Welcome to InclusiTravel!</h1>
        <p>
          InclusiTravel is the ultimate destination for individuals who want to
          make informed choices when it comes to accessible locations. Whether
          you're a person with disabilities seeking accessible venues or a
          compassionate advocate for inclusivity, InclusiTravel empowers you to
          leave your mark and shape a more inclusive world.
        </p>
      </div>
      <BootstrapCarouselComponent />
    </div>
  );
};

export default HomePage;
