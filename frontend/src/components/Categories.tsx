import {useLocation} from 'react-router-dom';

function Categories() {
  const location = useLocation();

  return (
    <>
      <h1>{location.state.page}</h1>
    </>
  )
}

export default Categories;
