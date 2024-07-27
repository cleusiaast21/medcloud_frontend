import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "@fontsource/poppins"; // Defaults to weight 400
import { User, EyeSlash, Eye, Hospital } from "@phosphor-icons/react";
import background from '../assets/loginBackground.png';
import logo from '../assets/logo.png';

function Login() {

  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para verificar conexão com a internet
  const checkInternetConnection = async () => {
    if (!navigator.onLine) {
      alert('Você está offline. Por favor, verifique sua conexão com a internet.');
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      alert('Você está offline. Por favor, verifique sua conexão com a internet.');
    }
  };

  useEffect(() => {
    checkInternetConnection();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        id,
        password
      });
      console.log(res.data);
      navigate('/home'); // Redirect to the home page upon successful login

    } catch (err) {
      console.error(err);
    }
  };

  const style = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      backgroundImage: `url(${background})`,
      height: '100vh', // Faz o container ocupar 100% da altura da viewport
      width: '100vw', // Faz o container ocupar 100% da largura da viewport
      backgroundSize: 'contain', // Garante que a imagem de fundo cubra todo o container
      backgroundPosition: 'center',
    },
    welcome: {
      marginTop: 0,
      fontSize: 30,
      fontWeight: 'normal',
      color: '#808080'
    },
    container1: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.67)',
      width: '30%',
      borderRadius: 10,
      fontFamily: 'Poppins',
      padding: 20,
      color: '#2DA9B5',
    },
    label: {
      fontWeight: 'bold',
      fontSize: 13,
    },
    input: {
      backgroundColor: 'transparent',
      fontFamily: 'Poppins',
      borderWidth: 0,
      alignItems: 'center',
      paddingLeft: '0',
      fontSize: 13,
      width: '90%'
    },
    inputContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1.5px solid #808080',
      marginBottom: 20,
      width: '100%'
    },
    button: {
      backgroundColor: '#2DA9B5',
      borderRadius: 10,
      borderWidth: 0,
      fontFamily: 'Poppins',
      color: 'white',
      padding: 5,
      width: '80%',
      cursor: 'pointer',
    },
    logo: {
      width: '35%',
    }
  };

  return (
    <div style={style.container}>

      <div style={style.container1}>

        <img style={style.logo} src={logo} alt="" />

        <h1 style={style.welcome}>Bem-Vindo a Medcloud!</h1>

        <form onSubmit={handleLogin} style={{ width: '70%', marginBottom: 20 }}>

          <label style={style.label}>Instituição</label>
          <div style={style.inputContainer}>
            <input style={style.input} placeholder='001'></input>
            <Hospital color="#808080" size={20} />
          </div>

          <label style={style.label}>Número de Identificação</label>
          <div style={style.inputContainer}>
            <input style={style.input} value={id}
              onChange={(e) => setID(e.target.value)} placeholder='005238850LA048'></input>
            <User color="#808080" size={20} />
          </div>

          <label style={style.label}>Password</label>
          <div style={style.inputContainer}>
            <input style={style.input} type={showPassword ? 'text' : 'password'} placeholder='Password' value={password}
              onChange={(e) => setPassword(e.target.value)}></input>
            {showPassword ? (
              <Eye color="#808080" size={20} onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
            ) : (
              <EyeSlash color="#808080" size={20} onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
            )}
          </div>
          <button style={style.button} onClick={handleLogin}>LOGIN</button>

        </form>
      </div>

    </div>
  );
}

export default Login;
