import {useState, useEffect} from 'react';
import {db} from '../../firebase';

const useFirestore = () => {
  const addDocument = (doc, docId, collection) => {
    return db.collection(collection).doc(docId).set(doc);
  }

  return {
    addDocument,
  }
}

export default useFirestore;