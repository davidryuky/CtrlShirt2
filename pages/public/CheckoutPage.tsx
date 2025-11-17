
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { mockApi } from '../../services/mockApi';
import { OrderStatus, ShippingAddress } from '../../types';

const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, user, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Brasil',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Você precisa estar logado para finalizar o pedido.');
      navigate('/login');
      return;
    }
    
    setIsProcessing(true);
    const shipping = 15.00; // Mock shipping
    const orderData = {
      userId: user.id,
      items: cart.map(item => ({...item, id: `${item.productId}-${item.size}`})),
      subtotal: cartTotal,
      shipping,
      total: cartTotal + shipping,
      status: OrderStatus.PENDING,
      shippingAddress,
    };

    try {
      const newOrder = await mockApi.createOrder(orderData);
      clearCart();
      navigate('/order-confirmation', { state: { orderId: newOrder.id } });
    } catch (error) {
      console.error("Failed to create order", error);
      alert('Houve um erro ao processar seu pedido. Tente novamente.');
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div>
      <h1 className="text-4xl font-press-start text-primary mb-8">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Shipping Address */}
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h2 className="text-2xl font-bold text-white mb-4">Endereço de Entrega</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Nome Completo</label>
              <input type="text" id="fullName" name="fullName" value={shippingAddress.fullName} onChange={handleInputChange} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300">Endereço</label>
              <input type="text" id="address" name="address" value={shippingAddress.address} onChange={handleInputChange} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300">Cidade</label>
                <input type="text" id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300">CEP</label>
                <input type="text" id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm focus:ring-primary focus:border-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border h-fit">
          <h2 className="text-2xl font-bold text-white mb-4">Seu Pedido</h2>
          <div className="space-y-2 mb-6">
            {cart.map(item => (
                <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
            ))}
             <div className="flex justify-between border-t border-dark-border pt-2 mt-2">
                <span>Subtotal</span>
                <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
                <span>Frete</span>
                <span>R$ 15,00</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-white border-t-2 border-primary pt-2 mt-2">
                <span>Total</span>
                <span>R$ {(cartTotal + 15.00).toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Pagamento (Simulação)</h3>
          <div className="bg-dark-bg p-4 rounded-md border border-dark-border text-center text-gray-400">
            <p>Este é um checkout simulado.</p>
            <p>Nenhum dado de pagamento é necessário.</p>
          </div>

          <button type="submit" disabled={isProcessing} className="mt-6 w-full bg-primary text-dark-bg font-bold py-3 rounded-md text-lg hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
