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
import * as munsell from 'munsell';
import { RadioGroup, Radio } from "@bcgov/design-system-react-components";
import Modal from './common/Modal/Modal.tsx';

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
    const [colors, setColors] = useState<any>([]);
    const [colorsSelected, setColorsSelected] = useState(false);
    const [moistureLevel, setMoistureLevel] = useState('');
    const [moistureSelected, setMoistureSelected] = useState(false);
    const [dataPosted, setDataPosted] = useState(false);
    const [message, setMessage] = useState<JSX.Element>(); 

    // need this function to try and reduce the effect of light on images
    // This is the function I would appreciate people look at because it works
    // just not as well as I would like it too on images with cool lighting
    function whiteBalance(soilRGB: number[], whiteRGB: number[], strength = 2.8) {
        const total = whiteRGB[0] + whiteRGB[1] + whiteRGB[2];
    
        // Relative contribution of each channel
        const weights = whiteRGB.map(c => c / total);
    
        // Invert weights so overrepresented channels are scaled down, underrepresented scaled up
        const inverseWeights = weights.map(w => Math.pow(1 / w, strength));
    
        // Normalize inverseWeights so they don’t blow things up too hard
        const normFactor = Math.pow(3, strength);
        const normedScales = inverseWeights.map(s => s * (1 / normFactor));
    
        return soilRGB.map((c, i) => {
            const scaled = c * normedScales[i];
            return Math.round(Math.min(255, Math.max(0, scaled)));
        });
    }

    // convert an rgb value to a hex value
    function rgbToHex(r: number, g: number, b: number) {
        const toHex = (c: number) => {
            const hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
        // Combine the hexadecimal components with a '#' prefix
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }

    function setupSendData(hex: string) {
        const munsellValue = munsell.hexToMunsell(hex)
        const splitString = munsellValue.split(' ');
        const hue = splitString[0];
        const value = parseFloat(splitString[1].split('/')[0]);
        const chroma = parseFloat(splitString[1].split('/')[1]);         

        setMessage(<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{marginTop: '0.8em'}}>
                            Your form has been submitted. Thank you.
                        </p>
                        <div>
                            <div style={{height: '30px', width: '30px', backgroundColor: hex}}></div>
                            <p>Your adjusted color is: {hex}</p>
                            <p>Your Munsell Value is: {munsellValue}</p>
                        </div>
                    </div>);

        const sendData = {
            hue: hue,
            value: value,
            chroma: chroma,
            user: userData,
            moistureLevel: moistureLevel
        }

        return sendData;
    }

    function resetData(){
        setImages([]);
        setImageData(null);
        setMoistureSelected(false);
        setDataPosted(false);
    }

    // post data to add report to endpoint, need more info on table structure 
    const postOrganicMatterAnalysis = () => {

        const refWhite = [colors[1].rgb[0], colors[1].rgb[1], colors[1].rgb[2]]
        const refSoil = [colors[0].rgb[0], colors[0].rgb[1], colors[0].rgb[2]];

        const whiteBalanced = whiteBalance(refSoil, refWhite);
        const sendData = setupSendData(rgbToHex(whiteBalanced[0], whiteBalanced[1], whiteBalanced[2]));

        fetch("http://localhost:3000/api/add-oma-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .catch(error => console.error("Error:", error))
        .finally(() => {setDataPosted(true)});
    }

    function handleColorData ( data: any[]){
        setColors(data);
    }

    // this function updates the image status and will update the
    // image to either null or the dataURL for the current image
    function handleUploadData(data: string) {
        setImageData(data);
        setMarkers([]); // Clear markers on new image
        setHideImageAfterUpload(true);
    }

    const handleAddMarker = (marker: Marker) => {
        if (markers.length < 2) {
            if(markers.length == 1){
                setColorsSelected(true);
            }   
            const newMarkers = [...markers, marker];
            setMarkers(newMarkers);

        } else {
            alert("You can only add two markers to the image.");
        }

        console.log(markers.length)

    };

    // Remove marker or reset markers
    const handleRemoveMarker = () => {
        setMarkers(prev => prev.slice(0, -1));
        setColorsSelected(false);
    };

    // Clears markers
    const handleResetMarkers = () => {
        setMarkers([]); 
        setColorsSelected(false);
    };

    function handleRadioChange(e : any){
        if(e == 1){
            setMoistureLevel('dry');
        } else {
            setMoistureLevel('wet');
        }
        setMoistureSelected(true);
    }
    
    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
            <Modal
                isOpen={dataPosted}
                onOpenChange={() => {
                    resetData();
                }}
                title='Submitted'
                children={message}
                modalStyle={{ width: '85vw' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <UploadButton sendUploadData={handleUploadData} images={images} setImages={setImages} instructions={organicMatterAnalysisInstructions}  hideImageAfterUpload={hideImageAfterUpload}/>
                {/* Only show Reset and Remove Markers buttons if an image is uploaded */}
                {imageData && (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '50px'}}>
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
                        sendColors={handleColorData}
                    />
                </div>
                <RadioGroup label="Dry or Wet:" orientation="horizontal" style={{marginBottom: '1em', flexDirection: 'row', alignItems: 'center'}} onChange={handleRadioChange}>
                    <Radio value="1" style={{fontFamily: 'inherit !important'}}>
                        Dry
                    </Radio>
                    <Radio value="2" style={{fontFamily: 'inherit !important'}}>
                        Wet
                    </Radio>
                </RadioGroup>
                 <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Button size={'save'} variant='tertiary' disabled={moistureSelected && colorsSelected ? false : true} text={'Save'} handleClick={postOrganicMatterAnalysis}/>
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
