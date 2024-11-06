'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Users, BookOpen, TrendingUp } from 'lucide-react';

const DashboardPage: FC = () => {
  return (
    <div className="space-y-6">
      {/* 统计数据网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="单词总数"
          value="2,345"
          icon={<BookOpen className="w-6 h-6" />}
          trend="+12.5%"
        />
        <StatsCard 
          title="活跃用户"
          value="1,234"
          icon={<Users className="w-6 h-6" />}
          trend="+5.2%"
        />
        <StatsCard 
          title="学习时长"
          value="456"
          icon={<BarChart className="w-6 h-6" />}
          trend="+8.1%"
        />
        <StatsCard 
          title="完成率"
          value="89%"
          icon={<TrendingUp className="w-6 h-6" />}
          trend="+3.2%"
        />
      </div>

      {/* 最近活动 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">最近活动</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">新增单词列表</h3>
                <p className="text-sm text-gray-500">2小时前</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

const StatsCard: FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span className="text-green-500 text-sm font-medium">{trend}</span>
        <span className="text-gray-500 text-sm ml-2">较上月</span>
      </div>
    </motion.div>
  );
};

export default DashboardPage;