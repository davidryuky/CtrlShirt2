
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { mockApi } from '../../services/mockApi';

const CartPage: React.FC = () => {
    const { cart, cartTotal, updateCartQuantity, removeFromCart } = useAppContext();
    const navigate = useNavigate();
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState('');

    const shippingCost = 15.00; // Mock shipping
    const totalWithShipping = cartTotal * (1 - discount / 100) + shippingCost;
    
    const handleApplyCoupon = async () => {
        const coupon = await mockApi.validateCoupon(couponCode);
        if (coupon) {
            setDiscount(coupon.discountPercentage);
            setCouponMessage(`Cupom "${coupon.code}" aplicado! Você ganhou ${coupon.discountPercentage}% de desconto.`);
        } else {
            setDiscount(0);
            setCouponMessage('Cupom inválido ou expirado.');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-4xl font-press-start text-primary mb-4">Seu Carrinho está Vazio</h1>
                <p className="text-gray-400 mb-8">Parece que você ainda não selecionou seu loot.</p>
                <Link to="/products" className="bg-primary text-dark-bg font-bold py-3 px-8 rounded-md text-lg hover:bg-white transition-all duration-300">
                    EXPLORAR PRODUTOS
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-4xl font-press-start text-primary mb-8">Seu Carrinho de Loot</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div key={`${item.productId}-${item.size}`} className="bg-dark-card p-4 rounded-lg border border-dark-border flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md"/>
                            <div className="flex-grow">
                                <h2 className="font-bold text-lg text-white">{item.name}</h2>
                                <p className="text-gray-400">Tamanho: {item.size}</p>
                                <p className="text-accent font-semibold">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="number" 
                                    value={item.quantity}
                                    onChange={(e) => updateCartQuantity(item.productId, item.size, parseInt(e.target.value))}
                                    min="1"
                                    className="w-16 bg-dark-bg border border-dark-border rounded-md p-2 text-center"
                                />
                                <button onClick={() => removeFromCart(item.productId, item.size)} className="text-gray-500 hover:text-secondary p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                             <p className="text-white font-bold w-24 text-right">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-dark-card p-6 rounded-lg border-2 border-dark-border h-fit">
                    <h2 className="text-2xl font-bold text-white mb-4">Resumo do Pedido</h2>
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                        </div>
                        {discount > 0 && (
                             <div className="flex justify-between text-accent">
                                <span>Desconto ({discount}%)</span>
                                <span>- R$ {(cartTotal * discount / 100).toFixed(2).replace('.', ',')}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Frete (Simulado)</span>
                            <span>R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold text-white border-t border-dark-border pt-2 mt-2">
                            <span>Total</span>
                            <span>R$ {totalWithShipping.toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex gap-2">
                            <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Código do Cupom" className="flex-grow bg-dark-bg border border-dark-border rounded-md p-2" />
                            <button onClick={handleApplyCoupon} className="bg-secondary text-white font-bold px-4 rounded-md hover:bg-pink-600 transition">Aplicar</button>
                        </div>
                        {couponMessage && <p className={`mt-2 text-sm ${discount > 0 ? 'text-accent' : 'text-secondary'}`}>{couponMessage}</p>}
                    </div>

                    <button onClick={() => navigate('/checkout')} className="w-full bg-primary text-dark-bg font-bold py-3 rounded-md text-lg hover:bg-white transition-all duration-300">
                        FECHAR PEDIDO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
