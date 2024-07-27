import React from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import {
    MagnifyingGlass,
    X,
    NotePencil,
    CaretDown,
    ListMagnifyingGlass,
  } from "@phosphor-icons/react";
  import {
    paciente,
  } from "../assets/mocks.jsx";


export default function Patient() {

    const currentDate = new Date();

    const patient = {
        container: {
            margin: 20,
            background: "white",
            borderRadius: 10,
            height: "85vh",
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
            fontFamily: "Poppins",
            overflowY: "scroll",
        },
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



    return (

        <div style={patient.container}>
            <div
                style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}
            >
                <X size={20} color="red" style={{ cursor: "pointer" }} />
            </div>

            <div style={{ padding: 20, display: "flex" }}>
                <img
                    style={{ width: 100, height: 100, borderRadius: "50%" }}
                    src={paciente.pfp}
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

            <div style={patient.containerP}>
                <div style={patient.containerOutline}>
                    <div style={patient.containerHeader}>
                        <div style={patient.headerContent}>
                            <span style={patient.headerText}>Contactos</span>
                            <div>
                                <NotePencil size={25} color="#2DA9B5" />
                                <CaretDown size={25} color="#2DA9B5" />
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: 5 }}>
                        <span style={patient.attribute}>Telefones: </span>
                        <span style={patient.value}> {paciente.contactos}</span>
                        <br />
                        <span style={patient.attribute}>Email: </span>
                        <span style={patient.value}> {paciente.email}</span>
                        <br />
                    </div>
                </div>
            </div>

            <div style={patient.containerP}>
                <div style={patient.containerOutline}>
                    <div style={patient.containerHeader}>
                        <div style={patient.headerContent}>
                            <span style={patient.headerText}>Seguradora</span>
                            <div>
                                <NotePencil size={25} color="#2DA9B5" />
                                <CaretDown size={25} color="#2DA9B5" />
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: 5 }}>
                        <span style={patient.attribute}>Nome: </span>
                        <span style={patient.value}> {paciente.contactos}</span>
                        <br />
                        <span style={patient.attribute}>Plano: </span>
                        <span style={patient.value}> {paciente.email}</span>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );

}