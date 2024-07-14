"use client"
import React, { useState } from 'react';
import { uploadFile } from '@/lib/r2'

interface PresignedUrlResponse {
  url: string;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  const handleFileUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const uploadUrlResponse: PresignedUrlResponse = await uploadFile({ name: file.name });
    const uploadUrl = uploadUrlResponse.url; // URL presignada para o upload

    const xhr = new XMLHttpRequest();

    // Configura o progresso do upload
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress); // Atualiza o progresso do upload
      }
    };

    // Define o que acontece uma vez que o upload é completado
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const encodedFileName = encodeURIComponent(file.name); // Codifica o nome do arquivo para URL

        const publicFileUrl = `https://uploads.biomapengenharia.com.br/${process.env.NEXT_PUBLIC_R2_UPLOAD_BUCKET}%2F${encodedFileName}`;
        
        console.log("URL pública do arquivo:", publicFileUrl);
        setUploadedFileUrl(publicFileUrl); // Atualiza o estado com a URL pública do arquivo
      } else {
        console.error("Falha no upload do arquivo");
      }
    };

    // Inicia o upload
    xhr.open("PUT", uploadUrl, true);
    xhr.send(file);
  };

  return (
    <div className='bg-slate-800/75 flex flex-col w-full p-6 rounded-sm'>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
        <button className='bg-green-400 text-black p-2 rounded-md ml-4' type="submit">Fazer Upload</button>
      </form>
      {
        uploadProgress !== null && (
          <div className='mt-4'>
            <div className='bg-gray-200 h-3 w-full rounded-full'>
              <div
                className='bg-green-500 h-3 rounded-full'
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p>Progresso do Upload: {uploadProgress.toFixed(0)}%</p>
          </div>
        )
      }
      {
        uploadedFileUrl && (
         <div className='flex flex-col flex-wrap'>
           <p className='mt-4 py-2 px-1 bg-slate-600/60 rounded-sm'> 
            <span className='font-bold text-green-600'>URL do arquivo: </span> 
                <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer" >{uploadedFileUrl}</a>
          </p>
          <p className='text-sm text-gray-300 p-2'>{`*LEMBRE-SE: Copie a URL clicando com o botão esquerdo no mouse sobre o link e selecionando a opção "Copiar endereço do link"`}  </p>
         </div>

          
        )
      }
    </div>
  );
};

export default FileUpload;
