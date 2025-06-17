import { useState, useEffect } from 'react';
import { Image } from '../Slider/slider.styles';

export const Carousel = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/check-coverage-report');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.log("Error", err)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    return(
        <>
            { data && data.length > 0 && <div className='' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <img style={{width: '3em', height: '3em', marginBottom: '50px'}} src={"carousel-left.png"} onClick={onClickLeft}/>
                <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '4px'}}>
                    <Image src={data[index].coverage_picture}/>
                    <p>{data[index].createdAt.slice(0,10)}</p> 
                </div>
                { data.length > 1 &&
                <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '4px'}}>
                    <Image src={data[secondIndex].coverage_picture}/>
                    <p>{data[secondIndex].createdAt.slice(0,10)}</p>
                </div> }
                <img style={{width: '3em', height: '3em', marginBottom: '50px'}} src={"carousel-right.png"} onClick={onClickRight}/>
            </div> }
        </>
    )
};
