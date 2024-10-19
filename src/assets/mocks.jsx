import pfp from "../assets/userIcon.jpg";
import pfp1 from "../assets/pfp1.webp";

const medicamentos = [

  {
    data: new Date().getFullYear,
    medicamento: 'Abacavir',
    quantidade: '100mg',
    intervalo: '2vezes/dia',
  },
  {
    data: new Date().getFullYear,
    medicamento: 'Lamivudina',
    quantidade: '200mg',
    intervalo: '2vezes/dia',
  }
]


const appointments = [
  {
    patient: "Anastácia Chipindula",
    doctor: "Cleusia dos Anjos",
    hora: "08:30",
    data: "30/09/2024",
  },
  {
    patient: "Odara Tchisolyukombe",
    doctor: "Cleusia dos Anjos",
    hora: "09:30",
    data: "30/09/2024",
  },
  {
    patient: "Áurea Tchisolyukombe",
    doctor: "Cleusia dos Anjos",
    hora: "10:30",
    data: "30/09/2024",
  }
];

const waitingList = [
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
  },
];

const paciente = {
  nome: "Odara Tchisolyukombe",
  especialidade: "Cleusia dos Anjos",
  dataNascimento: new Date("2001-08-16"),
  pfp: pfp1,
  id: "005238850LA048",
  genero: "Feminino",
  contactos: "922223277 - 958346724",
  email: "cleusianjos@outlook.com",
};

const patientsList = [
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
    id: "005238850LA048",
    genero: "Feminino",
    contactos: "922223277 - 958346724",
    email: "cleusianjos@outlook.com",
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
    id: "005238850LA048",
    genero: "Feminino",
    contactos: "922223277 - 958346724",
    email: "cleusianjos@outlook.com",
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
    id: "005238850LA048",
    genero: "Feminino",
    contactos: "922223277 - 958346724",
    email: "cleusianjos@outlook.com",
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
    id: "005238850LA048",
    genero: "Feminino",
    contactos: "922223277 - 958346724",
    email: "cleusianjos@outlook.com",
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
    id: "005238850LA048",
    genero: "Feminino",
    contactos: "922223277 - 958346724",
    email: "cleusianjos@outlook.com",
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
    id: "005238850LA048",
    genero: "Feminino",
    contactos: "922223277 - 958346724",
    email: "cleusianjos@outlook.com",
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
    id: "005238850LA048",
    genero: "Feminino",
    contactos: "922223277 - 958346724",
    email: "cleusianjos@outlook.com",
  },
  {
    patient: "Odara Tchisolyukombe",
    especialidade: "Cleusia dos Anjos",
    pfp: pfp,
    id: "005238850LA048",
    genero: "Feminino",
    contactos: "922223277 - 958346724",
    email: "cleusianjos@outlook.com",
  },
];

export { appointments, waitingList, paciente, patientsList, medicamentos };