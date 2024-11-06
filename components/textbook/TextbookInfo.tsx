import { Layers } from 'lucide-react';
import { TextbookDetail } from '@/types/textbook';
import { formatRFC3339Date } from '@/utils/date';

interface TextbookInfoProps {
  textbook: TextbookDetail;
}

export const TextbookInfo = ({ textbook }: TextbookInfoProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Layers className="w-5 h-5 mr-2 text-blue-600" />
        教材信息
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-500">版本</span>
          <span>{textbook.textbook_version}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-500">年级</span>
          <span>{textbook.grade}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-500">学期</span>
          <span>{textbook.semester}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-500">创建时间</span>
          <span>{formatRFC3339Date(textbook.created_at)}</span>
        </div>
      </div>
    </div>
  );
}; 