import { Canvas } from '@react-three/fiber';
import './App.css';
import Blob from './components/Blob';
import { OrbitControls } from '@react-three/drei';
import Camera from './components/Camera';
import { Light } from 'three';
import { useEffect, useRef, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './components/utils/firebase.js';
import QR from './components/images/QrCode.png';
import Logo from './components/images/postobon-logo.jpg';

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
    const userCollection = collection(db, "users");
    const unsubscribe = onSnapshot(userCollection, (usersSnapshot) => {
      const arr = [];
      usersSnapshot.forEach(doc => {
        if(doc.data().tags && doc.data().tags.length === 4) {
          arr.push({...doc.data(), id: doc.id});
        }
      });
      setUsersData(arr);
    }, (e) => console.error(e));

    return unsubscribe;
  }, []);

  return (
    <div className="App" style={{width: "100%" , height: "100vh"}}>
      <Canvas camera={{position: [10, 0, 10]}}>
        <Camera/>

        {usersData.map((user, i) => {
          //console.log(user.id);
          //console.log(user.tags[0].counter);
          const userCounter = user.tags[0].counter + user.tags[1].counter + user.tags[2].counter + user.tags[3].counter;
          console.log(userCounter);

          let pattern = 0; 
          let intensity = 0.0;

          let colorR1 = 0.0;
          let colorG1 = 0.0;
          let colorB1 = 0.0;

          let colorR2 = 0.0;
          let colorG2 = 0.0;
          let colorB2 = 0.0;

          if(userCounter >= 13 && userCounter <= 16){
            console.log("Es manzana");
            pattern = 3;
            intensity = 4.0;

            colorR1 = 1.0;
            colorG1 = 0.455;
            colorB1 = 0.831;

            colorR2 = 1.0;
            colorG2 = 0.212;
            colorB2 = 0.671;
        }else if(userCounter >= 11 &&  userCounter<= 13){
            console.log("Es Colombiana");
            pattern = 1;
            intensity = 3.0;

            colorR1  = 0.988;
            colorG1  = 0.749;
            colorB1  = 0.286;

            colorR2 = 0.96;
            colorG2 = 0.498;
            colorB2 = 0.0;
        } else if(userCounter === 10){
            console.log("Es Bretaña");
            pattern = 2;
            intensity = 5.0;

            colorR1 = 0.898;
            colorG1 = 0.925;
            colorB1 = 0.957;

            colorR2 = 0.569;
            colorG2 = 0.651;
            colorB2 = 1.0;
        }else if(userCounter >= 7 && userCounter <= 9){
            console.log("Es 7Up");
            pattern = 2;
            intensity = 5.0;

            colorR1 = 0.937;
            colorG1 = 1.0;
            colorB1 = 0.98;

            colorR2 = 0.38;
            colorG2 = 0.816;
            colorB2 = 0.584;
        }else if(userCounter >= 4 && userCounter <= 6){
            console.log("Es uva");
            pattern = 0;
            intensity = 3.3;

            colorR1 = 0.976;
            colorG1 = 0.957;
            colorB1 = 0.961;

            colorR2 = 0.502;
            colorG2 = 0.137;
            colorB2 = 0.573;
        }

          //const pattern = user.tags[0].pattern;
          //const pattern = tag1Options.findIndex(tag => user.tags[0].value === tag);
          //console.log(user.tags[0].pattern);

          //const intensity = user.tags[1].intensity;
          //console.log(user.tags[1].intensity);

          //const colorR1 = user.tags[2].r;
          //const colorG1 = user.tags[2].g;
          //const colorB1 = user.tags[2].b;
          /*
          color1={
                  {r: Math.random().toFixed(3), g: Math.random().toFixed(3), b: Math.random().toFixed(3)}
                }
          */
          //console.log(user.tags[2].r);

          //const colorR2 = user.tags[3].r;
          //const colorG2 = user.tags[3].g;
          //const colorB2 = user.tags[3].b;
          /*
          color2={
                  {r: Math.random().toFixed(3), g: Math.random().toFixed(3), b: Math.random().toFixed(3)}
                } 
          */
          //console.log(user.tags[3].r);
          //console.log(user);

          // Intensidad número float 1.0 1.5

          return (
            <mesh ref={mesh}  position={[15 * (0.5 - Math.random()) , 15 * (0.5 - Math.random()) , 15 * (0.5 - Math.random())]} key={user.id}>
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


        <div className='QrContainer'>
          <img src={QR} className='QrCode' alt='QR'/>
          <p className='QrPhrase'>Escaneame</p>
        </div>

        <div className='Title'>
          <h1>¿Qué gaseosa eres según tu personalidad?</h1>
        </div>

        <div className='Sponsor'>
          <span>Invita: </span> <img id='logoImg' src={Logo} alt='logo_empresa'/>
        </div>
    </div>
  );
}

export default App;
