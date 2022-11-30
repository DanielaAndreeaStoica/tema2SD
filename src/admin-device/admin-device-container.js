import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import * as API_DEVICES from "./api/device-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import DeviceTable from './components/device-table';

function AdminDeviceContainer(props) {
    const [tableData, setTableData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const [error, setError] = useState({ status: 0, errorMessage: null });

    useEffect(() => {
        fetchDevices();
    }, []);

    function fetchDevices() {
        return API_DEVICES.getDevices((result, status, err) => {
            if (result !== null && status === 200) {
                setTableData((tableData) => (result));
                setIsLoaded((isLoaded) => (true));
            } else {
                setError((error) => ({ status: status, errorMessage: err }));
            }
        });
    }

    function reload(isReloadFromEdit = false, isReloadFromDelete = false ) {
        setIsLoaded((isLoaded) => (false));
        fetchDevices();
    }

    return (
        <div>
            <CardHeader>
                <strong> Device Management </strong>
            </CardHeader>
            <Card>
                <br />
                <br />
                <Row>
                    <Col sm={{ size: '9', offset: 2 }}>
                        {isLoaded && <DeviceTable tableData={tableData} reloadHandlerTable={reload} />}
                        {error.status > 0 &&
                            <APIResponseErrorMessage
                                errorStatus={error.status}
                                error={error.errorMessage}
                            />}
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default AdminDeviceContainer;