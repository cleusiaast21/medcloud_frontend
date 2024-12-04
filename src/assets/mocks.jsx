import pfp from "../assets/userIcon.jpg";
import pfp1 from "../assets/pfp1.webp";

const medicamentos = [

  {
    data: new Date().getFullYear,
    medicamento: 'Coartem',
    quantidade: '600mg',
    intervalo: '2vezes/dia',
  },
  {
    data: new Date().getFullYear,
    medicamento: 'Clavamox',
    quantidade: '500mg',
    intervalo: '12h',
  }
]

const prescriptions = [
  {
    disease: "Gripe Comum",
    medications: [
      {
        name: "Paracetamol",
        quantity: "500 mg",
        interval: "3 vezes/dia"
      },
      {
        name: "Loratadina",
        quantity: "10 mg",
        interval: "1 vez/dia"
      }
    ]
  },
  {
    disease: "Dor de Garganta",
    medications: [
      {
        name: "Ibuprofeno",
        quantity: "400 mg",
        interval: "3 vezes/dia"
      },
      {
        name: "Benzocaína (spray)",
        quantity: "Aplicar conforme necessário",
        interval: "2 vezes/dia"
      }
    ]
  },
  {
    disease: "Amigdalite",
    medications: [
      {
        name: "Amoxicilina",
        quantity: "500 mg",
        interval: "3 vezes/dia"
      },
      {
        name: "Ibuprofeno",
        quantity: "400 mg",
        interval: "3 vezes/dia"
      }
    ]
  },
  {
    disease: "Bronquite",
    medications: [
      {
        name: "Azitromicina",
        quantity: "500 mg",
        interval: "1 vez/dia durante 3 dias"
      },
      {
        name: "Salbutamol (inalador)",
        quantity: "Conforme necessário",
        interval: "2 vezes/dia"
      }
    ]
  }
];

const appointments = [
  {
    patient: "Odara Tchisolyukombe",
    doctor: "Cleusia dos Anjos",
    hora: "09:30",
    data: "05/11/2024",
  },
  {
    patient: "Áurea Tchisolyukombe",
    doctor: "Cleusia dos Anjos",
    hora: "10:30",
    data: "05/11/2024",
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

export { appointments, prescriptions, waitingList, paciente, patientsList, medicamentos };