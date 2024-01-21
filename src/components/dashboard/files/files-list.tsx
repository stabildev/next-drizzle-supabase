'use client'

import { format } from 'date-fns'
import { useState } from 'react'

import {
  deleteFile,
  type FileObject,
} from '@/components/dashboard/files/actions'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DeleteButton } from './delete-button'

interface FilesListProps {
  initialFiles: FileObject[]
}

export const FilesList = ({ initialFiles }: FilesListProps) => {
  const [files, setFiles] = useState<FileObject[]>(initialFiles)

  const handleDeleteFile = async (file: FileObject) => {
    const res = await deleteFile(file)

    if (res.error) {
      alert(res.error)
      return
    }

    setFiles(files.filter((f) => f.id !== file.id))
  }

  return files.length ? (
    <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <FileCard key={file.id} file={file} deleteFile={handleDeleteFile} />
      ))}
    </div>
  ) : (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 text-muted-foreground">
      <p>You have no files yet</p>
      <p>Upload your first file now</p>
    </div>
  )
}

interface FileCardProps {
  file: FileObject
  deleteFile: (file: FileObject) => void
}

const FileCard = ({ file, deleteFile }: FileCardProps) => {
  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-md dark:hover:border-muted-foreground/30">
      <CardHeader>
        <CardTitle>{file.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow sm:pt-3">
        Uploaded at {format(new Date(file.created_at), 'dd/MM/yyyy')}
      </CardContent>
      <CardFooter className="flex w-full flex-row justify-end border-t pb-3 pt-3">
        <DeleteButton onDelete={() => deleteFile(file)} />
      </CardFooter>
    </Card>
  )
}
