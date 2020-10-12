import React, {useState, useEffect} from 'react';

const useFirebaseDB = (dbPromise) => {
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    dbPromise
      .then((response) => console.log(response));

  }, []);
}

export default useFirebaseDB;