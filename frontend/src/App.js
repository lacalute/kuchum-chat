import logo from './logo.svg';
import './App.css';
import { Auth } from './components/Auth/auth';
import { ReactComponent as Logo } from './title.png';

function App() {
  return (
    <>
    <div className='container'>
    <img src={require('./title.png')} className='title_img' />
      <Auth />
    </div>
    </>
  );
}

export default App;
