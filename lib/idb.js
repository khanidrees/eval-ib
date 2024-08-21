import { db } from "@/db";


  
  
  export async function addDataToIndexedDB(
    dbName,
    objectStoreName,
    version,
    data,
    pdfData
  ) {
    
    const result = await db.courseworks.add({...data});
    const pdfresult = await db.pdfstore.add({...pdfData});
    const evalData = await db.evalstore.get(0);
    console.log(evalData);
    if(!evalData){
      await db.evalstore.add({
        id:0,
        "oascore":13, "oaremark":"Good",Ascore:7,
        Aremark:"Dolore do cupidatat laborum sint incididunt excepteur ea nisi. Irure tempor et reprehenderit sit eu. Aute id cupidatat enim labore id ad ad exercitation reprehenderit. Cupidatat nostrud dolore dolore occaecat anim Lorem labore. Occaecat fugiat elit ipsum nisi irure est esse minim est. Velit voluptate reprehenderit mollit cillum consectetur et cupidatat laborum.",
        Bscore:5,Bremark:"Dolore do cupidatat laborum sint incididunt excepteur ea nisi. Irure tempor et reprehenderit sit eu. Aute id cupidatat enim labore id ad ad exercitation reprehenderit. Cupidatat nostrud dolore dolore occaecat anim Lorem labore. Occaecat fugiat elit ipsum nisi irure est esse minim est. Velit voluptate reprehenderit mollit cillum consectetur et cupidatat laborum.",
        Cscore:3,
        Cremark:"Dolore do cupidatat laborum sint incididunt excepteur ea nisi. Irure tempor et reprehenderit sit eu. Aute id cupidatat enim labore id ad ad exercitation reprehenderit. Cupidatat nostrud dolore dolore occaecat anim Lorem labore. Occaecat fugiat elit ipsum nisi irure est esse minim est. Velit voluptate reprehenderit mollit cillum consectetur et cupidatat laborum."
      });
    }
    if(result && pdfresult) return true;    
  }
  
  