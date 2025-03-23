import React, { useState } from "react";
import jsPDF from "jspdf";
import "@fontsource/poppins";
import { useAuth } from "../AuthContext"; // Import your AuthContext

export default function Receita({ paciente }) {
  const [showHistory, setShowHistory] = useState(false);
  const [notas, setNotas] = useState(""); // Estado para armazenar a receita
  const { state } = useAuth();

  alert(paciente.dataNascimento);

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
    doc.text("NºHC:", 20, 70);
    doc.text(`Data: ${currentDate}`, 140, 60); // 🟢 Here, it shows the current date

    // Receita
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

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return "N/A"; // Caso a data esteja vazia ou indefinida

    let nascimento;

    // Verifica se a data está no formato esperado (YYYY-MM-DD)
    if (dataNascimento.includes("-")) {
        const [ano, mes, dia] = dataNascimento.split("-").map(Number);
        nascimento = new Date(ano, mes - 1, dia);
    } else if (dataNascimento.includes("/")) {
        // Se a data estiver no formato DD/MM/YYYY
        const [dia, mes, ano] = dataNascimento.split("/").map(Number);
        nascimento = new Date(ano, mes - 1, dia);
    } else {
        return "Formato inválido"; // Se for um formato inesperado
    }

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
                  height: "300px",
                  border: "0.5px solid rgba(80,80,80,0.2)",
                  borderRadius: 5,
                }}
              />
            </div>

            <button
              onClick={generatePDF}
              style={{
                background: "#2DA9B5",
                color: "white",
                padding: 10,
                borderRadius: 5,
                border: "none",
                cursor: "pointer",
              }}
            >
              Exportar em PDF
            </button>
          </>
        ) : (
          <div>
            <h3 style={{ color: "#2DA9B5", fontWeight: "bold", fontSize: 16 }}>
              Histórico de Receitas
            </h3>
            <p>Histórico de receitas não implementado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
