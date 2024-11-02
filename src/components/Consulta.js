import React, { useState, useEffect } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import Select from 'react-select';
import { symptomOptions } from '../assets/auxiliaryData.jsx';

export default function Consulta({
    subjectiveText,
    objectivoText,
    notasText,
    selectedSymptoms,
    onSubjectiveChange,
    onObjectivoChange,
    onNotasChange,
    onSymptomsChange,
    paciente
}) {


    const [consultationHistory, setConsultationHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [isNewConsulta, setIsNewConsulta] = useState(true); // New state to track 'Nova Consulta'

    const handleSelectChange = (selectedOptions) => {
        const symptoms = selectedOptions.map(option => option.value);
        onSymptomsChange(symptoms); // Call parent handler with symptoms array
    };

    const fetchConsultationHistory = async () => {
        try {
            if (!showHistory) {
                const response = await fetch(`http://localhost:5000/api/consultas/${paciente.numeroIdentificacao}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setConsultationHistory(data);
            }
            setShowHistory(prevShowHistory => !prevShowHistory);
            setIsNewConsulta(false); // Reset "Nova Consulta" view when showing history
        } catch (error) {
            console.error("Failed to fetch consultation history:", error);
        }
    };

    const handleNewConsultaClick = () => {
        setIsNewConsulta(true);
        setShowHistory(false); // Hide history when "Nova Consulta" is selected
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '2px solid #2DA9B5' : '0.5px solid rgba(80,80,80,0.2)',
            boxShadow: state.isFocused ? '0 0 5px rgba(0, 123, 255, 0.2)' : 'none',
            '&:hover': {
                borderColor: '#2DA9B5',
            },
            borderRadius: 5,
            fontSize: 13,
            width: '99%',
            marginLeft: 11
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#2DA9B5' : state.isFocused ? '#e6f7ff' : 'white',
            color: state.isSelected ? 'white' : '#333',
            padding: 2,
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#2DA9B5',
            color: 'white',
            borderRadius: '5px',
            padding: '3px 5px',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'white',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: 'white',
            '&:hover': {
                backgroundColor: '#cc4c4c',
                color: 'white',
            },
        }),
    };

    return (
        <div style={{ display: "flex", marginLeft: 20, marginTop: 15, justifyContent: "space-between", width: "95%" }}>
            <div style={{ width: "20%", display: "flex", flexDirection: "column" }}>
                <button
                    style={{
                        background: isNewConsulta ? "#2DA9B5" : "white",
                        border: isNewConsulta ? "none" : "1px solid #2DA9B5",
                        padding: 15,
                        borderRadius: 10,
                        color: isNewConsulta ? "white" : "#2DA9B5",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        marginBottom: 15,
                        cursor: 'pointer'
                    }}
                    onClick={handleNewConsultaClick}
                >
                    Nova Consulta
                </button>
                <button
                    style={{
                        background: showHistory ? "#2DA9B5" : "white",
                        border: showHistory ? "none" : "1px solid #2DA9B5",
                        padding: 15,
                        borderRadius: 10,
                        color: showHistory ? "white" : "#2DA9B5",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                    onClick={fetchConsultationHistory}
                >
                    Histórico de consultas
                </button>
            </div>
            <div style={{ width: "75%", border: "0.5px solid rgba(80,80,80,0.2)", borderRadius: 15, height: "45vh", padding: 10, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>

                {isNewConsulta && (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label htmlFor="subjective">Subjectivo</label>
                            <textarea id="subjective" style={{ resize: "none", width: "85%", border: "0.5px solid rgba(80,80,80,0.2)", borderRadius: 5 }} value={subjectiveText} onChange={(e) => onSubjectiveChange(e.target.value)} />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label htmlFor="notas">Notas</label>
                            <textarea id="notas" style={{ resize: "none", width: "85%", border: "0.5px solid rgba(80,80,80,0.2)", borderRadius: 5 }} value={notasText} onChange={(e) => onNotasChange(e.target.value)} />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label htmlFor="objectivo">Objectivo</label>
                            <textarea id="objectivo" style={{ resize: "none", width: "85%", border: "0.5px solid rgba(80,80,80,0.2)", borderRadius: 5 }} value={objectivoText} onChange={(e) => onObjectivoChange(e.target.value)} />
                        </div>

                        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                            <label htmlFor="symptoms" style={{ margin: '0 10px 0 0', minWidth: '80px' }}>Sintomas</label>
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
                    </>
                )}

                {showHistory && (
                    <div style={{ marginTop: 0, overflowY: "scroll" }}>
                        <h4>Histórico de Consultas</h4>
                        {consultationHistory.length > 0 ? (
                            consultationHistory.map((consulta, index) => (
                                <div key={index} style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, marginBottom: 10 }}>
                                    <p><strong>Especialidade:</strong> {consulta.specialty}</p>
                                    <p><strong>Médico:</strong> {consulta.medico}</p>
                                    <p><strong>Data da Consulta:</strong> {new Date(consulta.createdAt).toLocaleDateString()}</p>
                                    <p><strong>Subjectivo:</strong> {consulta.consultaData.subjectiveText}</p>
                                    <p><strong>Objectivo:</strong> {consulta.consultaData.objectivoText}</p>
                                    <p><strong>Notas:</strong> {consulta.consultaData.notasText}</p>
                                    <p><strong>Diagnóstico:</strong>
                                        {Array.isArray(consulta.acceptedDiseases) && consulta.acceptedDiseases.length > 0
                                            ? consulta.acceptedDiseases.join(', ')
                                            : 'Nenhum diagnóstico encontrado'}</p>
                                    <p><strong>Sintomas:</strong>
                                        {Array.isArray(consulta.consultaData.selectedSymptoms) && consulta.consultaData.selectedSymptoms.length > 0
                                            ? consulta.consultaData.selectedSymptoms.join(', ')
                                            : 'Nenhum sintoma encontrado'}</p>
                                </div>
                            ))
                        ) : (
                            <p>Sem histórico de consultas para este paciente.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
