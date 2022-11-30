import React, { useState, useEffect } from 'react';

import Table from "../../commons/tables/table";
import DeviceUpdateForm from './device-update-form';
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import * as API_DEVICES from "../api/device-api";
import { max } from 'moment';
import EnergyConsumptionForm from './energy-consumption-form';

const filters = [
    {
        accessor: 'description',
    }
];

function DeviceTable(props) {
    const [information, setInformation] = useState([]);
    const [updatedId, setUpdatedId] = useState([]);
    const [selectedUpdateForm, setSelectedUpdateForm] = useState(false);
    const [error, setError] = useState({ status: 0, errorMessage: null });
    const [deviceId, setDeviceId] = useState([]);
    const [selectedEnergyForm, setSelectedEnergyForm] = useState(false);

    const columns = [
        {
            Header: 'Id',
            accessor: 'id',
            show: false
        },
        {
            Header: 'Description',
            accessor: 'description',
        },
        {
            Header: 'Address',
            accessor: 'address',
        },
        {
            Header: 'Energy Consumption',
            accessor: 'maxHourlyEnergyConsumption'
        },
        {
            Cell: props => {
              return (
                <button style={{ backgroundColor: "#008000", color: "#fefefe", borderRadius: 7 }}
                  onClick={() => { getDeviceInfo(props.row.id,props.row.description,props.row.address,props.row.maxHourlyEnergyConsumption) }}>Update</button>
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
                  onClick={() => { deleteDevice(props.row.id) }}>Delete</button>
              )
            },
            width: 150,
            maxWidth: 100,
            minWidth: 100,
        },
        {
            Cell: props => {
              return (
                <button style={{ backgroundColor: "#2554C7", color: "#fefefe", borderRadius: 7 }}
                  onClick={() => { addEnergyConsumption(props.row.id) }}>Energy Consumption</button>
              )
            },
            width: 190,
            maxWidth: 100,
            minWidth: 100,
        }
    ];

    function getDeviceInfo(id, description, address, maxHourlyEnergyConsumption) {
        let device = {
            description: description,
            address: address,
            maxHourlyEnergyConsumption: maxHourlyEnergyConsumption
        };

        setInformation((information) => (device));
        setUpdatedId((updatedId) => (id));
        setSelectedUpdateForm((selectedUpdateForm) => (!selectedUpdateForm));
    }

    const closeUpdateForm = () => {
        setSelectedUpdateForm((selectedUpdateForm) => (false));
    }

    function deleteDevice(id) {
        return API_DEVICES.deleteDeviceById(id, (result, status, err) => {
          if (result !== null && (status === 200 || status === 201)) {
            props.reloadHandlerTable(true);
          } else {
            setError((error) => ({ status: status, errorMessage: err }));
          }
        });
    }

    function addEnergyConsumption(devId) {
        setDeviceId((deviceId) => (devId));
        setSelectedEnergyForm((selectedEnergyForm) => (!selectedEnergyForm));
    }

    const closeEnergyForm = () => {
        setSelectedEnergyForm((selectedEnergyForm) => (false));
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
        <Modal isOpen={selectedUpdateForm} toggle={getDeviceInfo}>
        <ModalHeader toggle={getDeviceInfo}> Edit Device Data: </ModalHeader>
        <ModalBody>
            <DeviceUpdateForm information={information} updatedId={updatedId} reloadForUpdate={props.reloadHandlerTable} closeForm={closeUpdateForm} />
        </ModalBody>
     </Modal>
            }

        {
        <Modal isOpen={selectedEnergyForm} toggle={addEnergyConsumption}>
         <ModalHeader toggle={addEnergyConsumption}> Add energy consumption: </ModalHeader>
         <ModalBody>
            <EnergyConsumptionForm deviceId={deviceId} reload={props.reloadHandlerTable} closeForm={closeEnergyForm} />
         </ModalBody>
        </Modal>
        }
    </div>
    );
}

export default DeviceTable;