import React, { useState } from 'react';
import { Button, Container, Jumbotron } from 'reactstrap';
import { useHistory } from "react-router-dom";

import BackgroundImg from '../commons/images/blue.png';
import * as API_ADMINS from "../admin/api/admin-api";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import LoginView from '../login/login-view';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: url(${BackgroundImg})
};
const textStyle = { color: 'white', };

function Home() {

    let history = useHistory();
    const [error, setError] = useState({ status: 0, errorMessage: null });

    const Login = details => {
        console.log(details);
        return API_ADMINS.login(details, (result, status, err) => {
          if (result !== null && (status === 200 || status === 201)) {
              console.info(result);
            localStorage.setItem('userContext', JSON.stringify({ ...result, password: details.password }));
            if (JSON.parse(localStorage.getItem('userContext')).role == "ADMIN") {
              history.push("/admin");
            } else {
              history.push("/client");
            }
              
            
          } else {
            setError((error) => ({ status: status, errorMessage: err }));
          }
        });
    }
    
    return (
        <div>
          <Jumbotron fluid style={backgroundStyle}>
            <Container fluid>
              <div style={{ display: 'flex' }}>
                <LoginView Login={Login} error={error} />
              </div>
            </Container>
            </Jumbotron>
    
        </div>
      );
}


export default Home;