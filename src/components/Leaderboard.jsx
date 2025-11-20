import { useEffect, useState } from 'react'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        // demo: try first game id '1', or just mock if fails
        const res = await fetch(`${base}/api/leaderboard/demo`)
        const data = await res.json()
        setEntries(data)
      } catch (e) {
        setEntries([
          { _id: 'e1', username: 'Rogue', score: 1200 },
          { _id: 'e2', username: 'Nova', score: 980 },
          { _id: 'e3', username: 'Pixel', score: 860 },
        ])
      }
    }
    load()
  }, [])

  return (
    <section id="leaderboard" className="py-16 bg-gradient-to-b from-slate-950 to-black text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Global Leaderboard</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-3 text-sm text-cyan-300/80 border-b border-white/10">
            <div className="col-span-1">#</div>
            <div className="col-span-7 sm:col-span-8">Player</div>
            <div className="col-span-4 sm:col-span-3 text-right">Score</div>
          </div>
          {entries.map((e, i) => (
            <div key={e._id || i} className="grid grid-cols-12 px-4 py-3 items-center border-b border-white/5 hover:bg-white/5">
              <div className="col-span-1 text-cyan-200/80">{i+1}</div>
              <div className="col-span-7 sm:col-span-8 flex items-center gap-3">
                <img className="w-8 h-8 rounded-full ring-2 ring-cyan-400/30" src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(e.username)}`} alt="avatar" />
                <span>{e.username}</span>
              </div>
              <div className="col-span-4 sm:col-span-3 text-right font-semibold">{e.score}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
