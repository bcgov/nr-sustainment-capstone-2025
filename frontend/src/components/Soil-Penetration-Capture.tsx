import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import Modal from './common/Modal/Modal.tsx';
import InformationIcon from './common/InformationIcon/InformationIcon.tsx';

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

    const depths = ["0-5 cm", "5-20 cm", " > 20 cm"];
    const levels = ['None', 'Some', 'Lots'];
    
    const [entries, setEntries] = useState(Array.from({ length: 8 }, () => createEmptyEntry()));
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const thankyouMessage = <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <p style={{marginTop: '0.8em'}}>
                                    Your form has been submitted.
                                </p>
                                <p>You Scored {score}/100.</p>
                            </div>;

    function createEmptyEntry() {
        return depths.reduce((acc, depth) => {
            acc[depth] = '';
            return acc;
        }, {} as Record<string, string>);
    }

    const handleChange = (i: number, depth: string, value: string) => {
        const newEntry = [...entries];
        newEntry[i][depth] = value;
        setEntries(newEntry);
    };

    const addEntry = () => {
        setEntries([...entries, createEmptyEntry()]);
    };

    const removeEntry = (index: number) => {
        const updated = entries.filter((_, i) => i !== index);
        setEntries(updated);
    };

    function calculateScore(entry: string){
        if(entry == 'None'){
            return 3.0;
        } else if (entry == 'Some'){
            return 2.0;
        } else {
            return 1.0;
        }
    }

    function calculateTotalScore(entries: Record<string, string>[]) {
        
        const maxPerEntry = Object.keys(entries[0]).length * 3;
        const totalMaxScore = entries.length * maxPerEntry;
        let totalRawScore = 0.0;
    
        for(let i = 0; i < entries.length; i++){
            const values = Object.values(entries[i]);
            totalRawScore += calculateScore(values[0]) + calculateScore(values[1]) + calculateScore(values[2]);
        }

        return Math.round(totalRawScore / totalMaxScore * 100);
    }

    function findEmptyValues(entries: Record<string, string>[]){
        const emptyFields: { plot: number, depth: string }[] = [];
    
        entries.forEach((entry, index) => {
            for (const [depth, value] of Object.entries(entry)) {
                if (value === '') {
                    emptyFields.push({ plot: index + 1, depth });
                }
            }
        });
    
        return emptyFields;
    }

    const postSoilPenetration = (score: number) => {

        const sendData = {
            score: score,
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

    // reset the page will only be called after closing the modal
    function resetData(){
        setFormSubmitted(false);
        setEntries(Array.from({ length: 8 }, () => createEmptyEntry()));
    }

    function handleSubmitClick(event: React.FormEvent) {
        event.preventDefault();
        const emptyValues = findEmptyValues(entries)
        if(emptyValues.length > 0){
            const missingMessage = emptyValues
            .map((e) => `Spot ${e.plot} at ${e.depth} needs to be filled out.`)
            .join('\n');

            alert(`Please make sure all values have been filled out before clicking submit.\n\n${missingMessage}`);
        } else {
            //const score = calculateTotalScore(entries);
            setScore(calculateTotalScore(entries));
            console.log(score);
            postSoilPenetration(score);
            setFormSubmitted(true);
        }
        console.log(entries);
    }

    return(
        <>
            <Header />
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
                <div style={{flexDirection: 'row'}}>
                    <BackNavButton />
                    <InformationIcon />
                    <LogoutButton handleLogoutClick={handleLogoutClick} />
                </div>
                <form className={'form-container'} onSubmit={handleSubmitClick}>
                    <table style={{ borderCollapse: 'collapse', marginBottom: '0px' }}>
                        <thead>
                        <tr>
                            <th></th>
                            {depths.map((depth) => (
                            <th key={depth}>{depth}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {entries.map((entry, i) => (
                            <tr key={i}>
                            <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Plot {i + 1}</td>
                            {depths.map((depth) => (
                                <td key={depth} style={{ padding: '0.5rem' }}>
                                <select
                                    value={entry[depth]}
                                    onChange={(e) => handleChange(i, depth, e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {levels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                    ))}
                                </select>
                                </td>
                            ))}
                            <td style={{padding: '0'}}>
                                <button
                                onClick={() => removeEntry(i)}
                                style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'red',
                                cursor: 'pointer',
                                lineHeight: '1',
                                padding: '0'
                                }}
                                aria-label={`Remove Spot ${i + 1}`}
                                type={'button'}
                                >
                                    ×
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div style={{display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
                        <button className={'depth-btn'} type="button" onClick={addEntry}>Add Plot</button>
                        <button className={'submit-btn'} type="submit">Submit</button>
                    </div>
                </form>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button size={'home'} variant='secondary' disabled={false} text={'Home'} handleClick={handleReturnHomeClick}/>
                    <Button size={'nav'} variant='primary' disabled={false} text={'Add Data'} handleClick={handleCaptureDataClick} />
                    <Button size={'nav'} variant='primary' disabled={false} text={'Compare'} handleClick={handleCompareDataClick}/>
                </div>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    );
};

export default SoilPenetrationResistanceCapture;
