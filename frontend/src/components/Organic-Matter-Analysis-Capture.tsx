import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UploadButton } from './common/UploadButton/UploadButton.tsx';
import ImageMarker, { type Marker } from 'react-image-marker';
import ColorExtractor from './common/ColorExtractor/ColorExtractor.tsx';

function OrganicMatterAnalysisCapture({handleLogoutClick}: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state.id;

    const organicMatterAnalysisInstructions = <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                                <p style={{marginTop: '0.8em'}}>
                                                    Take a picture of about a handful
                                                    worth of soil on top of or next to a white sheet of paper. 
                                                    The soil surface should be flat and dry, if that is not 
                                                    possible, then it should be uniformly moist but not glistening.
                                                    The reference and the soil should be in the same plane. Please 
                                                    ensure there are no internal shadows (e.g., dark areas between 
                                                    aggregates or microaggregates).
                                                </p>
                                                <img src='OMA_Instructions.png' />
                                            </div>;

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
    const [markers, setMarkers] = useState<Marker[]>([
        {
        top: 50, //10% of the image relative size from top
        left: 50 //50% of the image relative size from left
        }
    ]);
    const [hideImageAfterUpload, setHideImageAfterUpload] = useState(false);

    // post data to add report to endpoint, need more info on table structure 
    const postOrganicMatterAnalysis = () => {
        let sendData = {
            user: userData,
            hue: '60/40/50',
            value: Math.floor(Math.random() * (8 - 2) + 2),
            chroma: 5
        }

        fetch("http://localhost:3000/api/add-oma-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .catch(error => console.error("Error:", error));

        setImages([]);
        setImageData(null);
    }

    // this function updates the image status and will update the
    // image to either null or the dataURL for the current image
    function handleUploadData(data: string) {
        setImageData(data);
        setMarkers([]); // Clear markers on new image
        setHideImageAfterUpload(true);
        // remove this after testing compare page
        console.log(imageData)
    }

    const handleAddMarker = (marker: Marker) => {
        if (markers.length < 2) {
        const newMarkers = [...markers, marker];
        setMarkers(newMarkers);
        } else {
            alert("You can only add two markers to the image.");
        }
    };

    // Remove marker or reset markers
    const handleRemoveMarker = () => {
        setMarkers(prev => prev.slice(0, -1));
    };

    // Clears markers
    const handleResetMarkers = () => {
        setMarkers([]); 
    };
    
    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <UploadButton sendUploadData={handleUploadData} images={images} setImages={setImages} instructions={organicMatterAnalysisInstructions}  hideImageAfterUpload={hideImageAfterUpload}/>
                {/* Only show Reset and Remove Markers buttons if an image is uploaded */}
                {imageData && (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <button className="marker-button" disabled={markers.length === 0} onClick={handleResetMarkers}>
                            Reset
                        </button>
                        <button className="marker-button" disabled={markers.length === 0} onClick={handleRemoveMarker}>
                            Remove Marker
                        </button>
                    </div>
                )}
                {imageData && ( <ImageMarker src={imageData} markers={markers} onAddMarker={handleAddMarker}/> )}
                <div>
                    <ColorExtractor imageUrl={imageData} 
                        markers={markers.map(m => ({
                            top: Number(m.top),
                            left: Number(m.left),
                        }))}
                    />
                </div>
                <div className='navButtons' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Button size={'save'} variant='tertiary' disabled={imageData == null ? true : false} text={'Save'} handleClick={postOrganicMatterAnalysis}/>
                        <Button size={'home'} variant='secondary' disabled={false} text={'Home'} handleClick={handleReturnHomeClick}/>
                        <Button size={'nav'} variant='primary' disabled={false} text={'Add Data'} handleClick={handleCaptureDataClick} />
                        <Button size={'nav'} variant='primary' disabled={false} text={'Compare'} handleClick={handleCompareDataClick}/>
                </div>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default OrganicMatterAnalysisCapture;
