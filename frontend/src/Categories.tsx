type CategoriesProps = {
  userClick: string;
}

function Categories({
  userClick
}: CategoriesProps) {
  return (
    <>
      <h1>Dummy page</h1>{console.log(userClick)}
    </>
  )
}

export default Categories
