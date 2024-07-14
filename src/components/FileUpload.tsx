"use client"
import { uploadFile } from '@/lib/r2'
import { FormEvent, useState } from 'react'

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
    uploadFile({ name: file.name }).then(res => {
      const url = res.url
      return fetch(url, {
        method: "PUT",
        body: file
      })
    }).then((res) => {
      console.log(res.status)
      console.log(res.statusText)
    })
  }

  return (
      <form onSubmit={(e) => handleFileUpload(e)}>
        <label htmlFor="file-upload">Upload</label>
        <input
          multiple={false}
          id="file-upload" type="file" onChange={(e) => {
            if (!e.target.files || e.target.files.length === 0) return
            setFile(e.target.files[0])
          }} />
   
        <div style={{
          marginBottom: "2px"
        }} />
        <button className='p-2 bg-green-700'>Fazer Upload</button>
      </form>

  )
}
