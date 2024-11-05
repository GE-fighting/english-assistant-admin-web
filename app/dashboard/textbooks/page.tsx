import { Suspense } from 'react'
import TextbookList from '@/components/TextbookList'
import Loading from './loading'

export default function TextbooksPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Textbook Management</h1>
      <Suspense fallback={<Loading />}>
        <TextbookList />
      </Suspense>
    </div>
  )
} 