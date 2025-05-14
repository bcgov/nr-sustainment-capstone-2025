import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import { Button } from './common/Button/Button.tsx';

function CoverageCompare(){
    return(
        <>
            <Header />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Button size={'md'} variant='secondary' disabled={false} text={'Back to Home'} />
                    <Button size={'md'} variant='primary' disabled={false} text={'Input Another Category'} />
                    <Button size={'md'} variant='primary' disabled={false} text={'Compare Data'} />
                </div>
            <Footer />
        </>
    )
}

export default CoverageCompare;
