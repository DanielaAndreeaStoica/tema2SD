import React, { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from 'reactstrap';
import Button from "react-bootstrap/Button";

import * as API_ADMINS from "../api/admin-api"
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";

const formControlsInit = {
    description: {
        value: '',
        placeholder: 'Description...',
        valid: false,
        touched: false,
    },
    address: {
        value: '',
        placeholder: 'Address...',
        valid: false,
        touched: false,
    },
    maxHourlyEnergyConsumption: {
        value: '',
        placeholder: 'Energy consumption...',
        valid: false,
        touched: false,
    },
};

function DeviceForm(props) {
    const [error, setError] = useState({ status: 0, errorMessage: null });
    const [formControls, setFormControls] = useState(formControlsInit);

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        let updatedControls = { ...formControls };

        let updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedControls[name] = updatedFormElement;

        setFormControls((formControls) => (updatedControls));
    }

    function registerDevice(device) {
        return API_ADMINS.postDevice(device, (result, status, err) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted device with id: " + result);
                props.reload(true);
            } else {
                setError((error) => ({ status: status, errorMessage: err }));
            }
        });
    }
    
    function handleSubmit() {
        let device = {
            description: formControls.description.value,
            address: formControls.address.value,
            maxHourlyEnergyConsumption: formControls.maxHourlyEnergyConsumption.value,
            userID: props.userIdForDevice
        };
        registerDevice(device);
    }

    return (
        <div>
            <FormGroup id='descriotion'>
                <Label for='descriptionField'> Description: </Label>
                <Input name='description' id='descriptionField' placeholder={formControls.description.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.description.value}
                    touched={formControls.description.touched ? 1 : 0}
                    valid={formControls.description.valid}
                    required
                />
            </FormGroup>

            <FormGroup id='address'>
                <Label for='addressField'> Address: </Label>
                <Input name='address' id='addressField' placeholder={formControls.address.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.address.value}
                    touched={formControls.address.touched ? 1 : 0}
                    valid={formControls.address.valid}
                    required
                />
            </FormGroup>

            <FormGroup id='maxHourlyEnergyConsumption'>
                <Label for='maxHourlyEnergyConsumptionField'> Maximum Hourly Energy Consumption: </Label>
                <Input name='maxHourlyEnergyConsumption' id='maxHourlyEnergyConsumptionField' placeholder={formControls.maxHourlyEnergyConsumption.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.maxHourlyEnergyConsumption.value}
                    touched={formControls.maxHourlyEnergyConsumption.touched ? 1 : 0}
                    valid={formControls.maxHourlyEnergyConsumption.valid}
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

export default DeviceForm;