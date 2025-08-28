import './App.css';
import { useState, useEffect } from 'react';
import GLBViewer from './components/GLBViewer';

function App() {
    const models = ['mcqueen.glb', 'sally.glb', 'chick.glb', 'reyna.glb', 'neon.glb'];
    const colors = ['#ff0000', '#00a8ff', '#ffff00', '#A020F0', '#0005f8'];
    const names = ['McQueen #95', 'Sally', 'Chick #86', 'Reyna', 'Neon']

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.code === "Space") {
                setIndex((prev) => (prev + 1) % models.length)
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return() => window.removeEventListener("keydown", handleKeyDown);
    }, []);

        return(
            <div className='app'>
                <GLBViewer
                    modelUrl={models[index]}
                    backgroundColor={colors[index]}
                    name={names[index]}
                    height='864px'
                    width='1536px'
                    scale={0.9}
                    position={[0,-1,0]}
                    autoRotate={true}
                    enableControls={true}
                    showEnvironment={true}
                />
            </div>
        )
}

export default App;