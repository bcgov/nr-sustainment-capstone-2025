import './App.css'
import Footer from './components/common/Footer/Footer.tsx'
import Header from './components/common/Header/Header.tsx'
import{ Button } from './components/common/Button/Button.tsx'

function App() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button size={'lg'} variant={'primary'} disabled={false} text={'Create Data'} />
        <Button size={'lg'} variant={'primary'} disabled={false} text={'Compare Data'}/>
      </div>
      <Footer />
    </>
  )
}

export default App
