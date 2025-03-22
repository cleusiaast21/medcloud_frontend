import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "@fontsource/poppins"; // Defaults to weight 400
import { User, EyeSlash, Eye } from "@phosphor-icons/react";
import background from '../assets/loginBackground.png';
import logo from '../assets/logo.png';
import { useAuth } from '../AuthContext.js';


function Login() {

  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useAuth();

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

  // Example of Axios request in Login.jsx
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        funcionarioId: id,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const { token, employee } = response.data;
      console.log('Login successful:', employee);
  
      // Store token and employee info in localStorage or context if needed
      localStorage.setItem('token', token);
      localStorage.setItem('employee', JSON.stringify(employee));
  
      // Dispatch action and navigate based on employeeType
      dispatch({
        type: 'LOGIN',
        payload: employee,
      });
  
      if (employee.employeeType === 'Recepcionista') {
        navigate('/homeR');
      } else if (employee.employeeType === 'Medico') {
        navigate('/home');
      } else if (employee.employeeType === 'Administrador') {
        navigate('/homeAdm');
      } else if (employee.employeeType === 'Tecnico de Laboratorio') {
        navigate('/homeTecnico');
      }else if (employee.employeeType === 'Enfermeiro') {
        navigate('/homeEnfermeiro');
      }

    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert("Funcionário não encontrado.")
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
