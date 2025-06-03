import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import Slider from './common/Slider/Slider.tsx';
import { useNavigate } from 'react-router-dom';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { UploadButton } from './common/UploadButton/UploadButton.tsx';
import axios from 'axios'; 


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

    const testPost = () => {
        const test = {
            img: "test-image",
            num: "test-num"
        }
        axios.post("http://localhost:3000/api/add-report", test);
    }

    return(
        <>
            <Header />
            <BackNavButton />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <UploadButton />
                    <Slider />
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
