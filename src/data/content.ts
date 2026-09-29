import mihret from '../../resource/memebers/Mihret_Daniel.jpg'
import ribka from '../../resource/memebers/Ribka_Muluye.jpg'
import sofoniyas from '../../resource/memebers/Sofoniyas_Tekalegn.jpg'

export const studio = {
  name: 'Siket Digitals',
  email: 'siketdigitals@gmail.com',
  phones: [
    { display: '0937 591 141', href: 'tel:+251937591141' },
    { display: '0978 695 556', href: 'tel:+251978695556' },
    { display: '0909 905 340', href: 'tel:+251909905340' },
  ],
  linkedin: 'https://www.linkedin.com/company/siket-digital/',
  city: 'Addis Ababa',
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
