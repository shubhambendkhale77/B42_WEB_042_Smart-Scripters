import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Package, Factory, Truck, CheckCircle } from 'lucide-react';

const STATUS_STEPS = [
  { id: 1, label: 'Order Placed', icon: <Package /> },
  { id: 2, label: 'Processing', icon: <Factory /> },
  { id: 3, label: 'Shipped', icon: <Truck /> },
  { id: 4, label: 'Arrived at Wareshouse', icon: <Truck /> },
  { id: 5, label: 'Out for Delivery', icon: <Truck /> },
  { id: 6, label: 'Delivered', icon: <CheckCircle /> },
];

const OrderTracker = () => {
  const [currentStatus, setCurrentStatus] = useState(1);
  const [eta, setEta] = useState(6);
  const [deliveryPartner, setDeliveryPartner] = useState(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus((prev) => Math.min(prev + 1, STATUS_STEPS.length));
  
      setEta((eta) => Math.max(1, Math.min(10, eta - Math.floor(Math.random() * 2)))); // Ensure eta stays between 1 and 10
      if (currentStatus >= 4) {
        setDeliveryPartner({
          name: 'Shubham Bendkhale',
          contact: '+91 9876543210',
          vehicle: 'MH-45 N 6767',
        });
      }
    }, 30000);
  
    return () => clearInterval(interval);
  }, [currentStatus]);
  

  return (
    <div className="p-8 sm:max-w-[90%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[55%] mx-auto dark:bg-gray-800 rounded-xl mt-6 mb-6 shadow-lg w-full sm:p-10 md:p-12 lg:p-16">
      <div className="flex flex-col items-center gap-6 ">
        <Clock className="text-blue-500 animate-bounce mt-6" size={40} />
        <div className="text-center ">
          <h2 className="text-xl font-semibold dark:text-white">Estimated Delivery: <span className="text-blue-500 font-medium text-lg">{eta} Days</span> </h2>          
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="relative w-full max-w-md">
          {/* Progress Line */}
          <div className="absolute left-15.5 top-4 h-[90%] w-1 bg-gray-200 dark:bg-gray-600">
            <motion.div
              className="h-full bg-blue-700 origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: `${((currentStatus - 1) / (STATUS_STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>

          {/* Status Steps */}
          <div className="space-y-8 pl-10">
            {STATUS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative flex items-center gap-6"
              >
                {/* Step Icon */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                    ${currentStatus >= step.id ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-500'}`}
                >
                  {step.icon}
                </motion.div>

                {/* Step Label */}
                <div className="flex-1 mb-8">
                  <p
                    className={`text-lg font-semibold ${
                      currentStatus >= step.id ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  {currentStatus === step.id && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm text-gray-600 dark:text-gray-300 mt-1"
                    >
                      {step.id === 6 ? 'Your order has been delivered!' : 'In progress...'}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {deliveryPartner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 bg-blue-50 dark:bg-gray-700 rounded-lg shadow-md w-full text-center"
          >
            <h3 className="font-medium dark:text-white text-lg mt-2">Delivery Partner</h3>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="text-sm font-medium">{deliveryPartner.name}</p>
              <p className="text-sm">{deliveryPartner.contact}</p>
              <p className="text-sm mb-4">{deliveryPartner.vehicle}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderTracker;
