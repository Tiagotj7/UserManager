import Link from 'next/link'

export default function Navbar(){
  return (
    <header className="site-header">
      <div className="logo">Impact<span className="accent">X</span></div>
      <nav>
        <Link href="/">Início</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  )
}
