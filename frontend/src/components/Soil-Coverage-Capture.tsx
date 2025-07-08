import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import Slider from './common/Slider/Slider.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { UploadButton } from './common/UploadButton/UploadButton.tsx';

function SoilCoverageCapture({handleLogoutClick}: any){
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state.id;

    const soilCoverageInstructions = <p style={{marginTop: '0.8em'}}>In 10-15 randomly selected areas of the field, 
                                        take a photo of an approximately 1 ft by 1 ft 
                                        (30 by 30 cm) square of the soil surface.</p>;

    const handleReturnHomeClick = () => {
        navigate("/", {state:{id: userData}});
    }

    const handleCaptureDataClick = () => {
        navigate("/categories", {state:{page:'capture', id: userData}});
    }

    const handleCompareDataClick = () => {
        navigate("/categories", {state:{page:'compare', id: userData}});
    }

    const [images, setImages] = useState([]);
    const [imageData, setImageData] = useState<string | null>(null);
    const [sliderData, setSliderData] = useState(0);

    // this function posts data to the add-coverage-report endpoint
    const postSoilCoverage = () => {

        let sendData = {
            img: imageData,
            num: sliderData,
            user: userData,
        }

        fetch("http://localhost:3000/api/add-coverage-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .catch(error => console.error("Error:", error));

        //this resets the image and save button disables
        setImages([]);
        setImageData(null);
    }

    // this function updates the image status and will update the
    // image to either null or the dataURL for the current image
    function handleUploadData(data :string) {
        setImageData(data);
    }
    
    // this function simply updates with the slider number
    function handleSliderData(data: any) {
        let parsedData = parseInt(data);
        if (parsedData == 1) {
            parsedData = 0;
        }
        else if (parsedData == 2) {
            parsedData = 25;
        }
        else if (parsedData == 3) {
            parsedData = 50;
        }
        else if (parsedData == 4) {
            parsedData = 75;
        }
        else if (parsedData == 5) {
            parsedData = 100;
        }
        setSliderData(parsedData);
    }

    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <UploadButton sendUploadData={handleUploadData} images={images} setImages={setImages} instructions={soilCoverageInstructions}/>
                <Slider sendSliderData={handleSliderData} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

                        <Button size={'nav'} variant='tertiary' disabled={imageData == null ? true : false} text={'Save'} handleClick={postSoilCoverage}/>
                        <Button size={'nav'} variant='secondary' disabled={false} text={'Home'} handleClick={handleReturnHomeClick}/>

                        <Button size={'nav'} variant='primary' disabled={false} text={'Add Data'} handleClick={handleCaptureDataClick} />
                        <Button size={'nav'} variant='primary' disabled={false} text={'Compare'} handleClick={handleCompareDataClick}/>

                </div>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default SoilCoverageCapture;
