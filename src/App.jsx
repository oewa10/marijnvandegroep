import { useEffect, useRef, useState } from 'react'
import marijnAanHetWerk from './assets/marijn-aan-het-werk.png'

const EMAIL = 'marijn@vandegroep.nl'

/* Voegt .is-in toe zodra een .rise/.stagger element in beeld komt. */
function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = document.querySelectorAll('.rise, .stagger')

    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

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

function Header({ stuck }) {
  return (
    <header className={`bar${stuck ? ' is-stuck' : ''}`} id="bar">
      <div className="shell bar__in">
        <a className="mark" href="#top">
          MvdG<span>.</span>
        </a>
        <a className="btn btn--ghost" href={`mailto:${EMAIL}`}>
          <Dot />
          Check een datum
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero shell" id="top">
      <div className="hero__grid">
        <div className="stagger">
          <p className="tag">Freelance kok — Amersfoort &amp; omgeving</p>
          <h1 className="hero__name">
            Marijn<em>van de</em>Groep
          </h1>
          <p className="hero__thesis">Ik kook in jouw keuken.</p>
          <p className="hero__body">
            Privédiners, evenementen en keukenondersteuning. Ik stel het menu
            samen, doe de boodschappen, kook het diner en laat de keuken schoon
            achter. Jij schuift aan bij je gasten.
          </p>
          <div className="hero__cta">
            <a className="btn" href={`mailto:${EMAIL}`}>
              <Dot />
              Check een datum
            </a>
            <a className="btn btn--ghost" href="#menu">
              <Dot />
              Bekijk een menu
            </a>
          </div>
        </div>

        <figure className="slot slot--tall slot--photo rise" style={{ margin: 0 }}>
          <img
            className="slot__img"
            src={marijnAanHetWerk}
            alt="Marijn van de Groep aan het werk in de keuken"
          />
        </figure>
      </div>

      <div className="meta-row rise">
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
  return (
    <section className="services shell" id="work">
      <div className="services__head rise">
        <p className="tag tag--flame">Wat ik doe</p>
        <h2 className="h2">Vier manieren om mij in te zetten</h2>
        <p className="lede">
          Elke klus begint met een kort gesprek over je gasten, je keuken en je
          budget. Het menu volgt daaruit.
        </p>
      </div>

      <ul className="svc-list">
        {SERVICES.map((s) => (
          <li className="svc rise" key={s.name}>
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
  return (
    <section className="kit on-dark" id="how">
      <div className="shell">
        <div className="kit__head rise">
          <p className="tag">Voor de dag zelf</p>
          <h2 className="h2">Wat ik meebreng, wat jij nodig hebt</h2>
          <p className="kit__note">
            De meeste thuiskeukens zijn zo al klaar. Mist er iets aan de
            rechterkant, laat het op tijd weten — ik kan bijna overal omheen
            werken.
          </p>
        </div>

        <div className="kit__grid">
          <div className="rise">
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

          <div className="rise">
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
  return (
    <section className="menu shell" id="menu">
      <div className="menu__grid">
        <div className="rise">
          <p className="tag tag--flame">Een recent menu</p>
          <h2 className="h2">In juni gekookt, voor acht</h2>
          <p className="lede">
            Ik schrijf elk menu rond wat die week goed is en wat jij echt lekker
            vindt. Dit was een verjaardagsdiner in Amersfoort.
          </p>
          <div className="hero__cta">
            <a className="btn btn--ghost" href={`mailto:${EMAIL}`}>
              <Dot />
              Vraag een voorstel aan
            </a>
          </div>
        </div>

        <div className="card rise">
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
  return (
    <section className="contact shell" id="contact">
      <div className="contact__grid">
        <div className="rise">
          <p className="tag tag--flame">Neem contact op</p>
          <h2 className="h2">Laat me de datum en het aantal gasten weten.</h2>
          <p className="lede">
            Een eerste reactie duurt meestal een dag. Is de datum dichtbij, bel
            dan liever — ik neem op tussen de services door.
          </p>
        </div>

        <dl className="dl rise">
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
  return (
    <footer className="foot">
      <div className="shell foot__in">
        <p className="tag">Marijn van de Groep — Freelance kok</p>
        <p className="tag">KvK 00000000 · BTW NL000000000B00</p>
      </div>
    </footer>
  )
}

export default function App() {
  const stuck = useStuckBar()
  useReveal()

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
