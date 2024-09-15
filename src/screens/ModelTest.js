import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

// Define a list of symptoms for the autocomplete options
const symptomOptions = [
  { value: 'coceira', label: 'Coceira' },
  { value: 'erupção cutânea', label: 'Erupção cutânea' },
  { value: 'espirros contínuos', label: 'Espirros contínuos' },
  { value: 'tremores', label: 'Tremores' },
  { value: 'calafrios', label: 'Calafrios' },
  { value: 'dor nas articulações', label: 'Dor nas articulações' },
  { value: 'dor de estômago', label: 'Dor de estômago' },
  { value: 'acidez', label: 'Acidez' },
  { value: 'desgaste muscular', label: 'Desgaste muscular' },
  { value: 'vômito', label: 'Vômito' },
  { value: 'fadiga', label: 'Fadiga' },
  { value: 'ganho de peso', label: 'Ganho de peso' },
  { value: 'ansiedade', label: 'Ansiedade' },
  { value: 'mãos e pés frios', label: 'Mãos e pés frios' },
  { value: 'alterações de humor', label: 'Alterações de humor' },
  { value: 'perda de peso', label: 'Perda de peso' },
  { value: 'inquietação', label: 'Inquietação' },
  { value: 'letargia', label: 'Letargia' },
  { value: 'manchas na garganta', label: 'Manchas na garganta' },
  { value: 'tosse', label: 'Tosse' },
  { value: 'febre alta', label: 'Febre alta' },
  { value: 'falta de ar', label: 'Falta de ar' },
  { value: 'sudorese', label: 'Sudorese' },
  { value: 'indigestão', label: 'Indigestão' },
  { value: 'dor de cabeça', label: 'Dor de cabeça' },
  { value: 'pele amarelada', label: 'Pele amarelada' },
  { value: 'urina escura', label: 'Urina escura' },
  { value: 'náusea', label: 'Náusea' },
  { value: 'perda de apetite', label: 'Perda de apetite' },
  { value: 'constipação', label: 'Constipação' },
  { value: 'dor abdominal', label: 'Dor abdominal' },
  { value: 'diarreia', label: 'Diarreia' },
  { value: 'febre leve', label: 'Febre leve' },
  { value: 'urina amarelada', label: 'Urina amarelada' },
  { value: 'amarelamento dos olhos', label: 'Amarelamento dos olhos' },
  { value: 'irritação na garganta', label: 'Irritação na garganta' },
  { value: 'vermelhidão nos olhos', label: 'Vermelhidão nos olhos' },
  { value: 'nariz escorrendo', label: 'Nariz escorrendo' },
  { value: 'dor no peito', label: 'Dor no peito' },
  { value: 'batimento cardíaco rápido', label: 'Batimento cardíaco rápido' },
  { value: 'tontura', label: 'Tontura' },
  { value: 'obesidade', label: 'Obesidade' },
  { value: 'rosto e olhos inchados', label: 'Rosto e olhos inchados' },
  { value: 'fome excessiva', label: 'Fome excessiva' },
  { value: 'secura e formigamento nos lábios', label: 'Secura e formigamento nos lábios' },
  { value: 'fala arrastada', label: 'Fala arrastada' },
  { value: 'fraqueza muscular', label: 'Fraqueza muscular' },
  { value: 'rigidez no pescoço', label: 'Rigidez no pescoço' },
  { value: 'perda de equilíbrio', label: 'Perda de equilíbrio' },
  { value: 'fraqueza de um lado do corpo', label: 'Fraqueza de um lado do corpo' },
  { value: 'perda de olfato', label: 'Perda de olfato' },
  { value: 'dor muscular', label: 'Dor muscular' },
  { value: 'manchas vermelhas no corpo', label: 'Manchas vermelhas no corpo' },
  { value: 'dor na barriga', label: 'Dor na barriga' },
  { value: 'lacrimejamento', label: 'Lacrimejamento' },
  { value: 'aumento de apetite', label: 'Aumento de apetite' },
  { value: 'falta de concentração', label: 'Falta de concentração' },
  { value: 'histórico de consumo de álcool', label: 'Histórico de consumo de álcool' },
  { value: 'sangue no escarro', label: 'Sangue no escarro' },
];



function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictions, setPredictions] = useState(null);

  const handleSelectChange = (selectedOptions) => {
    // Convert selected options to an array of symptom names
    const symptoms = selectedOptions.reduce((acc, option) => {
      acc[option.value] = 1;
      return acc;
    }, {});

    setSelectedSymptoms(symptoms);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/predict', { symptoms: selectedSymptoms });
      setPredictions(response.data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  return (
    <div>
      <h1>Disease Predictor</h1>
      <form>
        <label>
          Symptoms:
          <Select
            isMulti
            name="symptoms"
            options={symptomOptions}
            onChange={handleSelectChange}
            placeholder="Selecione os sintomas..."
          />
        </label>
      </form>
      <button onClick={handleSubmit}>Predict</button>

      {predictions && (
        <div>
          <h2>Predictions:</h2>
          <ul>
            {Object.keys(predictions).map((disease) => (
              <li key={disease}>
                {disease}: {predictions[disease] === 1 ? 'Positivo' : 'Negativo'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;