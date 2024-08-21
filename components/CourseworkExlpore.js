"use client";
import Image from 'next/image';
import { useCourseStore } from '@/app/store'
import React, { useState } from 'react'
import { CloudDownload } from 'lucide-react';
import CourseworkCard from './CourseworkCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const CourseworkExplore = () => {
    const store = useCourseStore();
    const [isViewAll, setIsViewAll] = useState(false);
    
  return (
    <>
        <div className="mt-10 flex flex-col items-start justify-self-start ">
        <p className="font-bold text-[20px] text-grey">Explore Coursework</p>
        <Tabs defaultValue="all" className="">
            <TabsList>
                <TabsTrigger 
                className="font-bold text-[16px] text-grey-2 data-[state=active]:text-primary" 
                value="all"
                >ALL</TabsTrigger>
                <TabsTrigger
                className="font-bold text-[16px] text-grey-2 data-[state=active]:text-primary"
                value="ia">IA Example</TabsTrigger>
                <TabsTrigger 
                className="font-bold text-[16px] text-grey-2 data-[state=active]:text-primary"
                value="ee">EE Example</TabsTrigger>
                <TabsTrigger 
                className="font-bold text-[16px] text-grey-2 data-[state=active]:text-primary"
                value="io">IO Example</TabsTrigger>
                <TabsTrigger 
                className="font-bold text-[16px] text-grey-2 data-[state=active]:text-primary"
                value="tok">TOK Example</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="grid grid-cols-2">
                { Object.keys(store?.coursework)?.length>0 && Object.keys(store.coursework).map(key => {
                    const coursework = store.coursework[key];
                    return (
                        <CourseworkCard key={key} coursework={coursework}/>
                        )
                    })
                }    
            </TabsContent>
            <TabsContent value="ia" className="grid grid-cols-2">
                { Object.keys(store?.coursework)?.length>0 && Object.keys(store.coursework).map(key => {
                    const coursework = store.coursework[key];
                    if(coursework?.course!="internal"){
                        return;
                    }
                    return (
                        <CourseworkCard key={key} coursework={coursework}/>
                        )
                    })
                }    
            </TabsContent>
            <TabsContent value="ia" className="grid grid-cols-2">
                { Object.keys(store?.coursework)?.length>0 && Object.keys(store.coursework).map(key => {
                    const coursework = store.coursework[key];
                    if(coursework?.course!="internal"){
                        return;
                    }
                    return (
                        <CourseworkCard key={key} coursework={coursework}/>
                        )
                    })
                }    
            </TabsContent>
            <TabsContent value="io">
            { Object.keys(store?.coursework)?.length>0 && Object.keys(store.coursework).map(key => {
                    const coursework = store.coursework[key];
                    if(coursework?.course!="internal"){
                        return;
                    }
                    return (
                        <CourseworkCard key={key} coursework={coursework}/>
                        )
                    })
                }    
            </TabsContent>
            <TabsContent value="tok">
                { Object.keys(store?.coursework)?.length>0 && Object.keys(store.coursework).map(key => {
                    const coursework = store.coursework[key];
                    if(coursework?.course!="tok"){
                        return;
                    }
                    return (
                        <CourseworkCard key={key} coursework={coursework}/>
                        )
                    })
                }    </TabsContent>
        </Tabs>
        {/* <div className={"flex flex-wrap "+(isViewAll?"":"h-[172px] overflow-hidden")}>
        { Object.keys(store?.coursework)?.length>0 && Object.keys(store.coursework).map(key => {
            const coursework = store.coursework[key];
            console.log(coursework);
            return (
                <CourseworkCard coursework={coursework}/>
                )
        })

        }
        </div> */}
        </div>
        {/* <p onClick={()=>{setIsViewAll(p=>!p)}} className="font-bold text-[16px] self-center text-grey-2 mt-16">{isViewAll? "Show less": "View all"}</p> */}
    </>
  )
}

export default CourseworkExplore