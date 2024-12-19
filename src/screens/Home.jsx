import "@fontsource/poppins"; // Defaults to weight 400
import Options from "../components/Options.jsx";
import Header from "../components/Header.jsx";
import Patient from "../components/Patient.jsx";
import Patients from "../components/Patients.jsx";
import Painel from "../components/Painel.jsx";
import NovaConsulta from "../components/NovaConsulta.jsx";
import PatientAppointment from "../components/PatientAppointment.jsx";
import Estatisticas from "../components/Estatisticas.jsx";
import Agenda from "../components/Agenda.jsx";
import { useState } from "react";
import { useAuth } from '../AuthContext'; // Import your AuthContext

export default function Home() {

  const [selectedOption, setSelectedOption] = useState("Painel");
  const [showNovaConsulta, setShowNovaConsulta] = useState(true);
  const { state } = useAuth(); 
  let content;

  const handleCloseNovaConsulta = () => {
    setShowNovaConsulta(false); // This will hide the NovaConsulta component
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


  switch (selectedOption) {
    case "Painel":
      content = (
        <Painel></Painel>
      );
      break;
    case "Pacientes":
      content = (

        <Patients></Patients>
      );
      break;
    case "Agenda":
      content = (

          <h1>Agenda</h1>
     
      );
      break;
    case "Estatísticas":
      content = (

        <Estatisticas doctorName={state.user.nomeCompleto}/>

      );
      break;
    case "Nova Consulta":
      content = (

        <>

          {showNovaConsulta ? (
            <NovaConsulta onClose={handleCloseNovaConsulta} />
          ) : (
            <Painel></Painel>
          )}

        </>


      );
      break;
    case "Paciente":
      content = (

        <Patient></Patient>

      );
      break;
    default:
      content = (
        <div>
          {/* Default content for options other than the specified ones */}
          <p>No content available for the selected option.</p>
        </div>
      );
  }

  return (
    <div style={style.container}>
      <div style={{ display: "flex" }}>
        <Options
          onOptionSelect={setSelectedOption}
          selectedOption={selectedOption}
        ></Options>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Header selectedOption={selectedOption}></Header>
          {content}
        </div>
      </div>
    </div>
  );
}
