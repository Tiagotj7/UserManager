export default function Hero(){
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1>Mentoria em Alta Performance</h1>
        <p>Programas personalizados para atletas, times e líderes — treinos, mentalidade e recuperação.</p>
        <div className="cta-row">
          <a className="btn primary" href="#programs">Ver Programas</a>
          <a className="btn ghost" href="/admin">Sou administrador</a>
        </div>
      </div>
      <div className="hero-visual" aria-hidden />
    </section>
  )
}
