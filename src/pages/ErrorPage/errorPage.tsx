import style from './errorPage.module.css';
function ErrorPage() {
  return (
    <div className={style.page}>
      <h1 className={style.error}>404</h1>
      <p>НЕ НАЙДЕНО</p>
    </div>
  );
}

export default ErrorPage;
