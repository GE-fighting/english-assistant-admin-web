import React from 'react';
import { Textbook } from '@/types/textbook';
import TextbookCard from './TextbookCard';

interface TextbookListProps {
  textbooks: Textbook[];
}

export default function TextbookList({ textbooks }: TextbookListProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {textbooks.map((textbook) => (
        <TextbookCard key={textbook.id} textbook={textbook} />
      ))}
    </div>
  );
} 