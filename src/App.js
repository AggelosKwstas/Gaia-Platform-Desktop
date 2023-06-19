import React, {useEffect} from 'react';
import Map from './components/Map';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AOS from "aos";

const GraphsAsset = React.lazy(() => import('./components/Graphs'));

function App() {
    useEffect(()=>{
        AOS.init();
        AOS.refresh();
    },[])
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <React.Suspense fallback={<>...</>}>
                                <Map/>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path="/Graphs"
                        element={
                            <React.Suspense fallback={<>...</>}>
                                <GraphsAsset/>
                            </React.Suspense>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
