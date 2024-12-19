import React, { useState, useEffect } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import pfp from '../assets/userIcon.jpg';
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Evita warnings no console

export default function Patients() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [patients, setPatients] = useState([]); // Add state for patients
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [patientAppointments, setPatientAppointments] = useState([]);


  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPatient(null);
  };

  const fetchPatientAppointments = async (patientId) => {
    try {

      const response = await axios.get(`http://localhost:5000/api/consultas/consultasPaciente/${patientId}`);
      return response.data; // Retorna as consultas do paciente
    } catch (error) {
      console.error("Erro ao buscar consultas do paciente:", error);
      return [];
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);

    // Buscar consultas do paciente

    const appointments = fetchPatientAppointments(patient.numeroIdentificacao);
    setPatientAppointments(appointments); // Atualiza o estado com as consultas

    console.log("APPOINTMENTS: ",patientAppointments)

    setModalIsOpen(true); // Abre o modal

  };


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pacientes/patients');
        setPatients(response.data);
        setFilteredPatients(response.data); // Inicialmente exibe todos os pacientes
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = patients.filter(patient =>
      patient.nomeCompleto.toLowerCase().includes(value.toLowerCase()) ||
      patient.numeroIdentificacao.toString().includes(value)
    );

    setFilteredPatients(filtered);
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
    if (specialty) {
      const filtered = doctors.filter(doctor => doctor.specialty === specialty);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [specialty, doctors]);

  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };


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
  };

  const pacientes = {
    tableTitle: {
      color: "#2DA9B5",
      fontWeight: "Normal",
      fontSize: 12,
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

    <div >

      <div style={{ display: "flex", justifyContent: "space-between", flexDirection: 'row', alignItems: 'center' }}>
        <div
          style={{
            display: "flex",
            margin: 15,
            borderBottom: "0.5px solid #2DA9B5",
            width: "50%",
            padding: 5,
          }}
        >
          <MagnifyingGlass size={23} color="#2DA9B5" />
          <input
            type="text"
            style={{
              background: "none",
              border: "none",
              fontSize: "16px",
              fontFamily: "Poppins",
              marginLeft: 4,
              width: "100%",
            }}
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div style={{ margin: 20 }}>
          <select
            value={specialty}
            onChange={handleSpecialtyChange}
            style={{
              background: "none",
              border: "none",
              fontSize: "16px",
              marginLeft: 15,
              color: "#2DA9B5",
            }}
          >
            <option value="">Selecione a especialidade</option>
            <option value="Medicina Geral">Medicina Geral</option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Pediatria">Pediatria</option>
            <option value="Neurologia">Neurologia</option>
            <option value="Ginecologia">Ginecologia</option>
          </select>

          <select
            style={{
              background: "none",
              border: "none",
              fontSize: "16px",
              marginLeft: 15,
              color: "#2DA9B5",
            }}
          >
            <option value="">Selecione o médico</option>
            {filteredDoctors.map((doctor) => (
              <option key={doctor._id} value={doctor.nomeCompleto}>{doctor.nomeCompleto}</option>
            ))}
          </select>
        </div>


      </div>


      <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
        <div
          style={{
            background: "white",
            width: "85vw",
            borderRadius: 10,
            height: "65vh",
            display: "flex",
            margin: 'auto',
            marginTop: 15,
            overflowY: 'scroll'
          }}
        >
          <table
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={style.tableTitles}>
                <th style={style.tableTitle}>Nome do Paciente</th>
                <th style={style.tableTitle}>ID</th>
                <th style={style.tableTitle}>Idade</th>
                <th style={style.tableTitle}>Genero</th>
                <th style={style.tableTitle}>Contactos</th>
                <th style={style.tableTitle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index} onClick={() => handlePatientClick(patient)} style={{ cursor: "pointer" }}>
                  <td style={style.tableContentSpecial}>
                    <img
                      src={pfp}
                      style={{
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                      }}
                      alt="pfp"
                    />
                    {patient.nomeCompleto}
                  </td>
                  <td style={style.tableContent}>{patient.numeroIdentificacao}</td>
                  <td style={style.tableContent}>{calculateAge(patient.dataNascimento)}</td>
                  <td style={style.tableContent}>{patient.sexo}</td>
                  <td style={style.tableContent}>{patient.telefonePrincipal}/{patient.telefoneAlternativo}</td>
                  <td style={style.tableContent}>{patient.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {selectedPatient && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              content: {
                width: '80%',
                margin: 'auto',
                borderRadius: '10px',
                padding: '20px',
              },
            }}
          >
            <h2>{selectedPatient.nomeCompleto}</h2>
            <p><strong>ID:</strong> {selectedPatient.numeroIdentificacao}</p>
            <p><strong>Idade:</strong> {calculateAge(selectedPatient.dataNascimento)}</p>
            <p><strong>Gênero:</strong> {selectedPatient.sexo}</p>
            <p><strong>Contactos:</strong> {selectedPatient.telefonePrincipal}/{selectedPatient.telefoneAlternativo}</p>
            <p><strong>Email:</strong> {selectedPatient.email}</p>

            <h3>Consultas</h3>
            {patientAppointments.length > 0 ? (
              <ul>
                {patientAppointments.map((appointment, index) => (
                  <li key={index}>
                    <strong>Data:</strong> {appointment.pacienteId} | <strong>Descrição:</strong> {appointment.medico}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma consulta encontrada.</p>
            )}
            <button
              onClick={closeModal}
              style={{
                backgroundColor: '#2DA9B5',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Fechar
            </button>
          </Modal>
        )}
      </div>
    </div>

  );
}
