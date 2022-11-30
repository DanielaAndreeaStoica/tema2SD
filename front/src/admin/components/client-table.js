import React, { useState, useEffect } from 'react';

import Table from "../../commons/tables/table";
import ClientUpdateForm from "./client-update-form";
import DeviceForm from './device-form';
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import * as API_ADMINS from "../api/admin-api";
import ChartForm from '../../client/components/chart-form';

const filters = [
    {
        accessor: 'name',
    }
];

function ClientTable(props) {

    const [information, setInformation] = useState([]);
    const [updatedId, setUpdatedId] = useState([]);
    const [selectedUpdateForm, setSelectedUpdateForm] = useState(false);
    const [error, setError] = useState({ status: 0, errorMessage: null });
    const [selectedDeviceForm, setSelectedDeviceForm] = useState(false);
    const [userIdForDevice, setUserIdForDevice] = useState([]);

    const columns = [
        {
            Header: 'Id',
            accessor: 'id',
            show: false
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Password',
            accessor: 'password',
            show: false
        },
        {
            Header: 'Role',
            accessor: 'role',
        },
        {
            Cell: props => {
              return (
                <button style={{ backgroundColor: "#008000", color: "#fefefe", borderRadius: 7 }}
                  onClick={() => { getClientInfo(props.row.id,props.row.name,props.row.username,props.row.password,props.row.role) }}>Update</button>
              )
            },
            width: 150,
            maxWidth: 100,
            minWidth: 100,
        },
        {
            Cell: props => {
              return (
                <button style={{ backgroundColor: "#E42217", color: "#fefefe", borderRadius: 7 }}
                  onClick={() => { deleteClient(props.row.id) }}>Delete</button>
              )
            },
            width: 150,
            maxWidth: 100,
            minWidth: 100,
        },
        {
            Cell: props => {
              return (
                <button style={{ backgroundColor: "#77BFC7", color: "#fefefe", borderRadius: 7 }}
                  onClick={() => { addDevice(props.row.id) }}>Add device</button>
              )
            },
            width: 150,
            maxWidth: 100,
            minWidth: 100,
          }
    ];

    function getClientInfo(id, name, username, password, role) {
        let client = {
            name: name,
            username: username,
            password: password,
            role: role
        };

        setInformation((information) => (client));
        setUpdatedId((updatedId) => (id));
        console.log("AICI " + updatedId);
        setSelectedUpdateForm((selectedUpdateForm) => (!selectedUpdateForm));
    }

    function addDevice(userId) {
        setUserIdForDevice((userIdForDevice) => (userId));
        setSelectedDeviceForm((selectedDeviceForm) => (!selectedDeviceForm));
    }

    const closeUpdateForm = () => {
        setSelectedUpdateForm((selectedUpdateForm) => (false));
    }

    const closeDeviceForm = () => {
        setSelectedDeviceForm((selectedDeviceForm) => (false));
    }

    function deleteClient(id) {
        return API_ADMINS.deleteClientById(id, (result, status, err) => {
          if (result !== null && (status === 200 || status === 201)) {
            props.reloadHandlerTable(true);
          } else {
            setError((error) => ({ status: status, errorMessage: err }));
          }
        });
    }

    return (
        <div>
        <Table
            data={props.tableData}
            columns={columns}
            search={filters}
            pageSize={5}
        />

       {
        <Modal isOpen={selectedUpdateForm} toggle={getClientInfo}>
        <ModalHeader toggle={getClientInfo}> Edit Client Data: </ModalHeader>
        <ModalBody>
            <ClientUpdateForm information={information} updatedId={updatedId} reloadForUpdate={props.reloadHandlerTable} closeForm={closeUpdateForm} />
        </ModalBody>
     </Modal>
            }

        {
        <Modal isOpen={selectedDeviceForm} toggle={addDevice}>
        <ModalHeader toggle={addDevice}> Add device: </ModalHeader>
        <ModalBody>
            <DeviceForm userIdForDevice={userIdForDevice} reload={props.reloadHandlerTable} closeForm={closeDeviceForm} />
        </ModalBody>
     </Modal>
            }
    </div>
    );
}

export default ClientTable;