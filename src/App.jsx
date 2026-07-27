import { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP } from './lib/gsap'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import marijnAanHetWerk from './assets/marijn-aan-het-werk.png'

const EMAIL = 'marijn@vandegroep.nl'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Zet een rand onder de balk zodra er gescrold wordt. */
function useStuckBar() {
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return stuck
}

function Dot() {
  return <span className="btn__dot" />
}

function Btn({ href, variant, children }) {
  const cls = ['btn', variant && `btn--${variant}`].filter(Boolean).join(' ')
  return (
    <a className={cls} href={href}>
      <span aria-hidden className="btn__fill" />
      <Dot />
      {children}
    </a>
  )
}

function Header({ stuck }) {
  return (
    <header className={`bar${stuck ? ' is-stuck' : ''}`} id="bar">
      <div className="shell bar__in">
        <a className="mark" href="#top">
          MvdG<span>.</span>
        </a>
        <Btn href={`mailto:${EMAIL}`}>Check een datum</Btn>
      </div>
    </header>
  )
}

function Hero() {
  const container = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from('.tag', { y: 24, autoAlpha: 0, duration: 0.6 })
        .from(
          '.hero__name .line-mask__inner',
          { yPercent: 110, duration: 1.2, stagger: 0.1 },
          '-=0.3',
        )
        .from('.hero__thesis', { y: 28, autoAlpha: 0, duration: 0.8 }, '-=0.5')
        .from('.hero__body', { y: 28, autoAlpha: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__cta', { y: 20, autoAlpha: 0, duration: 0.7 }, '-=0.55')
        .from('.slot--photo', { yPercent: 8, autoAlpha: 0, duration: 1.2 }, '-=0.9')
        .from('.slot__img', { yPercent: 14, scale: 1.2, duration: 1.2 }, '<')

      gsap.from('.meta-row p', {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.meta-row', start: 'top 92%', once: true },
      })
    },
    { scope: container },
  )

  return (
    <section className="hero shell" id="top" ref={container}>
      <div className="hero__grid">
        <div>
          <p className="tag">Freelance kok — Amersfoort &amp; omgeving</p>
          <h1 className="hero__name">
            <span className="line-mask">
              <span className="line-mask__inner">Marijn</span>
            </span>
            <em className="line-mask">
              <span className="line-mask__inner">van de</span>
            </em>
            <span className="line-mask">
              <span className="line-mask__inner">Groep</span>
            </span>
          </h1>
          <p className="hero__thesis">Ik kook in jouw keuken.</p>
          <p className="hero__body">
            Privédiners, evenementen en keukenondersteuning. Ik stel het menu
            samen, doe de boodschappen, kook het diner en laat de keuken schoon
            achter. Jij schuift aan bij je gasten.
          </p>
          <div className="hero__cta">
            <Btn href={`mailto:${EMAIL}`}>Check een datum</Btn>
            <Btn href="#menu" variant="ghost">
              Bekijk een menu
            </Btn>
          </div>
        </div>

        <figure className="slot slot--tall slot--photo" style={{ margin: 0 }}>
          <img
            className="slot__img"
            src={marijnAanHetWerk}
            alt="Marijn van de Groep aan het werk in de keuken"
          />
        </figure>
      </div>

      <div className="meta-row">
        <p className="tag">12 jaar in professionele keukens</p>
        <p className="tag">2 – 120 gasten</p>
        <p className="tag">Boekbaar vanaf augustus 2026</p>
      </div>
    </section>
  )
}

const SERVICES = [
  {
    name: 'Privédining',
    desc: 'Diner aan je eigen tafel, bereid in je eigen keuken. Twee tot veertien personen, drie tot zes gangen.',
    price: 'vanaf €65 p.p.',
  },
  {
    name: 'Evenementen & feesten',
    desc: 'Verjaardagen, bruiloften en bedrijfsborrels. Walking dinner, buffet of uitgeserveerd, tot 120 gasten.',
    price: 'op aanvraag',
  },
  {
    name: 'Keukenondersteuning',
    desc: 'Extra handen voor restaurants en cateraars. Mise en place, op de lijn of als vervangend chef, per dag of per service.',
    price: 'dagtarief €340',
  },
  {
    name: 'Menuontwikkeling',
    desc: 'Nieuwe gerechten, doorgerekend en getest, met werkbladen die je team zonder mij kan draaien.',
    price: 'vanaf €850',
  },
]

function Services() {
  const container = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.services__head > *', {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: container.current, start: 'top 78%', once: true },
      })

      gsap.from('.svc-list .svc', {
        y: 48,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: { each: 0.08 },
        scrollTrigger: { trigger: '.svc-list', start: 'top 80%', once: true },
      })
    },
    { scope: container },
  )

  return (
    <section className="services shell" id="work" ref={container}>
      <div className="services__head">
        <p className="tag tag--flame">Wat ik doe</p>
        <h2 className="h2">Vier manieren om mij in te zetten</h2>
        <p className="lede">
          Elke klus begint met een kort gesprek over je gasten, je keuken en je
          budget. Het menu volgt daaruit.
        </p>
      </div>

      <ul className="svc-list">
        {SERVICES.map((s) => (
          <li className="svc" key={s.name}>
            <h3 className="svc__name">{s.name}</h3>
            <p className="svc__desc">{s.desc}</p>
            <p className="svc__price">{s.price}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

const BAG = [
  'Messen, pannen en klein materiaal',
  'Alle ingrediënten, die ochtend vers gehaald',
  'Een geschreven menukaart voor op tafel',
  'Doeken, schorten en mijn eigen vuilniszakken',
  'Een keuken die schoner is dan ik hem aantrof',
]

const KITCHEN = [
  'Vier pitten en een werkende oven',
  'Een plank koelkastruimte voor die dag',
  'Borden, glazen en bestek voor je gasten',
  'Een gootsteen, een stopcontact en plek voor de vuilnis',
  'Twee vierkante meter werkblad dat ik van mezelf mag noemen',
]

function Kit() {
  const container = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.kit__head > *', {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: container.current, start: 'top 78%', once: true },
      })

      gsap.from('.col__title', {
        y: 20,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.kit__grid', start: 'top 78%', once: true },
      })

      gsap.from('.checklist li', {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'expo.out',
        stagger: { each: 0.06, from: 'start' },
        scrollTrigger: { trigger: '.kit__grid', start: 'top 72%', once: true },
      })
    },
    { scope: container },
  )

  return (
    <section className="kit on-dark" id="how" ref={container}>
      <div className="shell">
        <div className="kit__head">
          <p className="tag">Voor de dag zelf</p>
          <h2 className="h2">Wat ik meebreng, wat jij nodig hebt</h2>
          <p className="kit__note">
            De meeste thuiskeukens zijn zo al klaar. Mist er iets aan de
            rechterkant, laat het op tijd weten — ik kan bijna overal omheen
            werken.
          </p>
        </div>

        <div className="kit__grid">
          <div>
            <div className="col__title">
              <span className="col__num">01</span>
              <h3 className="col__h">In mijn tas</h3>
            </div>
            <ul className="checklist">
              {BAG.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="col__title">
              <span className="col__num">02</span>
              <h3 className="col__h">In jouw keuken</h3>
            </div>
            <ul className="checklist checklist--open">
              {KITCHEN.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const COURSES = [
  { label: 'Voor', dish: 'Groene asperge, bruine boter, geroosterde hazelnoot' },
  { label: 'Tussen', dish: 'Noordzeekabeljauw, mosselen, dille, nieuwe aardappel' },
  { label: 'Hoofd', dish: 'Langzaam gegaarde lamsschouder, jonge wortel, daslook' },
  { label: 'Zoet', dish: 'Karnemelk, gepocheerde rabarber, zuring' },
]

function Menu() {
  const container = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.menu__intro > *', {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: container.current, start: 'top 75%', once: true },
      })

      gsap.fromTo(
        '.menu .card',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: '.menu .card', start: 'top 78%', once: true },
        },
      )

      gsap.from('.courses li', {
        y: 20,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.courses', start: 'top 68%', once: true },
      })
    },
    { scope: container },
  )

  return (
    <section className="menu shell" id="menu" ref={container}>
      <div className="menu__grid">
        <div className="menu__intro">
          <p className="tag tag--flame">Een recent menu</p>
          <h2 className="h2">In juni gekookt, voor acht</h2>
          <p className="lede">
            Ik schrijf elk menu rond wat die week goed is en wat jij echt lekker
            vindt. Dit was een verjaardagsdiner in Amersfoort.
          </p>
          <div className="hero__cta">
            <Btn href={`mailto:${EMAIL}`} variant="ghost">
              Vraag een voorstel aan
            </Btn>
          </div>
        </div>

        <div className="card">
          <div className="card__top">
            <p className="tag" style={{ margin: 0 }}>
              Menu — juni
            </p>
            <p className="tag" style={{ margin: 0 }}>
              Vier gangen
            </p>
          </div>
          <ol className="courses">
            {COURSES.map((c) => (
              <li key={c.label}>
                <span>{c.label}</span>
                {c.dish}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const container = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.contact__intro > *', {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: container.current, start: 'top 78%', once: true },
      })

      gsap.from('.dl > div', {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.dl', start: 'top 80%', once: true },
      })
    },
    { scope: container },
  )

  return (
    <section className="contact shell" id="contact" ref={container}>
      <div className="contact__grid">
        <div className="contact__intro">
          <p className="tag tag--flame">Neem contact op</p>
          <h2 className="h2">Laat me de datum en het aantal gasten weten.</h2>
          <p className="lede">
            Een eerste reactie duurt meestal een dag. Is de datum dichtbij, bel
            dan liever — ik neem op tussen de services door.
          </p>
        </div>

        <dl className="dl">
          <div>
            <dt>E-mail</dt>
            <dd>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt>Telefoon</dt>
            <dd>
              <a href="tel:+31600000000">+31 6 00 00 00 00</a>
            </dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd>
              <a href="https://instagram.com/">@marijnkookt</a>
            </dd>
          </div>
          <div>
            <dt>Werkgebied</dt>
            <dd>Amersfoort en 60 km daaromheen</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

function Footer() {
  const container = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.foot__in > *', {
        y: 16,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: container.current, start: 'top 92%', once: true },
      })
    },
    { scope: container },
  )

  return (
    <footer className="foot" ref={container}>
      <div className="shell foot__in">
        <p className="tag">Marijn van de Groep — Freelance kok</p>
        <p className="tag">KvK 00000000 · BTW NL000000000B00</p>
      </div>
    </footer>
  )
}

export default function App() {
  const stuck = useStuckBar()
  useSmoothScroll()

  return (
    <>
      <a className="skip" href="#main">
        Naar inhoud
      </a>

      <Header stuck={stuck} />

      <main id="main">
        <Hero />
        <Services />
        <Kit />
        <Menu />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
