import React, {FC, useContext, useEffect} from 'react';
import LoginForm from "./components/LoginForm";
import DataList from "./components/DataList";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import CreatePage from "./components/CreateArchive";
import Archive from "./components/Archive";
import NewsThisYear from "./components/News";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import Footer from "./components/Footer";
import MapPage from "./components/MapPage";
import Header from "./components/Header"
import Projects from './components/Projects';




const App: FC =()=> {
    const {store} = useContext(Context);

    useEffect(() => {
        store.checkAuth()
    }, [store])
    

    return (
        <div className='content-div'>

                <Router>
                    <LoginForm/>
                        <Header/>
                        <Routes>
                            <Route  path='/' element={<Home/>}/>
                            <Route  path='/database' element={<DataList/>}/>
                            <Route  path='/create-page' element={<CreatePage/>}/>
                            <Route  path='/news-this-year' element={<NewsThisYear/>}/>
                            <Route  path='/archive' element={<Archive/>}/>
                            <Route  path='/projects' element={<Projects/>}/>
                            <Route  path='/map' element={<MapPage/>} />
                        </Routes> 
                </Router>
            <Footer/>
         </div>
    );
}

export default observer(App)
