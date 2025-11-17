
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { UserRole } from '../../types';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const user = await login(email, password);
        if (user && (user.role === UserRole.ADMIN || user.role === UserRole.MANAGER)) {
            navigate('/admin/dashboard');
        } else {
            setError('Credenciais inválidas ou sem permissão de acesso.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-press-start text-primary">CtrlPanel</h1>
                    <p className="text-gray-400">Acesso Administrativo</p>
                </div>
                <div className="bg-dark-card border-2 border-dark-border rounded-lg p-8 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary p-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="password"  className="block text-sm font-medium text-gray-300">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary p-3"
                            />
                        </div>
                        {error && <p className="text-secondary text-center text-sm">{error}</p>}
                        <div>
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-dark-bg bg-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
                                {loading ? 'Entrando...' : 'Entrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
