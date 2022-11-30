import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import * as API_ADMINS from "./api/admin-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import ClientTable from "./components/client-table";
import ClientForm from "./components/client-form";
import { useHistory } from "react-router-dom";

function AdminContainer(props) {
    const [tableData, setTableData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const [error, setError] = useState({ status: 0, errorMessage: null });

    useEffect(() => {
        fetchClients();
    }, []);

    function fetchClients() {
        return API_ADMINS.getClients((result, status, err) => {
            if (result !== null && status === 200) {
                setTableData((tableData) => (result));
                setIsLoaded((isLoaded) => (true));
            } else {
                setError((error) => ({ status: status, errorMessage: err }));
            }
        });
    }

    function toggleForm() {
        setIsSelected((isSelected) => (!isSelected));
    }
    
    function reload(isReloadFromEdit = false, isReloadFromDelete = false ) {
        setIsLoaded((isLoaded) => (false));

        if (!isReloadFromEdit && !isReloadFromDelete) toggleForm();
        fetchClients();
    }

    let history = useHistory();

    function goToDevices() {
        history.push("admin/device");
    }

    return (
        <div>
            <CardHeader>
                <strong> Client Management </strong>
            </CardHeader>
            <Card>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        <Button color="primary" onClick={toggleForm}>Add Client </Button> {' '}
                        <Button color="primary" onClick={goToDevices}>Go to devices </Button>
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 2 }}>
                        {isLoaded && <ClientTable tableData={tableData} reloadHandlerTable={reload} />}
                        {error.status > 0 &&
                            <APIResponseErrorMessage
                                errorStatus={error.status}
                                error={error.errorMessage}
                            />}
                    </Col>
                </Row>
            </Card>

            <Modal isOpen={isSelected} toggle={toggleForm} size="lg">
                <ModalHeader toggle={toggleForm}> Add Client: </ModalHeader>
                <ModalBody>
                    <ClientForm reloadHandler={reload} />
                </ModalBody>
            </Modal>

        </div>
    );
}

export default AdminContainer;