import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';


/*
*  For now there is a dummy button that acts as an example
*  of what the upload button will do in the future
**/
function SoilCoverageCapture(){

    const [showImage, setShowImage] = useState(false);

    const handleClick = () => {
        setShowImage(true);
    };
    

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

    return(
        <>
            <Header />
            <BackNavButton />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Button size={'sm'} variant='primary' disabled={false} text={'Dummy Upload'} handleClick={handleClick} />
                    {showImage && (
                        <div>
                            <img 
                                src="/dummy_coverage_image.jpg" 
                                alt="Example" 
                                className='dummy-image'
                            />
                        </div>
                    )}
                    <Button size={'md'} variant='secondary' disabled={false} text={'Back to Home'} handleClick={handleReturnHomeClick}/>
                    <Button size={'md'} variant='primary' disabled={false} text={'Input Another Category'} handleClick={handleCaptureDataClick} />
                    <Button size={'md'} variant='primary' disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
                </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default SoilCoverageCapture;