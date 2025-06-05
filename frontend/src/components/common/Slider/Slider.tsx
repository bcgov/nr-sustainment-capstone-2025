import { Input, Image, Text } from './slider.styles.ts';
import { useState } from 'react';

function Slider({sendSilderData}) {
    const [value, setValue] = useState(0);
    const [imgSource, setImgSource] = useState("Soil_Coverage_0.png");

    const onChange = (event: any) => {
        setValue(event.target.value);

        if (event.target.value == 0) {
            setImgSource("Soil_Coverage_0.png");
        }
        else if (event.target.value == 25) {
            setImgSource("Soil_Coverage_25.png");
        }
        else if (event.target.value == 50) {
            setImgSource("Soil_Coverage_50.png");
        }
        else if (event.target.value == 75) {
            setImgSource("Soil_Coverage_75.png");
        }
        else if (event.target.value == 100) {
            setImgSource("Soil_Coverage_100.png");
        }

        sendSilderData(event.target.value)
    }

    return (
        <>
            <Image src={imgSource}/>
            <Input type="range" min="0" max="100" defaultValue="0" step="25" onInput={onChange}/>
            <Text>{value}%</Text>
        </>
    )
}

export default Slider;
