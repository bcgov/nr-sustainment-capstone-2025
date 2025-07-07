import { Input, Image, Text } from './slider.styles.ts';
import { useState } from 'react';

function Slider({sendSliderData}: any) {
    const [value, setValue] = useState(1);
    const [imgSource, setImgSource] = useState("Soil_Coverage_0.png");

    const onChange = (event: any) => {
        setValue(event.target.value);

        if (event.target.value == 1) {
            setImgSource("Soil_Coverage_0.png");
        }
        else if (event.target.value == 2) {
            setImgSource("Soil_Coverage_25.png");
        }
        else if (event.target.value == 3) {
            setImgSource("Soil_Coverage_50.png");
        }
        else if (event.target.value == 4) {
            setImgSource("Soil_Coverage_75.png");
        }
        else if (event.target.value == 5) {
            setImgSource("Soil_Coverage_100.png");
        }

        sendSliderData(event.target.value)
    }

    return (
        <>
            <Image src={imgSource}/>
            <Input type="range" min="1" max="5" defaultValue="0" step="1" onInput={onChange}/>
            <Text>Reference: {value}</Text>
        </>
    )
}

export default Slider;
