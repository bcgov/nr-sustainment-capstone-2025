import './App.css'
import Footer from './components/Footer/Footer.tsx'
import Header from './components/Header/Header.tsx'
import{ Button } from './components/Button/Button.tsx'

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
