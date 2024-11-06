import { Layers, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Unit } from '@/types/textbook';

interface UnitsListProps {
  units: Unit[];
  onAddUnit?: () => void;
  onViewWords?: (unitId: number) => void;
}

export const UnitsList = ({ units, onAddUnit, onViewWords }: UnitsListProps) => {
  return (
    <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Layers className="w-5 h-5 mr-2 text-blue-600" />
          单元列表
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddUnit}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          <span>添加单元</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {units.map((unit, index) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-4 flex justify-between items-center hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{unit.name}</h3>
              <p className="text-sm text-gray-500">单词数：{unit.word_count}</p>
            </div>
            <button 
              className="text-blue-500 hover:text-blue-600"
              onClick={() => onViewWords?.(unit.id)}
            >
              查看单词
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 