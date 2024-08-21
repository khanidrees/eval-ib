import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  courseworks: '++id, title, pdfImage, course, subject, filename' ,
  pdfstore:'id, file',
  evalstore:'id, oascore, oaremark,Ascore,Aremark,Bscore,Bremark,Cscore, Cremark'
});