import React, { useEffect, useRef, useState } from 'react';

interface Marker {
    top: number;
    left: number;
}

interface ColorData {
    hex: string;
    rgb: number[];
}

interface ColorExtractorProps {
    imageUrl: string | null;
    markers: Marker[];
    sendColors: Function;
}

const ColorExtractor: React.FC<ColorExtractorProps> = ({ imageUrl, markers, sendColors }) => {
    const [colors, setColors] = useState<ColorData[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Clear the colors if no markers are available
        if (!imageUrl || markers.length === 0) {
            setColors([]);
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;

        img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to image size
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const sampledColors: ColorData[] = markers.map(marker => {
            const x = Math.round((marker.left / 100) * img.width);
            const y = Math.round((marker.top / 100) * img.height);

            // Sample size and offsets adjustable
            const regionSize = 24; 
            const offsetRight = 26;
            const offsetDown = 28;

            // Shift the starting position of the sampling region to the right
            const xShifted = x + offsetRight;
            const yShifted = y + offsetDown;

            // Grab the image data from the region around the marker
            const imageData = ctx.getImageData(
                xShifted - Math.round(regionSize / 2), 
                yShifted - Math.round(regionSize / 2),
                regionSize,
                regionSize
            );

            const data = imageData.data;
            let r = 0, g = 0, b = 0, count = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }

            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);

            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            return { 
                hex, rgb: [r, g, b] 
            };
        });

            setColors(sampledColors);
            sendColors(sampledColors);
        };
    }, [imageUrl, markers]);

    return (
        <div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            {colors.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 0 }}>
                    {colors.map((color, index) => (
                        <div key={index} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: color.hex,
                                    border: '1px solid #ccc',
                                    margin: '2.5px',
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No colours found.</p>
            )}
        </div>
    );
};

export default ColorExtractor;
