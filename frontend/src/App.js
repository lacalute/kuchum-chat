
import './App.css';
import { Auth } from './components/Auth/auth';


function App() {
  return (
    <>
    <div className='container'>
    <img src={require('./title.png')} className='title_img' />
      <h1 className='title_text'>Вход в Kuchat</h1>
      <Auth />
    </div>
    </>
  );
}

export default App;
