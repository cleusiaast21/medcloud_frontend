import "@fontsource/poppins"; // Defaults to weight 400
import Options from "../components/OptionsTecnico.jsx";
import Header from "../components/Header.jsx";
import Patient from "../components/Patient.jsx";
import Patients from "../components/Patients.jsx";
import PatientAppointment from "../components/PatientAppointment.jsx";
import { useState, useEffect } from "react";
import { useAuth } from '../AuthContext'; // Import your AuthContext
import axios from 'axios';

export default function Home() {
    const [selectedOption, setSelectedOption] = useState("Painel");
    const [waitingList, setWaitingList] = useState([]); // Will store pending consultations
    const { state } = useAuth(); // Use authentication context
    const [patients, setPatients] = useState({}); // State to store patient details
    const [selectedPatient, setSelectedPatient] = useState(null); // State for selected patient
    let content;

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
        },
    };

    const handleAtenderClick = (pacienteId) => {
        setSelectedPatient(patients[pacienteId]);
    };

    // Function to fetch consultations where the state is "pending"
    const fetchPendingConsultations = async () => {
        try {
            // Fetch consultations where state is 'pending'
            const response = await axios.get('http://localhost:5000/api/consultas/pending');
            const pendingConsultations = response.data;
            setWaitingList(pendingConsultations); // Set the pending consultations into the waiting list
    
            // Optionally fetch additional patient data if needed
            const patientsData = await fetchPatientsData(pendingConsultations);
            setPatients(patientsData);
        } catch (error) {
            console.error('Error fetching pending consultations:', error);
        }
    };

    // Function to fetch patient data based on the consultations
    const fetchPatientsData = async (consultations) => {
        const patientPromises = consultations.map(consulta =>
            axios.get(`/api/pacientes/${consulta.pacienteId}`)
        );
        const patientResponses = await Promise.all(patientPromises);
        const patientsData = {};
        patientResponses.forEach(response => {
            const patient = response.data;
            patientsData[patient._id] = patient; // Assuming patient has an _id field
        });
        return patientsData;
    };

    // UseEffect to fetch pending consultations on component mount
    useEffect(() => {
        fetchPendingConsultations();
    });

    // If a patient is selected, show the PatientAppointment component
    if (selectedPatient) {
        return <PatientAppointment paciente={selectedPatient} />;
    }

    // Content rendering based on selected option
    switch (selectedOption) {
        case "Painel":
            content = (
                <div style={style.waitingListContainer}>
                    <p style={{ marginLeft: 40 }}>Lista de Espera</p>
                    {waitingList.map((position) => {
                        const patient = patients[position.pacienteId];
                        return (
                            <div style={style.waitingListPatient} key={position._id}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span style={style.patientName}>{patient ? patient.nomeCompleto : 'Nome não disponível'}</span>
                                    <span style={style.doctorName}>{position.medicoNomeCompleto}</span>
                                </div>
                                <button style={style.button} onClick={() => handleAtenderClick(position.pacienteId)}>Atender</button>
                            </div>
                        );
                    })}
                </div>
            );
            break;
        case "Pacientes":
            content = <Patients />;
            break;
        case "Agenda":
            content = <PatientAppointment />;
            break;
        case "Estatísticas":
            content = <div>Estatísticas</div>;
            break;
        case "Paciente":
            content = <Patient />;
            break;
        default:
            content = <div><p>No content available for the selected option.</p></div>;
    }

    return (
        <div style={style.container}>
            <div style={{ display: "flex" }}>
                <Options onOptionSelect={setSelectedOption} selectedOption={selectedOption} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Header selectedOption={selectedOption} />
                    {content}
                </div>
            </div>
        </div>
    );
}