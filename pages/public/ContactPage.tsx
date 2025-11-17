
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Enviando...');
        // Simulate API call
        setTimeout(() => {
            setStatus(`Obrigado, ${formData.name}! Sua mensagem foi enviada. (Simulação)`);
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-press-start text-primary mb-8 text-center">Fale Conosco</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-dark-card p-8 rounded-lg border border-dark-border">
                    <h2 className="text-2xl font-bold text-white mb-4">Enviar uma Mensagem</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Seu Nome</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Seu Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Sua Mensagem</label>
                            <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-primary text-dark-bg font-bold py-3 px-4 rounded-md hover:bg-white transition-colors">
                                Enviar
                            </button>
                        </div>
                        {status && <p className="text-center text-accent mt-4">{status}</p>}
                    </form>
                </div>
                <div className="text-gray-300">
                    <h2 className="text-2xl font-bold text-white mb-4">Informações de Contato</h2>
                    <p className="mb-4">Tem alguma dúvida, sugestão de estampa ou quer fazer uma parceria? Use um dos canais abaixo!</p>
                    <div className="space-y-4">
                        <p><strong>Email:</strong> contato@ctrlshirt.com (fictício)</p>
                        <p><strong>Horário de Atendimento:</strong> Seg-Sex, 9:00 - 18:00 (exceto quando estamos em raid)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
