import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useCreateCheckoutSession } from "../Hooks/Payment.hook";

const plans = [
  {
    name: "Starter",
    price: 500,
    credits: 100,
    icon: <Zap className="w-6 h-6 text-emerald-500" />,
    features: [
      "100 AI Interview Credits",
      "Basic AI Feedback",
      "Voice Answer Support",
      "Email Support",
    ],
    accent: "emerald",
    planId: "starter",
  },
  {
    name: "Popular",
    price: 1000,
    credits: 250,
    popular: true,
    icon: <Sparkles className="w-6 h-6 text-blue-500" />,
    features: [
      "250 AI Interview Credits",
      "Detailed AI Feedback",
      "Performance Analytics",
      "Priority Support",
    ],
    accent: "blue",
    planId: "popular",
  },
  {
    name: "Pro",
    price: 2500,
    credits: 800,
    icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
    features: [
      "800 AI Interview Credits",
      "Advanced AI Feedback",
      "Full Performance Report",
      "Premium Support",
    ],
    accent: "purple",
    planId: "pro",
  },
];

const Pricing = () => {

  const { mutate: createCheckout, isPending } = useCreateCheckoutSession();

 const handleBuy = (plan) => {
 createCheckout({
  planId: plan.planId,
  credit: plan.credits,
  amount: plan.price,
});
};

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-24 px-6 relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -12, scale: 1.02 }}
              className={`relative p-1 rounded-3xl ${
                plan.popular
                  ? "bg-linear-to-b from-blue-500 via-emerald-500 to-cyan-500"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              <div className="bg-[#1e293b] rounded-[22px] p-8 h-full flex flex-col">

                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-linear-to-r from-blue-600 to-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                    <p className="text-gray-400 text-sm">{plan.credits} Credits</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-2xl">
                    {plan.icon}
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-white">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">/ pack</span>
                </div>

                <ul className="space-y-4 mb-10 grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBuy(plan)}
                  disabled={isPending}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    plan.popular
                      ? "bg-linear-to-r from-blue-600 to-emerald-600 text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  {isPending ? "Processing..." : "Get Started"}
                </motion.button>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Pricing;