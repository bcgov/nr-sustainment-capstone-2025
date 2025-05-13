import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import { Button } from './components/Button/Button.tsx';
import '../src/components/Categories/categories.styles.css';

function Categories(){
    return(
        <>
            <Header />
                <title>Pick a category:</title>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div className="clear">
                        <h2>Pick a category:</h2>
                    </div>
                    <div>
                        
                        <Button size={'lg'} variant='primary' disabled={false} text={'Ponding'} ></Button>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Surface Crusting'} ></Button>
                    </div>
                    <div>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Soil Crusting'} ></Button>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Biospores'} ></Button>
                    </div>
                    <div>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Organic Matter Analyses'} ></Button>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Penetration Resistance'} ></Button>
                    </div>
                </div>
                <div className="clear"></div>
            <Footer />
        </>
    )
}

export default Categories
