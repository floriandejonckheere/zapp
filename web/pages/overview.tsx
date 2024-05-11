import { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'
import { me } from '@/api/users'

export default function Overview(): ReactElement {
  const { refetch } = useQuery({
    queryKey: ['me'],
    queryFn: me,
    enabled: false
  })

  return (
    <>
      <h2 className="text-xl font-bold dark:text-slate-300">Overview</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 mt-8 gap-8">
        <button onClick={() => refetch()} className="btn">
          Refetch
        </button>
      </div>
    </>
  )
}
