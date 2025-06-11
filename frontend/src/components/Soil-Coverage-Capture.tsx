import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import Slider from './common/Slider/Slider.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { UploadButton } from './common/UploadButton/UploadButton.tsx';

function SoilCoverageCapture({handleLogoutClick}: any){

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

    const [imageData, setImageData] = useState<string | null>(null);
    const [sliderData, setSliderData] = useState(0);

    // update the user here when that functionality is added 
    const userData = 'josh'

    // this function posts data to the add-coverage-report endpoint
    // currently nothing will happen after the data is added to the 
    // database
    const postSoilCoverage = () => {

        let sendData = {
            img: imageData,
            num: sliderData,
            user: userData
        }

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
        setImageData(data);
        // remove this after testing compare page
        console.log(imageData)
    }
    
    // this function simply updates with the slider number
    function handleSliderData(data: any) {
        const parsedData = parseInt(data);
        setSliderData(parsedData);
    }

    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <UploadButton sendUploadData={handleUploadData} />
                    <Slider sendSliderData={handleSliderData} />
                        <Button size={'md'} variant='tertiary' disabled={imageData == null ? true : false} text={'Save'} handleClick={postSoilCoverage}/>
                    <Button size={'md'} variant='secondary' disabled={false} text={'Back to Home'} handleClick={handleReturnHomeClick}/>
                    <Button size={'md'} variant='primary' disabled={false} text={'Input Another Category'} handleClick={handleCaptureDataClick} />
                    <Button size={'md'} variant='primary' disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
                </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default SoilCoverageCapture;
