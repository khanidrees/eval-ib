"use client";
import React, { useState } from 'react';
import Image from "next/image";
import DragComponent from './DragArea';
import * as PDFJS from "pdfjs-dist/webpack";
import {
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
    FileInput,
  } from "./extension/file-uploader";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Button } from "@/components/ui/button";
import DragArea from './DragArea';
import { db } from '@/db';
import { useCourseStore } from '@/app/store/index';
import { addDataToIndexedDB } from '@/lib/idb';

import {
    DB_NAME,
    OBJECT_STORE_NAME,
    VERSION
  } from "@/lib/constants";

const dropZoneConfig = {
    accept:{
        "application/pdf":[".pdf"]
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 25,
    multiple: false
};  
import { useRouter } from 'next/navigation'


const Form = () => {
    const store = useCourseStore();
    const router = useRouter(); 
    console.log(store);
    // const allCourseWorks = store.getCourseWorks();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState([]);
    const [pdfImage, setPdfImage] = useState();
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const handleFileChange=async function(file){
        
      setFile(file);
      if(file?.length==0) return;
      await convertPdfToImage(file?.[0])
    }
    const handleRemoveFile=function(){
        setFile();
    }
    const convertPdfToImage=async (file)=>{
        const uri = URL.createObjectURL(file);
        const _PDF_DOC = await PDFJS.getDocument({ url: uri }).promise;
        const canvas = document.createElement("canvas");
        var page = await _PDF_DOC.getPage(1);
        var viewport = page.getViewport({ scale: 1 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        var render_context = {
            canvasContext: canvas.getContext("2d"),
            viewport: viewport
        };
        console.log("page lenght", _PDF_DOC);
        // setWidth(viewport.width);
        // setHeight(viewport.height);
        await page.render(render_context).promise;
        let img = canvas.toDataURL("image/png");
        
        console.log(img)
        setPdfImage(img);
    }
    const handleInputChange= (e)=>{
        const val = e.target.value;
        setTitle(val);
        if(val && Array.isArray(file) && file.length>0 && selectedCourse && ((selectedCourse=='tok') || (selectedSubject))){
            setIsSubmitEnabled(true);
        }else{
            setIsSubmitEnabled(false);
        }
    }
    const courseSelectHandler = (course)=>{
        setSelectedCourse(course);
        // console.log(selectedSubject)
        if(course && Array.isArray(file) && file.length>0 && title && ((course=='tok') || (selectedSubject))){
            setIsSubmitEnabled(true);
        }else{
            setIsSubmitEnabled(false);
        }
    }
    const subjectSelectHandler = (subject)=>{
        setSelectedSubject(subject);
        
        if(subject && Array.isArray(file) && file.length>0 && title &&  selectedCourse ){
            setIsSubmitEnabled(true);
        }else{
            setIsSubmitEnabled(false);
        }
    }

    const addCourseWork = async ()=>{
        console.log(store);
        let split = file?.[0]?.name?.split('.');
        split.pop();
        let filename = split.join(".");
        filename += Date.now();
        console.log('name: ',filename)
        try{
            const data = {
                title,
                // file : file?.[0], 
                course : selectedCourse, 
                subject : selectedSubject,
                image:pdfImage,
                filename
            };
            const fileData = {
                id:filename,
                data:file?.[0]
            }
            const result = await addDataToIndexedDB(DB_NAME, OBJECT_STORE_NAME, VERSION,data,fileData);
            
            console.log(result);
            if(result){
                store?.addCourseWork(data);
                router.push('/coursework/'+fileData?.id);
            }
        }catch(e){
            console.log(e);
        }
    }
    
    
    return (
    <>
    <div className="mt-6 p-5">
        <FileUploader
            value={file}
            onValueChange={handleFileChange}
            // children={<Dragarea file={file} handleRemoveFile={handleRemoveFile}/>}
            // fileOrFiles={file}
            dropzoneOptions={dropZoneConfig}
        >
            <FileInput>
                {Array.isArray(file) && file.length==0 &&
                <DragArea/>
                }
            </FileInput>
            {Array.isArray(file) && file.length>0 &&
            <FileUploaderContent className="flex justify-center items-center h-[240px] border border-dashed border-color rounded-xl">
                
                <FileUploaderItem
                    className="w-[194px] h-[56px] p-0 rounded-md overflow-hidden"
                    // aria-roledescription={`file ${i + 1} containing ${file.name}`}
                    index={0}
                    key={0}
                >   {pdfImage &&
                    <Image
                    src={pdfImage}
                    alt={file?.[0].name}
                    height={48}
                    width={48}
                    className="size-20 p-0"
                    />
                    }
                    
                    {/* <iframe
                    width={48}
                    height={48}
                     src={URL.createObjectURL(file?.[0])} /> */}
                      {/* <iframe
                        width={48}
                        height={48}
                        src={URL.createObjectURL(file?.[0])}
                         /> */}
                    <Image
                        src={'/icons/success-file.svg'}
                        alt="App Icon"
                        height={15}
                        width={15}
                        className=""/>
                    <p className='text-[14px] font-semibold text-grey'>{file?.[0].name}</p>
                </FileUploaderItem>
                
            </FileUploaderContent>
        }
        </FileUploader>
    </div>
    <div className="px-5">
        <p className="text-grey font-semibold text-[14px]">Select your course{(selectedCourse && selectedCourse != 'tok') && " & subjects"} *</p>
        <div className="flex">
        <Select onValueChange={courseSelectHandler}>
            <SelectTrigger className="w-[187px] text-grey rounded-full">
            <SelectValue placeholder="Coursework Type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
            <SelectItem value="tok">Tok Essay</SelectItem>
            <SelectItem value="extended">Extended Essay</SelectItem>
            <SelectItem value="internal">Internal Assessment</SelectItem>
            </SelectContent>
        </Select>
        {(selectedCourse && selectedCourse != 'tok') && 
            <Select onValueChange={subjectSelectHandler}>
            <SelectTrigger className="w-[187px] text-grey rounded-full">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectItem value="bm">Business Management</SelectItem>
                <SelectItem value="eco">Economics</SelectItem>
                <SelectItem value="lal">Language and Literature</SelectItem>
            </SelectContent>
            </Select>
        }
        </div>
        <p className="text-grey font-semibold text-[14px] mt-4">Enter your essay title*(Required) </p>
        <input className="border input-border-clr rounded-full w-[330px] h-[40px] pl-2" type="text" placeholder="how nation works....." 
        value={title}
        onChange={handleInputChange}
        />
    </div>
    <div className="mt-8 px-5 mb-5">
        <Button 
        className="bg-primary rounded-full disabled:bg-disabled"
        disabled={!isSubmitEnabled}
        onClick={addCourseWork}
        >
            <Image
            src={'/icons/eval-btn.svg'}
            alt=""
            height={24}
            width={24}
            /><span className="font-bold text-lg ml-2">Evaluate your Score</span></Button>
    </div>
    
    </>
)
}

export default Form