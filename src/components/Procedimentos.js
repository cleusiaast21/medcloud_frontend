import React, { useState, useEffect } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import { useNavigate } from 'react-router-dom';
import {
    ListMagnifyingGlass,
    X
} from "@phosphor-icons/react";
import {
    medicamentos
} from "../assets/mocks.jsx";
import { categories } from '../assets/auxiliaryData.jsx';


export default function Procedimentos({ onSelectedExamsChange }) {

    const [selectedTests, setSelectedTests] = useState({});

    // Call the parent's callback function whenever selectedTests change
    useEffect(() => {
        if (onSelectedExamsChange) {
            onSelectedExamsChange(selectedTests);
        }
    }, [selectedTests, onSelectedExamsChange]);

    const handleCheckboxChange = (category, test) => {
        setSelectedTests(prevState => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                [test]: !prevState[category]?.[test],
            }
        }));
    };
    const patient = {
        attribute: {
            color: "#808080",
        },
        value: {
            color: "#2DA9B5",
        },
        options: {
            border: "0.5px solid rgba(128,128,128,0.2)",
            borderRadius: 10,
            width: "95%",
            marginLeft: 20,
            display: "flex",
            justifyContent: "space-between",
        },
        containerP: {
            display: "flex",
            flexDirection: "column",
            marginLeft: 20,
            width: "95%",
            marginTop: 10,
        },
        button: {
            display: "flex",
            marginTop: 10,
            width: "96.5%",
            justifyContent: "flex-end",
            justifySelf: "center",
            marginBottom: 10
        },
        containerOutline: {
            border: "0.5px solid rgba(128,128,128,0.5)",
            borderRadius: 10,
        },
        containerHeader: {
            background: "rgba(128,128,128,0.2)",
            borderRadius: 5,
        },
        headerContent: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerText: {
            padding: 5,
            fontWeight: "bold",
            color: "#2DA9B5",
        },
        input: {
            border: "1.5px solid rgba(128,128,128,0.2)",
            borderRadius: 5,
            fontFamily: 'Poppins'
        },
        comment: {
            marginLeft: '10px',
            border: "0.5px solid #cfcfcf",
            borderRadius: 5,
            width: '68%',
            padding: 3
        },
        anamneseItem: {
            width: '100%',
        }
    };
    return (

        <div style={patient.containerP}>
            <div style={patient.containerOutline}>
                {Object.keys(categories).map(category => (
                    <div key={category}>
                        <div style={patient.containerHeader}>
                            <div style={patient.headerContent}>
                                <span style={patient.headerText}>{category}</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '10px',
                            margin: 10
                        }}>
                            {categories[category].map(test => (
                                <label key={test} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTests[category]?.[test] || false}
                                        onChange={() => handleCheckboxChange(category, test)}
                                        style={{ accentColor: '#00a2c9' }}
                                    />
                                    {test}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
