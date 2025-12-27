import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import CheckoutSteps from '../features/checkout/components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import api from '../lib/api';
import { toast } from 'react-toastify';
import { loadRazorpayScript } from '../utils/razorpay';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import AlertModal from '../components/ui/AlertModal';

const ShippingPage = () => {
    const { shippingAddress, saveShippingAddress, cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successOrderId, setSuccessOrderId] = useState(null);

    const [isProcessing, setIsProcessing] = useState(false);

    // Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    const shippingPrice = addDecimals(itemsPrice > 2000 ? 0 : 100);
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!address || !city || !postalCode || !country) {
            toast.error("Please fill in all shipping fields.");
            return;
        }

        setIsProcessing(true);

        // 1. Save Address
        saveShippingAddress({ address, city, postalCode, country });

        try {
            // 2. Load Razorpay SDK
            const res = await loadRazorpayScript();
            if (!res) {
                toast.error('Razorpay SDK failed to load. Are you online?');
                setIsProcessing(false);
                return;
            }

            // 3. Create Order on Backend
            // We pass the simplified order structure. The backend expects:
            // orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
            const orderPayload = {
                orderItems: cartItems,
                shippingAddress: { address, city, postalCode, country },
                paymentMethod: 'Razorpay',
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const { data: createdOrder } = await api.post('/api/orders', orderPayload);

            // 4. Create Razorpay Order
            const { data: razorpayOrder } = await api.post('/api/payment/create-order', {
                amount: totalPrice,
                receipt: createdOrder._id,
            });

            // 5. Open Razorpay Modal
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "Olive Edge",
                description: `Order #${createdOrder._id}`,
                order_id: razorpayOrder.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await api.post('/api/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: createdOrder._id,
                        });

                        if (verifyRes.data.status === 'success') {
                            clearCart();
                            // TRIGGER MODAL INSTEAD OF TOAST
                            setSuccessOrderId(createdOrder._id);
                            setIsSuccessModalOpen(true);
                        }
                    } catch (error) {
                        toast.error('Payment Verification Failed');
                        console.error(error);
                        // Even if verification details fail on frontend, the order exists.
                        // Redirect user to order page to see status (likely unpaid/pending if verification failed entirely)
                        navigate(`/order/${createdOrder._id}`);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone || '',
                },
                theme: {
                    color: "#606C38",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            setIsProcessing(false); // Modal is open, processing 'waiting' is done

        } catch (error) {
            toast.error(error.response && error.response.data.message ? error.response.data.message : error.message);
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-clinical-canvas pt-32 pb-40">
            <Helmet>
                <title>Checkout | Olive Edge</title>
                <meta name="description" content="Secure checkout." />
            </Helmet>
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg">
                <CheckoutSteps step1 step2 />

                <div className="text-center mb-16">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 mb-4 block">
                        Final Step
                    </span>
                    <h1 className="font-display font-black text-5xl md:text-7xl lg:text-heading-main text-clinical-ink mb-8 leading-[0.9] uppercase">
                        Checkout
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Input Form */}
                    <div className="space-y-12">
                        <div className="border-b border-black pb-4 mb-8">
                            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-clinical-ink/60">
                                Shipping Details
                            </h2>
                        </div>

                        <form id="checkout-form" onSubmit={handlePayment} className="space-y-8">

                            {/* Saved Address Selection */}
                            {user && user.addresses && user.addresses.length > 0 && (
                                <div className="mb-8">
                                    <label className="block font-sans text-[10px] uppercase tracking-widest text-clinical-ink/60 mb-2">
                                        Select Saved Location
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            const selectedIndex = e.target.value;
                                            if (selectedIndex !== "") {
                                                const addr = user.addresses[selectedIndex];
                                                setAddress(addr.address);
                                                setCity(addr.city);
                                                setPostalCode(addr.postalCode);
                                                setCountry(addr.country);
                                            } else {
                                                // Clear fields or leave as is? Let's leave as is to avoid accidental data loss
                                            }
                                        }}
                                        className="w-full bg-white/50 border border-clinical-ink/20 rounded-lg p-3 font-sans text-sm text-clinical-ink focus:border-accent-bronze outline-none appearance-none"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>-- Use a Saved Address --</option>
                                        {user.addresses.map((addr, index) => (
                                            <option key={index} value={index}>
                                                {addr.address}, {addr.city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="aesop-input-group">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    className="aesop-input peer placeholder-transparent"
                                    placeholder="Street Address"
                                    id="address"
                                />
                                <label htmlFor="address">Street Address</label>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="aesop-input-group">
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                        className="aesop-input peer placeholder-transparent"
                                        placeholder="City"
                                        id="city"
                                    />
                                    <label htmlFor="city">City</label>
                                </div>
                                <div className="aesop-input-group">
                                    <input
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        required
                                        className="aesop-input peer placeholder-transparent"
                                        placeholder="Postal Code"
                                        id="postalCode"
                                    />
                                    <label htmlFor="postalCode">Postal Code</label>
                                </div>
                            </div>

                            <div className="aesop-input-group">
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    className="aesop-input peer placeholder-transparent"
                                    placeholder="Country"
                                    id="country"
                                />
                                <label htmlFor="country">Country</label>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="space-y-8">
                        <div className="border-b border-black pb-4 mb-4">
                            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-clinical-ink/60">
                                Order Summary
                            </h2>
                        </div>

                        {/* Items List */}
                        <div className="max-h-96 overflow-y-auto pr-4 space-y-6">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-6 group">
                                    <div className="w-16 h-20 bg-clinical-bone overflow-hidden rounded-lg flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <Link to={`/product/${item.product}`} className="font-serif text-base text-clinical-ink hover:underline decoration-1 underline-offset-4 block truncate">
                                            {item.name}
                                        </Link>
                                        <span className="font-mono text-[10px] text-clinical-ink/60">
                                            Qty: {item.qty} | Size: {item.size || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="font-mono text-sm text-clinical-ink">
                                        ₹ {item.price * item.qty}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="bg-white/40 backdrop-blur-sm border border-clinical-ink/5 p-8 rounded-3xl mt-8">
                            <div className="space-y-4 font-sans text-[10px] uppercase tracking-widest border-b border-clinical-ink/10 pb-6 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-clinical-ink/60">Subtotal</span>
                                    <span className="font-mono text-clinical-ink">₹ {itemsPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-clinical-ink/60">Shipping</span>
                                    <span className="font-mono text-clinical-ink">₹ {shippingPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-clinical-ink/60">Tax (15%)</span>
                                    <span className="font-mono text-clinical-ink">₹ {taxPrice}</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-serif text-xl text-clinical-ink mb-8">
                                <span>Total</span>
                                <span className="font-mono text-lg font-bold">₹ {totalPrice}</span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                form="checkout-form"
                                disabled={cartItems.length === 0 || isProcessing}
                                className="w-full py-5 bg-clinical-ink text-white font-sans text-xs uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-4 rounded-full shadow-xl"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    `Pay ₹ ${totalPrice}`
                                )}
                            </motion.button>
                            <p className="text-center mt-4 font-sans text-[9px] text-clinical-ink/40 uppercase tracking-widest">
                                Secured by Razorpay
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <AlertModal
                isOpen={isSuccessModalOpen}
                onClose={() => {
                    setIsSuccessModalOpen(false);
                    navigate(`/order/${successOrderId}`);
                }}
                title="Transaction Approved"
                message={`Payment validated successfully. Order #${successOrderId} has been initialized.`}
                type="success"
                actionLabel="Proceed to Receipt"
            />
        </div>
    );
};

export default ShippingPage;
