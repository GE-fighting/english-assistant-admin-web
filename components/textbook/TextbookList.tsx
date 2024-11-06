import React from 'react';
import { Textbook } from '@/types/textbook';
import TextbookCard from './TextbookCard';

interface TextbookListProps {
  textbooks: Textbook[];
  onTextbookClick: (textbookId: number) => void;
}

export default function TextbookList({ textbooks, onTextbookClick }: TextbookListProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {textbooks.map((textbook) => (
        <div
          key={textbook.id}
          onClick={() => onTextbookClick(textbook.id)}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <TextbookCard textbook={textbook} />
        </div>
      ))}
    </div>
  );
} 