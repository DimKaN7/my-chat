import React, {useState, useEffect} from 'react';
import './App.scss';

import Chat from '../Chat/Chat';

function App() {
  // vieport в браузерах скидывает поле ввода за область
  // экрана, для этого ставим высоту равную innerHeight
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  useEffect(() => {
    const update = () => {
      setInnerHeight(window.innerHeight);
      console.log(innerHeight);
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  
  return (
    <div className="app" style={{height: `${innerHeight}px`}}>
      <Chat />
    </div>
  );
}

export default App;