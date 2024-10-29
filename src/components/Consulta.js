import React, { useState } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import Select from 'react-select';
import { symptomOptions } from '../assets/auxiliaryData.jsx';

export default function Consulta({subjectiveText,
    objectivoText,
    notasText,
    selectedSymptoms,
    onSubjectiveChange,
    onObjectivoChange,
    onNotasChange,
    onSymptomsChange
}) {

    
    const handleSelectChange = (selectedOptions) => {
        const symptoms = selectedOptions.map(option => option.value); 
        onSymptomsChange(symptoms); // Call parent handler with symptoms array
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
                <button style={{ background: "#2DA9B5", border: "none", padding: 15, borderRadius: 10, color: "white", fontFamily: "Poppins", fontWeight: 600, marginBottom: 15 }}>
                    Nova Consulta
                </button>
                <button style={{ background: "white", border: "1px solid #2DA9B5", padding: 15, borderRadius: 10, color: "#2DA9B5", fontFamily: "Poppins", fontWeight: 600 }}>
                    Histórico de consultas
                </button>
            </div>
            <div style={{ width: "75%", border: "0.5px solid rgba(80,80,80,0.2)", borderRadius: 15, height: "45vh", padding: 10, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <label htmlFor="subjective">Subjectivo</label>
                    <textarea id="subjective" style={{ resize: "none", width: "85%", border: "0.5px solid rgba(80,80,80,0.2)", borderRadius: 5 }} value={subjectiveText} onChange={(e) => onSubjectiveChange(e.target.value)} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <label htmlFor="notas">Notas</label>
                    <textarea id="notas" style={{ resize: "none", width: "85%", border: "0.5px solid rgba(80,80,80,0.2)", borderRadius: 5 }} value={notasText}  onChange={(e) => onNotasChange(e.target.value)} />
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

            </div>
        </div>
    );
}
