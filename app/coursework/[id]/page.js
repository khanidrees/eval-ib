"use client";
import LoadingPage from '@/app/coursework/[id]/loading';
import { Gauge } from '@/components/gauge';
import { db } from '@/db';
import { CloudFog } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { pdfjs,  Document, Page } from 'react-pdf';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton';

if (typeof window !== 'undefined') {
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  } else {
    global.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
//     import.meta.url,
// ).toString();

function URLify(string) {
    return string.trim().replace(/\s/g, '%20');
}

const CouresworkPage = ({children,params}) => {
    const [file, setFile] = useState();
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [evalResult, setEvalResult] = useState({});
    
    console.log(params?.id);
    useEffect(()=>{
        const fileid = decodeURI(params?.id);
        console.log(fileid);
        async function getFile() {
            try{
                const res = await db?.pdfstore?.get(fileid);
                const evalData = await db?.evalstore?.get(0);
                // fetch("/eval")
                // .then((res) => res.json())
                // .then(setEvalResult);
                console.log(evalData);
                if(evalData){
                    setEvalResult(evalData);
                }
                if(res){
                    setFile(res?.data);

                }
            }catch(e){
                console.log(e);
            }finally{
                setIsLoading(false);
            }
            
            
        }
        setTimeout(()=>{
            getFile();
        },1500);
        
    },[params?.id])

    function onDocumentLoadSuccess({ numPages }){
        setNumPages(numPages);
    }
    if(isLoading){
        return <LoadingPage/>
    }
  return (
    <div className='flex min-h-screen items-start justify-between pt-[64px] w-5/6'>
        <div className='w-7/12 pr-4'>
            <Document 
            file={file} 
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<Skeleton className='w-9/12 h-full'/>}
            
            >
                {[...Array(numPages).keys()].map(page =>
                    <Page 
                    key={page}
                    pageNumber={page+1} 
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    customTextRenderer={false}
                    loading={<Skeleton className='w-9/12 h-full'/>}
                    />
                 )}

                
                
            </Document>
{/* 
            <p>
                Page {pageNumber} of {numPages}
            </p> */}
        </div>
        <div className='w-3/12 '>
            <div className='flex  justify-between'>
                <div >
                    <p className='font-semibold text-[14px] text-course-h'>Overall Score</p>
                    <p className='font-extrabold text-[24px] text-course-h'>Remark : <span>{evalResult?.oaremark }</span></p>
                    <p className='font-semibold text-[12px] text-grey-2'>Evaluated on 12 jul 2024</p>  
                </div>
                <div>
                    <Gauge currValue={evalResult?.oascore} totalValue={20} size="medium" showValue={true} color='text-[#3CC28A]' bgcolor='text-white'/>
                </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="flex justify-between ">
                        <Gauge currValue={evalResult?.Ascore} totalValue={10} size="small" showValue={true} color='text-[#3CC28A]' bgcolor='text-white'/>
                        <div className='flex flex-col  items-start'>
                            <p className='font-bold text-[12px] text-grey-2'>Criteria A:</p>
                            <p className='font-bold text-[16px] text-course-h'>Understanding Knowledge Questions</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                    {evalResult?.Aremark}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="flex justify-between ">
                        <Gauge currValue={5} totalValue={evalResult?.Bscore} size="small" showValue={true} color='text-[#F9C94E]' bgcolor='text-white'/>
                        <div className='flex flex-col  items-start'>
                            <p className='font-bold text-[12px] text-grey-2'>Criteria B:</p>
                            <p className='font-bold text-[16px] text-course-h'>Understanding Knowledge Questions</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                    {evalResult?.Bremark}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                <AccordionTrigger className="flex justify-between ">
                        <Gauge currValue={evalResult?.Cscore} totalValue={10} size="small" showValue={true} color='text-[#EB751F]' bgcolor='text-white'/>
                        <div className='flex flex-col  items-start'>
                            <p className='font-bold text-[12px] text-grey-2'>Criteria C:</p>
                            <p className='font-bold text-[16px] text-course-h'>Understanding Knowledge Questions</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                    {evalResult?.Cremark}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </div>
  )
}

export default CouresworkPage;