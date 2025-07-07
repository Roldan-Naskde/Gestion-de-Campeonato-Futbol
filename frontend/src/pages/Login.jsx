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
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Usuario</label>
          <input {...register('username')} />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" {...register('password')} />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
