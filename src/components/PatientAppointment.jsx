import React, { useState, useRef } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import {
    X
} from "@phosphor-icons/react";
import axios from 'axios';
import Receita from './Receita.js';
import Procedimentos from './Procedimentos.js';
import InformacoesMedico from './InformacoesMedico.jsx';
import Consulta from './Consulta.js';
import { useAuth } from '../AuthContext'; // Import your AuthContext

export default function PatientAppointment({ paciente, onClose }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleCloseModal = () => {
        setIsModalOpen(false);
        onClose(); // Call the parent component's close function
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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

    //vitals, comments, consultaData, selectedExams, acceptedDiseases

    const { state } = useAuth();
    const currentDate = new Date();
    const [selectedTab, setSelectedTab] = useState("Informações");
    const [predictions, setPredictions] = useState(null);
    const [positivePredictions, setPositivePredictions] = useState([]);
    const [acceptedDiseases, setAcceptedDiseases] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [diseaseInput, setDiseaseInput] = useState("");
    const [modifiedDiseases, setModifiedDiseases] = useState([]);

    const [consultaData, setConsultaData] = useState({
        subjectiveText: '',
        objectivoText: '',
        notasText: '',
        selectedSymptoms: []
    });

    const informacoesRef = useRef();

    // Move the state to the parent component
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
        }
    };

    const [selectedExams, setSelectedExams] = useState([]);

    // Function to update the selected exams state
    const handleSelectedExamsChange = (updatedExams) => {
        setSelectedExams(updatedExams);
    };

    // Handlers to update state from child
    const handleSubjectiveChange = (value) => {
        setConsultaData(prevData => ({ ...prevData, subjectiveText: value }));
    };

    const handleObjectivoChange = (value) => {
        setConsultaData(prevData => ({ ...prevData, objectivoText: value }));
    };

    const handleNotasChange = (value) => {
        setConsultaData(prevData => ({ ...prevData, notasText: value }));
    };

    const handleSymptomsChange = (symptoms) => {
        setConsultaData(prevData => ({ ...prevData, selectedSymptoms: symptoms }));
    };

    // This function will be called when the button is clicked
    const handleButtonClick = () => {
        console.log('Data to submit:', consultaData);
        // Perform actions with the data here, e.g., send to the server
    };

    const handleAccept = () => {
        setAcceptedDiseases(positivePredictions);
    };

    const handleReject = () => {
        setPositivePredictions([]); // Empty positivePredictions
        setAcceptedDiseases([]); // Clear accepted diseases
    };

    const handleModify = () => {
        setShowModal(true);
        setModifiedDiseases([...acceptedDiseases]); // Initialize with accepted diseases
    };

    const handleSave = () => {
        setAcceptedDiseases(modifiedDiseases);
        setShowModal(false);
    };

    const handleDelete = (diseaseToDelete) => {
        setModifiedDiseases(modifiedDiseases.filter((disease) => disease !== diseaseToDelete));
    };

    const handleAddDisease = () => {
        if (diseaseInput.trim() && !modifiedDiseases.includes(diseaseInput)) {
            setModifiedDiseases([...modifiedDiseases, diseaseInput.trim()]);
            setDiseaseInput(""); // Clear the input field after adding
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5001/predict', { symptoms: consultaData.selectedSymptoms });
            const data = response.data;
            setPredictions(data);

            // Filtrar e salvar as predições positivas
            const positives = Object.keys(data)
                .filter(disease => data[disease] === 1)
                .map(disease => disease.replace('D_', ''));  // Remove o prefixo "D_" 
            setPositivePredictions(positives);
            console.log(positives);
        } catch (error) {
            console.error('Error fetching predictions:', error);
        }
    };

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const handleNextClick = () => {
        const tabs = ["Informações", "Consulta", "Procedimentos", "Diagnóstico", "Receita"];

        if (selectedTab === "Consulta") {
            handleButtonClick();
            handleSubmit();
        }

        if (selectedTab === "Informações") {
            handleSaveInformacoes();
        }

        if (selectedTab === "Procedimentos") {
            console.log('Selected Exams:', selectedExams)
        }

        if (selectedTab === "Receita")
            handleFinalizarClick();

        const currentIndex = tabs.indexOf(selectedTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        setSelectedTab(tabs[nextIndex]);
    };

    const handlePreviousClick = () => {
        const tabs = ["Informações", "Consulta", "Procedimentos", "Diagnóstico", "Receita"];
        const currentIndex = tabs.indexOf(selectedTab);
        const previousIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        setSelectedTab(tabs[previousIndex]);
    };

    const getButtonText = () => {
        return selectedTab === "Receita" ? "Finalizar" : "Próximo";
    };

    const getTabStyle = (tab) => {
        return tab === selectedTab
            ? {
                color: "#2DA9B5",
                borderBottom: "3px solid #2DA9B5",
                cursor: "pointer",
                padding: 5,
            }
            : {
                color: "#808080",
                borderBottom: "2px solid transparent",
                cursor: "pointer",
                padding: 5,
            };
    };

    const handleFinalizarClick = async () => {

        try {
            const responseConsulta = await axios.get('http://localhost:5000/api/consultas/findConsulta', {
                params: {
                    pacienteId: paciente.numeroIdentificacao, // Ensure this matches the backend parameter
                    medico: state.user.nomeCompleto             // Make sure this is the correct doctor ID
                }
            });


            const responseConsultaCloud = await axios.get('http://localhost:5000/api/consultas/findConsultaCloud', {
                params: {
                    pacienteId: paciente.numeroIdentificacao, // Ensure this matches the backend parameter
                    medico: state.user.nomeCompleto           // Make sure this is the correct doctor ID
                }
            });


            const consultaId = responseConsulta.data.consultaId;
            const consultaIdCloud = responseConsultaCloud.data.consultaId;

            console.log("CONSULTA EM CLOUD ID: " + consultaIdCloud)

            const pacienteId = paciente.numeroIdentificacao; // Capture pacienteId from your data

            const dataToSave = {
                consultaData,
                selectedExams,
                acceptedDiseases
            };

            console.log(dataToSave);

            const response = await axios.put(`http://localhost:5000/api/consultas/update`, {
                consultaId: consultaId,  // Ensure this matches the backend parameter
                consultaIdCloud: consultaIdCloud,
                pacienteId: pacienteId,  // Pass pacienteId for deletion
                data: dataToSave
            });

            if (response.status === 200) {
                setModalMessage('Consulta registrada com sucesso!');
                setIsModalOpen(true);
            } else {
                setModalMessage('Falha ao registrar consulta!');
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error saving consulta:', error);
            alert('An error occurred while saving the consulta.');
        }
    };


    const consulta = {
        container: {
            margin: 20,
            background: "white",
            borderRadius: 10,
            height: "85vh",
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
            fontFamily: "Poppins",
            overflowY: "scroll",
        },
        title: {
            color: "#2DA9B5",
            fontSize: 18,
            marginLeft: 30,
        },
        form: {
            display: "flex",
            marginLeft: 30,
        },
        label: {
            marginBottom: 28,
        },
        labels: {
            width: "18%",
            display: "flex",
            flexDirection: "column",
            textAlign: "right",
            marginRight: 15,
        },
        inputs: {
            display: "flex",
            flexDirection: "column",
            width: "30%",
        },
        input: {
            border: "1.5px solid rgba(128,128,128,0.2)",
            padding: 5,
            borderRadius: 5,
            width: "100%",
        },
        button: {
            borderRadius: 8,
            background: "#2DA9B5",
            color: "white",
            padding: 3,
            margin: 5,
            borderColor: "#2DA9B5",
            paddingTop: 6,
            paddingBottom: 6,
            paddingRight: 15,
            paddingLeft: 15,
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
        },
    };

    const patient = {
        attribute: {
            color: "#808080",
        },
        value: {
            color: "#2DA9B5",
        },
        options: {
            border: "0.5px solid rgba(128,128,128,0.2)",
            borderRadius: 10,
            width: "95%",
            marginLeft: 20,
            display: "flex",
            justifyContent: "space-between",
        },
        containerP: {
            display: "flex",
            flexDirection: "column",
            marginLeft: 20,
            width: "95%",
            marginTop: 10,
        },
        button: {
            display: "flex",
            marginTop: 10,
            width: "96.5%",
            justifyContent: "flex-end",
            justifySelf: "center",
            marginBottom: 10
        },
        containerOutline: {
            border: "0.5px solid rgba(128,128,128,0.5)",
            borderRadius: 10,
        },
        containerHeader: {
            background: "rgba(128,128,128,0.2)",
            borderRadius: 5,
        },
        headerContent: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerText: {
            padding: 5,
            fontWeight: "bold",
            color: "#2DA9B5",
        },
        input: {
            border: "1.5px solid rgba(128,128,128,0.2)",
            borderRadius: 5,
            fontFamily: 'Poppins'
        },
        comment: {
            marginLeft: '10px',
            border: "0.5px solid #cfcfcf",
            borderRadius: 5,
            width: '68%',
            padding: 3
        },
        anamneseItem: {
            width: '100%',
        }
    };


    const diagnostico = {
        button: {
            display: "flex",
            alignItems: "center",
            fontFamily: "Poppins",
            borderRadius: 8,
            color: "white",
            border: "none",
            background: "#2DA9B5",
            margin: 4,
            cursor: "pointer",
        },
        acceptButton: {
            fontFamily: "Poppins",
            borderRadius: 8,
            color: "white",
            border: "none",
            background: "green",
            margin: 4,
            cursor: "pointer",
        },
        rejectButton: {
            fontFamily: "Poppins",
            borderRadius: 8,
            color: "white",
            border: "none",
            background: "red",
            margin: 4,
            cursor: "pointer",
        },
        modifyButton: {
            fontFamily: "Poppins",
            borderRadius: 8,
            color: "white",
            border: "none",
            background: "orange",
            margin: 4,
            cursor: "pointer",
        },
    };


    const renderTabContent = () => {
        switch (selectedTab) {
            case "Informações":
                return (
                    <InformacoesMedico paciente={paciente} />
                );
            case "Consulta":

                return (
                    <Consulta subjectiveText={consultaData.subjectiveText}
                        objectivoText={consultaData.objectivoText}
                        notasText={consultaData.notasText}
                        selectedSymptoms={consultaData.selectedSymptoms}
                        onSubjectiveChange={handleSubjectiveChange}
                        onObjectivoChange={handleObjectivoChange}
                        onNotasChange={handleNotasChange}
                        onSymptomsChange={handleSymptomsChange}
                        paciente={paciente}
                    />
                );
            case "Procedimentos":
                return (
                    <Procedimentos selectedExams={selectedExams}
                        onSelectedExamsChange={handleSelectedExamsChange}
                    />
                );
            case "Diagnóstico":
                return (
                    <div
                        style={{
                            marginLeft: 20,
                            marginTop: 0,
                            justifyContent: "space-between",
                            width: "95%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ display: "flex" }}>
                                <p>O diagnóstico sugerido é: </p>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {positivePredictions.length > 0 ? (
                                        positivePredictions.map((disease) => (
                                            <div key={disease}>
                                                <button style={diagnostico.button}>
                                                    {disease}
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p> Nenhum diagnóstico positivo encontrado.</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <button style={diagnostico.acceptButton} onClick={handleAccept}>Aceitar</button>
                                <button style={diagnostico.modifyButton} onClick={handleModify}>Modificar</button>
                                <button style={diagnostico.rejectButton} onClick={handleReject}>Rejeitar</button>
                            </div>
                        </div>

                        <div
                            style={{
                                border: "0.5px solid rgba(80,80,80,0.2)",
                                borderRadius: 10,
                            }}
                        >
                            <p style={{ paddingLeft: 10, color: "#2DA9B5", fontWeight: "bold", fontSize: 16 }}>Diagnóstico</p>

                            <div style={{ paddingLeft: 10 }}>
                                {acceptedDiseases.length > 0 ? (
                                    acceptedDiseases.map((disease) => (
                                        <p key={disease}>{disease}</p>
                                    ))
                                ) : (
                                    <p>Nenhum diagnóstico aceite.</p>
                                )}
                            </div>
                        </div>

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
                                        width: "50%",
                                    }}
                                >
                                    <h3>Modificar Diagnóstico</h3>
                                    <div style={{ marginBottom: 10 }}>
                                        <input
                                            type="text"
                                            value={diseaseInput}
                                            onChange={(e) => setDiseaseInput(e.target.value)}
                                            placeholder="Digite o nome da doença"
                                            style={{ width: "80%", marginRight: 10, padding: 5 }}
                                        />
                                        <button onClick={handleAddDisease} style={diagnostico.addButton}>
                                            Adicionar
                                        </button>
                                    </div>
                                    <ul>
                                        {modifiedDiseases.map((disease) => (
                                            <li key={disease} style={{ marginBottom: 5 }}>
                                                {disease}
                                                <button
                                                    onClick={() => handleDelete(disease)}
                                                    style={diagnostico.deleteButton}
                                                >
                                                    Apagar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={handleSave} style={diagnostico.saveButton}>
                                        Salvar
                                    </button>
                                    <button onClick={() => setShowModal(false)} style={diagnostico.cancelButton}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                );
            case "Receita":
                return (
                    <Receita paciente={paciente}></Receita>
                );
            default:
                return null;
        }
    };


    return (

        <div style={consulta.container}>
            <div
                style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}
            >
                <X size={20} color="red" style={{ cursor: "pointer" }} />
            </div>

            <div style={{ padding: 10, display: "flex" }}>

                <div style={{ marginLeft: 10 }}>
                    <span style={patient.attribute}>Paciente: </span>
                    <span style={patient.value}>{paciente.nomeCompleto}</span>
                    <br />
                    <span style={patient.attribute}>Data de Nascimento: </span>
                    <span style={patient.value}>
                        {new Date(paciente.dataNascimento).toLocaleDateString("pt-BR")}
                    </span>
                    <br />
                    <span style={patient.attribute}>Idade: </span>
                    <span style={patient.value}>
                        {currentDate.getFullYear() - new Date(paciente.dataNascimento).getFullYear()}
                    </span>
                    <br />
                    <span style={patient.attribute}>Sexo: </span>
                    <span style={patient.value}> {paciente.sexo}</span>
                    <br />
                    <span style={patient.attribute}>Número de Identificação: </span>
                    <span style={patient.value}> {paciente.numeroIdentificacao}</span>
                    <br />
                </div>
            </div>

            <div style={patient.options}>
                <div
                    style={getTabStyle("Informações")}
                    onClick={() => handleTabClick("Informações")}
                >
                    Informações
                </div>
                <div
                    style={getTabStyle("Consulta")}
                    onClick={() => handleTabClick("Consulta")}
                >
                    Consulta
                </div>
                <div
                    style={getTabStyle("Procedimentos")}
                    onClick={() => handleTabClick("Procedimentos")}
                >
                    Procedimentos
                </div>
                <div
                    style={getTabStyle("Diagnóstico")}
                    onClick={() => handleTabClick("Diagnóstico")}
                >
                    Diagnóstico
                </div>
                <div
                    style={getTabStyle("Receita")}
                    onClick={() => handleTabClick("Receita")}
                >
                    Receita
                </div>
            </div>

            <div style={patient.tabContent}>{renderTabContent()}</div>

            <div style={patient.button}>
                {selectedTab !== "Informações" && (
                    <button style={consulta.button} onClick={handlePreviousClick}>Anterior</button>
                )}
                <button style={consulta.button} onClick={handleNextClick}>{getButtonText()}</button>
            </div>

            {isModalOpen && (
                <div style={modalStyles.modalBackdrop}>
                    <div style={modalStyles.modalContainer}>
                        <p>{modalMessage}</p>
                        <button style={modalStyles.closeButton} onClick={handleCloseModal}>OK</button>
                    </div>
                </div>
            )}
        </div>

    );
}

