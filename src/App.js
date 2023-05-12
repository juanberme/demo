import { Canvas } from '@react-three/fiber';
import './App.css';
import Blob from './components/Blob';
import { OrbitControls } from '@react-three/drei';
import Camera from './components/Camera';
import { Light } from 'three';
import { useEffect, useRef, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './components/utils/firebase.js';



function App() {

  const [userCounter, setUserCounter] = useState(0);

  useEffect(() => { 
    const userCollection = collection(db, "users");
    const userSnapshot =  onSnapshot(userCollection,(snapshot) => {
      const numUsers = snapshot.size;
      setUserCounter(numUsers);
      console.log(`Hay ${numUsers} usuarios en la base de datos`);
      snapshot.docs.forEach(userData => console.log(userData.data()));
    });
    
      return () => userSnapshot();
  }, []);

  const mesh = useRef();
  return (
    <div className="App" style={{width: "100%" , height: "100vh"}}>
      <Canvas camera={{position: [10, 0, 10]}}>
        <Camera/>
        <mesh ref={mesh}  position={[0,0,0]}>
          <Blob />
        </mesh>  
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
