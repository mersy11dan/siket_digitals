import mihret from '../../resource/memebers/Mihret_Daniel.jpg'
import ribka from '../../resource/memebers/Ribka_Muluye.jpg'
import sofoniyas from '../../resource/memebers/Sofoniyas_Tekalegn.png'
import beautyAbout from '../../resource/work/beauty-salon/about.webp'
import beautyMobile from '../../resource/work/beauty-salon/mobile.webp'
import beautyPoster from '../../resource/work/beauty-salon/poster.webp'
import beautyPrices from '../../resource/work/beauty-salon/prices.webp'
import beautyRecent from '../../resource/work/beauty-salon/recent-work.webp'
import beautyTour from '../../resource/work/beauty-salon/tour.mp4'
import clintonAboutDark from '../../resource/work/clinton/about-dark.webp'
import clintonAboutLight from '../../resource/work/clinton/about-light.webp'
import clintonApplyDark from '../../resource/work/clinton/apply-dark.webp'
import clintonApplyLight from '../../resource/work/clinton/apply-light.webp'
import clintonMobileDark from '../../resource/work/clinton/mobile-dark.webp'
import clintonMobileLight from '../../resource/work/clinton/mobile-light.webp'
import clintonPortfolioDark from '../../resource/work/clinton/portfolio-dark.webp'
import clintonPortfolioLight from '../../resource/work/clinton/portfolio-light.webp'
import clintonPosterDark from '../../resource/work/clinton/poster-dark.webp'
import clintonPosterLight from '../../resource/work/clinton/poster-light.webp'
import clintonTourDark from '../../resource/work/clinton/tour-dark.mp4'
import clintonTourLight from '../../resource/work/clinton/tour-light.mp4'
import edgetMobile from '../../resource/work/edget/mobile.webp'
import edgetPoster from '../../resource/work/edget/poster.webp'
import edgetQuote from '../../resource/work/edget/quote.webp'
import edgetServices from '../../resource/work/edget/services.webp'
import edgetTour from '../../resource/work/edget/tour.mp4'
import edgetWhy from '../../resource/work/edget/why.webp'
import metbelMobile from '../../resource/work/metbel/mobile.webp'
import metbelPoster from '../../resource/work/metbel/poster.webp'
import metbelProducts from '../../resource/work/metbel/products.webp'
import metbelPulses from '../../resource/work/metbel/pulses.webp'
import metbelTour from '../../resource/work/metbel/tour.mp4'
import metbelValues from '../../resource/work/metbel/values.webp'
import youthInsight from '../../resource/work/youth-print/insight.webp'
import youthMobile from '../../resource/work/youth-print/mobile.webp'
import youthPoster from '../../resource/work/youth-print/poster.webp'
import youthProjects from '../../resource/work/youth-print/projects.webp'
import youthTour from '../../resource/work/youth-print/tour.mp4'
import youthWork from '../../resource/work/youth-print/work.webp'

export const studio = {
  name: 'Siket Digitals',
  email: 'siketdigitals@gmail.com',
  phones: [
    { display: '0937 591 141', href: 'tel:+251937591141' },
    { display: '0978 695 556', href: 'tel:+251978695556' },
    { display: '0909 905 340', href: 'tel:+251909905340' },
  ],
  linkedin: 'https://www.linkedin.com/company/siket-digital/',
  telegram: 'https://t.me/Netchuck',
  city: 'Addis Ababa',
  whatsapp: {
    // International format: Country code + number (no +, no spaces, no dashes)
    number: '251937591141',
    defaultMessage: 'Hello Siket Digitals! I found your website and would like to discuss a project.',
  }
}

export const offers = [
  {
    title: 'Marketing websites',
    lead: true,
    body: 'A site that explains the business clearly and gives people an obvious way to get in touch.',
  },
  {
    title: 'Web apps',
    lead: false,
    body: 'Software in the browser, including AI that can recommend things to each visitor.',
  },
  {
    title: 'Redesigns',
    lead: false,
    body: 'An existing site rebuilt so it feels current and works properly on a phone.',
  },
] as const

export const steps = [
  {
    title: 'Talk',
    body: 'We learn the business, who it serves, and what the site has to do.',
  },
  {
    title: 'Shape',
    body: 'We plan the pages and how the site should look and work.',
  },
  {
    title: 'Build',
    body: 'We design and develop it, and you see the work as it comes together.',
  },
  {
    title: 'Launch',
    body: 'We put it online and hand it over ready to use.',
  },
] as const

export const members = [
  {
    name: 'Mihret Daniel',
    role: 'Frontend developer',
    photo: mihret,
    bio: 'Uses React to build good-looking websites, and adds AI so a site can recommend things to each visitor.',
  },
  {
    name: 'Ribka Muluye',
    role: 'Frontend developer and web designer',
    photo: ribka,
    bio: 'Makes modern, aesthetic websites based on each client\'s preferences, from the first layout to the finished interface.',
  },
  {
    name: 'Sofoniyas Tekalegn',
    role: 'Backend developer',
    photo: sofoniyas,
    bio: 'Creates well-structured databases, secure APIs, and the logic that keeps data safe and pages fast as a business grows.',
  },
] as const

export const projectTypes = ['Website', 'Web app', 'Redesign'] as const

export type Themed = { light: string; dark?: string }

export type Project = {
  name: string
  kind: string
  url: string
  body: string
  features: readonly string[]
  palette: readonly { name: string; hex: string }[]
  type: string
  modes: string
  glow: { light: string; dark: string }
  tour: Themed
  poster: Themed
  mobile: Themed
  shots: readonly { title: string; caption: string; image: Themed }[]
}

export const projects: readonly Project[] = [
  {
    name: 'Beauty Salon',
    kind: 'Salon website',
    url: 'https://beautysalon-one-rho.vercel.app/',
    body: 'A calm, booking-first site for a small salon in Bole that does nails, hair and makeup. Each service has its own hero photo, the price list shows the kind of work when you hover a line, and recent work tilts past in a photo carousel.',
    features: ['Booking first', 'Price list with photo previews', 'Recent work carousel', 'Team, reviews and hours'],
    palette: [
      { name: 'Ivory', hex: '#f1f0e8' },
      { name: 'Blush', hex: '#ece2e4' },
      { name: 'Olive', hex: '#55613a' },
      { name: 'Ink', hex: '#23251c' },
    ],
    type: 'Poiret One, Italianno and Manrope',
    modes: 'Light, soft and warm.',
    glow: { light: '#55613a', dark: '#a3b27a' },
    tour: { light: beautyTour },
    poster: { light: beautyPoster },
    mobile: { light: beautyMobile },
    shots: [
      { title: 'Price list.', caption: 'Hover a line to see the kind of work it means.', image: { light: beautyPrices } },
      { title: 'Recent work.', caption: 'Nails, hair and makeup in a tilting carousel.', image: { light: beautyRecent } },
      { title: 'About.', caption: 'Three chairs, one small room, and the team.', image: { light: beautyAbout } },
    ],
  },
  {
    name: 'Clinton Modeling Agency',
    kind: 'Agency website',
    url: 'https://clinton-modeling-agency.vercel.app/',
    body: 'A black and gold site for a modeling and casting agency in Ethiopia. It shows the agency\'s film, music video and advertising work in a portfolio grid, reads in English or Amharic, and lets new models apply online and follow their application from a personal portal.',
    features: ['Film and ad portfolio', 'English and Amharic', 'Dark and light mode', 'Online model applications'],
    palette: [
      { name: 'Black', hex: '#050505' },
      { name: 'Gold', hex: '#f2c94c' },
      { name: 'Cream', hex: '#f6f0e4' },
      { name: 'Bronze', hex: '#9a7209' },
    ],
    type: 'Bodoni Moda and Outfit',
    modes: 'Dark and light. The preview follows this page\'s paper.',
    glow: { light: '#9a7209', dark: '#f2c94c' },
    tour: { light: clintonTourLight, dark: clintonTourDark },
    poster: { light: clintonPosterLight, dark: clintonPosterDark },
    mobile: { light: clintonMobileLight, dark: clintonMobileDark },
    shots: [
      {
        title: 'Portfolio.',
        caption: 'Film, music video and advertising work in one grid.',
        image: { light: clintonPortfolioLight, dark: clintonPortfolioDark },
      },
      {
        title: 'About.',
        caption: 'Who the agency is and how it works with brands.',
        image: { light: clintonAboutLight, dark: clintonAboutDark },
      },
      {
        title: 'Apply.',
        caption: 'Three steps from sign-up to a casting review.',
        image: { light: clintonApplyLight, dark: clintonApplyDark },
      },
    ],
  },
  {
    name: 'Metbel Trading',
    kind: 'Trading company website',
    url: 'https://metbeltrading.com/',
    body: 'A bright, product-led site for an Addis Ababa import and export company that trades Ethiopian beans, pulses and oilseeds. Buyers browse the range in a carousel and photo grid, open what Metbel exports, imports and where it trades, and can start a WhatsApp chat from a floating button.',
    features: ['Product carousel and grid', 'Exports, imports and trade countries', 'International customers', 'WhatsApp chat'],
    palette: [
      { name: 'Harvest', hex: '#ffc65e' },
      { name: 'Amber', hex: '#ffa500' },
      { name: 'Navy', hex: '#011627' },
      { name: 'Red', hex: '#d94948' },
    ],
    type: 'Montserrat',
    modes: 'Light, on harvest orange.',
    glow: { light: '#c98200', dark: '#ffc65e' },
    tour: { light: metbelTour },
    poster: { light: metbelPoster },
    mobile: { light: metbelMobile },
    shots: [
      { title: 'Products.', caption: 'Beans in a carousel, then sesame and flax.', image: { light: metbelProducts } },
      { title: 'Pulses.', caption: 'Kidney beans and chickpeas, with a note on Ethiopian pulses.', image: { light: metbelPulses } },
      { title: 'Values.', caption: 'Reliability and quality, in Metbel\'s own words.', image: { light: metbelValues } },
    ],
  },
  {
    name: 'EDGET Medical and Industrial Gas',
    kind: 'Supplier website',
    url: 'https://www.edgetgas.com/',
    body: 'A bold, high-contrast site for an Ethiopian importer, exporter and supplier of medical and industrial oxygen. It opens on its numbers, lays out each gas service and the extra supplies on offer, gives four reasons to choose EDGET, and ends with a quote request and the main office details.',
    features: ['Oxygen gas services', 'Additional supplies', 'Four reasons to choose us', 'Quote and contact'],
    palette: [
      { name: 'Coal', hex: '#171717' },
      { name: 'Mint', hex: '#90ee90' },
      { name: 'Crimson', hex: '#b43041' },
      { name: 'Navy', hex: '#131d3b' },
    ],
    type: 'Rubik and Karla',
    modes: 'Light, with dark bands.',
    glow: { light: '#b43041', dark: '#90ee90' },
    tour: { light: edgetTour },
    poster: { light: edgetPoster },
    mobile: { light: edgetMobile },
    shots: [
      { title: 'Services.', caption: 'Oxygen, filled cylinders and liquid oxygen, then the extras.', image: { light: edgetServices } },
      { title: 'Why us.', caption: 'Quality material, trained workers, availability and quick response.', image: { light: edgetWhy } },
      { title: 'Contact.', caption: 'A call to get started, a quote request and the main office.', image: { light: edgetQuote } },
    ],
  },
  {
    name: 'The Youth Print',
    kind: 'Think tank website',
    url: 'https://theyouthprint.org/',
    body: 'A clean, editorial site for a youth-led African think tank in Addis Ababa working on climate policy, diplomacy and leadership. A photo slideshow leads into its four tracks of work, a research library you can filter by type, upcoming events, and projects measured against goals published in advance.',
    features: ['Hero slideshow', 'Four work tracks', 'Filterable research library', 'Events and projects'],
    palette: [
      { name: 'Green', hex: '#239e58' },
      { name: 'Mint', hex: '#e8f6ee' },
      { name: 'Ink', hex: '#171914' },
      { name: 'White', hex: '#ffffff' },
    ],
    type: 'Raleway and Open Sans',
    modes: 'Light, with green and ink bands.',
    glow: { light: '#239e58', dark: '#5fd08f' },
    tour: { light: youthTour },
    poster: { light: youthPoster },
    mobile: { light: youthMobile },
    shots: [
      { title: 'Our work.', caption: 'Research, dialogue, diplomacy and leadership as four tracks.', image: { light: youthWork } },
      { title: 'Insight.', caption: 'Explainers, policy briefs and insights, filterable by type.', image: { light: youthInsight } },
      { title: 'Projects.', caption: 'Climate justice and adaptation work, each with its own page.', image: { light: youthProjects } },
    ],
  },
]
