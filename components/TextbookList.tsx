'use client'
import { useState } from 'react'

export default function TextbookList() {
  const [textbooks] = useState([
    { id: 1, title: 'English Grammar', level: 'Beginner' },
    { id: 2, title: 'Business English', level: 'Intermediate' },
  ])

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Textbook
        </button>
      </div>
      <div className="divide-y">
        {textbooks.map((textbook) => (
          <div key={textbook.id} className="p-4 hover:bg-gray-50">
            <h3 className="font-medium">{textbook.title}</h3>
            <p className="text-sm text-gray-500">Level: {textbook.level}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 