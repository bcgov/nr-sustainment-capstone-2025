import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import { Button } from './common/Button/Button.tsx';
import { useState } from 'react';


/*
*  For now there is a dummy button that acts as an example
*  of what the upload button will do in the future
**/
function SoilCoverageCapture(){

    const [showImage, setShowImage] = useState(false);

    const handleClick = () => {
        setShowImage(true);
    };
    

    return(
        <>
            <Header />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Button size={'sm'} variant='primary' disabled={false} text={'Dummy Upload'} handleClick={handleClick} />
                    {showImage && (
                        <div>
                            <img 
                                src="/dummy_coverage_image.jpg" 
                                alt="Example" 
                            />
                        </div>
                    )}
                    <Button size={'md'} variant='secondary' disabled={false} text={'Back to Home'} />
                    <Button size={'md'} variant='primary' disabled={false} text={'Input Another Category'} />
                    <Button size={'md'} variant='primary' disabled={false} text={'Compare Data'} />
                </div>
            <Footer />
        </>
    )
}

export default SoilCoverageCapture;