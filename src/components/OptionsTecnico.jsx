import React, { useState, useEffect } from 'react';
import { House, HandHeart, Calendar, ChartLine } from "@phosphor-icons/react";
import "@fontsource/poppins"; // Defaults to weight 400
import logo from '../assets/logo.png';
import consulta from '../assets/consulta.png';

export default function Options({ onOptionSelect, selectedOption: initialSelectedOption }) {

    const [selectedOption, setSelectedOption] = useState('Painel'); // 'Painel' é selecionado por padrão

    useEffect(() => {
        setSelectedOption(initialSelectedOption);
    }, [initialSelectedOption]);

    function handleOptionSelect(option) {
        setSelectedOption(option); // Atualiza a opção selecionada localmente
        onOptionSelect(option); // Envia a opção selecionada para o componente pai
    }

    const options = [
        { name: 'Painel', icon: House },
        { name: 'Pacientes', icon: HandHeart },
        { name: 'Agenda', icon: Calendar },
        { name: 'Estatísticas', icon: ChartLine },
    ];

    const style = {
        optionsContainer: {
            width: '200px',
            height: '100vh',
            bottom: 0,
            left: 0,
            borderRight: '1.5px solid #2DA9B5',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            background: 'white',

        },
        option: {
            alignItems: 'center',
            background: 'rgba(128,128,128,0.2)',
            fontFamily: 'Poppins',
            color: 'green',
            cursor: 'pointer',
            display: 'flex',
            paddingLeft: 10,
            margin: 10,
            padding: 10,
            borderRadius: 10,
        },
        optionsText: {
            fontSize: 15,
            marginLeft: 15,
            color: '#808080',
        },
        logo: {
            width: '28%'
        },
        logoDiv: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 10,
        },
        name: {
            fontSize: 22,
            fontWeight: 700,
            color: '#2DA9B5',
        },
        menu: {
            paddingLeft: 10,
            fontSize: 13,
            fontFamily: 'Poppins',
            fontWeight: 900,
        },
        novaConsulta: {
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'flex-end',
            width: '90%',
            height: 90,
            backgroundImage: `url(${consulta})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginLeft: 10,
            cursor: 'pointer',
            borderRadius: 15,
        },
        novaConsultaText:{
            display: 'flex',
            color:'#2DA9B5',
            fontWeight: 'bold',
            fontSize: 14,
            paddingLeft:5,

        }
    }

    return (

        <div style={style.optionsContainer} id="optionsContainer">

            <div style={style.logoDiv}>
                <img style={style.logo} src={logo} alt="" />
                <span style={style.name}>medcloud</span>
            </div>

            <div>

                <span style={style.menu}>Menu</span>

                {options.map(({ name, icon: Icon }) => (
                    <div
                        key={name}
                        onClick={() => handleOptionSelect(name)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px',
                            margin: '10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontFamily: 'Poppins',
                            background: name === selectedOption ? 'rgba(128,128,128,0.2)' : 'white',
                            color: name === selectedOption ? '#2DA9B5' : 'rgba(128,128,128,0.2)',
                        }}
                    >
                        <Icon size={23} color={name === selectedOption ? '#2DA9B5' : '#808080'} />
                        <li style={{
                            fontSize: '15px',
                            marginLeft: '15px',
                            color: name === selectedOption ? '#2DA9B5' : '#808080',
                        }}>{name}
                        </li>

                    </div>
                ))}
                
            </div>




        </div >
    );

}
