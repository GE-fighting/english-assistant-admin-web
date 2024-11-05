import React from 'react';
import { Textbook } from '@/types/textbook';

interface TextbookCardProps {
  textbook: Textbook;
}

export default function TextbookCard({ textbook }: TextbookCardProps): JSX.Element {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">
        {textbook.version?.name} {textbook.grade?.name} {textbook.semester?.name}
      </h3>
      <div className="text-sm text-gray-500">
        <p>版本：{textbook.version?.name}</p>
        <p>年级：{textbook.grade?.name}</p>
        <p>学期：{textbook.semester?.name}</p>
      </div>
    </div>
  );
} 