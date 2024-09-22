import React, { useState } from 'react';
import "@fontsource/poppins"; // Defaults to weight 400
import pfp from '../assets/userIcon.jpg';
import { useNavigate } from 'react-router-dom';
import {
    Question,
    Gear,
    SignOut,
} from "@phosphor-icons/react";
import { useAuth } from '../AuthContext'; // Import your AuthContext

export default function Header({ selectedOption }) {
    
    const [menuVisible, setMenuVisible] = useState(false);
    const { state } = useAuth(); 
    const { dispatch } = useAuth();
    const navigate = useNavigate();


    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };


    function handleLogout() {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('userInfo');
        navigate('/');
    }

    const style = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: '8vh',
            top: 0,
            borderBottom: '1.5px solid #2DA9B5',
            margin: 0,
            padding: 0,
            fontFamily: 'Poppins',
            color: '#2DA9B5',
            background: 'white',
        },
        pfp: {
            borderRadius: '50%',
            width: '16%',
            border: '1px solid #2DA9B5',
            cursor: 'pointer',
        },
        option: {
            marginLeft: 20,
            fontWeight: 900,
            fontSize: 20,
            margin: 0,
            padding: 10,
        },
        menu: {
            position: 'absolute',
            top: '8vh',
            right: 10,
            border: '1px solid #2DA9B5',
            borderRadius: 5,
            width: 150,
            padding: 5,
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
        },
        menuItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '10px 5px',
            borderRadius: 5,
            cursor: 'pointer',
            transition: 'box-shadow 0.3s, outline 0.3s',
        },
        menuItemHover: {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        },
        icon: {
            marginRight: 10,
        },
        text: {
            color: '#808080',
            fontFamily: 'Poppins',
        },
        signOut: {
            color: 'red',
        },
    };

    const [hovered, setHovered] = useState(null);

    const handleMouseEnter = (index) => {
        setHovered(index);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    return (
        <div style={style.container}>
            <p style={style.option}>{selectedOption}</p>
            <div style={{ display: 'flex', width: '20%', alignItems: 'center', margin: 5 }}>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', width: '80%', marginRight: 10, fontSize: 10, fontWeight: 900 }}>
                    <p style={{ margin: 0 }}>{state.user.nomeCompleto}</p>
                    <p style={{ margin: 0 }}>{state.user.employeeType}</p>
                </div>
                <img style={style.pfp} src={pfp} alt="" onClick={toggleMenu} />
            </div>
            {menuVisible && (
                <div style={style.menu}>
                    <div
                        style={{
                            ...style.menuItem,
                            ...(hovered === 0 ? style.menuItemHover : {}),
                        }}
                        onMouseEnter={() => handleMouseEnter(0)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Question size={20} style={style.icon} />
                        <span style={style.text}>Ajuda</span>
                    </div>
                    <div
                        style={{
                            ...style.menuItem,
                            ...(hovered === 1 ? style.menuItemHover : {}),
                        }}
                        onMouseEnter={() => handleMouseEnter(1)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Gear size={20} style={style.icon} />
                        <span style={style.text}>Definições</span>
                    </div>
                    <div
                        style={{
                            ...style.menuItem,
                            ...(hovered === 2 ? style.menuItemHover : {}),
                        }}
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleLogout}
                    >
                        <SignOut size={20} style={{ ...style.icon, ...style.signOut }} />
                        <span style={{ ...style.text, ...style.signOut }}>Sair</span>
                    </div>
                </div>
            )}
        </div>
    );
}
