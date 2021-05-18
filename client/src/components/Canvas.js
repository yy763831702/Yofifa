import React, { useRef, useEffect } from 'react';
import '../App.css';

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const { isgk, botright, bot, botleft, topleft, top, topright } = props;
    useEffect(
        () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.scale(2, 2);

            const a = 2 * Math.PI / 6;
            const r = 70;
            const arr = [
                r * 0.01 * botright, 
                r * 0.01 * bot, 
                r * 0.01 * botleft, 
                r * 0.01 * topleft, 
                r * 0.01 * top, 
                r * 0.01 * topright
            ];
            
            // statement
            ctx.font = "15px Arial";
            if (isgk) {
                ctx.fillText("POS", 10, 58);
                ctx.fillText("SPD", 7, 143);
                ctx.fillText("DIV", 85, 13);
                ctx.fillText("REF", 85, 183);
                ctx.fillText("HAN", 163, 63);
                ctx.fillText("KIC", 163, 143);
            } else {
                ctx.fillText("DRI", 10, 58);
                ctx.fillText("SPD", 7, 143);
                ctx.fillText("PAS", 85, 13);
                ctx.fillText("DEF", 85, 183);
                ctx.fillText("SHO", 163, 63);
                ctx.fillText("PHY", 163, 143);
            }
            ctx.fillText(`${topleft}`, 15, 73);
            ctx.fillText(`${botleft}`, 15, 158);
            ctx.fillText(`${top}`, 90, 28);
            ctx.fillText(`${bot}`, 90, 198);
            ctx.fillText(`${topright}`, 163, 78);
            ctx.fillText(`${botright}`, 163, 158);

            // draw border
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 238, 221, 0.2)';
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(100 + r * Math.cos(a * i + a / 2), 100 + r * Math.sin(a * i + a / 2));
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // draw ability
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0, 34, 68, 0.8)';
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(100 + arr[i] * Math.cos(a * i + a / 2), 100 + arr[i] * Math.sin(a * i + a / 2));
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        },
        [ isgk, botright, bot, botleft, topleft, top, topright ]
    );
    return <canvas width='400px' height='400px' style={{'width':'200px', 'height':'200px'}} ref={canvasRef} {...props}/>;
};

export default Canvas;