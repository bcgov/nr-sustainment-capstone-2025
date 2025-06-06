import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import Slider from './common/Slider/Slider.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { UploadButton } from './common/UploadButton/UploadButton.tsx';

// keep this out of the function so it is only changed when needed 
let sendData = {
    img: null,
    num: 0,
    userId: null
}

function SoilCoverageCapture(){

    const navigate = useNavigate();

    const handleReturnHomeClick = () => {
        navigate("/");
    }

    const handleCaptureDataClick = () => {
        navigate("/categories", {state:{page:'capture'}});
    }

    const handleCompareDataClick = () => {
        navigate("/categories", {state:{page:'compare'}});
    }

    // this useState is to check if the image has been uploaded
    // there will be one for the label as well in future updates
    const [imageStatus, setImageStatus] = useState(false);

    // update the user here when that functionality is added 
    sendData.userId = 'josh'

    // this function posts data to the add-coverage-report endpoint
    // currently nothing will happen after the data is added to the 
    // database
    const postSoilCoverage = () => {
        console.log(sendData)
        fetch("http://localhost:3000/api/add-coverage-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        // .then(response => response.json())
        // .then(data => console.log("Success:", data))  
        .catch(error => console.error("Error:", error));
    }

    // this function updates the image status and will update the
    // image to either null or the dataURL for the current image
    function handleUploadData(data :string) {
        if(data != null){
            setImageStatus(true);
        } else {
            setImageStatus(false);
        }
        sendData.img = data;
        console.log(sendData)
    }
    
    // this function simply updates with the slider number
    function handleSliderData(data: any) {
        const parsedData = parseInt(data);
        sendData.num = parsedData;
    }

    return(
        <>
            <Header />
            <BackNavButton />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <UploadButton sendUploadData={handleUploadData} />
                    <Slider sendSliderData={handleSliderData} />
                    { imageStatus ? 
                        <Button size={'md'} variant='secondary' disabled={false} text={'test'} handleClick={postSoilCoverage}/>
                        :<Button size={'md'} variant='secondary' disabled={true} text={'test'} handleClick={postSoilCoverage}/>}
                    <Button size={'md'} variant='secondary' disabled={false} text={'Back to Home'} handleClick={handleReturnHomeClick}/>
                    <Button size={'md'} variant='primary' disabled={false} text={'Input Another Category'} handleClick={handleCaptureDataClick} />
                    <Button size={'md'} variant='primary' disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
                </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default SoilCoverageCapture;
