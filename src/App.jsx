import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import GameGrid from './components/GameGrid'
import Leaderboard from './components/Leaderboard'
import SoundFX from './components/SoundFX'

function App() {
  const [user, setUser] = useState(null)

  const ensureUser = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const username = 'Guest' + Math.floor(Math.random()*1000)
      const res = await fetch(`${base}/api/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username }) })
      const data = await res.json()
      setUser(data)
    } catch (e) {
      setUser({ username: 'Guest' })
    }
  }

  useEffect(() => {
    ensureUser()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      <SoundFX />
      <Header user={user} onLoginClick={ensureUser} />
      <main>
        <Hero />
        <GameGrid />
        <Leaderboard />
      </main>
      <footer className="py-10 border-t border-white/10 bg-black/70">
        <div className="mx-auto max-w-6xl px-6 text-center text-cyan-300/70 text-sm">© {new Date().getFullYear()} NeonArcade — Play responsibly.</div>
      </footer>
    </div>
  )
}

export default App
