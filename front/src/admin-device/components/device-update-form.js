import React, { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from 'reactstrap';
import Button from "react-bootstrap/Button";

import * as API_DEVICES from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message"

function DeviceUpdateForm(props) {
    const [error, setError] = useState({ status: 0, errorMessage: null });

    let formControls = {
        description: {
            value: props.information.description,
            touched: false,
        },
        address: {
            value: props.information.address,
            touched: false,
        },
        maxHourlyEnergyConsumption: {
            value: props.information.maxHourlyEnergyConsumption,
            touched: false,
        },
    };

    function updateDevice(id, device) {
        return API_DEVICES.updateDevice(id, device, (result, status, err) => {
          if (result !== null && (status === 200 || status === 201)) {
            props.closeForm();
            props.reloadForUpdate(true);
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
        };

        updateDevice(props.updatedId, device);
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
            <FormGroup id='description'>
                <Label for='descriptionField'> Description: </Label>
                <Input name='description' id='descriptionField' placeholder={formControls.description.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.description.value}
                    touched={formControls.description.touched ? 1 : 0}
                />
            </FormGroup>

            <FormGroup id='address'>
                <Label for='addressField'> Address: </Label>
                <Input name='address' id='addressField' placeholder={formControls.address.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.address.value}
                    touched={formControls.address.touched ? 1 : 0}
                />
            </FormGroup>

            <FormGroup id='maxHourlyEnergyConsumption'>
                <Label for='maxHourlyEnergyConsumptionField'> Max Energy Consumption: </Label>
                <Input name='maxHourlyEnergyConsumption' id='maxHourlyEnergyConsumptionField' placeholder={formControls.maxHourlyEnergyConsumption.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.maxHourlyEnergyConsumption.value}
                    touched={formControls.maxHourlyEnergyConsumption.touched ? 1 : 0}
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

export default DeviceUpdateForm;