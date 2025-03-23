import React, { useState, useEffect } from "react";
import axios from 'axios';
import "@fontsource/poppins"; // Defaults to weight 400

const Agenda = () => {
  const [offsetSemana, setOffsetSemana] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);
  const [novoEvento, setNovoEvento] = useState({ dia: null, especialidade: "", hora: "", nome: "", telefone: "" });
  const [eventos, setEventos] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);


  const obterDetalhesSemana = (offset) => {
    const hoje = new Date();
    const primeiroDiaSemana = new Date(hoje);
    primeiroDiaSemana.setDate(hoje.getDate() - hoje.getDay() + 1 + offset * 7);

    const mes = primeiroDiaSemana.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    const mesFormatado = mes.charAt(0).toUpperCase() + mes.slice(1);

    const dias = Array.from({ length: 7 }, (_, i) => {
      const dia = new Date(primeiroDiaSemana);
      dia.setDate(primeiroDiaSemana.getDate() + i);
      return {
        data: dia,
        label: dia.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric" }),
      };
    });

    return { dias, mes: mesFormatado };
  };

  const { dias: diasSemana, mes } = obterDetalhesSemana(offsetSemana);

  const abrirModal = (dia) => {
    setNovoEvento({ ...novoEvento, dia });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const salvarEvento = () => {
    if (novoEvento.especialidade && novoEvento.hora && novoEvento.nome && novoEvento.telefone) {
      setEventos([...eventos, { ...novoEvento }]);
      fecharModal();
    }
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

  /* useEffect(() => {
     if (formData.specialty) {
       const filtered = doctors.filter(doctor => doctor.specialty === formData.specialty);
       setFilteredDoctors(filtered);
     } else {
       setFilteredDoctors([]);
     }
   }, [formData.specialty, doctors]);*/

  return (
    <div style={estilos.container}>
      <div style={estilos.cabecalho}>
        <button onClick={() => setOffsetSemana(offsetSemana - 1)} style={estilos.botao}>←</button>
        <h2>{mes}</h2>
        <button onClick={() => setOffsetSemana(offsetSemana + 1)} style={estilos.botao}>→</button>
      </div>

      <div style={estilos.calendario}>
        <div style={estilos.gridDias}>
          {diasSemana.map((dia, index) => (
            <div key={index} style={estilos.colunaDia} onClick={() => abrirModal(index)}>
              <div style={estilos.cabecalhoDia}>{dia.label}</div>
              <div style={estilos.eventos}>
                {eventos
                  .filter(evento => evento.dia === index)
                  .map((evento, i) => (
                    <div key={i} style={estilos.evento}>
                      <strong>{evento.especialidade}</strong>
                      <p>{evento.hora}</p>
                      <p>{evento.nome}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalAberto && (
        <div style={estilos.modalOverlay}>

          <div style={estilos.modal}>
            <h3>Novo Agendamento</h3>
            <input type="text" placeholder="Nome" onChange={(e) => setNovoEvento({ ...novoEvento, nome: e.target.value })} />
            <input type="tel" placeholder="Telefone" onChange={(e) => setNovoEvento({ ...novoEvento, telefone: e.target.value })} />
            <div >
              <select name="specialty" required>
                <option value="">Selecione a especialidade</option>
                <option value="Medicina Geral">Medicina Geral</option>
                <option value="Cardiologia">Cardiologia</option>
                <option value="Pediatria">Pediatria</option>
                <option value="Neurologia">Neurologia</option>
                <option value="Ginecologia">Ginecologia</option>
              </select>
              <br />

              <select name="medico" required>
                <option value="">Selecione o médico</option>
                {filteredDoctors.map((doctor) => (
                  <option key={doctor._id} value={doctor.nomeCompleto}>{doctor.nomeCompleto}</option>
                ))}
              </select>
            </div>            
            <input type="time" onChange={(e) => setNovoEvento({ ...novoEvento, hora: e.target.value })} />
            <button onClick={salvarEvento}>Salvar</button>
            <button onClick={fecharModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

const estilos = {
  container: { fontFamily: "Poppins", textAlign: "center", padding: "10px", width: "97%" },
  cabecalho: { display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" },
  botao: { fontSize: "20px", padding: "5px", cursor: "pointer", background: "#ddd", borderRadius: "5px" },
  calendario: { display: "flex", border: "1px solid #ccc", borderRadius: "5px", height: "75vh", width: "100%" },
  gridDias: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", flex: "1", height: "100%" },
  colunaDia: { borderLeft: "1px solid #ccc", cursor: "pointer", padding: "10px" },
  cabecalhoDia: { background: "#f0f0f0", fontWeight: "bold", textAlign: "center", padding: "5px" },
  eventos: { marginTop: "5px" },
  evento: { background: "#2DA9B5", color: "white", padding: "5px", borderRadius: "5px", margin: "5px 0" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { background: "white", padding: "20px", borderRadius: "5px", display: "flex", flexDirection: "column", gap: "10px", width: "300px" },
};

export default Agenda;
