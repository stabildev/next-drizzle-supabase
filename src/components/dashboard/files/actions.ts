'use server'

import { cookies } from 'next/headers'
import { v4 as uuid } from 'uuid'

import { createClient } from '@/lib/supabase'

const { STORAGE_BUCKET } = process.env

if (!STORAGE_BUCKET) {
  throw new Error('STORAGE_BUCKET not found')
}

export const getUserFiles = async () => {
  const supabase = createClient(cookies())

  const userId = (await supabase.auth.getUser()).data.user?.id

  if (!userId) {
    throw new Error('User not found')
  }

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list(`${userId}/`)

  // Remove uuid from file name
  const files =
    data?.map((file) => ({
      ...file,
      name: file.name.slice(0, -37),
      fullName: file.name,
    })) || null

  return { files, error: error?.message }
}

export type FileObject = NonNullable<
  Awaited<ReturnType<typeof getUserFiles>>['files']
>[0]

export const deleteFile = async (file: FileObject) => {
  const supabase = createClient(cookies())
  const userId = (await supabase.auth.getUser()).data.user?.id

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([`${userId}/${file.fullName}`])

  if (error) {
    return { error: error.message }
  } else {
    return { success: true }
  }
}

export const uploadFile = async (formData: FormData) => {
  // Upload file
  const supabase = createClient(cookies())
  const user = (await supabase.auth.getUser()).data.user

  if (!user) {
    return {
      error: 'You must be logged in to upload a file',
    }
  }

  const file = formData.get('file') as File

  const path = `${user.id}/${file.name}.${uuid()}`

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file)

  return { data, error: error?.message }
}
