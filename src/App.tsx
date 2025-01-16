import './App.css'
import Footer from './components/Footer'
import { Header } from './components/Header'
import { NewsFilters } from './components/NewsFilters'
import NewsList from './components/NewsList'

function App() {

  return (
    <div className='min-h-screen font-inter'>
      <Header />
      <main className='container flex flex-col gap-8 mx-auto px-4 py-6'>
            <NewsFilters />
            <NewsList />
      </main>
      <Footer />
    </div>
  )
}

export default App
