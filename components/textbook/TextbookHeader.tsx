import { ArrowLeft, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface TextbookHeaderProps {
  name: string;
  onClose: () => void;
}

export const TextbookHeader = ({ name, onClose }: TextbookHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={onClose}
        className="text-gray-600 hover:text-gray-800"
      >
        <X className="w-6 h-6" />
      </motion.button>
    </div>
  );
}; 