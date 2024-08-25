
import React, { useState, useEffect } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import pfp from '../assets/userIcon.jpg';
import {
    appointments,
} from "../assets/mocks.jsx";
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Import your AuthContext


export default function Painel() {
    const [waitingList, setWaitingList] = useState([]);
    const { state } = useAuth();
    const funcionarioId = state.user.funcionarioId;
    const [patients, setPatients] = useState({}); // State to store patient details

    useEffect(() => {
        const fetchWaitingList = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/waitingList/retrieveSpecific', {
                    params: { medicoId: funcionarioId } // Ensure your backend supports this parameter
                });
                const waitingListData = response.data;
                setWaitingList(waitingListData);

                // Fetch patient details for each waiting list entry
                const patientRequests = waitingListData.map(position =>
                    axios.get(`http://localhost:5000/api/pacientes/getPaciente/${position.pacienteId}`) // Adjust endpoint as needed
                );

                const patientResponses = await Promise.all(patientRequests);
                const patientData = patientResponses.reduce((acc, curr) => {
                    acc[curr.data._id] = curr.data;
                    return acc;
                }, {});

                setPatients(patientData);
                console.log(patientData)
            } catch (error) {
                console.error('Error fetching waiting list or patient details:', error);
            }
        };

        fetchWaitingList();
    }, [funcionarioId]);



    const style = {
        container: {
            margin: 0,
            backgroundColor: "#F5F5F5",
            height: "100vh",
            fontFamily: "Poppins",
        },
        containersList: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
        },
        appointmentsContainer: {
            width: "60%",
            background: "white",
            height: "85vh",
            margin: 10,
            borderRadius: 10,
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
            padding: 10,
            overflowY: "scroll",
        },
        waitingListContainer: {
            width: "30%",
            background: "white",
            height: "85vh",
            margin: 10,
            borderRadius: 10,
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
            overflowY: "scroll",
        },
        tableTitle: {
            color: "#2DA9B5",
            fontWeight: "Normal",
            fontSize: 12,
        },
        tableContent: {
            color: "#525252",
            fontWeight: "Normal",
            fontSize: 12,
            padding: 15,
            borderBottom: "0.5px solid #cfcfcf",
            textAlign: "center",
        },
        tableContentSpecial: {
            color: "#525252",
            fontWeight: "Normal",
            fontSize: 12,
            padding: 15,
            borderBottom: "0.5px solid #cfcfcf",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
        },
        tableTitles: {
            borderBottom: "0.5px solid #cfcfcf",
            padding: 10,
            margin: 10,
        },
        pfp: {
            width: "20%",
            height: "20%",
            borderRadius: 50,
        },
        button: {
            borderRadius: 8,
            background: "#2DA9B5",
            color: "white",
            borderColor: "#2DA9B5",
            padding: 10,
            border: "none",
        },
        waitingListPatient: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: 40,
            marginBottom: 10,
            borderBottom: "0.5px solid #cfcfcf",
        },
        patientName: {
            fontSize: 12,
        },
        doctorName: {
            fontSize: 11,
            color: "#808080",
            marginTop: 5,
        }
    };

    return (
        <div style={style.containersList}>
            <div style={style.appointmentsContainer}>
                <p>Marcações para hoje</p>

                <table
                    style={{
                        width: "95%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr style={style.tableTitles}>
                            <th style={style.tableTitle}>Hora</th>
                            <th style={style.tableTitle}>Data</th>
                            <th style={style.tableTitle}>Paciente</th>
                            <th style={style.tableTitle}>Médico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td style={style.tableContent}>{appointment.hora}</td>
                                <td style={style.tableContent}>{appointment.data}</td>
                                <td style={style.tableContent}>{appointment.patient}</td>
                                <td style={style.tableContent}>{appointment.doctor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={style.waitingListContainer}>
                <p style={{ marginLeft: 40 }}>Lista de Espera</p>

                {waitingList.map((position) => {
                    // Debugging line to ensure IDs are correct
                    console.log('Waiting List Position:', position);

                    // Fetch patient data
                    const patient = patients[position.pacienteId];

                    // Debugging line to check if patient data is found
                    console.log('Patient Data for ID:', position.pacienteId, patient);

                    return (
                        <div style={style.waitingListPatient} key={position._id}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={style.patientName}>{patient ? patient.nomeCompleto : 'Nome não disponível'}</span>
                                <span style={style.doctorName}>{position.medicoNomeCompleto}</span>
                            </div>
                            <button style={style.button}>Atender</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}