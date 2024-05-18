import "./Frequency.css"
import React, { useRef, useEffect, useState } from 'react';



export default function Frequency(props) {


    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState(null);
    const [bufferLength, setBufferLength] = useState(0);
    const [animationId, setAnimationId] = useState(null);

    function playFrequencyBur() {
        useEffect(() => {
        if (!audioContext) {
            setupAudioContext();
        }

        return () => {
            if (audioContext) {
                audioContext.close();
            }
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };

        }, [audioContext, animationId]);
    }

    // document.querySelector(".right-play-button").addEventListener("click", () => {
    //     playFrequencyBur()
    // })

    


    const setupAudioContext = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audioRef.current);

        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        setAudioContext(audioContext);
        setAnalyser(analyser);
        setDataArray(dataArray);
        setBufferLength(bufferLength);

        draw(analyser, dataArray, bufferLength);
    };

    const draw = (analyser, dataArray, bufferLength) => {
        analyser.getByteFrequencyData(dataArray);

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const barWidth = (width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        canvasCtx.clearRect(0, 0, width, height);

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            const red = (barHeight + 100) * 2;
            const green = 50;
            const blue = 50;

            canvasCtx.fillStyle = `rgb(${red},${green},${blue})`;
            canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }

        const animationId = requestAnimationFrame(() => draw(analyser, dataArray, bufferLength));
        setAnimationId(animationId);
    };


    return (
        <div className="part-result">
            <audio ref={audioRef} preload="metadata"
                style={{ display: 'none' }}>
                <source src={props.song} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className="play-bits">
                <canvas className="main-visual-bar" ref={canvasRef} width="600" height="200"></canvas>
            </div>
            <div className="bottom-bar"></div>
        </div>
    )

}
