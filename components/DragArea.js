"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";


const DragArea = () => {
    return(
        <div
            className="flex flex-col justify-center items-center h-[240px] border border-dashed border-color rounded-xl"
            >   
                <div className="flex flex-col justify-center items-center">
                    <Image
                    src={'/icons/fileicon.svg'}
                    alt="App Icon"
                    height={38}
                    width={30}
                    className="mb-3"/>
                    <p className="text-grey font-bold text-base">Drag and drop a PDF</p> 
                    <p className="text-grey font-semibold text-xs">*Limit 25 MB per file.</p>
                <div>
        
                </div>
                </div>
                <div className="flex  justify-center items-center">
                
                    <Button variant='outline' className="text-primary text-base font-extrabold ">
                        Upload Your File
                    </Button>
                </div>
            </div> 
    
            );
      
}

export default DragArea;