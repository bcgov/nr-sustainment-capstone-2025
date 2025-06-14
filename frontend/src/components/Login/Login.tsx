import Footer from '../common/Footer/Footer.tsx';
import Header from '../common/Header/Header.tsx';
import Collapsible from '../common/Collapsible/Collapsible.tsx';
import { Button } from '../common/Button/Button.tsx';
import InputField from '../common/InputField/InputField.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login({ setIsAuthenticated }: any) {
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/");
        setIsAuthenticated(true);
    }

    const handleInputChange = (event: any) => {
        setName(event.target.value);
    }

    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <InputField className={'login'} label={'First Name:'} type={'text'} name={'name'} value={name} onChange={handleInputChange}/>
                <Button size={'md'} variant={'primary'} disabled={name == "" ? true : false} text={'Login'} handleClick={handleLoginClick}/>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default Login;
