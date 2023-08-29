// import React, { useContext } from "react";
// import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

// const HomePage = () => {
//   const authContext = useContext(AuthContext);

//   if (!authContext.token) {
//     return <p>You must be logged in to view this page.</p>;
//   }

//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       <p>This is the home page of our application.</p>
//     </div>
//   );
// };

// export default HomePage;

// import React, { useContext, useState } from "react";
// import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
// import { Modal, Button } from "react-bootstrap";
// import LoginForm from "./LoginForm";
// import SignUpForm from "./SignUpForm";

// const HomePage = () => {
//   const authContext = useContext(AuthContext);
//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   if (!authContext.token) {
//     return (
//       <div>
//         <p>You must be logged in to view this page.</p>
//         <Button variant="primary" onClick={handleShowModal}>
//           Login/Signup
//         </Button>
//         <Modal show={showModal} onHide={handleCloseModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Login/Signup</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <LoginForm />
//             <SignUpForm />
//           </Modal.Body>
//         </Modal>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       <p>This is the home page of our application.</p>
//     </div>
//   );
// };

// export default HomePage;

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

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
  };

  if (!authContext.token) {
    return (
      <div>
        <h1>Travel With Confidence</h1>
        <p></p>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login/Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm />
            <p>or</p>
            <SignUpForm />
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <h1 className="travel-with-confidence">Travel With Confidence</h1>
      <p>This is the home page of our application.</p>
    </div>
  );
};

export default HomePage;