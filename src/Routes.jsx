import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Description } from "./pages/description";
import { Price } from "./pages/price";


export const RoutesApp = () => {
  return (
    <>
    <BrowserRouter>
    <Fragment>
      <Routes>
        <Route path='/' element={<Price />}/>
        <Route path='/description' element={<Description />}/>
      </Routes>
    </Fragment>
    </BrowserRouter>
    </>
  )
}