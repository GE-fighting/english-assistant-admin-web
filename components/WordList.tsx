'use client'
import { useState } from 'react'

export default function WordList() {
  const [words] = useState([
    { id: 1, word: 'Hello', translation: '你好', example: 'Hello, world!' },
    { id: 2, word: 'World', translation: '世界', example: 'Hello, world!' },
  ])

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Word
        </button>
      </div>
      <div className="divide-y">
        {words.map((word) => (
          <div key={word.id} className="p-4 hover:bg-gray-50">
            <h3 className="font-medium">{word.word}</h3>
            <p className="text-sm text-gray-500">{word.translation}</p>
            <p className="text-sm text-gray-400">Example: {word.example}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 