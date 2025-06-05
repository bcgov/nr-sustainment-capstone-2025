import Footer from '../common/Footer/Footer.tsx';
import Header from '../common/Header/Header.tsx';
import Collapsible from '../common/Collapsible/Collapsible.tsx';
import { Button } from '../common/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }: any) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/");
        setIsAuthenticated(true);
    }

    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button size={'md'} variant={'primary'} disabled={false} text={'Login'} handleClick={handleLoginClick}/>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default Login;
