import React, { useState, useEffect } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import pfp from '../assets/userIcon.jpg';
import {
    paciente,
    medicamentos
} from "../assets/mocks.jsx";
import {
    X,
    NotePencil,
    CaretDown,
    ListMagnifyingGlass,
    Microphone
} from "@phosphor-icons/react";

export default function PatientAppointment() {

    const currentDate = new Date();
    const [selectedTab, setSelectedTab] = useState("Informações");
    const [isRecording, setIsRecording] = useState(false);
    const [subjectiveText, setSubjectiveText] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [sintomas, setSintomas] = useState([]);

    const sintomasList = ['dor de cabeça', 'dor de garganta', 'insônia', 'febre', 'vômitos', 'diarreia', 'tremores', 'tontura', 'cansaço', 'falta de apetite', 'perda de apetite', 'dores musculares', 'halucinações', 'enxaqueca', 'gripe', 'tosse', 'escarro'];

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'pt-BR';
            recognitionInstance.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    setSubjectiveText((prevText) => prevText + ' ' + finalTranscript);
                }
            };
            setRecognition(recognitionInstance);
        } else {
            alert('Seu navegador não suporta reconhecimento de voz.');
        }
    }, []);

    const detectSintomas = (text) => {
        const detectedSintomas = sintomasList.filter(sintoma => text.toLowerCase().includes(sintoma));
        setSintomas([...new Set([...sintomas, ...detectedSintomas])]);
    };

    const handleSubjectiveChange = (event) => {
        const newText = event.target.value;
        setSubjectiveText(newText);
        detectSintomas(newText);
    };

    const handleSave = () => {
        detectSintomas();
        // Implement any additional save functionality here
    };

    const toggleRecording = () => {
        if (isRecording) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsRecording(!isRecording);
    };

    const [editMode, setEditMode] = useState({
        vitals: false,
        allergies: false,
        chronic: false
    });

    const [vitals, setVitals] = useState({
        heartRate: '',
        respiratoryRate: '',
        bloodPressure: '',
        temperature: '',
        weight: ''
    });

    const [allergies, setAllergies] = useState(['Diazepam', 'Dipirona']);
    const [chronic, setChronic] = useState({ chronicDiseases: ['Asma'], familyHistory: ['Meningite'] });

    const handleEditToggle = (section) => {
        setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleChange = (e, section, key, index) => {
        const { value } = e.target;
        if (section === 'vitals') {
            setVitals((prev) => ({ ...prev, [key]: value }));
        } else if (section === 'chronic') {
            if (key === 'chronicDiseases' || key === 'familyHistory') {
                setChronic((prev) => {
                    const updatedArray = [...prev[key]];
                    updatedArray[index] = value;
                    return { ...prev, [key]: updatedArray };
                });
            }
        }
    };

    const addAllergy = () => {
        setAllergies((prev) => [...prev, '']);
    };

    const handleAllergyChange = (index, value) => {
        const newAllergies = [...allergies];
        newAllergies[index] = value;
        setAllergies(newAllergies);
    };

    const addChronicDisease = () => {
        setChronic((prev) => ({ ...prev, chronicDiseases: [...prev.chronicDiseases, ''] }));
    };

    const addFamilyHistory = () => {
        setChronic((prev) => ({ ...prev, familyHistory: [...prev.familyHistory, ''] }));
    };


    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const handleNextClick = () => {
        const tabs = ["Informações", "Consulta", "Procedimentos", "Diagnóstico", "Receita"];
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
    };

    const pacientes = {
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
        tableTitles: {
            borderBottom: "0.5px solid #cfcfcf",
            padding: 10,
            margin: 10,
        },
        previousButton: {
            marginRight: 10,
            padding: "5px 10px",
            border: "none",
            borderRadius: 5,
            backgroundColor: "#fff",
            color: "#c4c4c4",
            fontFamily: "Poppins",
            cursor: "pointer",
        },
        nextButton: {
            marginLeft: 10,
            padding: "5px 10px",
            border: "none",
            borderRadius: 5,
            backgroundColor: "#fff",
            color: "#2DA9B5",
            fontFamily: "Poppins",
            cursor: "pointer",
        },
        numericalButton: {
            margin: "0 10px",
            padding: "5px 10px",
            border: "none",
            borderRadius: 5,
            backgroundColor: "#2DA9B5",
            color: "white",
            fontFamily: "Poppins",
            cursor: "pointer",
        },
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
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case "Informações":
                return (
                    <div>
                        <div style={patient.containerP}>
                            <div style={patient.containerOutline}>
                                <div style={patient.containerHeader}>
                                    <div style={patient.headerContent}>
                                        <span style={patient.headerText}>Sinais Vitais</span>
                                        <div>
                                            <NotePencil size={25} color="#2DA9B5" onClick={() => handleEditToggle('vitals')} style={{ cursor: 'pointer' }} />
                                            <CaretDown size={25} color="#2DA9B5" style={{ cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ padding: 5 }}>
                                    {editMode.vitals ? (
                                        <div>
                                            <label style={patient.attribute}>Frequência Cardíaca: </label>
                                            <input
                                                type="text"
                                                value={vitals.heartRate}
                                                onChange={(e) => handleChange(e, 'vitals', 'heartRate')}
                                            />
                                            <br />
                                            <label style={patient.attribute}>Frequência Respiratória: </label>
                                            <input
                                                type="text"
                                                value={vitals.respiratoryRate}
                                                onChange={(e) => handleChange(e, 'vitals', 'respiratoryRate')}
                                            />
                                            <br />
                                            <label style={patient.attribute}>Pressão Arterial: </label>
                                            <input
                                                type="text"
                                                value={vitals.bloodPressure}
                                                onChange={(e) => handleChange(e, 'vitals', 'bloodPressure')}
                                            />
                                            <br />
                                            <label style={patient.attribute}>Temperatura: </label>
                                            <input
                                                type="text"
                                                value={vitals.temperature}
                                                onChange={(e) => handleChange(e, 'vitals', 'temperature')}
                                            />
                                            <br />
                                            <label style={patient.attribute}>Peso: </label>
                                            <input
                                                type="text"
                                                value={vitals.weight}
                                                onChange={(e) => handleChange(e, 'vitals', 'weight')}
                                            />
                                            <br />
                                            <button onClick={() => handleEditToggle('vitals')}>Salvar</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <span style={patient.attribute}>Frequência Cardíaca: </span>
                                            <span style={patient.value}>{vitals.heartRate} bpm</span>
                                            <br />
                                            <span style={patient.attribute}>Frequência Respiratória: </span>
                                            <span style={patient.value}>{vitals.respiratoryRate} mrm</span>
                                            <br />
                                            <span style={patient.attribute}>Pressão Arterial: </span>
                                            <span style={patient.value}>{vitals.bloodPressure} mmHg</span>
                                            <br />
                                            <span style={patient.attribute}>Temperatura: </span>
                                            <span style={patient.value}>{vitals.temperature} ºC</span>
                                            <br />
                                            <span style={patient.attribute}>Peso: </span>
                                            <span style={patient.value}>{vitals.weight} kg</span>
                                            <br />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={patient.containerP}>
                            <div style={patient.containerOutline}>
                                <div style={patient.containerHeader}>
                                    <div style={patient.headerContent}>
                                        <span style={patient.headerText}>Alergias</span>
                                        <div>
                                            <NotePencil size={25} color="#2DA9B5" onClick={() => handleEditToggle('allergies')} style={{ cursor: 'pointer' }} />
                                            <CaretDown size={25} color="#2DA9B5" style={{ cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ padding: 5 }}>
                                    {editMode.allergies ? (
                                        <div>
                                            {allergies.map((allergy, index) => (
                                                <div key={index}>
                                                    <input
                                                        type="text"
                                                        value={allergy}
                                                        onChange={(e) => handleAllergyChange(index, e.target.value)}
                                                    />
                                                    <br />
                                                </div>
                                            ))}
                                            <button onClick={addAllergy}>Adicionar Alergia</button>
                                            <br />
                                            <button onClick={() => handleEditToggle('allergies')}>Salvar</button>
                                        </div>
                                    ) : (
                                        allergies.map((allergy, index) => (
                                            <div key={index}>
                                                <span style={patient.attribute}>{allergy}</span>
                                                <br />
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={patient.containerP}>
                            <div style={patient.containerOutline}>
                                <div style={patient.containerHeader}>
                                    <div style={patient.headerContent}>
                                        <span style={patient.headerText}>
                                            Doencas Cronicas e Historico Familiar
                                        </span>
                                        <div>
                                            <NotePencil size={25} color="#2DA9B5" onClick={() => handleEditToggle('chronic')} style={{ cursor: 'pointer' }} />
                                            <CaretDown size={25} color="#2DA9B5" style={{ cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ padding: 5 }}>
                                    {editMode.chronic ? (
                                        <div>
                                            <label style={patient.attribute}>Doenças Crônicas: </label>
                                            {chronic.chronicDiseases.map((disease, index) => (
                                                <div key={index}>
                                                    <input
                                                        type="text"
                                                        value={disease}
                                                        onChange={(e) => handleChange(e, 'chronic', 'chronicDiseases', index)}
                                                    />
                                                    <br />
                                                </div>
                                            ))}
                                            <button onClick={addChronicDisease}>Adicionar Doença Crônica</button>
                                            <br />
                                            <label style={patient.attribute}>Histórico Familiar: </label>
                                            {chronic.familyHistory.map((history, index) => (
                                                <div key={index}>
                                                    <input
                                                        type="text"
                                                        value={history}
                                                        onChange={(e) => handleChange(e, 'chronic', 'familyHistory', index)}
                                                    />
                                                    <br />
                                                </div>
                                            ))}
                                            <button onClick={addFamilyHistory}>Adicionar Histórico Familiar</button>
                                            <br />
                                            <button onClick={() => handleEditToggle('chronic')}>Salvar</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <span style={patient.attribute}>Doenças Crônicas: </span>
                                            {chronic.chronicDiseases.map((disease, index) => (
                                                <span key={index} style={patient.value}>{disease}{index < chronic.chronicDiseases.length - 1 ? ', ' : ''}</span>
                                            ))}
                                            <br />
                                            <span style={patient.attribute}>Histórico Familiar: </span>
                                            {chronic.familyHistory.map((history, index) => (
                                                <span key={index} style={patient.value}>{history}{index < chronic.familyHistory.length - 1 ? ', ' : ''}</span>
                                            ))}
                                            <br />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        width: "82%",
                                        border: "0.5px solid rgba(80,80,80,0.2)",
                                        borderRadius: 5,
                                    }}
                                    value={subjectiveText}
                                ></textarea>
                                <Microphone
                                    size={18}
                                    color={isRecording ? "red" : "black"}
                                    style={{ cursor: 'pointer', padding: 0, margin: 0 }}
                                    onClick={toggleRecording}
                                />
                            </div>

                            <button
                                onClick={handleSave}
                                style={{
                                    background: "#2DA9B5",
                                    border: "none",
                                    padding: 5,
                                    borderRadius: 5,
                                    color: "white",
                                    fontFamily: "Poppins",
                                    fontWeight: 600,
                                    marginTop: 10,
                                    alignSelf: "flex-end",
                                }}
                            >
                                Salvar
                            </button>

                            <div>
                                <p>Sintomas</p>
                                {sintomas.map((sintoma, index) => (
                                    <div key={index} style={{
                                        display: 'inline-block',
                                        background: '#2DA9B5',
                                        borderRadius: '20px',
                                        color: 'white',
                                        padding: '5px 10px',
                                        margin: '5px',
                                        fontFamily: 'Poppins',
                                        fontWeight: 600,
                                    }}>
                                        {sintoma} <span onClick={() => setSintomas(sintomas.filter(s => s !== sintoma))} style={{ cursor: 'pointer', marginLeft: '5px' }}>X</span>
                                    </div>
                                ))}
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
                                ></textarea>
                            </div>
                        </div>
                    </div>
                );
            case "Procedimentos":
                return <div>Conteúdo de Procedimentos</div>;
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
                                    <div>
                                        <button style={diagnostico.button}>
                                            Paludismo
                                            <X />
                                        </button>
                                    </div>
                                    <div>
                                        <button style={diagnostico.button}>
                                            Febre Tifóide
                                            <X />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button style={diagnostico.acceptButton}>Aceitar</button>
                                <button style={diagnostico.rejectButton}>Rejeitar</button>
                            </div>
                        </div>

                        <div
                            style={{
                                border: "0.5px solid rgba(80,80,80,0.2)",
                                borderRadius: 10,
                            }}
                        >
                            <p style={{
                                color: "#2DA9B5", fontWeight: "bold", fontSize: 16
                            }}>Diagnóstico</p>
                        </div>
                    </div>
                );
            case "Receita":
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
                                Nova Receita
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
                                Histórico de Receitas
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
                            <p style={{
                                color: "#2DA9B5", fontWeight: "bold", marginTop: 0, fontSize: 16
                            }}>Pesquisa de Medicamentos</p>

                            <div style={{ display: "flex", width: "100%", justifyContent: 'space-between' }}>
                                <div style={{ width: "85%", alignContent: 'center', borderRadius: 5, border: "0.5px solid rgba(80,80,80,0.2)" }}>
                                    <input type="text" placeholder='Digite o nome de um medicamento...' style={{ width: "95%", border: 'none', fontFamily: 'Poppins' }} />
                                    <ListMagnifyingGlass />
                                </div>
                                <button style={{
                                    borderRadius: 8,
                                    background: "#2DA9B5",
                                    color: "white",
                                    padding: 3,
                                    borderColor: "#2DA9B5",
                                    paddingTop: 6,
                                    paddingBottom: 6,
                                    paddingRight: 15,
                                    paddingLeft: 15,
                                    border: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                }}>Pesquisar</button>
                            </div>

                            <table
                                style={{
                                    width: "95%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderCollapse: "collapse",
                                }}
                            >
                                <thead>
                                    <tr style={pacientes.tableTitles}>
                                        <th style={pacientes.tableTitle}>Data</th>
                                        <th style={pacientes.tableTitle}>Medicamento</th>
                                        <th style={pacientes.tableTitle}>Quantidade</th>
                                        <th style={pacientes.tableTitle}>Intervalo</th>
                                        <th style={pacientes.tableTitle}>Remover</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicamentos.map((medicamento, index) => (
                                        <tr key={index}>
                                            <td style={pacientes.tableContent}>{currentDate.getDay() + '/' + currentDate.getMonth() + '/' + currentDate.getYear()}</td>
                                            <td style={pacientes.tableContent}>{medicamento.medicamento}</td>
                                            <td style={pacientes.tableContent}>{medicamento.quantidade}</td>
                                            <td style={pacientes.tableContent}>{medicamento.intervalo}</td>
                                            <td style={pacientes.tableContent}>
                                                <X />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                        </div>
                    </div>


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

            <div style={{ padding: 20, display: "flex" }}>
                <img
                    style={{ width: 100, height: 100, borderRadius: "50%" }}
                    src={paciente.pfp}
                    alt=""
                    srcSet=""
                />

                <div style={{ marginLeft: 10 }}>
                    <span style={patient.attribute}>Paciente:</span>
                    <span style={patient.value}> {paciente.nome}</span>
                    <br />
                    <span style={patient.attribute}>Data de Nascimento: </span>
                    <span style={patient.value}>
                        {" "}
                        {paciente.dataNascimento.toLocaleDateString("pt-BR")}
                    </span>
                    <br />
                    <span style={patient.attribute}>Idade: </span>
                    <span style={patient.value}>
                        {" "}
                        {currentDate.getFullYear() -
                            paciente.dataNascimento.getFullYear()}
                    </span>
                    <br />
                    <span style={patient.attribute}>Sexo: </span>
                    <span style={patient.value}> {paciente.genero}</span>
                    <br />
                    <span style={patient.attribute}>Número de Identifição: </span>
                    <span style={patient.value}> {paciente.id}</span>
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

