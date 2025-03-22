
import React, { useState, useEffect } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Import your AuthContext
import PatientAppointment from './PatientAppointment.jsx';

export default function Painel() {
    const [waitingList, setWaitingList] = useState([]);
    const [unfinishedConsultas, setUnfinishedConsultas] = useState([]);
    const { state } = useAuth();
    const funcionarioId = state.user.funcionarioId;
    const [patients, setPatients] = useState({}); // State to store patient details
    const [selectedPatient, setSelectedPatient] = useState(null); // State for selected patient
    const [pacienteInfo, setpacienteInfo] = useState(null); // State for selected patient
    const [showModal, setShowModal] = useState(false);
    const [resultConsulta, setResultConsulta] = useState({})
    const [diagnostico, setDiagnostico] = useState("");

    const handleSeeResults = (position) => {
        setShowModal(true);
        setResultConsulta(position);
    };

    useEffect(() => {
        const fetchWaitingList = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/waitingList/retrieveSpecific', {
                    params: { medicoId: funcionarioId }
                });
                const waitingListData = response.data;
                setWaitingList(waitingListData);

                // Fetch patient details for each waiting list entry
                const patientRequests = waitingListData.map(position =>
                    axios.get(`http://localhost:5000/api/pacientes/getPaciente/${position.pacienteId}`)
                );
                const patientResponses = await Promise.all(patientRequests);
                const patientData = patientResponses.reduce((acc, curr) => {
                    const paciente = curr.data;
                    acc[paciente.numeroIdentificacao] = paciente; // Use numeroIdentificacao as the key
                    return acc;
                }, {});

                setPatients(patientData);

                // Fetch consultas with results
                const results = await axios.get(`http://localhost:5000/api/consultas/findExamResults`, {
                    params: {
                      medicoNomeCompleto: state.user.nomeCompleto
                    }
                  });

                const resultsData = results.data.consultas;

                setUnfinishedConsultas(resultsData);

                console.log("Consultas: ", resultsData)
            } catch (error) {
                console.error('Error fetching waiting list or patient details:', error);
            }
        };

        fetchWaitingList();
    }, [funcionarioId]);

    const handleAtenderClick = (pacienteId) => {
        setSelectedPatient(patients[pacienteId]);
        setpacienteInfo(pacienteId)
    };

    const [showPatientAppointment, setShowPatientAppointment] = useState(true);

    const handleClosePatientAppointment = () => {
        setShowPatientAppointment(false);
    };

    if (selectedPatient) {
        return (

            <>
                {showPatientAppointment ? (
                    <PatientAppointment paciente={selectedPatient} onClose={handleClosePatientAppointment} />
                ) : (
                    <Painel></Painel>
                )
                }</>
        )
    };

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
            width: "100%",
            background: "white",
            height: "43vh",
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
            margin: 5,
            cursor: 'pointer'
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
            fontSize: 14
        },
        doctorName: {
            fontSize: 11,
            color: "#808080",
            marginTop: 5,
        },
        input: {
            border: "1.5px solid rgba(128,128,128,0.5)",
            padding: 5,
            borderRadius: 5,
            width: "40%",
            marginLeft: 5
        }
    };

    const handleUpdateDiagnostico = () => {
        // Split the diagnoses into an array by commas
        const acceptedDiseases = diagnostico.split(",").map((d) => d.trim());

        // Send the update to the backend
        axios
            .put(`http://localhost:5000/api/consultas/addDiagnostic/${resultConsulta._id}`, {
                acceptedDiseases,
            })
            .then((response) => {

                setShowModal(false)
                alert("Diagnóstico atualizado com sucesso:", response.data);
            })
            .catch((error) => {
                console.error("Erro ao atualizar diagnóstico:", error);
            });
    };


    return (
        <div style={style.containersList}>
            <div style={style.appointmentsContainer}>
                <p>Marcações para Hoje</p>

                
            </div>

            <div style={{ width: "30%" }}>

                <div style={style.waitingListContainer}>
                    <p style={{ marginLeft: 40 }}>Lista de Espera</p>

                    {waitingList.map((position) => {

                        // Fetch patient data
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

                <div style={style.waitingListContainer}>
                    <p style={{ marginLeft: 40 }}>Consultas Pendentes</p>

                    {unfinishedConsultas.map((position) => {
                        return (
                            <div style={style.waitingListPatient} key={position._id}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span style={style.patientName}>Paciente: {position.pacienteNome}</span>
                                    <span style={style.doctorName}>Médico: {position ? position.medico : 'Nome não disponível'}</span>
                                </div>
                                <button style={style.button} onClick={() => handleSeeResults(position)}>Ver resultados</button>
                            </div>
                        );
                    })}

                    {showModal && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 1000,

                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#fff",
                                    padding: 20,
                                    borderRadius: 10,
                                    width: "70%",
                                    height: '80vh', overflowY: 'scroll'
                                }}
                            >
                                <div style={{
                                    display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                    <h2>Resultados para {resultConsulta.pacienteNome}</h2>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            color: "red",
                                            fontSize: "18px",
                                            cursor: "pointer",
                                        }}
                                        aria-label="Close"
                                    >
                                        &times;
                                    </button>
                                </div>

                                {resultConsulta.results.map((position) => {
                                    return (
                                        <div style={style.waitingListPatient} key={position._id}>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <span>Exame: {position.examName}</span>

                                                {position.type === "image" && (
                                                    <>
                                                        <span>Resultado: </span>
                                                        <img src={`data:${position.fileType};base64,${position.value}`} style={{ width: '200px', heigth: '200px' }} alt="Imagem" />
                                                    </>
                                                )}

                                                {position.type === "text" && (
                                                    <>
                                                        <span>Resultado: {position.value}</span>
                                                    </>
                                                )}

                                                {position.type === "pdf" && (
                                                    <>
                                                        <span>Resultado: </span>
                                                        <iframe
                                                            src={`data:${position.fileType};base64,${position.value}`}
                                                            title="PDF Document"
                                                            width="100%"
                                                            height="500px"
                                                            style={{ border: 'none' }}
                                                        ></iframe>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    );
                                })}

                                <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                                    <span>Diagnóstico: </span>
                                    <input
                                        style={style.input}
                                        value={diagnostico}
                                        onChange={(e) => setDiagnostico(e.target.value)} // Update state
                                        placeholder="Digite os diagnósticos separados por vírgulas"
                                    />
                                    <button
                                        style={style.button}
                                        onClick={handleUpdateDiagnostico} // Update diagnosis
                                    >
                                        Atualizar
                                    </button>
                                </div>

                            </div>
                        </div>

                    )}

                </div>
            </div>

        </div >
    );
}