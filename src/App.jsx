import './App.css'
import { Header } from './components/header'
import { SearchTop } from './components/search-top'
import { RoutesApp } from './Routes'

export const App = () => {
  return (
    <>
      <Header />
      <RoutesApp />
    </>
  )
}