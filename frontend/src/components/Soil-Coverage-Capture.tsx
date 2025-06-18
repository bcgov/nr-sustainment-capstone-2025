import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import Slider from './common/Slider/Slider.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { UploadButton } from './common/UploadButton/UploadButton.tsx';
import InputField from './common/InputField/InputField.tsx';
import { Select } from "@bcgov/design-system-react-components";



function SoilCoverageCapture({handleLogoutClick}: any){
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state.id;

    const handleReturnHomeClick = () => {
        navigate("/", {state:{id: userData}});
    }

    const handleCaptureDataClick = () => {
        navigate("/categories", {state:{page:'capture', id: userData}});
    }

    const handleCompareDataClick = () => {
        navigate("/categories", {state:{page:'compare', id: userData}});
    }

    const [imageData, setImageData] = useState<string | null>(null);
    const [sliderData, setSliderData] = useState(0);
    const [label, setLabel] = useState('');
    const [selectLabel, setSelectLabel] = useState<string[]>([])
    const [labelData, setLabelData] = useState<string | null>(null);

    // this function posts data to the add-coverage-report endpoint
    // currently nothing will happen after the data is added to the 
    // database
    const postSoilCoverage = () => {

        let sendData = {
            img: imageData,
            num: sliderData,
            user: userData,
            label: labelData
        }

        //console.log(sendData)
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

    function handleInputChange(event: any) {
        // do something
        setLabel(event.target.value)
    }

    function handleCreateClick() {
        const sendData = {
            label: label,
            userId: userData
        }
        
        fetch("http://localhost:3000/api/add-label", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .then(response => response.json())
        .then(data => {
            setLabelData(data.id);
        })  
        .catch(error => console.error("Error:", error));
        //updateSelectList();
        setLabelData(label);
    }

    function updateSelectList() {

        const sendData = {
            id: userData
        }

        fetch("http://localhost:3000/api/pull-labels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .then(response => response.json()
        .then (data => {
            // const pulledData: string[] = [];

            // for(let i = 0; i < data.length; i++){
            //     pulledData.push(data[i].label)
            // }

            const pulledData = data.map((label: string, id: string) => ({
                label,
                id
            }))

            console.log(pulledData);
            setSelectLabel(pulledData);
            // data.array.forEach(element => {
            //     pulledData.push(element.label);
            // });
            // for(let i = 0; i < data.length; i++){
            //     pulledData.push(data[i].label);
            //     selectLabel.push()
            // }
        })) 
        .catch(error => console.error("Error:", error));

        //setSelectLabel([]);
        //setLabelData(label);
    }


    useEffect(() => {
        updateSelectList();
    }, []);

    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <UploadButton sendUploadData={handleUploadData} />
                <Slider sendSliderData={handleSliderData} />
                <Select placeholder='Please Choose A Label Or Create A New Label Below' items={selectLabel}/>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <InputField className={'md-input'} dir={'col'} label={'Label'} type={'text'} name={'label'} value={label} onChange={handleInputChange}/>
                    <Button size={'tall'} variant={'primary'} disabled={false} text={'Create'} handleClick={handleCreateClick}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Button size={'nav'} variant='tertiary' disabled={imageData == null || labelData == null ? true : false} text={'Save'} handleClick={postSoilCoverage}/>
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

export default SoilCoverageCapture;
