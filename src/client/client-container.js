import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import * as API_CLIENTS from "./api/client-api";
import DeviceTable from './components/device-table';

function ClientContainer(props) {
    const [tableData, setTableData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [error, setError] = useState({ status: 0, errorMessage: null });

    useEffect(() => {
        fetchDevices();
    }, []);

    function fetchDevices() {
        const currentUser = JSON.parse(localStorage.getItem('userContext'));
        return API_CLIENTS.getDeviceList(currentUser.id, (result, status, err) => {
            if (result !== null && status === 200) {
                setTableData((tableData) => (result));
                setIsLoaded((isLoaded) => (true));
            } else {
                setError((error) => ({ status: status, errorMessage: err }));
            }
        });
    }

    function reload() {
        setIsLoaded((isLoaded) => (false));

        fetchDevices();
    }

    return (
        <div>
            <CardHeader>
                <strong> Device Management </strong>
            </CardHeader>
            <Card>
                <Row>
                    <Col sm={{ size: '8', offset: 2 }}>
                        {isLoaded && <DeviceTable tableData={tableData} />}
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

export default ClientContainer;