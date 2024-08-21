import Image from "next/image";


import agrade from '../public/icons/A-grade.svg';
import readingRobo from '../public/icons/reading-robo.svg';
import Form from "@/components/Form";
import CourseworkList from "@/components/CourseworkList";
import CourseworkExplore from "@/components/CourseworkExlpore";

export default function Home() {
  
  
 
  return (
    <main className="flex min-h-screen flex-col items-start justify-between mt-[180px] w-4/6 ">
      <div className="flex w-full">
        <div className="w-[600px] mr-4">
          <p className="text-3xl font-semibold">Hey IB Folks ! Unsure about the quality of your answers? <span className="text-primary">We get you.</span></p>
          <Form/>
        </div>  
        <div className="flex flex-col">
          <Image
          src={readingRobo}
          alt="App Icon"
          height={136.5}
          width={228.5}
          className="mb-2"/>
          {/* <div className="w-11/12 mx-auto">
            <p className="text-4xl	font-extrabold text-primary">Evaluate your Coursework with a single click</p>
          </div> */}
          <Image
          src={agrade}
          alt="App Icon"
          height={294.03}
          width={343.83}
          />
          
        </div>
      </div>
      <CourseworkList/>
      {/* <div>
        <p className="font-bold text-[20px] text-grey mb-3">Exlpore coursework</p>
        <div className="mb-3"></div>
        <div>

        </div>
      </div> */}
      <CourseworkExplore/>
    </main>
  );
}
