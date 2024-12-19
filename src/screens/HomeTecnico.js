import "@fontsource/poppins"; // Defaults to weight 400
import Options from "../components/OptionsTecnico.jsx";
import Header from "../components/Header.jsx";
import Patient from "../components/Patient.jsx";
import Patients from "../components/Patients.jsx";
import PatientAppointment from "../components/PatientAppointment.jsx";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Home() {
    const [selectedOption, setSelectedOption] = useState("Painel");
    const [waitingList, setWaitingList] = useState([]); // Will store pending consultations
    const [selectedConsulta, setSelectedConsulta] = useState(null); // Store selected consulta
    const [examInputs, setExamInputs] = useState({}); // Store inputs for each exam
    const [image, setImage] = useState(null);
    let content;

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
    };

    const handleExamTypeChange = (e, examName) => {
        const selectedType = e.target.value;
        setExamInputs((prev) => ({
            ...prev,
            [examName]: { type: selectedType, value: "" },
        }));
    };

    const handleExamInputChange = (e, examName) => {
        const inputValue = e.target.value;
        setExamInputs((prev) => ({
            ...prev,
            [examName]: { ...prev[examName], value: inputValue },
        }));
    };

    const handleFileUpload = (e, examName) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1]; // Extract Base64 content
            setExamInputs((prev) => ({
                ...prev,
                [examName]: { ...prev[examName], value: base64String, fileType: file.type },
            }));
        };
        reader.readAsDataURL(file); // Convert file to Base64
    };
    

    const renderExamInput = (examName) => {
        const exam = examInputs[examName];
        if (!exam) return null;

        switch (exam.type) {
            case "text":
                return (
                    <textarea
                        style={style.input}
                        value={exam.value}
                        onChange={(e) => handleExamInputChange(e, examName)}
                        placeholder="Enter text"
                    />
                );
            case "image":
            case "pdf":
                return (
                    <input
                        style={style.fileInput}
                        type="file"
                        accept={exam.type === "image" ? "image/*" : "application/pdf"}
                        onChange={(e) => handleFileUpload(e, examName)}
                    />
                );
            default:
                return null;
        }
    };

    // Function to fetch consultations where the state is "pending"
    const fetchPendingConsultations = async () => {
        try {
            // Fetch consultations where state is 'pending'
            const response = await axios.get('http://localhost:5000/api/consultas/pending');
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

    const handleSendAllResults = async () => {
        try {
            const results = Object.entries(examInputs).map(([examName, data]) => ({
                examName, // Name of the exam
                type: data.type, // Type of input
                value: data.value, // Base64-encoded data
                fileType: data.fileType || null, // MIME type of the file
            }));
    
            const payload = { results };

            console.log("Resultados: ",payload);
    
            const response = await axios.put(
                `http://localhost:5000/api/consultas/results/${selectedConsulta._id}`,
                payload
            );
    
            alert("Resultados actualizados com sucesso!");
            setSelectedConsulta(null)
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error uploading results:", error.response || error);
            alert("Failed to upload results.");
        }
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
                            <h3>Consulta Selecionada</h3>
                            <p>Médico: {selectedConsulta.medico}</p>
                            <p>Paciente: {selectedConsulta.pacienteNome}</p>
                            <h4>Exames:</h4>
                            {selectedConsulta.selectedExams.map((exam, index) => (
                                <div key={index}>
                                    <p>{exam}</p>
                                    <select
                                        style={style.input}
                                        onChange={(e) => handleExamTypeChange(e, exam)}
                                    >
                                        <option value="">Selecione o tipo de resultado</option>
                                        <option value="text">Texto</option>
                                        <option value="image">Imagem</option>
                                        <option value="pdf">PDF</option>
                                    </select>
                                    {renderExamInput(exam)}
                                </div>
                            ))}

                            <button
                                style={style.button}
                                onClick={() => handleSendAllResults()}
                                disabled={!Object.values(examInputs).some(input => input?.value)}
                            >
                                Enviar 
                            </button>
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