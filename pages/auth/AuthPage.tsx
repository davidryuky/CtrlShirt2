
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const user = await login(email, password);
      if (user) {
        navigate('/account');
      } else {
        setError('Email ou senha inválidos.');
      }
    } else {
      // Mock registration
      console.log('Registering:', { name, email, password });
      // In a real app, you'd call a registration API
      await new Promise(res => setTimeout(res, 1000));
      alert('Cadastro realizado com sucesso! (Simulação). Por favor, faça o login.');
      setIsLogin(true);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-dark-card border-2 border-dark-border rounded-lg p-8">
        <div className="flex border-b border-dark-border mb-6">
          <button
            className={`flex-1 py-2 font-bold text-lg ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 font-bold text-lg ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
            onClick={() => setIsLogin(false)}
          >
            Cadastro
          </button>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          {isLogin ? 'Acessar Conta' : 'Criar Conta'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary p-2" />
            </div>
          )}
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary p-2" />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary p-2" />
          </div>

          {error && <p className="text-secondary text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-primary text-dark-bg font-bold py-3 rounded-md hover:bg-white transition-colors disabled:opacity-50">
            {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
