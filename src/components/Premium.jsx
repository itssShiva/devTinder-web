import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/Constant';
import { motion } from 'framer-motion';
import { Check, Star, ShieldCheck, Zap, Crown } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Premium = () => {
    const [isPremium, setIsPremium] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const dispatch = useDispatch();

    const verifyPremium = async (retryCount = 0) => {
        try {
            const res = await axios.get(BASE_URL + "/user/premium/verify", { withCredentials: true });
            if (res.data.isPremium) {
                setIsPremium(true);
                setIsProcessing(false);
                dispatch(addUser(res.data));
            } else if (isProcessing && retryCount < 10) {
                // Polling for up to 20 seconds after payment
                setTimeout(() => verifyPremium(retryCount + 1), 2000);
            } else if (isProcessing) {
                setIsProcessing(false);
                toast.error("Verification taking longer than expected. Please refresh the page.");
            }
        } catch (error) {
            console.log(error);
            if (isProcessing) setIsProcessing(false);
        }
    }

    useEffect(() => {
        verifyPremium();
    }, []);

    const handleBuyMembership = async (type) => {
        try {
            const res = await axios.post(BASE_URL + "/payment/create", { membershipType: type }, { withCredentials: true });
            const { order, key } = res.data;

            const options = {
                key: key,
                amount: order.amount,
                currency: order.currency,
                name: "DevTinder Premium",
                description: type + " Membership",
                order_id: order.id,
                handler: async function (response) {
                    toast.success("Payment Received!! Verifying membership...");
                    setIsProcessing(true);
                    // Start polling
                    setTimeout(() => verifyPremium(), 1500);
                },
                prefill: {
                    name: "DevTinder User",
                    email: "user@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#ef4444" },
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            toast.error("Failed to initiate payment");
        }
    }

    if (isProcessing) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-10 sm:p-16 flex flex-col items-center max-w-lg relative overflow-hidden"
                >
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-900/10 rounded-full blur-3xl" />
                    
                    <div className="relative mb-8">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-24 h-24 border-4 border-red-500/20 border-t-red-500 rounded-full"
                        />
                        <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-red-500 animate-pulse" />
                    </div>
                    
                    <h1 className="text-3xl font-black text-slate-100 mb-4 tracking-tight">Stay Tuned!</h1>
                    <h2 className="text-xl font-bold gradient-text mb-6">Something's Cooking... 🍳</h2>
                    
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        We're currently verifying your payment with Razorpay. You'll be upgraded to <span className="text-red-400 font-bold">Premium</span> in just a few moments.
                    </p>
                    
                    <div className="flex items-center gap-3 text-sm text-zinc-500 font-medium">
                        <div className="loading loading-dots loading-xs text-red-500"></div>
                        <span>Finalizing your VIP status</span>
                    </div>
                </motion.div>
            </div>
        )
    }

    if (isPremium) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel p-10 sm:p-16 flex flex-col items-center max-w-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-red-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                        <Crown className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-4xl font-black gradient-text mb-4">You're a VIP!</h1>
                    <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                        Enjoy your exclusive premium benefits and stand out in the community.
                    </p>
                    <div className="grid grid-cols-2 gap-4 w-full text-left">
                        {["Verified Badge", "Unlimited Swipes", "Priority Chat", "Ad-free"].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-400 font-medium">
                                <ShieldCheck className="w-4 h-4 text-red-500" /> {feat}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-1.5 rounded-full border border-red-500/20 text-sm font-bold uppercase tracking-widest mb-6"
                    >
                        <Zap className="w-4 h-4" /> Go Premium
                    </motion.div>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-100 mb-6 tracking-tight">
                        Unlock Your Full <span className="gradient-text">Potential</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Choose the plan that fits your coding journey and connect with top developers worldwide.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    {/* Silver Plan */}
                    <PricingCard
                        title="Silver"
                        price="1,000"
                        period="month"
                        features={["50 Swipes per day", "Standard View", "Basic Support", "Limited Chat"]}
                        icon={<Star className="w-6 h-6 text-zinc-400" />}
                        gradient="from-zinc-700 to-zinc-900"
                        btnGradient="from-zinc-700 to-zinc-800"
                        onBuy={() => handleBuyMembership("silver")}
                        delay={0.1}
                    />

                    {/* Gold Plan */}
                    <PricingCard
                        title="Gold"
                        price="5,000"
                        period="3 months"
                        features={["Unlimited Swipes", "Verified Badge", "Priority in Feed", "Direct Messaging", "24/7 Support"]}
                        icon={<Crown className="w-7 h-7 text-amber-500" />}
                        popular={true}
                        gradient="from-red-900/40 to-black/80"
                        btnGradient="from-red-700 to-red-500"
                        onBuy={() => handleBuyMembership("gold")}
                        delay={0.2}
                    />
                </div>
            </div>
        </div>
    )
}

const PricingCard = ({ title, price, period, features, icon, gradient, btnGradient, onBuy, popular = false, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`relative flex flex-col w-full max-w-sm rounded-[2rem] p-8 glass-panel shadow-2xl transition-transform hover:scale-[1.02] ${popular ? 'border-red-500/30' : ''}`}
    >
        {popular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-1.5 rounded-full shadow-lg shadow-red-900/40 z-20">
                Most Popular
            </div>
        )}

        <div className="flex justify-between items-start mb-10 mt-2">
            <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-1">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-slate-400 text-lg">₹</span>
                    <span className="text-4xl font-black text-slate-100">{price}</span>
                    <span className="text-zinc-500 text-sm font-medium">/{period}</span>
                </div>
            </div>
            <div className="w-12 h-12 bg-zinc-900/80 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-xl">
                {icon}
            </div>
        </div>

        <div className="flex-1 space-y-4 mb-10 text-left">
            {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-400 font-medium">
                    <div className="flex-shrink-0 w-5 h-5 bg-red-500/10 rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-red-500" />
                    </div>
                    <span className="text-[15px]">{feat}</span>
                </div>
            ))}
        </div>

        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBuy}
            className={`btn border-none w-full h-14 rounded-2xl font-black text-lg text-white shadow-xl transition-all ${popular ? 'shadow-red-900/20' : 'shadow-black/40'}`}
            style={{ backgroundImage: `linear-gradient(135deg, ${popular ? '#b91c1c, #ef4444' : '#3f3f46, #18181b'})` }}
        >
            Get {title}
        </motion.button>
    </motion.div>
);

export default Premium;
