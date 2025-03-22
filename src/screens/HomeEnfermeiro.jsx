import "@fontsource/poppins"; // Defaults to weight 400
import Options from "../components/OptionsTecnico.jsx";
import Header from "../components/Header.jsx";
import Patient from "../components/Patient.jsx";
import Patients from "../components/Patients.jsx";
import PatientAppointment from "../components/PatientAppointment.jsx";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Informacoes from "../components/Informacoes.js";


export default function HomeEnfermeiro() {
    const [selectedOption, setSelectedOption] = useState("Painel");
    const [waitingList, setWaitingList] = useState([]); // Will store pending consultations
    const [selectedConsulta, setSelectedConsulta] = useState(null); // Store selected consulta
    const informacoesRef = useRef();
    let content;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const modalStyles = {
        modalBackdrop: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modalContainer: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            width: '400px',
            zIndex: 1001,
        },
        closeButton: {
            backgroundColor: '#2DA9B5',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        }
    };

    const [vitals, setVitals] = useState({
        heartRate: '',
        respiratoryRate: '',
        bloodPressure: '',
        temperature: '',
        weight: ''
    });

    const [comments, setComments] = useState({
        dst: '',
        doencas: '',
        alergias: '',
        cirurgias: '',
        internamentos: '',
        medicacao: '',
        antecedentes: ''
    });

    const handleSaveInformacoes = () => {
        if (informacoesRef.current) {
            const data = informacoesRef.current.handleFetchData();
            console.log("Data to be saved:", data);
            // Update the parent state with the data from Informacoes
            setVitals(data.vitals);
            setComments(data.comments);
            handleFinalizarClick();
        }
    };

    const handleFinalizarClick = async () => {

        try {

            const responseConsulta = await axios.get('http://localhost:5000/api/consultas/findConsultaEnfermeiro', {
                params: {
                    pacienteId: selectedConsulta.pacienteId, // Ensure this matches the backend parameter
                    medico: selectedConsulta.medico
                }
            });

            const consultaId = responseConsulta.data.consultaId;

            const pacienteId = selectedConsulta.pacienteId; // Capture pacienteId from your data

            const dataToSave = {
                vitals,
                comments
            };

            const response = await axios.put(`http://localhost:5000/api/consultas/updateEnfermeiro`, {
                consultaId: consultaId,  // Ensure this matches the backend parameter
                pacienteId: pacienteId,  // Pass pacienteId for deletion
                data: dataToSave,
                state: 'open',
            });

            if (response.status === 200) {
                setModalMessage('Dados salvos com sucesso!');
                setIsModalOpen(true);
                setSelectedConsulta(null);
                // Reload the page after a short delay (optional)
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // 1-second delay for better UX
            } else {
                setModalMessage('Falha ao salvar dados!');
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error saving consulta:', error);
            alert('An error occurred while saving the consulta.');
        }
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
            width: "30%",
            background: "white",
            height: "85vh",
            margin: 10,
            borderRadius: 10,
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
            overflowY: "scroll",
        },
        rightPane: {
            width: "70%",
            background: "white",
            height: "81vh",
            margin: 10,
            borderRadius: 10,
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
            overflowY: "scroll",
            padding: 10
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
            cursor: 'pointer',
            margin: 10
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
        input: {
            border: "1.5px solid rgba(128,128,128,0.2)",
            padding: 5,
            borderRadius: 5,
            width: "30%",
        },
        fileInput: {
            border: "1.5px solid rgba(128,128,128,0.2)",
            borderRadius: 5,
            padding: 5,
            width: "100%",
        },
        cancelButton: {
            fontFamily: "Poppins",
            borderRadius: 8,
            color: "white",
            border: "none",
            background: "red",
            margin: 4,
            cursor: "pointer",
        },
    };


    // Function to fetch consultations where the state is "triage"
    const fetchPendingConsultations = async () => {
        try {
            // Fetch consultations where state is 'pending'
            const response = await axios.get('http://localhost:5000/api/consultas/triage');
            const pendingConsultations = response.data;
            setWaitingList(pendingConsultations); // Set the pending consultations into the waiting list

        } catch (error) {
            console.error('Error fetching pending consultations:', error);
        }
    };

    useEffect(() => {
        fetchPendingConsultations();
    }, []);

    const handleAtenderClick = (consulta) => {
        setSelectedConsulta(consulta);
    };

    // Content rendering based on selected option
    switch (selectedOption) {
        case "Painel":
            content = (
                <div style={{ display: "flex" }}>

                    <div style={style.waitingListContainer}>

                        <p style={{ marginLeft: 40 }}>Lista de Espera</p>

                        {waitingList.map((position) => {
                            return (
                                <div style={style.waitingListPatient} key={position._id}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span style={style.patientName}>Paciente: {position.pacienteNome}</span>
                                        <span style={style.doctorName}>Médico: {position ? position.medico : 'Nome não disponível'}</span>
                                    </div>
                                    <button style={style.button} onClick={() => handleAtenderClick(position)}>Atender</button>
                                </div>
                            );
                        })}

                    </div>

                    {selectedConsulta && (

                        <div style={style.rightPane}>

                            <Informacoes ref={informacoesRef}
                                vitals={vitals}
                                setVitals={setVitals}
                                comments={comments}
                                setComments={setComments}
                            />

                            <button onClick={handleSaveInformacoes} style={style.button}>
                                Salvar
                            </button>

                        </div>

                    )}

                    {isModalOpen && (
                        <div style={modalStyles.modalBackdrop}>
                            <div style={modalStyles.modalContainer}>
                                <p>{modalMessage}</p>
                            </div>
                        </div>
                    )}

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
