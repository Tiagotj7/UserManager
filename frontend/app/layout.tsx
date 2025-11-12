import '../styles/globals.css'
import type { ReactNode } from 'react'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Impact Clone',
  description: 'Clone estilizado – Next + PHP CRUD'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
        <footer className="footer">© {new Date().getFullYear()} Impact Clone</footer>
      </body>
    </html>
  )
}
