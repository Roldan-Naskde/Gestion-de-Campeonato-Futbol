import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('token/', data);
      const { access, username, is_staff } = response.data;
      localStorage.setItem('access', access);
      localStorage.setItem('username', username);
      localStorage.setItem('is_staff', is_staff);
      navigate('/dashboard');
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-container {
          width: 100%;
          max-width: 400px;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .login-form h2 {
          text-align: center;
          color: #004080;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          color: #333;
          font-weight: bold;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 2px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border 0.3s;
        }

        .form-group input:focus {
          border-color: #004080;
        }

        button[type="submit"] {
          width: 100%;
          padding: 12px;
          background-color: #004080;
          color: white;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button[type="submit"]:hover {
          background-color: #0066cc;
        }
      `}</style>

      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <h2>Iniciar sesión</h2>
          <div className="form-group">
            <label>Usuario</label>
            <input {...register('username')} placeholder="Nombre de usuario" required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" {...register('password')} placeholder="Contraseña" required />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  );
}

export default Login;
