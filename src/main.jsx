import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";

// Import components
import App from "./App.jsx";
import Disease from "@/components/Pages/Disease.jsx";
import Header from "@/components/Pages/Header.jsx";
import NavPage from "@/components/Pages/Nav.jsx";
import LoginPage from "@/components/Authentication/LoginPage.jsx";
import { DarkModeProvider } from "@/hooks/DarkModeContext.jsx";
import { ProtectedRoute } from "@/components/Routers/protectionRouter.jsx";
import DrugRecommender from "@/components/Pages/DrugRecomender.jsx";
import HospitalSearch from "@/components/Pages/Doctorlocator.jsx";

const Layout = () => {
    return (
        <>
            <Header />
            <NavPage>
                <Outlet />

            </NavPage>
        </>
    );
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <DarkModeProvider>
            <BrowserRouter>
                <Routes>

                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected routes with layout */}
                    <Route element={<Layout />}>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <App />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/DiseasePrediction" element={<Disease />} />
                        <Route path="/DrugRecomendation" element={<DrugRecommender/>}/>
                        <Route path="/DoctorLocator" element={ <HospitalSearch/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </DarkModeProvider>
    </StrictMode>
);