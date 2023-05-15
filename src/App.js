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
          console.log(user);
          const pattern = user.tags[0].pattern;
          //const pattern = tag1Options.findIndex(tag => user.tags[0].value === tag);
          //console.log(user.tags[0].pattern);

          const intensity = user.tags[1].intensity;
          //console.log(user.tags[1].intensity);

          const colorR1 = user.tags[2].r;
          const colorG1 = user.tags[2].g;
          const colorB1 = user.tags[2].b;
          /*
          color1={
                  {r: Math.random().toFixed(3), g: Math.random().toFixed(3), b: Math.random().toFixed(3)}
                }
          */
          //console.log(user.tags[2].r);

          const colorR2 = user.tags[3].r;
          const colorG2 = user.tags[3].g;
          const colorB2 = user.tags[3].b;
          /*
          color2={
                  {r: Math.random().toFixed(3), g: Math.random().toFixed(3), b: Math.random().toFixed(3)}
                } 
          */
          //console.log(user.tags[3].r);
          console.log(user);

          // Intensidad número float 1.0 1.5

          return (
            <mesh ref={mesh}  position={[i * 5,0,0]} key={user.id}>
              <Blob 
                pattern={pattern} 
                //intensity={(Math.random() * 8).toFixed(1)}
                intensity={intensity}
                color1={{r: colorR1, g: colorG1, b: colorB1}}
                color2={{r: colorR2, g: colorG2, b: colorB2}}
                />
            </mesh>)
        })}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
