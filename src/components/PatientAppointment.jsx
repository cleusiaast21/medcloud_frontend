import React, { useState, useEffect, useRef } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import {
    X
} from "@phosphor-icons/react";
import Select from 'react-select';
import { symptomOptions } from '../assets/auxiliaryData.jsx';
import axios from 'axios';
import Receita from './Receita.js';
import Procedimentos from './Procedimentos.js';
import Informacoes from './Informacoes.js';

export default function PatientAppointment({ paciente }) {

    const currentDate = new Date();
    const [selectedTab, setSelectedTab] = useState("Informações");
    const [subjectiveText, setSubjectiveText] = useState('');
    const [objectivoText, setObjectivoText] = useState("");
    const [notasText, setNotasText] = useState("");
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [predictions, setPredictions] = useState(null);
    const [positivePredictions, setPositivePredictions] = useState([]);
    const [selectedExams, setSelectedExams] = useState([]);
    
    const informacoesRef = useRef(null);
    const [collectedData, setCollectedData] = useState(null);

    // Function to handle the click event
    const handleCollectData = () => {
        if (informacoesRef.current) {
            // Call the child component's getData method
            const data = informacoesRef.current();
            setCollectedData(data);
            console.log(collectedData)
        }
    };

    const [acceptedDiseases, setAcceptedDiseases] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [diseaseInput, setDiseaseInput] = useState("");
    const [modifiedDiseases, setModifiedDiseases] = useState([]);

    const handleAccept = () => {
        setAcceptedDiseases(positivePredictions);
    };

    const handleSelectedExamsChange = (exams) => {
        setSelectedExams(exams);
        console.log('Selected Exams:', selectedExams);
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

    const handleSelectChange = (selectedOptions) => {
        // Convert selected options to an array of symptom names
        const symptoms = selectedOptions.reduce((acc, option) => {
            acc[option.value] = 1;
            return acc;
        }, {});

        setSelectedSymptoms(symptoms);
    };    

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5001/predict', { symptoms: selectedSymptoms });
            const data = response.data;
            setPredictions(data);

            // Filter positive predictions and save to positivePredictions
            const positives = Object.keys(data).filter(disease => data[disease] === 1);
            setPositivePredictions(positives);
            console.log(positives)
        } catch (error) {
            console.error('Error fetching predictions:', error);
        }
    };

    const handleSubjectiveChange = (event) => {
        setSubjectiveText(event.target.value);
    };
    const handleObjectivoChange = (e) => {
        setObjectivoText(e.target.value);
    };

    const handleNotasChange = (e) => {
        setNotasText(e.target.value);
    };

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const handleNextClick = () => {
        const tabs = ["Informações", "Consulta", "Procedimentos", "Diagnóstico", "Receita"];

        if (selectedTab === "Consulta")
            handleSubmit();
 
        if (selectedTab === "Informações")
            handleCollectData();

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

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '2px solid #2DA9B5' : '0.5px solid rgba(80,80,80,0.2)', // Border color when focused
            boxShadow: state.isFocused ? '0 0 5px rgba(0, 123, 255, 0.2)' : 'none', // Shadow effect on focus
            '&:hover': {
                borderColor: '#2DA9B5', // Border color on hover
            },
            borderRadius: 5,
            fontSize: 13,
            width: '99%',
            marginLeft: 11
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#2DA9B5' : state.isFocused ? '#e6f7ff' : 'white', // Background color for selected and focused options
            color: state.isSelected ? 'white' : '#333', // Text color for selected option
            padding: 2,
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#2DA9B5', // Background color for selected options
            color: 'white',
            borderRadius: '5px',
            padding: '3px 5px',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'white', // Text color for selected options
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: 'white', // Text color for remove icon
            '&:hover': {
                backgroundColor: '#cc4c4c',
                color: 'white',
            },
        }),
    };

    

    const renderTabContent = () => {
        switch (selectedTab) {
            case "Informações":
                return (
                    <Informacoes getDataRef={informacoesRef}></Informacoes>
                );
            case "Consulta":

                return (
                    <div
                        style={{
                            display: "flex",
                            marginLeft: 20,
                            marginTop: 15,
                            justifyContent: "space-between",
                            width: "95%",
                        }}
                    >
                        <div
                            style={{
                                width: "20%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <button
                                style={{
                                    background: "#2DA9B5",
                                    border: "none",
                                    padding: 15,
                                    borderRadius: 10,
                                    color: "white",
                                    fontFamily: "Poppins",
                                    fontWeight: 600,
                                    marginBottom: 15,
                                }}
                            >
                                Nova Consulta
                            </button>

                            <button
                                style={{
                                    background: "white",
                                    border: "1px solid #2DA9B5",
                                    padding: 15,
                                    borderRadius: 10,
                                    color: "#2DA9B5",
                                    fontFamily: "Poppins",
                                    fontWeight: 600,
                                }}
                            >
                                Histórico de consultas
                            </button>
                        </div>
                        <div
                            style={{
                                width: "75%",
                                border: "0.5px solid rgba(80,80,80,0.2)",
                                borderRadius: 15,
                                height: "45vh",
                                padding: 10,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>Subjectivo</p>
                                <textarea
                                    name="subjective"
                                    id="subjective"
                                    style={{
                                        resize: "none",
                                        width: "85%",
                                        border: "0.5px solid rgba(80,80,80,0.2)",
                                        borderRadius: 5,
                                    }}
                                    value={subjectiveText}
                                    onChange={handleSubjectiveChange}
                                ></textarea>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>Notas</p>
                                <textarea
                                    name=""
                                    id=""
                                    style={{
                                        resize: "none",
                                        width: "85%",
                                        border: "0.5px solid rgba(80,80,80,0.2)",
                                        borderRadius: 5,
                                    }}
                                    value={notasText}
                                    onChange={handleNotasChange}
                                ></textarea>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>Objectivo</p>
                                <textarea
                                    name=""
                                    id=""
                                    style={{
                                        resize: "none",
                                        width: "85%",
                                        border: "0.5px solid rgba(80,80,80,0.2)",
                                        borderRadius: 5,
                                    }}
                                    value={objectivoText}
                                    onChange={handleObjectivoChange}
                                ></textarea>
                            </div>


                            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                                <p style={{ margin: '0 10px 0 0', minWidth: '80px' }}>Sintomas</p>
                                <div style={{ flex: 1, justifyContent: 'flex-end' }}>
                                    <Select
                                        isMulti
                                        name="symptoms"
                                        options={symptomOptions}
                                        onChange={handleSelectChange}
                                        placeholder="Selecione os sintomas..."
                                        styles={customStyles}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                );
            case "Procedimentos":
                return (
                    <Procedimentos onSelectedExamsChange={handleSelectedExamsChange} ></Procedimentos>
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
                            <p style={{ paddingLeft: 10, color: "#2DA9B5", fontWeight: "bold", fontSize: 16}}>Diagnóstico</p>

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
                    <Receita></Receita>
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
        </div>

    );
}

