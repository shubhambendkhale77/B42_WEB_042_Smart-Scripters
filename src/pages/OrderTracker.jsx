import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Package, Factory, Truck, CheckCircle } from 'lucide-react';

const STATUS_STEPS = [
  { id: 1, label: 'Order Placed', icon: <Package /> },
  { id: 2, label: 'Processing', icon: <Factory /> },
  { id: 3, label: 'Shipped', icon: <Truck /> },
  { id: 4, label: 'Arrived at Warehouse', icon: <Truck /> },
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
      setEta((eta) => Math.max(1, Math.min(10, eta - Math.floor(Math.random() * 2))));
      
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Clock className="text-blue-500" size={36} />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
              />
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-semibold dark:text-white">Order Tracking</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Estimated Delivery: <span className="text-blue-500 font-medium">{eta} Days</span>
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="p-6 md:p-8">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 md:left-8 top-8 h-[calc(100%-4rem)] w-1 bg-gray-200 dark:bg-gray-700">
              <motion.div
                className="h-full bg-blue-500 origin-top rounded-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: `${((currentStatus - 1) / (STATUS_STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>

            {/* Status Steps */}
            <div className="space-y-8">
              {STATUS_STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex items-start gap-4 md:gap-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                      ${currentStatus >= step.id ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}
                  >
                    {step.icon}
                  </motion.div>

                  <div className="flex-1 pt-2">
                    <h3 className={`text-lg font-medium mb-1 transition-colors duration-300
                      ${currentStatus >= step.id ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
                      {step.label}
                    </h3>
                    {currentStatus === step.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-gray-600 dark:text-gray-300"
                      >
                        {step.id === 6 ? 'Your order has been delivered!' : 'In progress...'}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Partner Section */}
        <AnimatePresence>
          {deliveryPartner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Delivery Partner Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium dark:text-white">{deliveryPartner.name}</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                    <p className="font-medium dark:text-white">{deliveryPartner.contact}</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle</p>
                    <p className="font-medium dark:text-white">{deliveryPartner.vehicle}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderTracker;