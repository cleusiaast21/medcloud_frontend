import React, { useState } from 'react';
import axios from 'axios';
import Options from "../components/Options.jsx";
import Header from "../components/Header.jsx";

const EmployeeRegistration = () => {

    const [selectedOption, setSelectedOption] = useState("Painel");

    const [formData, setFormData] = useState({
        nomeCompleto: '',
        numeroIdentificacao: '',
        funcionarioId: '',
        telefone: '',
        email: '',
        dataNascimento: '',
        sexo: '',
        employeeType: '',
        specialty: '',
        password: 'Medcloud@2024'
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleCloseModal = () => {
        setIsModalOpen(false);
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.employeeType === 'Medico' && !formData.specialty) {
            alert('Por favor selecione uma especialidade para o médico.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/employees', formData);
            setModalMessage('Funcionário registrado com sucesso!');
            setIsModalOpen(true);

            setTimeout(() => {
                setIsModalOpen(false);
                window.location.reload(); // Refresh the page
            }, 2000);
        } catch (error) {
            console.error('Error registering employee:', error);
            setModalMessage('Falha ao registrar consulta!');
            setIsModalOpen(true);

            // Close the modal after 2 seconds but don't refresh
            setTimeout(() => {
                setIsModalOpen(false);
            }, 2000);
        }
    };

    return (
        <div style={styles.container}>
            <div style={{ display: "flex" }}>
                <Options
                    onOptionSelect={setSelectedOption}
                    selectedOption={selectedOption}
                ></Options>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Header selectedOption={selectedOption}></Header>

                    <p style={consulta.title}>Novo Funcionário</p>

                    <form style={consulta.form} onSubmit={handleSubmit}>
                        <div style={consulta.labels}>
                            <label style={consulta.label} htmlFor="nomeCompleto">Nome Completo*</label>
                            <label style={consulta.label} htmlFor="numeroIdentificacao">Nº de Identificação*</label>
                            <label style={consulta.label} htmlFor="funcionarioId">Nº de Funcionário*</label>
                            <label style={consulta.label} htmlFor="telefone">Nº de Telefone*</label>
                            <label style={consulta.label} htmlFor="email">Email</label>
                            <label style={consulta.label} htmlFor="dataNascimento">Data de Nascimento*</label>
                            <label style={consulta.label} htmlFor="sexo">Sexo*</label>
                            <label style={consulta.label} htmlFor="funcionarioTipo">Tipo de Funcionário*</label>
                        </div>

                        <div style={consulta.inputs}>
                            <input style={consulta.input} type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
                            <br />
                            <input style={consulta.input} type="text" name="numeroIdentificacao" value={formData.numeroIdentificacao} onChange={handleChange} required />
                            <br />
                            <input style={consulta.input} type="text" name="funcionarioId" value={formData.funcionarioId} onChange={handleChange} required />
                            <br />
                            <input style={consulta.input} type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
                            <br />
                            <input style={consulta.input} type="text" name="email" value={formData.email} onChange={handleChange} required />
                            <br />
                            <input style={consulta.input} type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                            <br />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <input type="radio" name="sexo" value="Masculino" checked={formData.sexo === 'Masculino'} onChange={handleChange} required /> Masculino
                                <input type="radio" name="sexo" value="Feminino" checked={formData.sexo === 'Feminino'} onChange={handleChange} required /> Feminino <br />
                            </div>
                            <select style={consulta.select} name="employeeType" value={formData.employeeType} onChange={handleChange} required>
                                <option value="">Selecione o tipo de Funcionário</option>
                                <option value="Medico">Médico</option>
                                <option value="Recepcionista">Recepcionista</option>
                                <option value="Tecnico de Laboratorio">Técnico de Laboratorio</option>
                                <option value="Enfermeiro">Enfermeiro</option>
                            </select>
                            {formData.employeeType === 'Medico' && (
                                <select style={consulta.select} name="specialty" value={formData.specialty} onChange={handleChange} required>
                                    <option value="">Selecione a especialidade</option>
                                    <option value="Medicina Geral">Medicina Geral</option>
                                    <option value="Cardiologia">Cardiologia</option>
                                    <option value="Pediatria">Pediatria</option>
                                    <option value="Neurologia">Neurologia</option>
                                    <option value="Ginecologia">Ginecologia</option>
                                </select>
                            )}
                        </div>

                    </form>
                    <div style={{ display: "flex", margin: 20, justifyContent: "end" }}>
                        <button style={consulta.button} type="submit" onClick={handleSubmit}>Salvar</button>
                    </div>

                    {isModalOpen && (
                        <div style={modalStyles.modalBackdrop}>
                            <div style={modalStyles.modalContainer}>
                                <p>{modalMessage}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        margin: 0,
        backgroundColor: "#F5F5F5",
        height: "100vh",
        fontFamily: "Poppins",
    },
};

const consulta = {
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
    select: {
        background: "white",
        fontSize: "16px",
        color: "#2DA9B5",
        padding: '5px',
        marginTop: 28,
        border: "1.5px solid rgba(128,128,128,0.2)",
        borderRadius: 5,
        width: '100%',
    },
    button: {
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
        cursor: "pointer",
    },
};

export default EmployeeRegistration;
