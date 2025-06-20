import { useState, useEffect } from 'react';

export const Carousel = ({userData}: any) => {
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
    let userNameData;

    const onClickRight = () => {
        index === userNameData.length-1 ? setIndex(0) : setIndex(index+1);
        secondIndex === userNameData.length-1 ? setSecondIndex(0) : setSecondIndex(secondIndex+1);
    }

    const onClickLeft = () => {
        index === 0 ? setIndex(userNameData.length-1) : setIndex(index-1);
        secondIndex === 0 ? setSecondIndex(userNameData.length-1) : setSecondIndex(secondIndex-1);
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (data) {
        userNameData = data.map((data: any) => {if (data.userId == userData) return data});
        userNameData = userNameData.filter((element: any) => {
            return element !== undefined;
        });
    }

    if (userNameData.length == 0) {
        return <p>No Data...</p>;
    }

    return(
        <>
            { userNameData && userNameData.length > 0 && <div className='carousel-container' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <img style={{width: '3em', height: '3em', marginBottom: '50px'}} src={"carousel-left.png"} onClick={onClickLeft}/>
                <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '4px'}}>
                    <img className={'carousel-img'} src={userNameData[index].coverage_picture}/>
                    <p>{userNameData[index].createdAt.slice(0,10)}</p> 
                </div>
                { userNameData.length > 1 &&
                <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '4px'}}>
                    <img className={'carousel-img'} src={userNameData[secondIndex].coverage_picture}/>
                    <p>{userNameData[secondIndex].createdAt.slice(0,10)}</p>
                </div> }
                <img style={{width: '3em', height: '3em', marginBottom: '50px'}} src={"carousel-right.png"} onClick={onClickRight}/>
            </div> }
        </>
    )
};
