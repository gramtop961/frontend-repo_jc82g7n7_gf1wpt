import { useEffect, useState } from 'react'
import { LogIn, Trophy, Gamepad2, User, Menu } from 'lucide-react'

export default function Header({ onLoginClick, user }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all ${scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.5)]" />
          <div className="text-white font-semibold tracking-wide">NeonArcade</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-cyan-200/80">
          <a href="#games" className="hover:text-white transition-colors flex items-center gap-2"><Gamepad2 size={18}/> Games</a>
          <a href="#leaderboard" className="hover:text-white transition-colors flex items-center gap-2"><Trophy size={18}/> Leaderboard</a>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.username)}`} alt="avatar" className="w-8 h-8 rounded-full ring-2 ring-cyan-400/40" />
              <span className="text-cyan-100 text-sm">{user.username}</span>
            </div>
          ) : (
            <button onClick={onLoginClick} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black font-semibold hover:brightness-110 transition"><LogIn size={18}/> Login</button>
          )}
          <button className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white"><Menu size={18}/></button>
        </div>
      </div>
    </header>
  )
}
