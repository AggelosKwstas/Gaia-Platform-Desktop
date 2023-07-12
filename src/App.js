import React, { useEffect } from "react";
import Map from "./components/Map";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import { appWindow } from "@tauri-apps/api/window";

const GraphsAsset = React.lazy(() => import("./components/Graphs"));

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
    document
      .getElementById("titlebar-minimize")
      .addEventListener("click", () => appWindow.minimize());
    document
      .getElementById("titlebar-maximize")
      .addEventListener("click", () => appWindow.toggleMaximize());
    document
      .getElementById("titlebar-close")
      .addEventListener("click", () => appWindow.close());

    document.addEventListener('contextmenu', event => event.preventDefault());

    document.addEventListener("keydown", (e) => {
      e = e || window.event;
      if (e.keyCode == 116 || (e.ctrlKey && e.keyCode == 82)) {
        e.preventDefault();
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Map />
              </React.Suspense>
            }
          />

          <Route
            path="/Graphs"
            element={
              <React.Suspense fallback={<>...</>}>
                <GraphsAsset />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
