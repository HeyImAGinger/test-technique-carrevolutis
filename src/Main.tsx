import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import YearLaunch from './Pages/YearLaunchs';
import FavoritesLaunch from './Pages/FavoritesLaunchs';
import PreciseLaunch from "./Pages/PreciseLaunch";

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/year' element={<YearLaunch/>} />
            <Route path='/favorites' element={<FavoritesLaunch/>} />
            <Route path='/:id' element={<PreciseLaunch/>} />
        </Routes>
    );
}
export default Main;