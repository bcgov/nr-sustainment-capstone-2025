import {useLocation} from 'react-router-dom';

function Categories() {
  const location = useLocation();

  return (
    <>
      <h1>{location.state.name}</h1>
    </>
  )
}

export default Categories
