import { useState } from 'react';
import { Image } from '../Slider/slider.styles';

export const Carousel = () => {
    const data = [
        {
            "id": 0,
            "src": "Soil_Coverage_50.png",
            "label": "Front Left",
        },
        {
            "id": 1,
            "src": "Soil_Coverage_25.png",
            "label": "Front Right",
        },
        {
            "id": 2,
            "src": "Soil_Coverage_100.png",
            "label": "Back Left",
        }
    ];

    const [index, setIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(1);

    const onClickRight = () => {
        index === data.length-1 ? setIndex(0) : setIndex(index+1);
        secondIndex === data.length-1 ? setSecondIndex(0) : setSecondIndex(secondIndex+1);
    }

    const onClickLeft = () => {
        index === 0 ? setIndex(data.length-1) : setIndex(index-1);
        secondIndex === 0 ? setSecondIndex(data.length-1) : setSecondIndex(secondIndex-1);
    }

    return(
        <>
            <div className='' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <img style={{width: '3em', height: '3em', marginBottom: '50px'}} src={"carousel-left.png"} onClick={onClickLeft}/>
                <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '4px'}}>
                    <Image src={data[index].src}/>
                    <p>{data[index].label}</p>
                </div>
                <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '4px'}}>
                    <Image src={data[secondIndex].src}/>
                    <p>{data[secondIndex].label}</p>
                </div>
                <img style={{width: '3em', height: '3em', marginBottom: '50px'}} src={"carousel-right.png"} onClick={onClickRight}/>
            </div>
        </>
    )
};