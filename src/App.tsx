
import './App.css'
import AppHeader from './components/app-header'
import CardList from './components/card-list'

const cards = [
  { title: "Shrimp and Chorizo Paella", description: "This impressive paella is a perfect party dish..." },
  { title: "Spaghetti Bolognese", description: "A classic Italian pasta dish with a rich meat sauce..." },
  // Add more cards as needed
];


function App() {
  return (
    <>
      <AppHeader/>
      <CardList cards={cards}/>

    </>
  )
}

export default App
