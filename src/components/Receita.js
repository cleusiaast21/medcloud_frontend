import React, { useState } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import { useNavigate } from 'react-router-dom';
import {
    ListMagnifyingGlass,
    X
} from "@phosphor-icons/react";
import {
    medicamentos
} from "../assets/mocks.jsx";


export default function Receita() {

    const currentDate = new Date();


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
                            <th style={pacientes.tableTitle}>Medicamento</th>
                            <th style={pacientes.tableTitle}>Quantidade</th>
                            <th style={pacientes.tableTitle}>Intervalo</th>
                            <th style={pacientes.tableTitle}>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicamentos.map((medicamento, index) => (
                            <tr key={index}>
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

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <label htmlFor="notas">Notas</label>
                    <textarea id="notas" style={{ resize: "none", width: "85%", border: "0.5px solid rgba(80,80,80,0.2)", borderRadius: 5 }} />
                </div>


            </div>
        </div>



    );
}
