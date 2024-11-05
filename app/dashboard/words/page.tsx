import { Suspense } from 'react'
import WordList from '@/components/WordList'
import Loading from './loading'

export default function WordsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Word Management</h1>
      <Suspense fallback={<Loading />}>
        <WordList />
      </Suspense>
    </div>
  )
} 