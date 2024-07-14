"use client"
import ContentArea from '@/components/template/ContentArea';
import HeaderLayout from '@/components/template/Header';
import Pagina from '@/components/template/Pagina';
import React, { useState } from 'react';
import FileUpload from './FileUpload';


const UploadPage: React.FC = () => {


  return (
    <Pagina>  
<HeaderLayout />
<ContentArea className="m-auto">
  <div className="lg:min-w-[900px] flex gap-4 flex-col p-3 border border-gray-600 border-dashed rounded-md">
    
     <h2>Central de Uploads</h2>
     <FileUpload />

</div>
</ContentArea>
</Pagina>

  );
};

export default UploadPage;