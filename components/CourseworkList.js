"use client";
import Image from 'next/image';
import { useCourseStore } from '@/app/store'
import React, { useState } from 'react'
import { CloudDownload } from 'lucide-react';
import CourseworkCard from './CourseworkCard';

const CourseworkList = () => {
    const store = useCourseStore();
    const [isViewAll, setIsViewAll] = useState(false);
    
  return (
    <>
        <div className="mt-10 flex flex-col items-start justify-self-start ">
        <p className="font-bold text-[20px] text-grey">My coursework</p>
        
        <div className={"grid grid-cols-2 "+(isViewAll?"":"h-[172px] overflow-hidden")}>
        { Object.keys(store?.coursework)?.length>0 && Object.keys(store.coursework).map(key => {
            const coursework = store.coursework[key];
            console.log(coursework);
            return (
                <CourseworkCard coursework={coursework} isViewAll={isViewAll}/>  
            )
        
        })

        }
        </div>
        </div>
        <p onClick={()=>{setIsViewAll(p=>!p)}} className="font-bold text-[16px] self-center text-grey-2 mt-16">{isViewAll? "Show less": "View all"}</p>
    </>
  )
}

export default CourseworkList