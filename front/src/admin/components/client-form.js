import React, { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from 'reactstrap';
import Button from "react-bootstrap/Button";

import * as API_ADMINS from "../api/admin-api"
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";

const formControlsInit = {
    name: {
        value: '',
        placeholder: 'Enter a name...',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    username: {
        value: '',
        placeholder: 'Username...',
        valid: false,
        touched: false,
    },
    password: {
        value: '',
        placeholder: 'Password...',
        valid: false,
        touched: false,
    },
};

function ClientForm(props) {
    const [error, setError] = useState({ status: 0, errorMessage: null });
    const [formIsValid, setFormIsValid] = useState(false);
    const [formControls, setFormControls] = useState(formControlsInit);

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        let updatedControls = { ...formControls };

        let updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        //updatedFormElement.valid = Validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        // let formIsValid = true;
        // for (let updatedFormElementName in updatedControls) {
        //     formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        // }

        setFormControls((formControls) => (updatedControls));
        //setFormIsValid((formIsValidPrev) => (formIsValid));
    }

    function registerClients(client) {
        return API_ADMINS.postClient(client, (result, status, err) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted client with id: " + result);
                props.reloadHandler();
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
            role: "CLIENT"
        };
        registerClients(client);
    }

    return (
        <div>
            <FormGroup id='name'>
                <Label for='nameField'> Name: </Label>
                <Input name='name' id='nameField' placeholder={formControls.name.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.name.value}
                    touched={formControls.name.touched ? 1 : 0}
                    valid={formControls.name.valid}
                    required
                />
                {formControls.name.touched && !formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
            </FormGroup>

            <FormGroup id='username'>
                <Label for='usernameField'> Username: </Label>
                <Input name='username' id='usernameField' placeholder={formControls.username.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.username.value}
                    touched={formControls.username.touched ? 1 : 0}
                    valid={formControls.username.valid}
                    required
                />
            </FormGroup>

            <FormGroup id='password'>
                <Label for='passowrdField'> Password: </Label>
                <Input name='password' id='passwordField' placeholder={formControls.password.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.password.value}
                    touched={formControls.password.touched ? 1 : 0}
                    valid={formControls.password.valid}
                    required
                />
            </FormGroup>

            <Row>
                <Col sm={{ size: '4', offset: 8 }}>
                    <Button type={"submit"} /*disabled={!formIsValid}*/ onClick={handleSubmit}>  Submit </Button>
                </Col>
            </Row>

            {
                error.status > 0 &&
                <APIResponseErrorMessage errorStatus={error.status} error={error.errorMessage} />
            }
        </div>
    );
}

export default ClientForm;