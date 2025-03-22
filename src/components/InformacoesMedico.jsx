import React, { useState, useEffect } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import {
    CaretDown,
} from "@phosphor-icons/react";
import axios from 'axios';

function Informacoes({ paciente }) {

    const [consultaData, setConsultaData] = useState(null);

    const handleVisibilityToggle = (section) => {
        setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const [visibleSections, setVisibleSections] = useState({
        vitals: true,
        anamnese: true
    });

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

    useEffect(() => {
        const fetchConsultaDetails = async () => {
            console.log("🚀 Fetching data for pacienteId:", paciente.numeroIdentificacao);

            if (!paciente.numeroIdentificacao) return;

            const pacienteId = paciente.numeroIdentificacao;

            try {
                const response = await axios.get(`http://localhost:5000/api/consultas/retrieveInformacoes/${pacienteId}`);
                console.log("✅ RESPONSE:", response.data);
                setConsultaData(response.data);
                console.log("✅ Consulta Data:", consultaData);

            } catch (error) {
                console.error('Error fetching consulta details:', error);
            }
        };

        fetchConsultaDetails();
    }, []); // ✅ Run only once


    return (
        <div>
            <div style={patient.containerP}>
                <div style={patient.containerOutline}>
                    <div style={patient.containerHeader}>
                        <div style={patient.headerContent}>
                            <span style={patient.headerText}>Sinais Vitais</span>
                            <CaretDown size={25} color="#2DA9B5" onClick={() => handleVisibilityToggle('vitals')} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>

                    {visibleSections.vitals && consultaData && consultaData.vitals && (
                        <div style={{ padding: 5 }}>
                            <div>
                                <label style={patient.attribute}>Frequência Cardíaca: </label>
                                <span>{consultaData.vitals.heartRate} bpm</span>
                                <br />

                                <label style={patient.attribute}>Frequência Respiratória: </label>
                                <span>{consultaData.vitals.respiratoryRate} mrm</span>
                                <br />

                                <label style={patient.attribute}>Pressão Arterial: </label>
                                <span>{consultaData.vitals.bloodPressure} mmHg</span>
                                <br />

                                <label style={patient.attribute}>Temperatura: </label>
                                <span>{consultaData.vitals.temperature} ºc</span>
                                <br />

                                <label style={patient.attribute}>Peso: </label>
                                <span>{consultaData.vitals.weight} kg</span>
                                <br />
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div style={patient.containerP}>
                <div style={patient.containerOutline}>
                    <div style={patient.containerHeader}>
                        <div style={patient.headerContent}>
                            <span style={patient.headerText}>Anamnese</span>
                            <CaretDown size={25} color="#2DA9B5" onClick={() => handleVisibilityToggle('anamnese')} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>

                    {visibleSections.anamnese && consultaData && consultaData.comments && (
                        <div style={{ padding: '10px' }}>
                            <label style={patient.attribute}>DST's: </label>
                            <span>{consultaData.comments.dst}</span>
                            <br />

                            <label style={patient.attribute}>Doenças Crónicas: </label>
                            <span>{consultaData.comments.doencas}</span>
                            <br />

                            <label style={patient.attribute}>Alergias: </label>
                            <span>{consultaData.comments.alergias}</span>
                            <br />

                            <label style={patient.attribute}>Cirurgias: </label>
                            <span>{consultaData.comments.cirurgias}</span>
                            <br />

                            <label style={patient.attribute}>Internamentos: </label>
                            <span>{consultaData.comments.internamentos}</span>
                            <br />

                            <label style={patient.attribute}>Medicação: </label>
                            <span>{consultaData.comments.medicacao}</span>
                            <br />

                            <label style={patient.attribute}>Antecedentes: </label>
                            <span>{consultaData.comments.antecedentes}</span>
                            <br />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Informacoes;
