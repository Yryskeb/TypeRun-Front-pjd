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





    useEffect(() => {

        document.querySelector(".right-play-button").addEventListener("click", () => {
            handlePlayButtonClick()
        })

        return () => {
            // if (audioContext && audioContext.state !== 'closed') {
            //     audioContext.close();
            // }
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [audioContext, animationId]);


    const handlePlayButtonClick = () => {

        if (!audioContext) {
            setupAudioContext();
        } else {
            audioRef.current.play();
        }
    };

    const setupAudioContext = () => {
        const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        const newAnalyser = newAudioContext.createAnalyser();
        const source = newAudioContext.createMediaElementSource(audioRef.current);

        source.connect(newAnalyser);
        newAnalyser.connect(newAudioContext.destination);
        newAnalyser.fftSize = 256;
        const bufferLength = newAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        setAudioContext(newAudioContext);
        setAnalyser(newAnalyser);
        setDataArray(dataArray);
        setBufferLength(bufferLength);

        audioRef.current.play();
        draw(newAnalyser, dataArray, bufferLength);
    };

    const draw = (analyser, dataArray, bufferLength) => {
        analyser.getByteFrequencyData(dataArray);
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const barWidth = (width / bufferLength) * 1.2;
        let barHeight;
        let x = 0;

        canvasCtx.clearRect(0, 0, width, height);



        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            const factor = 1 + (Math.abs(bufferLength / 3.1 - i) / (bufferLength / 2)) * -1.5;
            barHeight *= factor;

            const gradient = canvasCtx.createLinearGradient(0, 0, 0, height);
            // gradient.addColorStop(0, 'red');
            // gradient.addColorStop(0.5, 'yellow');
            // gradient.addColorStop(1, 'green');

            gradient.addColorStop(0, 'red');
            gradient.addColorStop(0.5, 'violet');
            gradient.addColorStop(1, 'blue');
            canvasCtx.fillStyle = gradient;



            canvasCtx.fillRect(x, height - barHeight - 10, barWidth, barHeight / 1.5);

            x += barWidth + 2;
        }

        const newAnimationId = requestAnimationFrame(() => draw(analyser, dataArray, bufferLength));
        setAnimationId(newAnimationId);
    };

    return (
        <div className="part-result">
            {/* <button className="right-play-button" onClick={handlePlayButtonClick}>PLAY</button> */}
            <audio ref={audioRef} preload="metadata" style={{ display: 'none' }}>
                <source src={props.song} type="audio/mpeg" />
                <source src={props.song} type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
            <div className="play-bits">
                <canvas className="main-visual-bar" ref={canvasRef} width="600" height="200"></canvas>
            </div>
            <div className="bottom-bar"></div>
        </div>
    );
}