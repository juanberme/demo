import { Canvas } from '@react-three/fiber';
import './App.css';
import Blob from './components/Blob';
import { OrbitControls } from '@react-three/drei';
import Camera from './components/Camera';
import { Light } from 'three';
import { useEffect, useRef, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './components/utils/firebase.js';

const tag1Options = [
  'Solitario(a)',
  'Casero(a)',
  'Reservado(a)',
  'Extrovertido(a)'
]

function App() {
  const mesh = useRef();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => { 
    const getUsers = async () => {
      try {
        const userCollection = collection(db, "users");
        const usersSnapshot = await getDocs(userCollection);

        const arr = [];
        usersSnapshot.forEach(doc => {
          arr.push(doc.data());
        });
        setUsersData(arr);
      } catch(e) {
        console.error(e.message);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="App" style={{width: "100%" , height: "100vh"}}>
      <Canvas camera={{position: [10, 0, 10]}}>
        <Camera/>

        {usersData.map((user, i) => {
          const pattern = tag1Options.findIndex(tag => user.tags[0].value === tag);
          console.log(user);

          // Intensidad número float 1.0 1.5

          return (
            <mesh ref={mesh}  position={[i * 5,0,0]} key={user.id}>
              <Blob 
                pattern={pattern} 
                intensity={(Math.random() * 8).toFixed(1)}
                color1={
                  {r: Math.random().toFixed(3), g: Math.random().toFixed(3), b: Math.random().toFixed(3)}
                }
                color2={
                  {r: Math.random().toFixed(3), g: Math.random().toFixed(3), b: Math.random().toFixed(3)}
                }/>
            </mesh>)
        })}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
