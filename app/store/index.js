import { db } from '@/db';
import { create } from 'zustand';

export const useCourseStore = create(
  (set) => ({
    coursework: {},
    addCourseWork: (item) => set((state) => ({ coursework: { ...state.coursework, item } })),
  })
);



// Hydration
async function hydrate() {
  if (!globalThis.indexedDB) return;

  
  const indexedDBData = await db.courseworks.toArray();
  

  const zustandState = indexedDBData.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  useCourseStore.setState((state) => ({
    coursework: { ...state.coursework, ...zustandState },
  }));
}

hydrate();

