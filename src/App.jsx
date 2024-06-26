import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './component/molecul/Headers';
import Login from './page/Login';
import Home from './page/Home';
import Footers from './component/molecul/Footers';
import Katalog from './page/Katalog';
import Peta from './page/Peta';
import Berita from './page/Berita';
import { AuthProvider } from './context/AuthContext';
import Detail_Peta from './page/detail/Detail_Peta'
import Detail_Berita from './page/detail/Detail_Berita'
import Detail_Galeri from './page/detail/Detail_Galeri';
import Register from './page/Regist';
import FootersHead from './component/molecul/FootersHead';
import Search from './page/Search';

function App() {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/Login' || location.pathname === '/register' || location.pathname === '/login';

  return (
    <AuthProvider>
      <div>
        {!isLoginOrRegister && <Header />}
        <div className={isLoginOrRegister ? '' : 'pt-12 lg:pt-20 md:pt-20 mx-6 lg:mx-16'}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/*' element={<Navigate to='/'/>} />
            <Route exact path='*' element={<Navigate to='/'/>} />
            <Route path='/katalog' element={<Katalog />} />
            <Route path='/peta' element={<Peta />} />
            <Route path='/berita' element={<Berita />} />
            <Route path='/search' element={<Search />} />
            {isLoggedIn?(
              <>
                <Route path='/login' element={<Navigate to='/'/>} />
                <Route exact path='/register' element={<Navigate to='/'/>} />
                <Route path='/galeri/:id' element={<Detail_Galeri/>} />
                <Route path='/peta/detail/:id' element={<Detail_Peta/>}/>
                <Route path='/berita/detail/:id' element={<Detail_Berita/>}/>
              </>
            ):(
              <>
                <Route path='/galeri/:id' element={<Navigate to='/login'/>} />
                <Route path='/peta/detail/:id' element={<Navigate to='/login'/>}/>
                <Route path='/berita/detail/:id' element={<Navigate to='/login'/>}/>
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
              </>
            )}
          </Routes>
        </div>
        {!isLoginOrRegister && <FootersHead />}
        <Footers/>
      </div>
    </AuthProvider>
  );
}

export default App;
