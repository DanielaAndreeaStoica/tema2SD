import React, { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from 'reactstrap';
import Button from "react-bootstrap/Button";

import * as API_ADMINS from "../api/admin-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message"

function ClientUpdateForm(props) {
    const [error, setError] = useState({ status: 0, errorMessage: null });

    let formControls = {
        name: {
            value: props.information.name,
            touched: false,
        },
        username: {
            value: props.information.username,
            touched: false,
        },
        password: {
            value: '',
            touched: false,
        },
    };

    function updateClient(id, client) {
        return API_ADMINS.updateClient(id, client, (result, status, err) => {
          if (result !== null && (status === 200 || status === 201)) {
            props.closeForm();
            props.reloadForUpdate(true);
          } else {
            setError((error) => ({ status: status, errorMessage: err }));
          }
        });
    }
    
    function handleSubmit() {
        let client = {
            name: formControls.name.value,
            username: formControls.username.value,
            password: formControls.password.value,
        };

        updateClient(props.updatedId, client);
    }

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        let updatedControls = { ...formControls };

        let updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedControls[name] = updatedFormElement;

        formControls = updatedControls;
        console.log(formControls);
    }

    return (
        <div>
            <FormGroup id='name'>
                <Label for='nameField'> Name: </Label>
                <Input name='name' id='nameField' placeholder={formControls.name.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.name.value}
                    touched={formControls.name.touched ? 1 : 0}
                />
            </FormGroup>

            <FormGroup id='username'>
                <Label for='usernameField'> Username: </Label>
                <Input name='username' id='usernameField' placeholder={formControls.username.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.username.value}
                    touched={formControls.username.touched ? 1 : 0}
                />
            </FormGroup>

            <FormGroup id='password'>
                <Label for='passwordField'> Password: </Label>
                <Input name='password' id='passwordField' placeholder={formControls.password.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.password.value}
                    touched={formControls.password.touched ? 1 : 0}
                />
            </FormGroup>

            <Row>
                <Col sm={{ size: '4', offset: 8 }}>
                    <Button type={"submit"} onClick={handleSubmit}>  Submit </Button>
                </Col>
            </Row>

            {
                error.status > 0 &&
                <APIResponseErrorMessage errorStatus={error.status} error={error.errorMessage} />
            }
        </div>
        
    );
}

export default ClientUpdateForm;