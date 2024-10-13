import notFoundStyles from "./not-found.module.css"

export const NotFoundPage = () => (
  <div className={notFoundStyles.container}>
    <p className={notFoundStyles.emoji}>&#129517;</p>
    <h1 className='text text_type_main-large'>Oops...</h1>
    <p className='text text_type_main-medium'>Мы не смогли найти такую страницу &#128064;</p>
  </div>
)
