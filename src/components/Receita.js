import React, { useState } from "react";
import jsPDF from "jspdf";
import "@fontsource/poppins";
import { useAuth } from "../AuthContext"; // Import your AuthContext
import axios from 'axios';

export default function Receita({ paciente }) {
  const [showHistory, setShowHistory] = useState(false);
  const [notas, setNotas] = useState(""); // Estado para armazenar a receita
  const { state } = useAuth();
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString("pt-BR");
    const idade = calcularIdade(paciente.dataNascimento); // 🟢 Chama a função para calcular a idade

    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("MEDCOM CLINIC", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("SERVIÇOS MÉDICOS ESPECIALIZADOS E EXAMES", 105, 26, {
      align: "center",
    });
    doc.text("Rua Direita do Benfica - Super Mercado Angomart", 105, 30, {
      align: "center",
    });
    doc.text("TEL: 932125150 - 932252504", 105, 34, { align: "center" });

    // Título "RECEITUÁRIO"
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("RECEITUÁRIO", 105, 50, { align: "center" });

    // Informações do Paciente
    doc.setFont("helvetica", "normal");
    doc.text(`Nome: ${paciente.nomeCompleto}`, 20, 60);
    doc.text(`Idade: ${idade} anos`, 140, 70); // 🟢 Exibe a idade calculada
    doc.text(`Medico: ${state.user.nomeCompleto}`, 20, 70);
    doc.text(`Data: ${currentDate}`, 140, 60); // 🟢 Here, it shows the current date

    // Receitaa
    doc.setFontSize(12);
    doc.text("Receita:", 20, 90);
    doc.rect(20, 95, 170, 150);

    // Texto da Receita
    doc.setFontSize(10);
    let textY = 100;
    const maxWidth = 160;
    const lineHeight = 7;
    const lines = doc.splitTextToSize(notas, maxWidth);
    lines.forEach((line) => {
      doc.text(line, 25, textY);
      textY += lineHeight;
    });

    // Rodapé
    doc.setFontSize(10);
    doc.text("O Médico", 105, 260, { align: "center" });
    doc.line(60, 270, 150, 270);

    doc.text("Nº___________________ O.M", 80, 290);

    doc.save("receita_medica.pdf");
  };

  const saveReceitaToConsulta = async () => {
    if (!notas.trim()) {
      alert("A receita está vazia.");
      return;
    }

    try {

      const responseConsulta = await axios.get('http://localhost:5000/api/consultas/findConsultaEnfermeiro', {
        params: {
          pacienteId: paciente.numeroIdentificacao, // Ensure this matches the backend parameter
          medico: state.user.nomeCompleto
        }
      });

      const responseConsultaCloud = await axios.get('http://localhost:5000/api/consultas/findConsultaEnfermeiroCloud', {
        params: {
          pacienteId: paciente.numeroIdentificacao, // Ensure this matches the backend parameter
          medico: state.user.nomeCompleto
        }
      });

      const consultaId = responseConsulta.data.consultaId;
      console.log(consultaId);

      const consultaIdCloud = responseConsultaCloud.data.consultaId;
      console.log(consultaIdCloud);

      const response = await axios.put(`http://localhost:5000/api/consultas/updateReceita`, {
        consultaId: consultaId,  // Ensure this matches the backend parameter
        consultaIdCloud: consultaIdCloud,  // Ensure this matches the backend parameter
        receita: notas,
      });

      if (response.status === 200) {
        setModalMessage('Receita salva!');
        setIsModalOpen(true);
        // Reload the page after a short delay (optional)
        
      } else {
        setModalMessage('Falha ao salvar receita!');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Erro ao salvar a receita:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return "N/A"; // Caso a data esteja vazia ou indefinida

    // Garante que dataNascimento é um objeto Date
    const nascimento = new Date(dataNascimento);

    if (isNaN(nascimento)) return "Formato inválido"; // Verifica se a data é válida

    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    // Ajusta se o aniversário ainda não ocorreu este ano
    if (
      hoje.getMonth() < nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
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
      <div style={{ width: "20%", display: "flex", flexDirection: "column" }}>
        <button
          onClick={() => setShowHistory(false)}
          style={{
            background: showHistory ? "white" : "#2DA9B5",
            border: showHistory ? "1px solid #2DA9B5" : "1px solid white",
            padding: 15,
            borderRadius: 10,
            color: showHistory ? "#2DA9B5" : "white",
            fontFamily: "Poppins",
            fontWeight: 600,
            marginBottom: 15,
            cursor: "pointer",
          }}
        >
          Nova Receita
        </button>

        <button
          onClick={() => setShowHistory(true)}
          style={{
            background: showHistory ? "#2DA9B5" : "white",
            border: showHistory ? "1px solid white" : "1px solid #2DA9B5",
            padding: 15,
            borderRadius: 10,
            color: showHistory ? "white" : "#2DA9B5",
            fontFamily: "Poppins",
            fontWeight: 600,
            cursor: "pointer",
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
        {!showHistory ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="notas">Receita</label>
              <textarea
                id="notas"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                style={{
                  resize: "none",
                  width: "85%",
                  height: "200px",
                  border: "0.5px solid rgba(80,80,80,0.2)",
                  borderRadius: 5,
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={saveReceitaToConsulta}
                style={{
                  background: "#2DA9B5",
                  color: "white",
                  padding: 10,
                  borderRadius: 5,
                  border: "none",
                  cursor: "pointer",
                  width: "20%",
                  marginLeft: "auto",
                }}
              >
                Salvar Receita
              </button>

              <button
                onClick={generatePDF}
                style={{
                  background: "#2DA9B5",
                  color: "white",
                  padding: 10,
                  borderRadius: 5,
                  border: "none",
                  cursor: "pointer",
                  width: "20%",
                  marginLeft: "auto",
                }}
              >
                Exportar em PDF
              </button>
            </div>

            {isModalOpen && (
                <div style={modalStyles.modalBackdrop}>
                    <div style={modalStyles.modalContainer}>
                        <p>{modalMessage}</p>
                        <button style={modalStyles.closeButton} onClick={handleCloseModal}>OK</button>
                    </div>
                </div>
            )}


          </>
        ) : (
          <div>
            <h3 style={{ color: "#2DA9B5", fontWeight: "bold", fontSize: 16 }}>
              Histórico de Receitas
            </h3>
            <p>Nenhuma receita.</p>
          </div>
        )}
      </div>
    </div>
  );
}
