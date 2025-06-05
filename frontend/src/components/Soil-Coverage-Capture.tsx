import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import Slider from './common/Slider/Slider.tsx';
import { useNavigate } from 'react-router-dom';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { UploadButton } from './common/UploadButton/UploadButton.tsx';


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

    let sendData = {
        img: null,
        num: 0
    }
    const testPost = () => {
        console.log(sendData)
        fetch("http://localhost:3000/api/add-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .then(response => response.json())
        .then(data => console.log("Success:", data))
        .catch(error => console.error("Error:", error));
    }

    function handleUploadData(data :string) {
        sendData.img = data;
    }
    
    function handleSliderData(data: any) {
        sendData.num = data;
    }

    return(
        <>
            <Header />
            <BackNavButton />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <UploadButton sendUploadData={handleUploadData} />
                    <Slider sendSilderData={handleSliderData} />
                    <Button size={'md'} variant='secondary' disabled={false} text={'test'} handleClick={testPost}/>
                    <Button size={'md'} variant='secondary' disabled={false} text={'Back to Home'} handleClick={handleReturnHomeClick}/>
                    <Button size={'md'} variant='primary' disabled={false} text={'Input Another Category'} handleClick={handleCaptureDataClick} />
                    <Button size={'md'} variant='primary' disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
                </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default SoilCoverageCapture;
