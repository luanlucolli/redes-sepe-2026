import { useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, MapPin, Menu, X } from 'lucide-react'
import './styles.css'

type Placeholder = { number: string; person: string; title: string }

const schedulePlaceholders: Placeholder[] = [
  { number: '01', person: 'Nome a definir', title: 'Tema da palestra' },
  { number: '02', person: 'Nome a definir', title: 'Tema da palestra' },
  { number: '03', person: 'Nome a definir', title: 'Tema da palestra' },
  { number: '04', person: 'Nome a definir', title: 'Tema da palestra' },
]

function Mark({ children }: { children: ReactNode }) {
  return <span className="relative z-0 inline-block after:absolute after:inset-x-[-3px] after:bottom-0.5 after:-z-10 after:h-[.42em] after:bg-[#72c8e7]/70">{children}</span>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [['programacao', 'Programação'], ['apoiadores', 'Apoiadores'], ['local', 'Local'], ['organizacao', 'Organização']]

  return <nav className={`fixed inset-x-0 top-0 z-50 flex h-[68px] items-center justify-between px-[6vw] text-white transition-colors min-[701px]:h-[82px] min-[701px]:px-[5vw] ${scrolled ? 'bg-[#05233d]/95 shadow-lg' : 'bg-transparent'}`}>
    <a href="#top" className="relative z-20"><img className="block w-[92px] min-[701px]:w-28" src="/images/SEPE.png" alt="SEPE" /></a>
    <button className="relative z-50 block border-0 bg-transparent text-white min-[701px]:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X size={27} /> : <Menu size={27} />}</button>
    <ul className={`fixed inset-0 z-40 flex h-screen flex-col items-center justify-center gap-[30px] bg-[#062c4b] text-[1.5rem] font-semibold transition-transform ${open ? 'translate-y-0' : '-translate-y-full'} min-[701px]:static min-[701px]:z-auto min-[701px]:h-auto min-[701px]:translate-y-0 min-[701px]:flex-row min-[701px]:gap-[34px] min-[701px]:bg-transparent min-[701px]:text-[.88rem]`}>
      {links.map(([id, label]) => <li key={id}><a className="opacity-85 transition-colors hover:text-[#6ed2f2] hover:opacity-100" href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>)}
    </ul>
  </nav>
}

function Hero() {
  return <header id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(0deg,#062c4baa,#062c4b22),url('/images/banner-mobile.png')] bg-cover bg-center px-5 py-[92px] pb-[72px] text-center text-white min-[701px]:flex-row min-[701px]:items-center min-[701px]:bg-[linear-gradient(90deg,#062b4dcc_0%,#062b4d36_58%,#062b4d11),url('/images/foto-banner.png')] min-[701px]:bg-center min-[701px]:py-0 min-[701px]:text-left">
    <img className="pointer-events-none absolute left-auto right-[-48vw] top-1/2 z-0 block w-[260vw] -translate-y-1/2 opacity-[.15] min-[701px]:right-[-18vw] min-[701px]:z-0 min-[701px]:w-[clamp(650px,75vw,1100px)] min-[701px]:opacity-[.18] min-[1600px]:right-[-12vw]" src="/images/redes-logo-sem-texto.png" alt="" aria-hidden="true" />
    <div className="relative z-10 w-full max-w-[520px] min-[701px]:ml-[5vw] min-[701px]:w-[min(1200px,90%)] min-[701px]:max-w-none min-[701px]:pt-[50px]">
      <p className="mb-5 text-xs font-bold leading-4 tracking-[.22em] text-[#75d5f3] min-[701px]:text-sm">REDES DE COMPUTADORES • IFC ARAQUARI</p>
      <h1 className="max-w-[11ch] [font-family:'Space_Grotesk'] text-[clamp(3.25rem,15vw,5.5rem)] font-semibold leading-[.92] tracking-[-.08em] min-[701px]:text-[clamp(4rem,8vw,7.4rem)]">Semana Acadêmica<br /><span className="text-[#6dd2ef]">2026</span></h1>
      <p className="mt-6 text-[clamp(1.05rem,2vw,1.35rem)] leading-7 text-[#e6f4f8] min-[701px]:mt-7">Em breve a gente conta as datas</p>
      <a className="mt-9 inline-flex items-center gap-6 rounded-[3px] bg-[#4d9ab9aa] px-6 py-4 text-base font-bold leading-5 text-white" href="https://centraldeeventos.ifc.edu.br/sepe2025/" target="_blank" rel="noreferrer">Quero participar <span className="text-[1.35rem]">↗</span></a>
    </div>
    <a href="#programacao" className="absolute bottom-8 left-1/2 animate-bounce text-white" aria-label="Ver programação"><ArrowDown size={27} /></a>
  </header>
}

function Programacao() {
  return <section id="programacao" className="mx-auto max-w-[1200px] px-[6vw] py-20 min-[701px]:px-[5vw] min-[701px]:py-[120px]">
    <div className="text-center"><p className="mb-5 text-xs font-bold leading-4 tracking-[.22em] text-[#176ca8] min-[701px]:text-sm">PROGRAMAÇÃO 2026</p><h2 className="[font-family:'Space_Grotesk'] text-[clamp(2.15rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-.05em]">Um pouco de tecnologia,<br /> boas conversas e novas ideias.</h2><p className="mx-auto mt-5 max-w-[650px] text-base leading-7 text-[#678095]">A programação ainda está sendo montada. Quando estiver pronta, a gente coloca tudo aqui.</p></div>
    <div className="mt-[45px] min-[701px]:mt-20">{schedulePlaceholders.map(({ number, person, title }) => <article className="grid grid-cols-1 items-center gap-[26px] border-t border-[#dce4ea] py-[45px] text-center first:border-t-0 min-[701px]:grid-cols-[minmax(250px,35%)_1fr] min-[701px]:gap-[7%] min-[701px]:py-14 min-[701px]:text-left" key={number}>
      <div className="flex min-h-[240px] items-center justify-center border border-dashed border-[#9fc2d1] bg-[#e9f2f5] text-center [font-family:'Space_Grotesk'] text-[2rem] font-bold leading-[.9] text-[#4d98b3] min-[701px]:min-h-[280px]"><span>SEPE<br /><b className="text-[1.2rem] text-[#168cd2]">2026</b></span></div>
      <div className="flex flex-col items-center min-[701px]:items-start"><span className="[font-family:'Space_Grotesk'] text-sm font-semibold tracking-[.12em] text-[#7bb9d3] min-[701px]:text-base">{number}</span><h3 className="mt-3 max-w-[620px] [font-family:'Space_Grotesk'] text-[clamp(1.65rem,3vw,2.65rem)] font-semibold leading-[1.08] tracking-[-.045em]">{person}</h3><p className="text-base font-bold text-[#176ca8]"><Mark>Em construção</Mark></p><p className="mt-3 text-sm font-semibold leading-6 text-[#678095]">Dia e horário a definir</p><p className="mt-5 max-w-[670px] text-left text-base leading-7 text-[#52697d]">{title}. Assim que tivermos as informações, atualizamos esta parte.</p><span className="mt-5 text-sm leading-6 text-[#7892a2]">A gente conta mais em breve</span></div>
    </article>)}</div>
  </section>
}

function Sponsors() {
  return <section id="apoiadores" className="bg-white px-5 py-20 min-[701px]:py-[115px]"><div className="mx-auto max-w-[1200px] min-[701px]:px-[5vw]"><div className="text-center"><p className="mb-5 text-xs font-bold leading-4 tracking-[.22em] text-[#176ca8] min-[701px]:text-sm">APOIADORES 2026</p><h2 className="[font-family:'Space_Grotesk'] text-[clamp(2.15rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-.05em]">Quem ajuda o SEPE<br />a acontecer.</h2><p className="mx-auto mt-5 max-w-[650px] text-base leading-7 text-[#678095]">Ainda estamos fechando as parcerias. Em breve os nomes aparecem aqui.</p></div><div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-3 gap-[26px_13px] min-[701px]:mt-[70px] min-[701px]:grid-cols-4 min-[701px]:gap-6"><div className="col-span-full hidden" />{Array.from({ length: 8 }, (_, index) => <div className="flex min-h-[105px] w-full flex-col items-center justify-center gap-2 border border-dashed border-[#a9c8d5] bg-[#f4f8f9] px-2 text-center text-[#6990a1]" key={index}><span className="[font-family:'Space_Grotesk'] text-sm font-semibold min-[701px]:text-base">Apoiador</span><small className="text-[.6rem] font-bold leading-3 tracking-[.15em] text-[#3da4c4]">LOGO EM BREVE</small></div>)}</div></div></section>
}

function LegacyLocation() {
  return <section id="local" className="bg-[linear-gradient(90deg,#062c4bef,#062c4bcc),url('/images/ifc-local.jpg')] bg-cover bg-center px-5 py-20 text-white min-[701px]:py-[110px]"><div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[45px] min-[701px]:px-[5vw] min-[701px]:grid-cols-[1fr_1.08fr] min-[701px]:gap-[9%]"><div><p className="mb-5 text-xs font-bold leading-4 tracking-[.22em] text-[#71d0ee] min-[701px]:text-sm">ONDE VAI SER</p><h2 className="[font-family:'Space_Grotesk'] text-[clamp(2.15rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-.05em]">A gente se encontra<br />no IFC Araquari.</h2><p className="mt-6 max-w-[440px] text-base leading-7 text-[#d6e8ee]">O evento acontece no Campus Araquari. Se você ainda não conhece o lugar, fica aqui o mapa para ajudar.</p><div className="mt-7 flex items-start gap-2.5 text-sm leading-6 text-[#c9e0e8]"><MapPin className="w-5 shrink-0 text-[#6dd2ef]" /> Rodovia BR 280, km 27<br />Araquari - SC</div></div><div className="border-[10px] border-white/[.09] shadow-2xl"><iframe className="block h-[270px] w-full border-0 min-[701px]:h-[350px]" title="Mapa do IFC Campus Araquari" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.768343468094!2d-48.738091057593266!3d-26.394939728746323!2m3!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deb5609af7afc5%3A0x34c75ce16022aa6a!2sInstituto%20Federal%20Catarinense%20-%20Campus%20Araquari!5e0!3m2!1spt-BR!2sbr!4v1694950000000!5m2!1spt-BR!2sbr" loading="lazy" /></div></div></section>
}

function Organization() { return <section id="organizacao" className="bg-[#f5f7f8] px-5 py-[75px] text-center"><div className="mx-auto max-w-[1200px] min-[701px]:px-[5vw]"><p className="mb-5 text-xs font-bold leading-4 tracking-[.22em] text-[#176ca8] min-[701px]:text-sm">QUEM ESTÁ FAZENDO</p><h2 className="[font-family:'Space_Grotesk'] text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-.05em]">Feito pelos graduandos<br />de Redes de Computadores.</h2><div className="mt-8 flex flex-wrap items-center justify-center gap-[45px]"><img className="max-h-[85px] max-w-[180px] object-contain" src="/images/ifc.png" alt="Instituto Federal Catarinense" /><img className="max-h-[85px] max-w-[180px] object-contain" src="/images/LOGO-REDES.png" alt="CST Redes de Computadores" /></div></div></section> }

function App() { return <div className="scroll-smooth bg-[#f5f7f8] font-sans text-[#102b43]"><Navbar /><Hero /><main><Programacao /><Sponsors /><Location /><Organization /></main><footer className="flex flex-col gap-2 bg-[#062c4b] px-[8vw] py-[22px] text-center text-xs leading-5 tracking-[.04em] text-[#a9c5d1] min-[701px]:flex-row min-[701px]:justify-between"><span>SEPE 2026</span><span>Organizado pelos graduandos de Redes de Computadores</span></footer></div> }

function Location() {
  const mapUrl = 'https://www.google.com/maps?q=Instituto%20Federal%20Catarinense%20-%20Campus%20Araquari%2C%20Araquari%20-%20SC&output=embed'
  return <section id="local" className="bg-[linear-gradient(90deg,#062c4bef,#062c4bcc),url('/images/ifc-local.jpg')] bg-cover bg-center px-5 py-20 text-white min-[701px]:py-[110px]"><div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[45px] min-[701px]:px-[5vw] min-[701px]:grid-cols-[1fr_1.08fr] min-[701px]:gap-[9%]"><div><p className="mb-5 text-xs font-bold leading-4 tracking-[.22em] text-[#71d0ee] min-[701px]:text-sm">ONDE VAI SER</p><h2 className="[font-family:'Space_Grotesk'] text-[clamp(2.15rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-.05em]">A gente se encontra<br />no IFC Araquari.</h2><p className="mt-6 max-w-[440px] text-base leading-7 text-[#d6e8ee]">O evento acontece no Campus Araquari. Se você ainda não conhece o lugar, fica aqui o mapa para ajudar.</p><div className="mt-7 flex items-start gap-2.5 text-sm leading-6 text-[#c9e0e8]"><MapPin className="w-5 shrink-0 text-[#6dd2ef]" /> Rodovia BR 280, km 27<br />Araquari - SC</div></div><div className="border-[10px] border-white/[.09] shadow-2xl"><iframe className="block h-[270px] w-full border-0 min-[701px]:h-[350px]" title="Mapa do IFC Campus Araquari" src={mapUrl} loading="lazy" /></div></div></section>
}

createRoot(document.getElementById('root')!).render(<App />)
