import { useEffect, useState, type ReactNode } from 'react'
import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { ArrowDown, MapPin, Menu, X } from 'lucide-react'
import './styles.css'

type ScheduleEvent = { time: string; title: string; detail?: string; description?: string[]; speakerName?: string; image?: string; imageAlt?: string }
type ScheduleDay = { number: string; date: string; weekday: string; events: ScheduleEvent[] }

const schedulePhotoFrames = [
  'polygon(12% 0, 100% 0, 100% 79%, 96% 79%, 100% 87%, 100% 100%, 0 100%, 0 25%, 8% 17%, 8% 8%)',
  'polygon(0 0, 88% 0, 100% 12%, 100% 100%, 14% 100%, 0 86%)',
  'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 15%, 8% 15%)',
  'polygon(0 0, 100% 0, 100% 82%, 92% 82%, 100% 94%, 100% 100%, 0 100%, 0 18%, 8% 18%)',
  'polygon(0 0, 82% 0, 100% 18%, 100% 100%, 0 100%, 0 70%, 7% 64%, 0 58%)',
  'polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 88%, 0 24%, 6% 18%)',
  'polygon(0 0, 100% 0, 100% 72%, 92% 80%, 100% 88%, 100% 100%, 0 100%)',
  'polygon(0 0, 90% 0, 90% 8%, 100% 8%, 100% 100%, 0 100%, 0 18%, 8% 18%)',
  'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 12%)',
  'polygon(0 0, 100% 0, 100% 90%, 90% 90%, 90% 100%, 0 100%, 0 22%, 10% 22%)',
]

function shufflePhotoFrames(frames: string[]) {
  const shuffled = [...frames]
  let seed = 2026
  for (let index = shuffled.length - 1; index > 0; index--) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const swapIndex = seed % (index + 1)
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }
  return shuffled
}

const randomizedSchedulePhotoFrames = shufflePhotoFrames(schedulePhotoFrames)

const schedule: ScheduleDay[] = [
  {
    number: '01',
    date: '05/10',
    weekday: 'Seg',
    events: [
      {
        time: '19h30 às 20h30',
        title: 'Firewall & Cibersegurança',
        detail: 'Seti Tecnologia',
        speakerName: 'Marcelo da Cruz Silvestrini',
        image: '/images/programacao/foto-marcelo-da-cruz-silvestrini-seti-tecnologia.jpeg',
        imageAlt: 'Marcelo da Cruz Silvestrini, gestor comercial da Seti Tecnologia',
        description: ['Bacharel em Tecnologia em Processamento de Dados pela UNIP - Universidade Paulista (1999). Atua desde 1996 em vendas e consultoria de hardware e software, com experiência consolidada em outsourcing de TI desde 2010. Desde 2020 integra a equipe da Seti Tecnologia, onde iniciou como consultor de vendas e, nos últimos dois anos, exerce a função de gestor comercial.'],
      },
      {
        time: '21h às 22h',
        title: 'Empreendedorismo e Associativismo',
        detail: 'Núcleo Jovem da ACIAA',
        speakerName: 'Fabiano Floriani Garcia',
        image: '/images/programacao/foto-fabiano-floriani-garcia-nucleo-jovem-aciaa.jpeg',
        imageAlt: 'Fabiano Floriani Garcia, palestrante do Núcleo Jovem da ACIAA',
        description: [
          'Fabiano Floriani Garcia é empresário e atua na Parati Ambiental Engenharia e Consultoria Ambiental e Agrícola e na Barra 7 Empreendimentos, onde trabalha como engenheiro. É mestre em Engenharia de Processos, especialista em Georreferenciamento de Imóveis Rurais, engenheiro ambiental e técnico em Agropecuária.',
          'É presidente do Lions Clube de Araquari e fundador e ex-coordenador do Núcleo de Jovens Empreendedores de Araquari. É casado e pai da Isabela.',
        ],
      },
    ],
  },
  {
    number: '02',
    date: '06/10',
    weekday: 'Ter',
    events: [
      {
        time: '19h30 às 20h30',
        title: 'No mundo conectado, onde tudo acontece em segundos, redes confiáveis são a diferença entre travar e avançar',
        detail: 'SinFibra',
        speakerName: 'Danilo Ramos',
        image: '/images/programacao/foto-danilo-ramos-sinfibra.jpeg',
        imageAlt: 'Danilo Ramos, palestrante da SinFibra',
      },
      {
        time: '21h às 22h',
        title: 'O Novo Horizonte da TI: Segurança, Investigação e o Mercado de Elite',
        detail: 'Polícia Científica',
        speakerName: 'Pedro Lana',
        image: '/images/programacao/foto-pedro-lana-policia-cientifica.jpeg',
        imageAlt: 'Pedro Lana, palestrante da Polícia Científica',
      },
    ],
  },
  {
    number: '03',
    date: '07/10',
    weekday: 'Qua',
    events: [
      {
        time: '19h30 às 20h30',
        title: 'Conversando com os dados: do raw data ao QuickSight conversacional - AWS User Group',
        speakerName: 'Paulo Martins',
        image: '/images/programacao/foto-paulo-martins-aws-user-group.jpeg',
        imageAlt: 'Paulo Martins, palestrante do AWS User Group',
        description: [
          'Paulo Martins é Senior Data Scientist no BMW Group | Pixida do Brasil, onde trabalha com pipelines de dados e detecção de anomalias em larga escala na AWS.',
          'Fora do ambiente corporativo, Paulo também é ativo na comunidade tech: organizou recentemente um Summit gratuito de IA que reuniu mais de 400 participantes, ligado à Voluta Soluções Digitais — empresa júnior que fundou na Universidade Federal de Ouro Preto (MG) e que recentemente completou 10 anos.',
        ],
      },
      {
        time: '21h às 22h',
        title: 'Responsabilidade, tecnologia, ética e carreira em um mundo cada vez mais conectado.',
        detail: 'CREA/SC',
        speakerName: 'Ronaldo Azevedo',
        image: '/images/programacao/foto-ronaldo-azevedo-crea-sc.jpeg',
        imageAlt: 'Ronaldo Azevedo, palestrante do CREA/SC',
        description: [
          'Ronaldo Azevedo é engenheiro mecânico, com atuação em automação e sistemas, MBA em Gestão de Projetos pela USP – Fundação Vanzolini e em Engenharia de Custos pelo IBEC.',
          'Com 25 anos de carreira, passou por grandes empresas nacionais e internacionais, liderando equipes e projetos de alta complexidade.',
          'Há mais de 18 anos, é sócio-diretor da Metrios Engenharia, com mais de 100.000 m² de obras conduzidas em empreendimentos públicos e privados.',
          'No CREA-SC, atua desde 2021 e, em 2026, assumiu como Inspetor-Chefe da Regional Joinville.',
          'Sua trajetória une engenharia, gestão, empreendedorismo e liderança, com compromisso com a valorização da profissão e o desenvolvimento da sociedade.',
        ],
      },
    ],
  },
  {
    number: '04',
    date: '08/10',
    weekday: 'Qui',
    events: [
      {
        time: '19h30 às 20h30',
        title: 'Tecnologia, Sistemas e Propriedade Intelectual: Um Tesouro a Ser Protegido!',
        detail: 'Otzar Marcas e Patentes',
        speakerName: 'Anderson Cleis Otzar',
        image: '/images/programacao/foto-anderson-cleis-otzar-marcas-e-patentes.jpeg',
        imageAlt: 'Anderson Cleis Otzar, palestrante da Otzar Marcas e Patentes',
      },
      { time: '21h às 22h', title: 'Tecnologias Rurais', detail: 'Gomes Máquinas', speakerName: 'Geison Souza' },
    ],
  },
  {
    number: '05',
    date: '09/10',
    weekday: 'Sex',
    events: [
      { time: '19h30 às 20h30', title: 'Git fundamentos e conceitos básicos', speakerName: 'Rodrigo Bastos' },
      { time: '21h às 22h', title: 'Git fundamentos e conceitos básicos', speakerName: 'Rodrigo Bastos' },
    ],
  },
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
    <a href="#top" className="relative z-20 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6ed2f2]"><img className="block w-[92px] min-[701px]:w-28" src="/images/logo-sepe.png" alt="SEPE" /></a>
    <button className="relative z-50 block rounded-sm border-0 bg-transparent p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6ed2f2] min-[701px]:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="primary-navigation">{open ? <X size={27} /> : <Menu size={27} />}</button>
    <ul id="primary-navigation" className={`fixed inset-0 z-40 flex h-screen flex-col items-center justify-center gap-[30px] bg-[#062c4b] text-[1.5rem] font-semibold transition-transform ${open ? 'translate-y-0' : '-translate-y-full'} min-[701px]:static min-[701px]:z-auto min-[701px]:h-auto min-[701px]:translate-y-0 min-[701px]:flex-row min-[701px]:gap-[34px] min-[701px]:bg-transparent min-[701px]:text-[.9375rem]`}>
      {links.map(([id, label]) => <li key={id}><a className="rounded-sm opacity-90 transition-colors hover:text-[#6ed2f2] hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6ed2f2]" href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>)}
    </ul>
  </nav>
}

function Hero() {
  return <header id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(0deg,#062c4baa,#062c4b22),url('/images/banner-mobile.png')] bg-cover bg-center px-5 py-[92px] pb-[72px] text-center text-white min-[701px]:flex-row min-[701px]:items-center min-[701px]:bg-[linear-gradient(90deg,#062b4dcc_0%,#062b4d36_58%,#062b4d11),url('/images/banner-desktop.png')] min-[701px]:bg-center min-[701px]:py-0 min-[701px]:text-left">
    <img className="pointer-events-none absolute left-auto right-[-48vw] top-1/2 z-0 block w-[260vw] -translate-y-1/2 opacity-[.15] min-[701px]:right-[-18vw] min-[701px]:z-0 min-[701px]:w-[clamp(650px,75vw,1100px)] min-[701px]:opacity-[.18] min-[1600px]:right-[-12vw]" src="/images/logo-redes-sem-texto.png" alt="" aria-hidden="true" />
    <div className="relative z-10 w-full max-w-[520px] min-[701px]:ml-[5vw] min-[701px]:w-[min(1200px,90%)] min-[701px]:max-w-none min-[701px]:pt-[50px]">
      <p className="section-kicker mb-4 text-[#75d5f3]">REDES DE COMPUTADORES • IFC ARAQUARI</p>
      <h1 className="max-w-[11ch] font-display text-[clamp(3.25rem,15vw,5.5rem)] font-semibold leading-[.98] tracking-[-.055em] min-[701px]:text-[clamp(4rem,8vw,7.4rem)] min-[701px]:tracking-[-.05em]">Semana Acadêmica<br /><span className="text-[#6dd2ef]">2026</span></h1>
      <p className="mt-5 max-w-[38rem] text-[clamp(1.125rem,2vw,1.4rem)] leading-8 text-[#e6f4f8] min-[701px]:mt-6">05 a 09 de outubro de 2026 · confira a programação abaixo</p>
      <a className="mt-8 inline-flex min-h-[3.25rem] items-center gap-6 rounded-[3px] bg-[#4d9ab9aa] px-7 py-3.5 text-[1.0625rem] font-bold leading-5 text-white transition-colors hover:bg-[#4d9ab9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="https://centraldeeventos.ifc.edu.br/sepe2025/" target="_blank" rel="noreferrer">Quero participar <span className="text-[1.45rem]">↗</span></a>
    </div>
    <a href="#programacao" className="absolute bottom-8 left-1/2 rounded-sm p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Ver programação"><ArrowDown size={27} /></a>
  </header>
}

function Programacao() {
  let photoFrameIndex = 0
  return <section id="programacao" className="mx-auto max-w-[1200px] bg-[#f5f7f8] px-[6vw] py-[90px] min-[701px]:px-[5vw] min-[701px]:py-[130px]">
    <div className="text-center"><p className="section-kicker mb-5 text-[#176ca8]">PROGRAMAÇÃO 2026</p><h2 className="section-title">Um pouco de tecnologia,<br /> boas conversas e novas ideias.</h2><p className="section-copy mx-auto mt-5 max-w-[680px] text-[#678095]">Confira as atividades programadas para cada dia do SEPE.</p></div>
    <div className="mt-14 min-[701px]:mt-20">{schedule.map(({ number, date, weekday, events }) => <section className="border-t border-[#dce4ea] py-12 first:border-t-0 min-[701px]:py-16" key={date}>
      <div className="flex flex-col items-center text-center min-[701px]:flex-row min-[701px]:items-end min-[701px]:justify-between min-[701px]:text-left"><div><span className="section-kicker text-[#426f86]">DIA {number}</span><h3 className="mt-3 font-display text-[clamp(2.15rem,4vw,3.35rem)] font-semibold leading-[1.08] tracking-[-.035em]">{date} - {weekday}</h3></div><p className="mt-3 text-base font-medium leading-6 text-[#516e7e] min-[701px]:mb-1 min-[701px]:mt-0">Agenda do dia</p></div>
      {events.length ? <div className="mt-9 min-[701px]:mt-10">{events.map(({ time, title, detail, description, speakerName, image, imageAlt }) => {
        const photoClip = randomizedSchedulePhotoFrames[photoFrameIndex++ % randomizedSchedulePhotoFrames.length]
        return <article className="grid grid-cols-1 items-center gap-7 border-t border-[#dce4ea] py-11 text-center first:border-t-0 min-[701px]:grid-cols-[minmax(300px,40%)_1fr] min-[701px]:gap-[6%] min-[701px]:py-14 min-[701px]:text-left" key={`${date}-${time}-${title}`}>
        <div className="relative h-[320px] min-h-[320px] bg-gradient-to-br from-[#8be1f5] via-[#3f9fbd] to-[#123d5b] shadow-[0_18px_45px_rgba(6,44,75,0.18)] min-[701px]:h-[390px] min-[701px]:min-h-[390px]" style={{ clipPath: photoClip }}>
          <div className="absolute inset-[3px] overflow-hidden bg-[#e9f2f5] text-center font-display text-[2.15rem] font-bold leading-[.9] text-[#4d98b3]" style={{ clipPath: photoClip }}>
            {image ? <img className="h-full w-full object-cover" src={image} alt={imageAlt ?? title} /> : <div className="flex h-full items-center justify-center"><span>SEPE<br /><b className="text-[1.3rem] text-[#168cd2]">2026</b></span></div>}
            <div aria-hidden="true" className="absolute left-[14%] top-[5%] h-[2px] w-12 bg-[#8be1f5]/80" />
            {speakerName && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07111c]/95 via-[#07111c]/70 to-transparent px-5 pb-5 pt-16 text-left font-display text-[1.25rem] font-bold uppercase leading-[1.15] tracking-[.01em] text-white min-[701px]:px-6 min-[701px]:pb-6 min-[701px]:text-[1.45rem]">{speakerName}</div>}
          </div>
        </div>
        <div className="flex flex-col items-center min-[701px]:items-start"><p className="event-time mb-3 text-[#176ca8]"><Mark>{time}</Mark></p><h4 className="event-title max-w-[640px]">{title}</h4>{detail && <p className="event-detail mt-5 max-w-[670px] text-left text-[#52697d]">{detail}</p>}{description && <div className="event-copy mt-5 max-w-[670px] text-left text-[#52697d]">{description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>}</div>
      </article>
      })}</div> : <p className="mt-8 text-center text-[1.0625rem] leading-8 text-[#617b8c]">Sem atividades informadas.</p>}
    </section>)}</div>
  </section>
}

function Sponsors() {
  return <section id="apoiadores" className="bg-[#f5f7f8] px-[6vw] py-[90px] min-[701px]:py-[130px]"><div className="mx-auto max-w-[1200px]"><div className="text-center"><p className="section-kicker mb-5 text-[#176ca8]">APOIADORES 2026</p><h2 className="section-title">Quem ajuda o SEPE<br />a acontecer.</h2><p className="section-copy mx-auto mt-5 max-w-[680px] text-[#678095]">Ainda estamos fechando as parcerias. Em breve os nomes aparecem aqui.</p></div><div className="mx-auto mt-14 grid max-w-[1000px] grid-cols-3 gap-[26px_13px] min-[701px]:mt-20 min-[701px]:grid-cols-4 min-[701px]:gap-6"><div className="col-span-full hidden" />{Array.from({ length: 8 }, (_, index) => <div className="flex min-h-[115px] w-full flex-col items-center justify-center gap-2 border border-dashed border-[#a9c8d5] bg-[#f4f8f9] px-2 text-center text-[#6990a1]" key={index}><span className="font-display text-base font-semibold min-[701px]:text-[1.125rem]">Apoiador</span><small className="text-[.6875rem] font-bold leading-4 tracking-[.12em] text-[#3da4c4]">LOGO EM BREVE</small></div>)}</div></div></section>
}

function LegacyLocation() {
  return <section id="local" className="bg-[linear-gradient(90deg,#062c4bef,#062c4bcc),url('/images/campus-ifc-1.jpg')] bg-cover bg-center px-[6vw] py-[90px] text-white min-[701px]:py-[130px]"><div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[45px] min-[701px]:grid-cols-[1fr_1.08fr] min-[701px]:gap-[9%]"><div><p className="section-kicker mb-5 text-[#71d0ee]">ONDE VAI SER</p><h2 className="section-title">A gente se encontra<br />no IFC Araquari.</h2><p className="section-copy mt-5 max-w-[470px] text-[#e2eef2]">O evento acontece no Campus Araquari. Se você ainda não conhece o lugar, fica aqui o mapa para ajudar.</p><div className="mt-7 flex items-start gap-3 text-[1.0625rem] leading-8 text-[#d6e8ee] min-[701px]:text-[1.125rem]"><MapPin className="mt-1.5 w-5 shrink-0 text-[#6dd2ef]" /> <span>Rodovia BR 280, km 27<br />Araquari - SC</span></div></div><div className="border-[10px] border-white/[.09] shadow-2xl"><iframe className="block h-[290px] w-full border-0 min-[701px]:h-[370px]" title="Mapa do IFC Campus Araquari" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.768343468094!2d-48.738091057593266!3d-26.394939728746323!2m3!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deb5609af7afc5%3A0x34c75ce16022aa6a!2sInstituto%20Federal%20Catarinense%20-%20Campus%20Araquari!5e0!3m2!1spt-BR!2sbr!4v1694950000000!5m2!1spt-BR!2sbr" loading="lazy" /></div></div></section>
}

function Organization() { return <section id="organizacao" className="bg-[#f5f7f8] px-[6vw] py-[90px] text-center min-[701px]:py-[130px]"><div className="mx-auto max-w-[1200px]"><p className="section-kicker mb-5 text-[#176ca8]">QUEM ESTÁ FAZENDO</p><h2 className="section-title">Feito pelos graduandos<br />de Redes de Computadores.</h2><div className="mt-10 flex flex-wrap items-center justify-center gap-[50px]"><img className="max-h-[95px] max-w-[200px] object-contain" src="/images/logo-ifc.png" alt="Instituto Federal Catarinense" /><img className="max-h-[95px] max-w-[200px] object-contain" src="/images/logo-redes-sem-texto.png" alt="CST Redes de Computadores" /></div></div></section> }

function App() { return <div className="scroll-smooth bg-[#f5f7f8] font-sans text-[#102b43]"><Navbar /><Hero /><main><Programacao /><Sponsors /><Location /><Organization /></main><footer className="flex flex-col gap-2 bg-[#062c4b] px-[8vw] py-6 text-center text-base leading-6 text-[#bdd1db] min-[701px]:flex-row min-[701px]:justify-between"><span>SEPE 2026</span><span>Organizado pelos graduandos de Redes de Computadores</span></footer></div> }

function Location() {
  const [activeImage, setActiveImage] = useState(0)
  const mapUrl = 'https://www.google.com/maps?q=Instituto%20Federal%20Catarinense%20-%20Campus%20Araquari%2C%20Araquari%20-%20SC&output=embed'
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage(current => (current + 1) % 3)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [])

  return <section id="local" className="relative overflow-hidden px-[6vw] py-[90px] text-white min-[701px]:py-[130px]">
    <div aria-hidden="true" className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${activeImage === 0 ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: "url('/images/campus-ifc-1.jpg')" }} />
    <div aria-hidden="true" className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${activeImage === 1 ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: "url('/images/campus-ifc-2.jpg')" }} />
    <div aria-hidden="true" className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${activeImage === 2 ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: "url('/images/campus-ifc-3.jpg')" }} />
    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,#062c4bef,#062c4bcc)]" />
    <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[50px] min-[701px]:grid-cols-[1fr_1.08fr] min-[701px]:gap-[9%]"><div><p className="section-kicker mb-5 text-[#71d0ee]">ONDE VAI SER</p><h2 className="section-title">A gente se encontra<br />no IFC Araquari.</h2><p className="section-copy mt-5 max-w-[470px] text-[#e2eef2]">O evento acontece no Campus Araquari. Se você ainda não conhece o lugar, fica aqui o mapa para ajudar.</p><div className="mt-7 flex items-start gap-3 text-[1.0625rem] leading-8 text-[#d6e8ee] min-[701px]:text-[1.125rem]"><MapPin className="mt-1.5 w-5 shrink-0 text-[#6dd2ef]" /> <span>Rodovia BR 280, km 27<br />Araquari - SC</span></div></div><div className="border-[10px] border-white/[.09] shadow-2xl"><iframe className="block h-[290px] w-full border-0 min-[701px]:h-[370px]" title="Mapa do IFC Campus Araquari" src={mapUrl} loading="lazy" /></div></div>
  </section>
}

export const createRoot = ViteReactSSG(<App />)
