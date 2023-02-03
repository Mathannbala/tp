import "./App.css";
import Landing from "./components/Landing";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import store from "./store";
import { useDispatch } from "react-redux";
import { getFieldsCount } from "./components/Utils";
import { setTotalFields as setTotalWindFields } from "./Actions/wind";
import { setTotalFields as setTotalSolarFields } from "./Actions/solar";
import { setTotalFields as setTotalNoiseFields } from "./Actions/noise";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = false;
  const queryClient = new QueryClient();

  // run once on load, initialize total fields for progress bar
  useEffect(() => {
    dispatch(setTotalWindFields(getFieldsCount(store.getState().wind)));
    dispatch(setTotalSolarFields(getFieldsCount(store.getState().solar)));
    dispatch(setTotalNoiseFields(getFieldsCount(store.getState().noise)));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!isLoggedIn && <Login />} />
          <Route path="/landing" element={<Landing />} />
          {/* <Route path="/landing" element={ isLoggedIn && <Landing />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
