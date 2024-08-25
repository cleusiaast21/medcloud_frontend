import React, { useState, useEffect } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import axios from 'axios';

export default function NovaConsulta() {

    
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
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
      };

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Primeiro, cria o paciente
            const pacienteRes = await axios.post('http://localhost:5000/api/pacientes', {
                nomeCompleto: formData.nomeCompleto,
                numeroIdentificacao: formData.numeroIdentificacao,
                dataNascimento: formData.dataNascimento,
                sexo: formData.sexo,
                telefonePrincipal: formData.telefonePrincipal,
                telefoneAlternativo: formData.telefoneAlternativo,
                email: formData.email,
            });
    
            const numeroIdentificacao = pacienteRes.data.numeroIdentificacao;
    
            // Encontra o ID do médico selecionado
            const selectedDoctor = doctors.find(doctor => doctor.nomeCompleto === formData.medico);
            const funcionarioId = selectedDoctor ? selectedDoctor.funcionarioId : null;
    
            if (!funcionarioId) {
                alert('Erro ao encontrar o médico selecionado');
                return;
            }
    
            // Em seguida, cria a consulta associada ao paciente
            await axios.post('http://localhost:5000/api/consultas', {
                specialty: formData.specialty,
                medico: formData.medico,
                pacienteId: numeroIdentificacao,
                medicoId: funcionarioId,
            });
    
            // Por fim, adiciona o paciente à lista de espera
            await axios.post('http://localhost:5000/api/waitingList', {
                pacienteId: numeroIdentificacao,
                medicoId: funcionarioId,
            });
    
            alert('Dados registrados com sucesso');
    
        } catch (error) {
            console.error('Erro ao registrar dados:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            alert('Erro ao registrar dados');
        }
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
        </div>

    );
}
