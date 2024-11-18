import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {KeyboardControls} from "@react-three/drei";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KeyboardControls
      map={[
        {name: "forward", keys: ["KeyW", "ArrowUp"]},
        {name: "backward", keys: ["KeyS", "ArrowDown"]},
        {name: "left", keys: ["KeyA", "ArrowLeft"]},
        {name: "right", keys: ["KeyD", "ArrowRight"]},
        {name: "brake", keys: ["Space"]},
      ]}
    >
      <App/>
    </KeyboardControls>
  </StrictMode>,
)
