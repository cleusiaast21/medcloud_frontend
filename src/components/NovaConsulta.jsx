import React, { useState, useEffect } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function NovaConsulta({ onClose }) {
    

    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        numeroIdentificacao: '',
        dataNascimento: '',
        sexo: '',
        telefonePrincipal: '',
        telefoneAlternativo: '',
        email: '',
        specialty: '',
        medico: '',
    });
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        if (formData.specialty) {
            const filtered = doctors.filter(doctor => doctor.specialty === formData.specialty);
            setFilteredDoctors(filtered);
        } else {
            setFilteredDoctors([]);
        }
    }, [formData.specialty, doctors]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'numeroIdentificacao' && value) {
            try {
                const response = await axios.get(`http://localhost:5000/api/pacientes/exists/${value}`);
                if (response.data.exists) {
                    const pacienteData = response.data.paciente;
                    setFormData({
                        nomeCompleto: pacienteData.nomeCompleto,
                        numeroIdentificacao: pacienteData.numeroIdentificacao,
                        dataNascimento: pacienteData.dataNascimento.split('T')[0],
                        sexo: pacienteData.sexo,
                        telefonePrincipal: pacienteData.telefonePrincipal,
                        telefoneAlternativo: pacienteData.telefoneAlternativo,
                        email: pacienteData.email,
                        specialty: formData.specialty,
                        medico: formData.medico
                    });
                } else {
                    setErrorMessage('Número de Identificação não encontrado');
                }
            } catch (error) {
                console.error('Erro ao verificar número de identificação:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            let numeroIdentificacao;
            let nome;
            const password = 'Medcloud@2024'; // The password to be hashed
    
            // Hash the password before sending it
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
            // Check if the patient already exists
            const response = await axios.get(`http://localhost:5000/api/pacientes/exists/${formData.numeroIdentificacao}`);
            if (response.data.exists) {
                // Patient already exists, use their identification number
                numeroIdentificacao = response.data.paciente.numeroIdentificacao;
                nome = response.data.paciente.nomeCompleto;
            } else {
                // Create a new patient if they don't exist
                const pacienteRes = await axios.post('http://localhost:5000/api/pacientes', {
                    nomeCompleto: formData.nomeCompleto,
                    numeroIdentificacao: formData.numeroIdentificacao,
                    dataNascimento: formData.dataNascimento,
                    sexo: formData.sexo,
                    telefonePrincipal: formData.telefonePrincipal,
                    telefoneAlternativo: formData.telefoneAlternativo,
                    email: formData.email,
                    // Send hashed password (if required for patient creation)
                    password: hashedPassword,
                });
                numeroIdentificacao = pacienteRes.data.numeroIdentificacao;
            }
    
            // Find the selected doctor
            const selectedDoctor = doctors.find(doctor => doctor.nomeCompleto === formData.medico);
            const funcionarioId = selectedDoctor ? selectedDoctor.funcionarioId : null;
    
            if (!funcionarioId) {
                setModalMessage('Erro ao encontrar o médico selecionado.');
                setIsModalOpen(true);
                return;
            }
    
            // Create the consultation
            await axios.post('http://localhost:5000/api/consultas', {
                specialty: formData.specialty,
                medico: formData.medico,
                pacienteId: numeroIdentificacao,
                pacienteNome: formData.nomeCompleto,
                medicoId: funcionarioId,
                state: 'open',
                password: hashedPassword,
            });
    
            // Add to waiting list
            await axios.post('http://localhost:5000/api/waitingList', {
                pacienteId: numeroIdentificacao,
                medicoId: funcionarioId,
                // Optionally send hashed password
                password: hashedPassword,
            });
    
            setModalMessage('Dados registrados com sucesso!');
            setIsModalOpen(true);
    
        } catch (error) {
            console.error('Erro ao registrar dados:', error);
            setModalMessage('Erro ao registrar dados');
            setIsModalOpen(true);
        }
    };
    

    const handleCloseModal = () => {
        setIsModalOpen(false);
        onClose(); // Call the parent component's close function
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
            borderColor: "#2DA9B5",
            paddingTop: 6,
            paddingBottom: 6,
            paddingRight: 15,
            paddingLeft: 15,
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
        },
        error: {
            color: 'red',
            fontWeight: 'bold',
        },
    };
    

    return (

        <div style={consulta.container}>
            <p style={consulta.title}>Geral</p>

            <form style={consulta.form} >
                <div style={consulta.labels}>
                    <label style={consulta.label} htmlFor="nomeCompleto">Nome Completo*</label>
                    <label style={consulta.label} htmlFor="numeroIdentificacao">Nº de Identificação*</label>
                    <label style={consulta.label} htmlFor="dataNascimento">Data de Nascimento*</label>
                    <label htmlFor="sexo">Sexo*</label>
                </div>

                <div style={consulta.inputs}>
                    <input style={consulta.input} type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
                    <br />
                    <input style={consulta.input} type="text" name="numeroIdentificacao" value={formData.numeroIdentificacao} onChange={handleChange} required />
                    <br />
                    <input style={consulta.input} type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                    <br />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <input type="radio" name="sexo" value="Masculino" checked={formData.sexo === 'Masculino'} onChange={handleChange} required /> Masculino
                        <input type="radio" name="sexo" value="Feminino" checked={formData.sexo === 'Feminino'} onChange={handleChange} required /> Feminino <br />
                    </div>
                </div>
            </form>

            <p style={consulta.title}>Contactos</p>

            <div style={consulta.form}>
                <div style={consulta.labels}>
                    <label style={consulta.label} htmlFor="telefonePrincipal">Telefone Principal*</label>
                    <label style={consulta.label} htmlFor="telefoneAlternativo">Telefone Alternativo</label>
                    <label style={consulta.label} htmlFor="email">Email</label>
                </div>

                <div style={consulta.inputs}>
                    <input style={consulta.input} type="text" name="telefonePrincipal" value={formData.telefonePrincipal} onChange={handleChange} required />
                    <br />
                    <input style={consulta.input} type="text" name="telefoneAlternativo" value={formData.telefoneAlternativo} onChange={handleChange} />
                    <br />
                    <input style={consulta.input} type="text" name="email" value={formData.email} onChange={handleChange} />
                    <br />
                </div>
            </div>

            <p style={consulta.title}>Dados da Consulta</p>

            <div style={consulta.form}>
                <div style={consulta.labels}>
                    <label style={consulta.label} htmlFor="especialidade">Especialidade*</label>
                    <label style={consulta.label} htmlFor="medico">Médico*</label>
                </div>

                <div style={consulta.inputs}>
                    <select style={consulta.input} name="specialty" value={formData.specialty} onChange={handleChange} required>
                        <option value="">Selecione a especialidade</option>
                        <option value="Medicina Geral">Medicina Geral</option>
                        <option value="Cardiologia">Cardiologia</option>
                        <option value="Pediatria">Pediatria</option>
                        <option value="Neurologia">Neurologia</option>
                        <option value="Ginecologia">Ginecologia</option>
                    </select>
                    <br />

                    <select style={consulta.input} name="medico" value={formData.medico} onChange={handleChange} required>
                        <option value="">Selecione o médico</option>
                        {filteredDoctors.map((doctor) => (
                            <option key={doctor._id} value={doctor.nomeCompleto}>{doctor.nomeCompleto}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={{ display: "flex", margin: 20, justifyContent: "end" }}>
                <button style={consulta.button} onClick={handleSubmit} type="submit">Salvar</button>
            </div>

            {isModalOpen && (
                <div style={modalStyles.modalBackdrop}>
                    <div style={modalStyles.modalContainer}>
                        <p>{modalMessage}</p>
                        <button style={modalStyles.closeButton} onClick={handleCloseModal}>OK</button>
                    </div>
                </div>
            )}
        </div>

    );
}
