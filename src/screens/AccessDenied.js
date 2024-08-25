import React from 'react';
import forbidden from '../assets/403.png';
import { useNavigate } from 'react-router-dom';

export default function AccessDenied() {

    const navigate = useNavigate(); 

    const styles = {
        imageDiv: {
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
        },
        img: {
            width: '80%',
            height: '100vh',
        },
        textDiv: {
            width: '20%',
            textAlign: 'center',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
        },
        text: {
            margin: '0',
            fontSize: '16px',
            color: '#333',
        }
    };

    return (
        <div style={styles.imageDiv}>
            <img 
                src={forbidden} 
                alt="" 
                style={styles.img} 
            />
            <div style={styles.textDiv}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={styles.button}
                >
                    Voltar
                </button>
                <p style={styles.text}>
                    Não tem permissão para aceder a esta página.
                </p>
            </div>
        </div>
    );
};
