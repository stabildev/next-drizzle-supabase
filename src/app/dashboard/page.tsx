import { cookies } from 'next/headers'

import { getUserFiles } from '@/components/dashboard/files/actions'
import { FilesList } from '@/components/dashboard/files/files-list'
import { Uploader } from '@/components/dashboard/files/uploader'
import { getTodos } from '@/components/dashboard/todos/actions'
import { TodoList } from '@/components/dashboard/todos/todo-list'
import { getCurrentUser } from '@/lib/supabase'

const Page = async () => {
  const user = await getCurrentUser(cookies())

  if (!user) {
    return <div>Not logged in</div>
  }

  const { files, error } = await getUserFiles()
  const todos = await getTodos()

  return (
    <main className="flex w-full max-w-6xl flex-1 flex-col items-center gap-10">
      <div className="flex w-full flex-row items-center justify-between">
        <h2 className="text-4xl font-bold">Your files</h2>
        <Uploader />
      </div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <FilesList initialFiles={files!} />
      )}
      <TodoList initialTodos={todos} />
    </main>
  )
}

export default Page
