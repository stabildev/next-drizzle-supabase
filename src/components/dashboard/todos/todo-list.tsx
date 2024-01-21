'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  addTodo,
  deleteTodo,
  getTodos,
  setDone,
} from '@/components/dashboard/todos/actions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { type Todo } from '@/db/types'
import { cn } from '@/lib/utils'

export const TodoList = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  }

  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
    initialData: initialTodos,
  })

  const [content, setContent] = useState('')

  return (
    <div className="flex flex-col gap-10 py-5">
      <h1 className="text-center text-3xl font-bold">To Do</h1>
      <div className="flex flex-col gap-5">
        {isLoading ? (
          'Loading...'
        ) : data?.length ? (
          data.map((todo) => (
            <Card
              key={todo.id}
              className="group flex flex-row items-center gap-5 px-5 py-3 hover:shadow"
            >
              <Checkbox
                checked={!!todo.completedAt}
                onCheckedChange={async (checked) => {
                  setDone(todo.id, checked == true).then(invalidate)
                }}
              />
              <label
                className={cn('flex-grow', {
                  'line-through': !!todo.completedAt,
                })}
              >
                {todo.title}
              </label>
              <Button
                className="invisible opacity-30 hover:opacity-70 group-hover:visible"
                variant="link"
                onClick={async () => {
                  deleteTodo(todo.id).then(invalidate)
                }}
              >
                Delete
              </Button>
            </Card>
          ))
        ) : (
          <span className="text-center opacity-70">Nothing to do</span>
        )}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (content.length) {
            addTodo(content).then(() => invalidate())
            setContent('')
          }
        }}
        className="flex flex-row items-center gap-5"
      >
        {/* <label htmlFor="content">Content</label> */}
        <Input
          id="content"
          value={content}
          placeholder="Add todo..."
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" className="whitespace-nowrap">
          Add todo
        </Button>
      </form>
    </div>
  )
}
