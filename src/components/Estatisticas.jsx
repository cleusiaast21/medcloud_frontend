import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Estatisticas({ doctorName }) {
    const [data, setData] = useState([]);
    const [symptomData, setSymptomData] = useState([]);
    const COLORS = ["#00CFCB", "#FFBB28", "#0088FE", "#FF8042", "#84d8ff"];

    useEffect(() => {
        const fetchDiseaseStats = async () => {
            const encodedDoctorName = encodeURIComponent(doctorName);
            const url = `http://localhost:5000/api/consultas/diseaseStats/${encodedDoctorName}`;

            try {
                const response = await axios.get(url);
                const processedData = response.data.map(({ disease, count }) => ({
                    name: disease,
                    count,
                }));
                setData(processedData);

                const symptomResponse = await axios.get(`http://localhost:5000/api/consultas/symptomStats/${encodedDoctorName}`)
                const processedSymptomData = symptomResponse.data.map(({ symptom, count }) => ({
                    name: symptom,
                    count,
                }));
                setSymptomData(processedSymptomData);

                console.log("Symptom Data: ",symptomData)
            
            } catch (error) {
                console.error("Error fetching disease statistics:", error);
            }
        };

        if (doctorName) fetchDiseaseStats();
    }, [doctorName]);

    


    return (
        <div style={{ fontFamily: "Poppins", textAlign: "center", background: "white", borderRadius: 25, padding: 10, margin: 10, height: "80vh" }}>
            {data.length > 0 ? (

                <div style={{ display: 'flex' }}>

                    <div style={{width:'50%'}}>
                    <h4>Distribuição de Sintomas</h4> 

                        <BarChart width={400} height={250} data={symptomData}>
                            <XAxis dataKey="name" tick={false} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#2DA9B5" />
                        </BarChart>
                    </div>
                    
                    <div style={{width:'50%'}}>

                        <ResponsiveContainer width={500} height={270}>
                        <h4>Distribuição de Doenças</h4> 

                            <PieChart>
                                <Pie
                                    data={data}
                                    innerRadius="40%"
                                    outerRadius="80%"
                                    dataKey="count"
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(2)}%`
                                    }
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    verticalAlign="bottom"
                                    align="center"
                                    iconSize={10}
                                    wrapperStyle={{ fontSize: "12px" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                </div>
            ) : (
                <p>Carregando dados...</p>
            )}


        </div>
    );
}
