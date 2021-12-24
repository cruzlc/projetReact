import {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { contexteLogin } from './constantes'
import {Menu} from "./Menu";
import {ListePodcasts} from "./ListePodcasts";
import {Search} from "./Search";
import {Login} from "./Login";
import {SignUp} from "./SignUp";
import {InfosPodcast} from "./InfosPodcast";
import { Subscriptions } from './Subscriptions'

export default function App() {

    const [accessToken, setAccessToken] = useState(null)
    const tokenObjetcs = {accessToken, setAccessToken}

    return (
        <div className="container">
            <contexteLogin.Provider value = { tokenObjetcs }>
                <BrowserRouter>
                    <Menu/>
                    <Routes>
                        <Route path="/" element={<ListePodcasts/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        {<Route path="/subscriptions" element={<Subscriptions/>}/>}
                        <Route path="/infospodcast/:podcastId" element={<InfosPodcast/>}/>
                    </Routes>
                </BrowserRouter>
            </contexteLogin.Provider>
        </div>
    );

}// fin App()
