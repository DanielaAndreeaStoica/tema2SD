import React, { useState, useEffect } from 'react';

import Table from "../../commons/tables/table";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import * as API_CLIENTS from "../api/client-api";
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const filters = [
    {
        accessor: 'address',
    }
];

function DeviceTable(props) {
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
            accessor: 'maxHourlyEnergyConsumption',
        },
        {
            Cell: props => {
              return (
                <button style={{ backgroundColor: "#008000", color: "#fefefe", borderRadius: 7 }}
                  onClick={() => {viewChart(props.row.id)}}>View Charts</button>
              )
            },
            width: 150,
            maxWidth: 100,
            minWidth: 100,
        },
    
    ];
    
    const [startDate, setStartDate] = useState(new Date());
    const [dataEnergy, setDataEnergy] = useState([]);
    const [labelEnergy, setLabelEnergy] = useState([]);
    const [list, setList] = useState([]);
    const [error, setError] = useState({ status: 0, errorMessage: null });
    const [data] = useState({
        labels: labelEnergy,
        datasets: [
          {
            label: 'Energy Consumption',
            backgroundColor: 'rgba(194, 116, 161, 0.5)',
            borderColor: 'rgb(194, 116, 161)',
            data: dataEnergy,
          }
        ],
    });

    function viewChart(devId) {
        getDeviceHourlyConsumptionList(devId);
        console.log(startDate);
        const labelE = [];
        const dataE = [];

        for (const element of list) {
            const [checkYear, setCheckYear] = useState(false);
            const [checkMonth, setCheckMonth] = useState(false);
            const [checkDay, setCheckDay] = useState(false);
            for (const [key, value] of Object.entries(element)) {
                if (key == "year" && value == startDate.getFullYear) {
                    setCheckYear((checkYear) => (true));
                }

                if (key == "month" && value == startDate.getMonth) {
                    setCheckMonth((checkMonth) => (true));
                }

                if (key == "day" && value == startDate.getDay) {
                    setCheckDay((checkDay) => (true));
                } 
                
                if (checkDay == true && checkMonth == true && checkYear == true) {
                    if (key == "hour") {
                        labelE.push(value);
                    }

                    if (key == "hourlyConsumption") {
                        dataE.push(value);
                    }
                    
                }
            }
        }

        setDataEnergy((dataEnergy) => (dataE));
        setLabelEnergy((labelEnergy) => (labelE));
    }

    function getDeviceHourlyConsumptionList(devId) {
        return API_CLIENTS.getDeviceHourlyConsumptionList(devId, (result, status, err) => {
            if (result !== null && status === 200) {
                setList((list) => (result));
            } else {
                setError((error) => ({ status: status, errorMessage: err }));
            }
        });
    }

    return (
        <div>
            <br></br>
            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
            <br></br>
            <br></br>
        <Table
            data={props.tableData}
            columns={columns}
            search={filters}
            pageSize={5}
            />      
            
            <br></br>
                <CDBContainer >
                   <h3 className="mt-5">Bar chart </h3>
                <Bar data={data} show={false} options={{ responsive: true }} />
                </CDBContainer>    

                
        </div>
    );
}

export default DeviceTable;