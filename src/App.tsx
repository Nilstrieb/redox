import React, {useEffect, useRef} from 'react';
import {canvasClick, draw, init, update, canvasMouseMove} from "./draw/MainDraw";

let CANVAS_WIDTH = 1500;
let CANVAS_HEIGHT = 900;

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const context = canvasRef.current!.getContext("2d")!;
        init();
        const interval = setInterval(() => {
            update();
        }, 1000 / 60);
        draw(context);
        return () => clearInterval(interval);
    }, [canvasRef]);

    return (
        <canvas onMouseMove={canvasMouseMove} onClick={canvasClick} ref={canvasRef} height={CANVAS_HEIGHT}
                width={CANVAS_WIDTH}/>
    );
}

export {CANVAS_WIDTH, CANVAS_HEIGHT};
export default App;