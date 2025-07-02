import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import Modal from './common/Modal/Modal.tsx';

function SoilPenetrationResistanceCapture({handleLogoutClick}: any){
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

    const [dateData, setDateData] = useState('');
    const [depthData, setDepthData] = useState(['']);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const thankyouMessage = <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <p style={{marginTop: '0.8em'}}>
                                    Your form has been submitted. Thank you.
                                </p>
                            </div>;


    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateData(e.target.value);
    };

    const handleDepthChange = (index: number, value: string) => {
        const newDepths = [...depthData];
        newDepths[index] = value;
        setDepthData(newDepths);
    };

    const addDepthField = () => {
        setDepthData([...depthData, '']);
    };

    const removeDepthField = (index: number) => {
        setDepthData(depthData.filter((_, i) => i !== index));
    };

    // this function posts data to the add-coverage-report endpoint
    const postSoilPenetration = () => {

        let sendData = {
            date: dateData,
            depths: depthData,
            user: userData,
        }

        fetch("http://localhost:3000/api/add-soil-penetration-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .catch(error => console.error("Error:", error));
    }

    // reset the page will onlt be called after closing the modal
    function resetData(){
        setDateData('');
        setDepthData(['']);
        setFormSubmitted(false);
    }

    function handleSubmitClick(event: React.FormEvent) {
        event.preventDefault();
        postSoilPenetration();
        setFormSubmitted(true);
        console.log('Date:', dateData);
        console.log('Depths:', depthData);
    }

    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Modal
                isOpen={formSubmitted}
                onOpenChange={() => {
                    resetData();
                }}
                title='Form Submitted'
                children={thankyouMessage}
                modalStyle={{ width: '85vw' }}
            />
            <form className={'form-container'} onSubmit={handleSubmitClick}>
                <div style={{marginBottom: '1em'}}>
                    <label style={{marginRight: '1em'}}>Date:</label>
                    <input 
                        style={{borderRadius: '5px', borderWidth: 'thin'}}
                        type="date" value={dateData} onChange={handleDateChange} required />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Depth(s):</label>
                    {depthData.map((depth, index) => (
                    <div style={{display: 'flex', margin: '0.5em'}} key={index}>
                        <input
                            style={{borderRadius: '5px', borderWidth: 'thin', height: '35px', marginRight: '0.5em'}}
                            type="number"
                            value={depth}
                            onChange={(e) => handleDepthChange(index, e.target.value)}
                            placeholder={`Depth ${index + 1}`}
                            required
                        />
                        {depthData.length > 1 && (
                        <button className={'depth-btn'} type="button" onClick={() => removeDepthField(index)}>
                            Remove
                        </button>
                        )}
                    </div>
                    ))}
                    <button className={'depth-btn'} type="button" onClick={addDepthField}>
                        Add Another Depth
                    </button>
                </div>
                <button className='submit-btn' type="submit">Submit</button>
            </form>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Button size={'nav'} variant='secondary' disabled={false} text={'Back to Home'} handleClick={handleReturnHomeClick}/>
                        <div style={{ height: '45px', margin:' 0.15em' }}></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Button size={'nav'} variant='primary' disabled={false} text={'Input Another Category'} handleClick={handleCaptureDataClick} />
                        <Button size={'nav'} variant='primary' disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
                    </div>
                </div>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    );
};

export default SoilPenetrationResistanceCapture;
