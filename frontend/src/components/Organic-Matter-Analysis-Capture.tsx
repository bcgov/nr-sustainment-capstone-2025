import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UploadButton } from './common/UploadButton/UploadButton.tsx';
import InputField from './common/InputField/InputField.tsx';

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
    const [note, setNote] = useState('');
    const [noteData, setNoteData] = useState<string | null>(null);

    // post data to add report to endpoint, need more info on table structure 
    const postOrganicMatterAnalysis = () => {
        let sendData = {
            user: userData,
            note: noteData,
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
        setNote('');
        setNoteData(null);
    }

    // this function updates the image status and will update the
    // image to either null or the dataURL for the current image
    function handleUploadData(data: string) {
        setImageData(data);
        // remove this after testing compare page
        console.log(imageData)
    }

    function handleInputChange(event: any) {
        setNote(event.target.value)
    }

    function handleCreateClick() {
        const sendData = {
            note: note,
            userId: userData
        }
        
        fetch("http://localhost:3000/api/add-note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .then(response => response.json())
        .then(data => {
            setNoteData(data.id);
        })  
        .catch(error => console.error("Error:", error));

        //setNoteData(note);
    }

    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <UploadButton sendUploadData={handleUploadData} images={images} setImages={setImages} instructions={organicMatterAnalysisInstructions}/>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <InputField className={'md-input'} dir={'col'} label={'Notes'} type={'text'} name={'notes'} value={note} onChange={handleInputChange}/>
                    <Button size={'tall'} variant={'primary'} disabled={false} text={'Create'} handleClick={handleCreateClick}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Button size={'nav'} variant='tertiary' disabled={imageData == null ? true : false} text={'Save'} handleClick={postOrganicMatterAnalysis}/>
                        <Button size={'nav'} variant='secondary' disabled={false} text={'Back to Home'} handleClick={handleReturnHomeClick}/>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Button size={'nav'} variant='primary' disabled={false} text={'Input Another Category'} handleClick={handleCaptureDataClick} />
                        <Button size={'nav'} variant='primary' disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
                    </div>
                </div>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default OrganicMatterAnalysisCapture;
