import React, { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from 'reactstrap';
import Button from "react-bootstrap/Button";

import * as API_DEVICES from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";

const formControlsInit = {
    year: {
        value: '',
        placeholder: 'Year...',
        valid: false,
        touched: false,
    },
    month: {
        value: '',
        placeholder: 'Month...',
        valid: false,
        touched: false,
    },
    day: {
        value: '',
        placeholder: 'Day...',
        valid: false,
        touched: false,
    },
    hour: {
        value: '',
        placeholder: 'Hour...',
        valid: false,
        touched: false,
    },
    hourlyConsumption: {
        value: '',
        placeholder: 'Energy consumption...',
        valid: false,
        touched: false,
    },
};

function EnergyConsumptionForm(props) {
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
        
        updatedControls[name] = updatedFormElement;

        setFormControls((formControls) => (updatedControls));
    }

    function registerEnergyConsumption(energyConsumption) {
        return API_DEVICES.postEnergyConsumption(energyConsumption, (result, status, err) => {
            if (result !== null && (status === 200 || status === 201)) {
                props.reload();
            } else {
                setError((error) => ({ status: status, errorMessage: err }));
            }
        });
    } 

    function handleSubmit() {
        let energyConsumption = {
            year: formControls.year.value,
            month: formControls.month.value,
            day: formControls.day.value,
            hour:formControls.hour.value,
            hourlyConsumption: formControls.hourlyConsumption.value,
            deviceID: props.deviceId
        };
        registerEnergyConsumption(energyConsumption);
    }

    return (
        <div>
            <FormGroup id='year'>
                <Label for='yearField'> Year: </Label>
                <Input name='year' id='yearField' placeholder={formControls.year.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.year.value}
                    touched={formControls.year.touched ? 1 : 0}
                    valid={formControls.year.valid}
                    required
                />
            </FormGroup>

            <FormGroup id='month'>
                <Label for='monthField'> Month: </Label>
                <Input name='month' id='monthField' placeholder={formControls.month.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.month.value}
                    touched={formControls.month.touched ? 1 : 0}
                    valid={formControls.month.valid}
                    required
                />
            </FormGroup>

            <FormGroup id='day'>
                <Label for='dayField'> Day: </Label>
                <Input name='day' id='dayField' placeholder={formControls.day.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.day.value}
                    touched={formControls.day.touched ? 1 : 0}
                    valid={formControls.day.valid}
                    required
                />
            </FormGroup>

            <FormGroup id='hour'>
                <Label for='hourField'> Hour: </Label>
                <Input name='hour' id='hourField' placeholder={formControls.hour.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.hour.value}
                    touched={formControls.hour.touched ? 1 : 0}
                    valid={formControls.hour.valid}
                    required
                />
            </FormGroup>

            <FormGroup id='hourlyConsumption'>
                <Label for='hourlyConsumptionField'> Energy Consumption: </Label>
                <Input name='hourlyConsumption' id='hourlyConsumptionField' placeholder={formControls.hourlyConsumption.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.hourlyConsumption.value}
                    touched={formControls.hourlyConsumption.touched ? 1 : 0}
                    valid={formControls.hourlyConsumption.valid}
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

export default EnergyConsumptionForm;