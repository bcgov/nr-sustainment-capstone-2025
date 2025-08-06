import { Select } from '@bcgov/design-system-react-components';
import { useState, useEffect } from 'react';
import { useOrientation } from 'react-use';

export const Carousel = ({userData}: any) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState(1);
    const screenHeight = window.innerHeight
    const { type } = useOrientation();


    useEffect(() => {
        const fetchData = async () => {
            try {
                let dateData;

                if(filterValue == 1){
                    dateData = new Date().getFullYear();
                } else if (filterValue == 2){
                    dateData = new Date().getFullYear() - 3;
                } else {
                    dateData = new Date().getFullYear() - 5;
                }

                const sendData = {
                    date: new Date(dateData, 0, 1)
                }

                const response = await fetch('http://localhost:3000/api/check-coverage-report', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(sendData)});
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
    }, [filterValue]);

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

    const filter = [
        {
            id: 1,
            label: "Current Year"
        },
        {
            id: 2,
            label: "Last 3 Years"
        },
        {
            id: 3,
            label: "last 5 years"
        }
    ];

    const handleFilter = (event: any) => {
        setLoading(true);
        setIndex(0);
        setSecondIndex(1);
        setFilterValue(event);
    }

    return(
        <>
            <Select items={filter} label="Filter" size='small' defaultSelectedKey={1} onSelectionChange={handleFilter}/>
            {type === 'landscape-primary' ? 
            <>
                { userNameData && userNameData.length > 0 && 
                <div className='carousel-container carousel-landscape'>
                    <img style={{width: '3em', height: '3em'}} src={"carousel-left.png"} onClick={onClickLeft}/>
                    <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '4px'}}>
                        <img className={'carousel-img'} src={userNameData[index].coverage_picture}/>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1em'}}>
                        <p>{userNameData[index].createdAt.slice(0,10)}</p>
                        <p>{userNameData[index].coverage_percentage}%</p>
                    </div>
                    { userNameData.length > 1 &&
                    <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '4px'}}>
                        <img className={'carousel-img'} src={userNameData[secondIndex].coverage_picture}/>
                    </div> }
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1em'}}>
                        <p>{userNameData[secondIndex].createdAt.slice(0,10)}</p>
                        <p>{userNameData[secondIndex].coverage_percentage}%</p>
                    </div>
                    <img style={{width: '3em', height: '3em'}} src={"carousel-right.png"} onClick={onClickRight}/>
                </div> }
            </> : screenHeight >= 700 ? 
            <>
                { userNameData && userNameData.length > 0 && 
                <div className='carousel-container' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img style={{width: '3em', height: '3em'}} src={"carousel-left.png"} onClick={onClickLeft}/>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '3vw'}}>
                        <div className='' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <img className={'carousel-img'} src={userNameData[index].coverage_picture}/>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1em'}}>
                                <p>{userNameData[index].createdAt.slice(0,10)}</p>
                                <p>{userNameData[index].coverage_percentage}%</p>
                            </div>
                        </div>
                        { userNameData.length > 1 &&
                        <div className='' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <img className={'carousel-img'} src={userNameData[secondIndex].coverage_picture}/>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1em'}}>
                                <p>{userNameData[secondIndex].createdAt.slice(0,10)}</p>
                                <p>{userNameData[secondIndex].coverage_percentage}%</p>
                            </div>
                        </div> }
                    </div>
                    <img style={{width: '3em', height: '3em'}} src={"carousel-right.png"} onClick={onClickRight}/>
                </div> }
            </> :
            <>
                { userNameData && userNameData.length > 0 && 
                <div className='carousel-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <img style={{width: '3em', height: '3em'}} src={"carousel-left.png"} onClick={onClickLeft}/>
                        <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '4px'}}>
                            <img className={'carousel-img'} src={userNameData[index].coverage_picture}/>
                        </div>
                        { userNameData.length > 1 &&
                        <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '4px'}}>
                            <img className={'carousel-img'} src={userNameData[secondIndex].coverage_picture}/>
                        </div> }
                        <img style={{width: '3em', height: '3em'}} src={"carousel-right.png"} onClick={onClickRight}/>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: 'inherit'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <p>{userNameData[index].createdAt.slice(0,10)}</p>
                            <p>{userNameData[index].coverage_percentage}%</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <p>{userNameData[secondIndex].createdAt.slice(0,10)}</p>
                            <p>{userNameData[secondIndex].coverage_percentage}%</p>
                        </div>
                    </div>           
                </div> }
            </>}
        </>
    )
};
