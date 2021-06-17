import React, {useEffect, useRef} from 'react';
import {canvasClick, draw, init, update, canvasMouseMove} from "./draw/MainDraw";

let CANVAS_WIDTH = 1500;
let CANVAS_HEIGHT = 700;

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
        }, 1000 / 30);
        draw(context);
        return () => clearInterval(interval);
    }, [canvasRef]);

    return (
        <div>
            <h1>Redox</h1>
            <canvas onMouseMove={canvasMouseMove} onClick={canvasClick} ref={canvasRef} height={CANVAS_HEIGHT}
                    width={CANVAS_WIDTH}/>
        </div>
    );
}

export {CANVAS_WIDTH, CANVAS_HEIGHT};
export default App;