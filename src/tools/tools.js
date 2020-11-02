import {db} from '../firebase';

export const getTime = (time, onlyHours=false) => {
  const now = new Date();
  const h = now.getHours();
  const d = now.getDate();
  const mnth = now.getMonth();
  const y = now.getFullYear();

  const timeDate = new Date(time * 1000);
  const resultD = timeDate.getDate() < 10 ? `0${timeDate.getDate()}` : `${timeDate.getDate()}`;
  const resultMnth = timeDate.getMonth() + 1 < 10 ? `0${timeDate.getMonth() + 1}` : `${timeDate.getMonth() + 1}`;
  const resultY = `${timeDate.getFullYear() % 100}`;
  const resultH = timeDate.getHours() < 10 ? `0${timeDate.getHours()}` : `${timeDate.getHours()}`;
  const resultM = timeDate.getMinutes() < 10 ? `0${timeDate.getMinutes()}` : `${timeDate.getMinutes()}`;

  if (!onlyHours) {
    if (y - timeDate.getFullYear() >= 1) {
      return `${resultD}.${resultMnth}.${resultY}`;
    } else if (mnth - timeDate.getMonth() >= 1 || 
                h - timeDate.getHours() + 24 * (d - timeDate.getDate()) > 24) {        
      return `${resultD}.${resultMnth}`;
    } else {
      return `${resultH}:${resultM}`;
    }
  }
  else {
    return `${resultH}:${resultM}`;
  }
} 

export const getLastMessage = (messages) => {
  return messages[messages.length - 1];
}

export const addDocument = (doc, docId, collection) => {
  return db.collection(collection).doc(docId).set(doc);
}

export const getDocument = (docId, collection) => {
  return db.collection(collection).doc(docId).get();
}