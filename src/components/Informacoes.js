import React, { useState, forwardRef, useImperativeHandle } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import {
    CaretDown,
    NotePencil
} from "@phosphor-icons/react";

const Informacoes = forwardRef((props, ref) => {
    const { vitals, setVitals, comments, setComments } = props;

    const [editMode, setEditMode] = useState({
        vitals: false,
        allergies: false,
        chronic: false
    });

    const [visibleSections, setVisibleSections] = useState({
        vitals: true,
        anamnese: true
    });

    // Expose handleFetchData to the parent component via ref
    useImperativeHandle(ref, () => ({
        handleFetchData() {
            return {
                vitals,
                comments
            };
        }
    }));

    const handleEditToggle = (section) => {
        setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleChange = (e, section, key) => {
        const { value } = e.target;
        if (section === 'vitals') {
            setVitals((prev) => ({ ...prev, [key]: value }));
        }
    };

    const handleCommentChange = (event, field) => {
        const value = event.target.value;
        setComments(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleVisibilityToggle = (section) => {
        setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
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


    return (
        <div>
            <div style={patient.containerP}>
                <div style={patient.containerOutline}>
                    <div style={patient.containerHeader}>
                        <div style={patient.headerContent}>
                            <span style={patient.headerText}>Sinais Vitais</span>
                            <div>
                                <NotePencil size={25} color="#2DA9B5" onClick={() => handleEditToggle('vitals')} style={{ cursor: 'pointer' }} />
                                <CaretDown size={25} color="#2DA9B5" onClick={() => handleVisibilityToggle('vitals')} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    </div>

                    {visibleSections.vitals && (
                        <div style={{ padding: 5 }}>
                            {editMode.vitals ? (
                                <div>
                                    <label style={patient.attribute}>Frequência Cardíaca: </label>
                                    <input
                                        type="text"
                                        value={vitals.heartRate}
                                        style={patient.input}
                                        onChange={(e) => handleChange(e, 'vitals', 'heartRate')}
                                    />
                                    <br />
                                    <label style={patient.attribute}>Frequência Respiratória: </label>
                                    <input
                                        type="text"
                                        style={patient.input}
                                        value={vitals.respiratoryRate}
                                        onChange={(e) => handleChange(e, 'vitals', 'respiratoryRate')}
                                    />
                                    <br />
                                    <label style={patient.attribute}>Pressão Arterial: </label>
                                    <input
                                        type="text"
                                        style={patient.input}
                                        value={vitals.bloodPressure}
                                        onChange={(e) => handleChange(e, 'vitals', 'bloodPressure')}
                                    />
                                    <br />
                                    <label style={patient.attribute}>Temperatura: </label>
                                    <input
                                        type="text"
                                        value={vitals.temperature}
                                        style={patient.input}
                                        onChange={(e) => handleChange(e, 'vitals', 'temperature')}
                                    />
                                    <br />
                                    <label style={patient.attribute}>Peso: </label>
                                    <input
                                        type="text"
                                        value={vitals.weight}
                                        style={patient.input}
                                        onChange={(e) => handleChange(e, 'vitals', 'weight')}
                                    />
                                    <br />
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
                    )}
                </div>
            </div>

            <div style={patient.containerP}>
                <div style={patient.containerOutline}>
                    <div style={patient.containerHeader}>
                        <div style={patient.headerContent}>
                            <span style={patient.headerText}>Anamnese</span>
                            <div>
                                <NotePencil size={25} color="#2DA9B5" onClick={() => handleEditToggle('anamnese')} style={{ cursor: 'pointer' }} />
                                <CaretDown size={25} color="#2DA9B5" onClick={() => handleVisibilityToggle('anamnese')} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    </div>

                    {visibleSections.anamnese && (
                        <div style={{ padding: '10px' }}>
                            <p style={patient.anamneseItem}>
                                <label>DST's:</label>
                                <input
                                    type="text"
                                    placeholder="Comentários..."
                                    value={comments.dst}
                                    onChange={(e) => handleCommentChange(e, 'dst')}
                                    style={patient.comment}
                                />
                            </p>

                            <p style={patient.anamneseItem}>
                                <label>Doenças Crónicas:</label>
                                <input
                                    type="text"
                                    placeholder="Comentários..."
                                    value={comments.doencas}
                                    onChange={(e) => handleCommentChange(e, 'doencas')}
                                    style={patient.comment}
                                />
                            </p>

                            <p style={patient.anamneseItem}>
                                <label>Alergias:</label>
                                <input
                                    type="text"
                                    placeholder="Comentários..."
                                    value={comments.alergias}
                                    onChange={(e) => handleCommentChange(e, 'alergias')}
                                    style={patient.comment}
                                />
                            </p>

                            <p style={patient.anamneseItem}>
                                <label>Cirurgias:</label>
                                <input
                                    type="text"
                                    placeholder="Comentários..."
                                    value={comments.cirurgias}
                                    onChange={(e) => handleCommentChange(e, 'cirurgias')}
                                    style={patient.comment}
                                />
                            </p>

                            <p style={patient.anamneseItem}>
                                <label>Internamentos:</label>
                                <input
                                    type="text"
                                    placeholder="Comentários..."
                                    value={comments.internamentos}
                                    onChange={(e) => handleCommentChange(e, 'internamentos')}
                                    style={patient.comment}
                                />
                            </p>

                            <p style={patient.anamneseItem}>
                                <label>Medicação:</label>
                                <input
                                    type="text"
                                    placeholder="Comentários..."
                                    value={comments.medicacao}
                                    onChange={(e) => handleCommentChange(e, 'medicacao')}
                                    style={patient.comment}
                                />
                            </p>

                            <p style={patient.anamneseItem}>
                                <label>Antecedentes:</label>
                                <input
                                    type="text"
                                    placeholder="Comentários..."
                                    value={comments.antecedentes}
                                    onChange={(e) => handleCommentChange(e, 'antecedentes')}
                                    style={patient.comment}
                                />
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default Informacoes;
