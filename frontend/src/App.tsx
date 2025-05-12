import './App.css'
import Footer from './components/Footer/Footer.tsx'
import Header from './components/Header/Header.tsx'
import{ Button } from './components/Button/Button.tsx'
import { useNavigate } from 'react-router-dom';

type AppProps = {
  userClick: string
}

function App({
  userClick
}: AppProps) {
  const navigate = useNavigate();

  const handleCreateDataClick = () => {
    navigate("/categories");
    userClick = "CreateData";
  }
  
  const handleCompareDataClick = () => {
    navigate("/categories");
    userClick = "CompareData";
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button size={'lg'} variant={'primary'} disabled={false} text={'Create Data'} handleClick={handleCreateDataClick}/>
        <Button size={'lg'} variant={'primary'} disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
      </div>
      <Footer />
    </>
  )
}

export default App
