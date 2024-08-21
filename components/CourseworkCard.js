"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CourseworkCard = ({coursework}) => {
    const router = useRouter();
    function getLimitedStr (str,limit){
        if(str?.length >limit){
            return str.slice(0,limit+1);
        }
        return str;
    }
  return (
    <div 
    className="flex w-[440px] p-[6px]"
    onClick={()=>{router.push('/coursework/'+coursework?.filename);}}
    >
                     <Image
                        src={coursework?.image}
                        alt="App Icon"
                        height={160}
                        width={120}
                        /> 
                    {/* <iframe
                    width={100.4}
                    height={142}
                    src={URL.createObjectURL(coursework?.file)}
                    /> */}
                    <div>
                        <div className="px-2 py-1">
                        <p className="font-extrabold text-[19px] text-course-h">{getLimitedStr(coursework?.title,35)}</p>
                        <p className="font-semibold text-[11px] text-grey">How does the temperature of a Copper pipe affect the time it takes a magnet to fall thought... </p>
                        </div>
                        <div className="flex flex-wrap pl-2 pt-[6px]">
                        <div className="flex mr-1 pr-2 mb-1">
                            <Image  
                            src={'/icons/headshot.svg'}
                            alt="App Icon"
                            height={16}
                            width={16}
                            />
                            <p className="text-[11px] font-bold text-course-p">Physics HL</p>
                        </div>
                        <div className="flex mr-1 pr-2 mb-1">
                            <Image  
                            src={'/icons/clock.svg'}
                            alt="App Icon"
                            height={16}
                            width={16}
                            />
                            <p className="text-[11px] font-bold text-course-p">18 min read</p>
                        </div>
                        <div className="flex mr-1 pr-2 mb-1">
                            <Image  
                            src={'/icons/words.svg'}
                            alt="App Icon"
                            height={16}
                            width={16}
                            />
                            <p className="text-[11px] font-bold text-course-p">2388 words</p>
                        </div>
                        <div className="flex mr-1 pr-2 mb-1">
                            <Image  
                            src={'/icons/star.svg'}
                            alt="App Icon"
                            height={16}
                            width={16}
                            />
                            <p className="text-[11px] font-bold text-course-p">7/7</p>
                        </div>
                        <div className="flex mr-1 pr-2 mb-1">
                            <Image  
                            src={'/icons/hand.svg'}
                            alt="App Icon"
                            height={16}
                            width={16}
                            />
                            <p className="text-[11px] font-bold text-course-p">English</p>
                        </div>
                        </div>
                    </div>
                </div>
                    
  )
}

export default CourseworkCard