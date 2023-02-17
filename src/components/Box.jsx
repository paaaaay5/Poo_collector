import React,{ useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const Box = (props) =>{
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta));
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale = {[3, 3, 3]}
            //onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
            >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'red' : 'orange'} />
        </mesh>
    );
};

export default Box;