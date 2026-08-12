import Link from "next/link";
import { PodcastPlatforms } from "./PodcastPlatforms";
import styles from "./HomeContent.module.css";

// Static export: prefix public asset URLs with the project base path (empty in dev).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* ---------------------------------- data ---------------------------------- */

// Mission "How we do this" — the dark-navy inset; bold lead + a full sentence.
const HOW = [
  { lead: "Raising awareness", rest: "We communicate digital minds topics to non-expert audiences, encouraging thoughtful public engagement with the questions the field raises." },
  { lead: "Developing talent", rest: "We help the field grow by identifying and developing exceptional people." },
  { lead: "Convening the field", rest: "We create the spaces (events, workshops, and shared resources) where researchers and practitioners can connect and do their best work." },
];

// All six "Our work" tiles, in display order across two rows of three. An external
// An external `href` (http…) opens in a new tab via the "Find out more" bar; an
// internal one (e.g. /workshops) navigates in-tab.
const CARDS: {
  type: string;
  title: string;
  desc: string;
  href?: string;
  img: string;
}[] = [
  {
    type: "Guide",
    title: "Beginner's Guide to Digital Minds",
    desc: "An accessible, in-depth guide for newcomers to the field of digital minds. It sets out structured reading across many of the key questions, alongside regularly updated lists of events and opportunities.",
    href: "https://digitalminds.guide/",
    img: "/card-guide.jpg",
  },
  {
    type: "Newsletter",
    title: "Digital Minds Newsletter",
    desc: "A quarterly newsletter following developments in digital minds research, policy, and public debate.",
    href: "https://www.digitalminds.news/",
    img: "/card-newsletter.jpg",
  },
  {
    type: "Fellowship",
    title: "Digital Minds Fellowship",
    desc: "An intensive residential programme, run by Cambridge Digital Minds with Rethink Priorities and PRISM, for people who want to work on the technical and governance aspects of digital minds research. Participants work through the field's central debates and develop their own high-impact projects.",
    href: "https://digitalminds.cam/fellowship/",
    img: "/edu-fellowship.jpg",
  },
  {
    type: "Scholarship",
    title: "Neuromatch AI Sentience Scholarship",
    desc: "A six-month, part-time, remote programme supporting early-career researchers working on the science and ethics of AI minds. Run by Neuromatch with PRISM and partners, it pairs each scholar with a mentor for a funded research project alongside interdisciplinary training.",
    href: "https://neuromatch.io/ai-sentience-scholars/",
    img: "/edu-scholarship.jpg",
  },
  {
    type: "Course",
    title: "Digital Minds Online Course",
    desc: "A facilitated introductory course, running over eight weeks for a quarterly cohort of 100 participants, that provides an overview of the core concepts and debates in digital minds. The content can also be followed independently at any time on BlueDot Impact's website.",
    href: "https://bluedot.org/courses/digital-minds/1/1",
    img: "/edu-course.jpg",
  },
  {
    type: "Events",
    title: "Expert Workshops",
    desc: "Regular workshops that bring the field's researchers together to sharpen thinking and seed new collaborations.",
    href: "/workshops",
    img: "/card-events.jpg",
  },
];

// Featured podcast episodes, shown inside the dark "Our work" bar. Each links to
// the episode on YouTube (opens in a new tab); images are the guest's headshot in
// /public (web-sized). `pos` is the object-position that keeps the face framed in
// the square-ish tile.
const EPISODES = [
  {
    title: "AI Rights and Legal Personhood",
    guest: "Heather Alexander",
    // ?v=2: headshot was flipped in place — bust caches holding the old orientation.
    img: "/guest-heather.jpg?v=2",
    pos: "50% 40%",
    href: "/podcast/heather-alexander-ai-rights-and-legal-personhood",
  },
  {
    title: "Exotic Minds and the Design Policies for Conscious AI",
    guest: "Eric Schwitzgebel",
    img: "/guest-eric.jpg",
    pos: "50% 38%",
    href: "/podcast/eric-schwitzgebel-exotic-minds-and-the-design-policies-for-conscious-ai",
  },
  {
    title: "Metacognition, Neuroscience, and Tests for AI Consciousness",
    guest: "Megan Peters",
    img: "/guest-megan.jpg",
    pos: "50% 50%",
    href: "/podcast/megan-peters-metacognition-neuroscience-and-tests-for-ai-consciousness",
  },
];

// Confirmed partners only (per Mitchel 2026-06-26); add the rest as confirmed.
const PARTNERS = [
  {
    name: "Future Impact Group",
    logo: "/partner-fig.png",
    href: "https://futureimpact.group/",
  },
  {
    name: "Cambridge Digital Minds",
    logo: "/partner-cdm.png",
    href: "https://digitalminds.cam/",
  },
  {
    name: "Neuromatch",
    logo: "/partner-neuromatch.png",
    href: "https://neuromatch.io/",
  },
  {
    name: "Rethink Priorities",
    logo: "/partner-rethink.png",
    href: "https://rethinkpriorities.org/",
  },
];

// PRISM's stated values — rendered "<lead>. <rest>".
const VALUES = [
  { lead: "Rigour", rest: "We promote the highest standards of inquiry and debate." },
  { lead: "Humility", rest: "We hold our own views loosely, and take seriously the people who think we are wrong." },
  { lead: "Compassion", rest: "We consider the wellbeing of every entity our work touches." },
  { lead: "Moral seriousness", rest: "We treat the potential importance of our work with the gravity it requires." },
  { lead: "Collaboration", rest: "We work to encourage conversation between diverse communities and perspectives." },
];

// "Who we are" — three groups of people (name + role / affiliation).
const TEAM = [
  { name: "Will Millership", role: "CEO", href: "https://www.linkedin.com/in/will-millership-98393b58/" },
  { name: "Mitch Alexander", role: "Special Projects", href: "https://www.linkedin.com/in/mitch-alexander-52524b159/" },
  { name: "Güney Ulaş Türker", role: "Field Building", href: "https://www.linkedin.com/in/guney-ulas-turker/" },
  { name: "Ria Viswanathan", role: "Field Building and Research", href: "https://riaviswanathan.com/" },
];

// One combined advisors + trustees list, placed below Team as a grid; trustees
// carry a "(trustee)" tag. Ordered by surname.
// NB Lucius Caviola REMOVED 2026-07-24 per Will — restore ({ name: "Lucius
// Caviola", role: "University of Cambridge", href: "https://luciuscaviola.com/" })
// once he's OK'd appearing. New advisors (Jeff / Patrick / Andreas / Rosie /
// Winnie) to be added once full names + affiliations are confirmed.
const ADVISORS: { name: string; role: string; trustee?: boolean; href: string }[] = [
  { name: "Heather Alexander", role: "Lab for the Future of Citizenship", href: "https://sites.google.com/site/heatherjeanalexander/home?authuser=0" },
  { name: "Cameron Berg", role: "Reciprocal Research", trustee: true, href: "https://reciprocalresearch.org/team" },
  { name: "Calum Chace", role: "Conscium", trustee: true, href: "https://calumchace.com/" },
  { name: "Radhika Chadwick", role: "Niscai", trustee: true, href: "https://www.niscai.com/about" },
  { name: "Sofia Fogel", role: "New York University", href: "https://nonhumanminds.org/team/sofia-fogel/" },
  { name: "Karl Friston", role: "UCL", href: "https://www.fil.ion.ucl.ac.uk/~karl/" },
  { name: "Nicholas Humphrey", role: "London School of Economics", href: "https://humphrey.org.uk/" },
  { name: "Geoff Keeling", role: "Google", href: "https://geoffkeeling.github.io/" },
  { name: "Arvo Muñoz Morán", role: "Rethink Priorities", trustee: true, href: "https://rethinkpriorities.org/team-member/arvo-munoz-moran/" },
  { name: "Megan Peters", role: "UCI / UCL", href: "https://profiles.ucl.ac.uk/104962-megan-peters" },
  { name: "Susan Schneider", role: "Florida Atlantic University", href: "http://schneiderwebsite.com/" },
  { name: "Jeff Sebo", role: "New York University", href: "https://jeffsebo.net/" },
  { name: "Henry Shevlin", role: "University of Cambridge", href: "https://henryshevlin.com/" },
  { name: "Derek Shiller", role: "Eleos AI Research", href: "https://derekshiller.com/" },
  { name: "Mark Solms", role: "University of Cape Town", href: "https://neuroscience.uct.ac.za/contacts/mark-solms" },
  { name: "Winnie Street", role: "Google", href: "https://www.linkedin.com/in/winniestreet/" },
];

// PRISM has no general careers page yet, so "Join the team" routes to the
// contact form; point it at a careers page once one exists.
const OPPORTUNITIES = [
  {
    title: "Join the team",
    body: "We're a small, growing non-profit scaling our research, operations, and communications. If you want to help build the field of digital minds research, we'd love to hear from you, whether or not there's a role currently advertised.",
    cta: "Get in touch",
    href: "/contact",
  },
];

// One "Our work" card tile. An external href (http…) opens in a new tab via the
// "Find out more" bar; an internal href navigates in-tab (Link adds the base path).
function Card({ c }: { c: (typeof CARDS)[number] }) {
  const external = !!c.href && c.href.startsWith("http");
  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={`${BASE}${c.img}`} alt="" />
      <div className={styles.cardBody}>
        <span className={styles.cardType}>{c.type}</span>
        <h3 className={styles.cardTitle}>{c.title}</h3>
        <p className={styles.cardDesc}>{c.desc}</p>
      </div>
      {external ? (
        <a
          className={styles.cardBar}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find out more
        </a>
      ) : c.href ? (
        <Link className={styles.cardBar} href={c.href}>
          Find out more
        </Link>
      ) : (
        <div className={styles.cardBar}>Find out more</div>
      )}
    </div>
  );
}

export function HomeContent() {
  return (
    <div className={styles.below}>
      {/* ===================== MISSION ===================== */}
      <section id="mission" className={styles.mission}>
        <div className={styles.flow}>
          <div className={styles.twoTone}>
            <div className={styles.missionLead}>
              <h2 className={styles.missionHeading}>
                PRISM is a non-profit helping to build the field of digital minds
              </h2>
              <p className={styles.missionBody}>
                We support research and educational initiatives preparing
                society for the challenges posed by AI consciousness, digital
                minds, and AI moral status.
              </p>
            </div>
            {/* Dark-navy inset — "How we do this" (replaces the old "Our aims"). */}
            <div className={styles.how}>
              <span className={styles.kickerDark}>How we do this</span>
              <div className={styles.howList}>
                {HOW.map((h) => (
                  <div className={styles.howItem} key={h.lead}>
                    <p className={styles.howText}>
                      <strong>{h.lead}.</strong> {h.rest}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== OUR WORK ===================== */}
      <section id="work" className={styles.work}>
        <div className={styles.flow}>
          {/* Featured podcast — one flat dark-navy module, two columns: the
              podcast promo (left) + the featured-episode headshots (right).
              #podcast is the nav's Podcast anchor. */}
          <div id="podcast" className={styles.featured}>
            <div className={styles.featuredRow}>
              <div className={styles.featuredText}>
                <span className={styles.kickerDark}>Podcast</span>
                <h3 className={styles.featuredTitle}>Exploring Machine Consciousness</h3>
                <p className={styles.featuredBody}>
                  Our podcast brings leading thinkers in philosophy, cognitive
                  science, and AI to a curious general audience. Each episode
                  explores pressing issues in digital minds and AI consciousness.
                </p>
                <Link
                  className={`${styles.btnWhite} ${styles.btnFeatured}`}
                  href="/podcast"
                >
                  See more episodes →
                </Link>
                <PodcastPlatforms />
              </div>

              {/* Featured episodes — a guest headshot beside the episode title;
                  each opens the episode on YouTube in a new tab. */}
              <div className={styles.episodes}>
                <span className={styles.kickerDark}>Featured episodes</span>
                <div className={styles.episodeGrid}>
                  {EPISODES.map((ep) => (
                    <Link
                      className={styles.episodeCard}
                      href={ep.href}
                      key={ep.href}
                    >
                      <div className={styles.episodeImgWrap}>
                        <img
                          className={styles.episodeImg}
                          src={`${BASE}${ep.img}`}
                          style={{ objectPosition: ep.pos }}
                          alt={ep.guest}
                        />
                      </div>
                      <div className={styles.episodeMeta}>
                        <h4 className={styles.episodeTitle}>{ep.title}</h4>
                        <span className={styles.episodeGuest}>{ep.guest}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* "Our work" heads the project tiles below. #our-work is the nav's
              Our work anchor (distinct from #podcast at the top of this section). */}
          <div id="our-work" className={styles.workHeader}>
            <h2 className={styles.title}>Our work</h2>
            <p className={styles.workIntro}>
              We create the infrastructure a young field needs: helping
              newcomers orient themselves, and keeping researchers and
              practitioners connected and collaborating.
            </p>
          </div>

          {/* Six "Our work" tiles, two rows of three (CARDS order). */}
          <div className={styles.cards}>
            {CARDS.slice(0, 3).map((c) => (
              <Card c={c} key={c.title} />
            ))}
          </div>
          <div className={styles.cards}>
            {CARDS.slice(3).map((c) => (
              <Card c={c} key={c.title} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PARTNERSHIPS ===================== */}
      {/* Two-tone, colours swapped vs Mission: dark statement | light org list. */}
      <section id="partnerships" className={styles.collab}>
        <div className={styles.flow}>
          <div className={`${styles.twoTone} ${styles.twoToneJoined}`}>
            <div className={styles.pStatement}>
              <h2 className={styles.missionHeading}>Partnerships</h2>
              <p className={styles.missionBody}>
                We build the field together, collaborating with researchers,
                institutes, and organisations advancing the science and ethics
                of digital minds.
              </p>
            </div>
            <div className={styles.pOrgs}>
              <span className={styles.kicker}>Our collaborators</span>
              <div className={styles.pOrgsList}>
                {PARTNERS.map((p) => (
                  <a
                    className={styles.pOrgItem}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={p.name}
                  >
                    <img
                      className={styles.pOrgLogo}
                      src={`${BASE}${p.logo}`}
                      alt=""
                    />
                    <p className={styles.pOrgName}>{p.name}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VALUES ===================== */}
      <section id="values" className={styles.values}>
        <div className={styles.flow}>
          <div className={styles.valuesStrip}>
            <span className={styles.kicker}>Values</span>
            <p className={styles.valuesLede}>
              The commitments that guide how we work.
            </p>
            <div className={styles.valuesGrid}>
              {VALUES.map((v) => (
                <p className={styles.value} key={v.lead}>
                  <strong>{v.lead}.</strong> {v.rest}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHO WE ARE ===================== */}
      {/* Dark "Who we are" header joined to the light team grid in one block. */}
      <section id="people" className={styles.people}>
        <div className={styles.peopleWrap}>
          <div className={styles.peopleBlock}>
            <div className={styles.peopleHead}>
              <h2 className={styles.missionHeading}>Who we are</h2>
              <p className={styles.peopleIntro}>
                Meet the people behind our work.
              </p>
            </div>
            <div className={styles.peopleBody}>
              <div className={styles.peopleSection}>
                <span className={styles.peopleKicker}>Team</span>
                <div className={styles.peopleGridRow}>
                  {TEAM.map((m) => (
                    <a
                      className={`${styles.person} ${styles.personLink}`}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={m.name}
                    >
                      <span className={styles.personName}>{m.name}</span>
                      <span className={styles.personRole}>{m.role}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className={styles.peopleSection}>
                <span className={styles.peopleKicker}>Advisors</span>
                <div className={styles.peopleGridRow}>
                  {ADVISORS.map((m) => (
                    <a
                      className={`${styles.person} ${styles.personLink}`}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={m.name}
                    >
                      <span className={styles.personName}>{m.name}</span>
                      <span className={styles.personRole}>{m.role}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GET INVOLVED ===================== */}
      <section id="opportunities" className={styles.ctaSection}>
        <div className={styles.cta}>
          <div className={styles.ctaWrap}>
            <div className={styles.ctaHead}>
              <h2 className={styles.ctaTitle}>Opportunities</h2>
            </div>
            <p className={styles.ctaLede}>
              If this resonates with you, there are several ways to take part in
              our work and join the community.
            </p>
            <div className={styles.ctaGrid}>
              {OPPORTUNITIES.map((o) => (
                <div className={styles.ctaCard} key={o.title}>
                  <h3 className={styles.ctaCardTitle}>{o.title}</h3>
                  <p className={styles.ctaCardBody}>{o.body}</p>
                  <a
                    className={`${styles.btnWhite} ${styles.btnCta}`}
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {o.cta} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
