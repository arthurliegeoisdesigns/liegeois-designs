// ─────────────────────────────────────────────────────────────────────────────
// Case Studies Collection — Liegeois Designs
//
// Images are hosted on Webflow CDN (cdn.prod.website-files.com) and
// Cloudinary (cloud: dryyhpqew, folder: liegeois-designs) for legacy entries.
//
// featured: true  → appears in the homepage portfolio grid (max 6)
// featured: false → appears on the full /work page only
// order           → controls sort order on the homepage grid
// ─────────────────────────────────────────────────────────────────────────────

import type { CaseStudy } from './types'

const CDN = 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs'

export const caseStudies: CaseStudy[] = [
  // ── FEATURED ───────────────────────────────────────────────────────────────

  {
    slug: 'chevron-new-energies',
    client: 'Chevron New Energies',
    project: 'New Energies Strategic Narrative',
    format: 'Executive Presentation',
    industry: 'Energy / Sustainability',
    year: 2025,
    tagline: 'A strategic narrative that reframed an energy giant\'s future.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc74bd6bad20709672_683f46b683ae96a1c334fcb4_6830bafcc24aad0888102a9b_Fivestone%252520-%252520Chevron%2525201_1.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc74bd6bad2070967a_6863ebba268202b7d37100e6_Fivestone%2520-%2520Chevron%25202%2520.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd74bd6bad20709698_6863ebbef22100b412ecfcf1_Fivestone%2520-%2520Chevron%25203_1.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd74bd6bad20709691_6863ebc21044fc90f2aebcff_Fivestone%2520-%2520Chevron%25204.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd74bd6bad20709694_6863ebc657fb2a1ec0375b14_Fivestone%2520-%2520Chevron%25205.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc74bd6bad20709676_6863ebcb1e6ee5b690163402_Fivestone%2520-%2520Chevron%25206.jpeg',
    ],
    video: 'https://res.cloudinary.com/dryyhpqew/video/upload/v1782509417/chevron-reel_is1q7l.mov',
    featured: true,
    order: 1,
    agency: 'Fivestone Studios',
    summary: 'Partnering with Fivestone Studios and amazing strategist Tim Polder, we helped Chevron’s New Energies division articulate a cohesive visual story around its sustainability strategy. The keynote presentation combined editorial typography, abstract motion cues, and climate data to create an inspiring yet grounded roadmap—one that resonated equally with internal stakeholders and external partners.',
    theAsk: 'Chevron’s New Energies division needed to develop a forward-facing keynote presentation to align stakeholders around their sustainability strategy. Fivestone Studios brought us in to lead the visual storytelling and content structure, with a mandate to bring credibility, elegance, and a strong sense of momentum to the message — while avoiding greenwashing or oversimplification.',
    challenge: `• Chevron operates in a highly scrutinized space. Any sustainability communication must be airtight, supported by data, grounded in action, and visually trustworthy. 
• The content was technical and broad, spanning decarbonization, innovation investment, and long-range climate targets. 
• The challenge was to build a presentation that felt emotionally resonant, factually strong, and strategically aligned, all in a single keynote flow.`,
    solution: `• I approached the deck as a visual manifesto, using clean editorial layouts, minimalist animations, and high-contrast data visualizations to deliver a sense of ambition without overhyping. 
• The design language leaned into abstraction, representing energy, ecosystems, and movement with subtle visual metaphors. 
• The structure walked viewers through past progress, current initiatives, and future commitments, framing Chevron as a company acting with urgency and discipline.`,
    outcome: `• The final presentation was used at high-level internal meetings and external partner briefings, helping the New Energies division unify its voice and messaging. 
• Stakeholders noted the clarity and modernity of the visuals and appreciated the balance between honesty and optimism.`,
  },

  {
    slug: 'marriott-luxury-group',
    client: 'Marriott Luxury Group',
    project: 'YouTube Content Strategy 2025',
    format: 'Executive Presentation',
    industry: 'Luxury Hospitality',
    year: 2025,
    tagline: 'A content strategy deck as cinematic as the brands it represents.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae362b6f7edca9f846307_Marriott_The_Luxury_Group_Slide_1.avif',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae38423ea6040242c1a3f_Marriott_The_Luxury_Group_Slide_3.avif',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae3beab5fea0b94fdf5de_Marriott_The_Luxury_Group_Slide_2.avif',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae3dfa9518e75d5104203_Marriott_The_Luxury_Group_Slide_4.avif',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae3ffc9ac250c4b4c0d7b_Marriott_The_Luxury_Group_Slide_5.avif',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae4171b14a6cf5508e2f4_Marriott_The_Luxury_Group_Slide_6.avif',
    ],
    featured: true,
    order: 2,
    summary: 'In 2025, the Luxury Group (Marriott) approached me to craft a fresh YouTube content strategy that aligned with their growing portfolio of luxury sub-brands, from The Ritz-Carlton to St. Regis and EDITION. The goal: increase organic discoverability, drive deeper engagement, and position Marriott as a storyteller at the intersection of travel, culture, and design. We developed a modular editorial framework tailored for both evergreen and campaign content, optimized for SEO, visual consistency, and high production scalability.',
    theAsk: 'Marriott’s Luxury Group, encompassing brands like Ritz-Carlton, St. Regis, W Hotels, and Edition, needed a cohesive YouTube strategy to unify their content presence and boost audience engagement across generations. Despite strong brand equity, the YouTube channels were fragmented and inconsistent in reach and voice.',
    challenge: 'I was brought in to help the Digital Marketing Director to define the YouTube strategy for 2025, including competitor benchmarking, channel diagnostics, content architecture, and actionable recommendations to future-proof the Luxury Group’s digital storytelling approach.',
    solution: 'I built a high-level strategy deck aligning leaders across 8 luxury brands with a unified YouTube vision. Through competitive benchmarking and a portfolio audit, we uncovered gaps in storytelling, consistency, and channel impact. The solution: launch a unified Luxury Group channel, develop flagship content franchises, and create a clear playbook for architecture, categories, frequency, and amplification, all designed to inspire next-gen travelers and elevate Marriott’s digital presence.',
    outcome: `• Strategy approved at senior executive level across global brand teams
• Luxury Group now has a clear YouTube direction for unified brand storytelling
• Internal stakeholders aligned on content goals, editorial structure, and rollout plan
• Elevated Marriott’s digital creative direction to match its luxury positioning`,
  },

  {
    slug: 'echo-society',
    client: 'Echo Society',
    project: 'Brand & Culture Storytelling Deck',
    format: 'Pitch & Investor Deck',
    industry: 'Media / Culture',
    year: 2024,
    tagline: 'Culture presented with the same craft it celebrates.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdca84275b62afc2282_6851c05f787e5e92c62ed1eb_221114_Echo_Society_Show_009.001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdca84275b62afc228e_686403b73d5596ba5b3fbf23_230427_Echo-Society-Deck%25202.0%2520-%2520Slide-1.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdca84275b62afc22af_686403c42c31520a33407568_230427_Echo-Society-Deck%2520(optimized).jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdca84275b62afc22a6_686403e795a2cb625ffedcbd_230427_Echo-Society-Deck%25202.0%2520-%2520Slide-5.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdca84275b62afc22ac_686403f2617d981a057f6af0_230427_Echo-Society-Deck%25202.0%2520-%2520Slide-7.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdca84275b62afc22a3_686403fb3cfcb811748e73b3_230427_Echo-Society-Deck%25202.0%2520-%2520Slide-8.jpeg',
    ],
    featured: true,
    order: 3,
    summary: 'Echo Society needed to pitch a new model for content ownership and accelerated go-to-market storytelling. We designed their first investor deck around a disruptive thesis: control your IP, collapse timelines, and scale distribution. The design blends cinematic imagery with sharp strategic logic—setting the tone for a visionary fundraise.',
    theAsk: `• Echo Society, a creative startup pioneering a new model of media production and content IP ownership, needed their first investor deck to communicate their vision to early-stage VCs and angel investors. 
• The company’s approach was disruptive: own the content, compress the production timeline, and scale IP through a multi-platform strategy. 
• They wanted a deck that felt premium, cinematic, and founder-led, while still delivering investor-level clarity and traction signals.`,
    challenge: `• The concept was bold but abstract, and the team was still in early fundraising mode, meaning traction data was limited. 
• The challenge was to build confidence in the model and the team, using vision and clarity as the primary drivers. 
• There was also the added complexity of balancing creative ambition with business logic, investors needed to see this wasn’t just “another pitch deck,” but a serious roadmap to ROI in a competitive landscape.`,
    solution: `• I built a cinematic, founder-narrated deck that opened with a clear positioning statement: “We don’t rent stories, we own them.” 
• The slides unfolded in a high-contrast black-and-white palette with warm highlights, showcasing Echo’s philosophy, founder profiles, case-study moments, and go-to-market framework. 
• I layered in business model diagrams, content pipeline logic, and revenue projections, all simplified and visually elevated to maintain flow and coherence.`,
    outcome: `• The deck gave Echo Society a premium-grade tool to pitch vision-first while still meeting the expectations of serious investors. 
• It was well-received across multiple investor meetings and became the basis for partner conversations and team recruitment. 
• More than just a deck, it helped shape the company’s investor-facing identity and set a high bar for storytelling going forward.`,
  },

  {
    slug: 'the-spaceship',
    client: 'The Spaceship',
    project: 'Investor Deck',
    format: 'Pitch & Investor Deck',
    industry: 'Sustainability / ESG',
    year: 2024,
    tagline: 'A pitch deck that made the stakes of ESG feel cosmic.',
    images: [
      `${CDN}/spaceship-01.jpg`,  // hero — cover
      `${CDN}/spaceship-05.jpg`,  // gallery — early deck
      `${CDN}/spaceship-09.jpg`,  // gallery — problem/opportunity
      `${CDN}/spaceship-14.jpg`,  // gallery — solution
      `${CDN}/spaceship-19.jpg`,  // gallery — market/model
      `${CDN}/spaceship-24.jpg`,  // gallery — team/financials
      `${CDN}/spaceship-28.jpg`,  // gallery — closing
    ],
    featured: true,
    order: 4,
  },

  {
    slug: 'mcs-healthcare-jandj',
    client: 'MCS Healthcare × J&J',
    project: 'Executive Pitch Deck',
    format: 'Sales & Agency Deck',
    industry: 'Healthcare / Pharma',
    year: 2024,
    tagline: 'Bold visual design for a pitch that had to command the room.',
    images: [
      `${CDN}/mcs-jj-01.jpg`,
      `${CDN}/mcs-jj-02.jpg`,
      `${CDN}/mcs-jj-01.jpg`, // placeholder — needs mcs-jj-03
      `${CDN}/mcs-jj-02.jpg`, // placeholder — needs mcs-jj-04
      `${CDN}/mcs-jj-01.jpg`, // placeholder — needs mcs-jj-05
      `${CDN}/mcs-jj-02.jpg`, // placeholder — needs mcs-jj-06
    ],
    featured: true,
    order: 6,
  },

  // ── PORTFOLIO (full /work page) ───────────────────────────────────────────

  {
    slug: 'philips-healthcare',
    client: 'Philips Healthcare',
    project: 'Healthcare Technology Presentation',
    format: 'Executive Presentation',
    industry: 'Healthcare Technology',
    year: 2024,
    tagline: 'Technical complexity — made human.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be076a5b0a46c2f83e8_683f46b95f3aad03b0cb2e3a_681ba9dcdcb982e09a6e1696_Portfolio_Slides_Philips-Experience-Intro_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be076a5b0a46c2f8404_686300aa2b752bf2ed83efbe_Portfolio_Slides_Philips-Experience-Intro_0003.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be076a5b0a46c2f8407_686300b24802cdc23dd56b81_Portfolio_Slides_Philips-Experience-Intro_0004.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be076a5b0a46c2f83fc_686300be2d4e0097514d389a_Portfolio_Slides_Philips-Experience-Intro_0010.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be076a5b0a46c2f8410_686300d8d1b2819f62c80d13_Portfolio_Slides_Philips-Experience-Intro_0025.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be076a5b0a46c2f8413_686300e5548794ef27a5daeb_Portfolio_Slides_Philips-Experience-Intro_0028.jpeg',
    ],
    video: 'https://res.cloudinary.com/dryyhpqew/video/upload/v1782509418/philips-reel_omh7sl.mov',
    featured: false,
    agency: 'Blondefish',
    summary: 'Philips needed an interactive, visually stunning presentation that their Sales Enablement Managers (SEMs) could confidently use during face-to-face meetings with prospective clients visiting Philips’ flagship experience centers in Best and Cambridge. This wasn’t a standard sales deck: it had to feel immersive, on-brand, and intuitive to navigate in real time—giving SEMs the flexibility to tailor the story on the fly to different audiences, from clinicians to hospital executives.',
    theAsk: 'Upgrade Philips’ healthcare communications with consistent branding and impactful presentation design.',
    challenge: `• The existing presentation materials were linear and cluttered, forcing SEMs to skip around or improvise during live demos, undermining their confidence and distracting prospects. 
• The experience centers were designed to impress, but the outdated, uninspired slides couldn’t match the innovation showcased in Philips’ state-of-the-art products.
• The presentation had to handle deep dives into complex medical technology while staying engaging, and it needed a user-friendly interactive structure so SEMs could jump seamlessly between sections without technical hiccups—all within the constraints of Microsoft PowerPoint.`,
    solution: `• Developed cohesive visual identity; 
• Designed branded PowerPoint templates; 
• Created modular content blocks for clarity and made the deck fully interactive for it to be presented on a touch-wall format.`,
    outcome: 'Strengthened Philips’ healthcare storytelling with clear, branded materials that elevated authority and consistency.',
  },

  {
    slug: 'intercept-pharma',
    client: 'Intercept Pharmaceuticals',
    project: 'POA Field Training — Strong Foundation',
    format: 'Training Presentation',
    industry: 'Pharmaceutical',
    year: 2024,
    tagline: 'Field training that reps actually wanted to sit through.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be363640197079c38aa_683f46bcc32c933d239b21b5_6819139a74f694dfc17f0ba6_67478480fe8a9b5567450067_Portfolio_Slides_ToddStreet-Intercept-OCA-Aug-Training_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be41ad3328c9238fa7c_6862e9a59ed3f947d1445a0d_Portfolio_Slides_ToddStreet-Intercept-OCA-Aug-Training_0002.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be41ad3328c9238fa76_6862e9b6f644e708a4f5c6b0_Portfolio_Slides_ToddStreet-Intercept-OCA-Aug-Training_0005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be41ad3328c9238fa79_6862e9c2c953dde3ed22993c_Portfolio_Slides_ToddStreet-Intercept-OCA-Aug-Training_0006.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be41ad3328c9238fa5f_6862e9d493008387ecbe3e10_Portfolio_Slides_ToddStreet-Intercept-OCA-Aug-Training_0018.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be41ad3328c9238fa69_6862e9e12b752bf2ed76c04d_Portfolio_Slides_ToddStreet-Intercept-OCA-Aug-Training_0020.jpeg',
    ],
    featured: false,
    agency: 'ToddStreet',
    summary: 'ToddStreet, a leading experiential agency, engaged me to design a training workshop deck for Intercept, a biopharmaceutical company under the Alfasigma Group. The mission: to energize, educate, and align their salesforce around a new competitive posture strategy using storytelling, behavioral science, and visual clarity.',
    theAsk: `Design a fully branded, modular PowerPoint deck for Intercept’s POA (Plan of Action) meeting workshop that:• Translates complex pharmaceutical positioning into simple, motivational slides
• Balances scientific messaging with sales engagement
• Includes interactive elements (e.g., SWOT analysis, meme challenge, think tanks)`,
    challenge: `• Dry, abstract strategy content needed to feel engaging
• Mixed audience from new hires to senior reps required clarity and flexibility
• Workshop had to fit into 2h45 without losing energy
• Design had to stay on-brand while building emotional connection`,
    solution: `• Built a story-driven arc with empathy, clarity, interaction, and action
• Used visual metaphors (superheroes, racing, molecular motifs) to anchor ideas
• Created modular sections for breakouts, discussions, and a “meme challenge”
• Delivered animated, facilitator-ready slides with smooth pacing cues`,
    outcome: 'The workshop transformed dense strategy into an interactive experience that energized reps, aligned them to Intercept’s vision, and gave managers a reusable training toolkit. The VP of Sales connected with me on LinkedIn and requested my help to design their annual keynote.',
  },

  {
    slug: 'rapp-opmg',
    client: 'OPMG × RAPP',
    project: 'Connected Data Deck',
    format: 'Sales & Agency Deck',
    industry: 'Marketing Technology',
    year: 2025,
    tagline: 'A data story that made complexity look like clarity.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be0c69ca84c854a3a45_6851c8571c2df147e82e6a99_250418_Connected%2520Data%2520Deck%2520Update%2520_USE%2520THIS%2520VERSION%2520-%2520Edits%2520Arthur-fixed.007.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be0c69ca84c854a3a6a_6851c8601bc72a9a3fd13b36_250418_Connected%2520Data%2520Deck%2520Update%2520_USE%2520THIS%2520VERSION%2520-%2520Edits%2520Arthur-fixed.001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be0c69ca84c854a3a6d_6851c860cb8125a0044500ab_250418_Connected%2520Data%2520Deck%2520Update%2520_USE%2520THIS%2520VERSION%2520-%2520Edits%2520Arthur-fixed.002.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be0c69ca84c854a3a51_6851c86078cffe4d5322bb2c_250418_Connected%2520Data%2520Deck%2520Update%2520_USE%2520THIS%2520VERSION%2520-%2520Edits%2520Arthur-fixed.003.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be0c69ca84c854a3a56_6851c860bdf8856faf812799_250418_Connected%2520Data%2520Deck%2520Update%2520_USE%2520THIS%2520VERSION%2520-%2520Edits%2520Arthur-fixed.004.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be0c69ca84c854a3a49_6851c8608e0165242b8c9e4b_250418_Connected%2520Data%2520Deck%2520Update%2520_USE%2520THIS%2520VERSION%2520-%2520Edits%2520Arthur-fixed.005.jpeg',
    ],
    video: 'https://res.cloudinary.com/dryyhpqew/video/upload/v1782509414/opmg-reel_ywwygm.mov',
    featured: false,
    summary: 'OPMG was preparing a global internal C-suite strategy presentation focused on operationalizing connected data across marketing, media, and CRM. The existing framework was rich in capabilities but lacked visual clarity and conceptual cohesion — especially in the most advanced sections. They needed a strategist/designer hybrid who could both understand and simplify the tech stack without dumbing it down.',
    theAsk: 'I was responsible for the most advanced and structurally critical section of the deck: illustrating how data signals across touchpoints are captured, modeled, enriched, and applied to drive business actions.',
    challenge: 'Think: from data ingestion to customer decisioning, in a language the CMO, CTO, and CRO could all align on.',
    solution: `• Audited OPMG’s signal taxonomy and frameworks to unify language across analytics, media, and creative teams
• Designed a layered “data journey” showing how first-, second-, and third-party data is captured, modeled, and activated
• Created a “signal grid” metaphor to visualize how deeper data drives +30%, +50%, +100% performance lifts
• Grounded strategy in real use cases like lead scoring, personalization, and pathing models to connect theory to outcomes`,
    outcome: `• Helped align senior leadership across creative, data, and media
• Visuals became a foundational part of OPMG’s 2025 strategy comms
• Created a reusable visualization system for future client pitches and training
• Transformed complex signal architecture into executive-aligned storytelling`,
  },

  {
    slug: 'underpin',
    client: 'Underpin',
    project: 'Startup Pitch Deck',
    format: 'Pitch & Investor Deck',
    industry: 'Travel Technology',
    year: 2023,
    tagline: 'A geo-centric travel app — pitched with the same sense of adventure.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be4b734c64f94bc3ac6_683f46bc9635b01c861b4d51_6819139b0d9ea810a65f631f_6747775ff4ff89bc7b93730f_Screenshot-Underpin.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be4b734c64f94bc3adc_6862e9200885c3f73f62633a_Screenshot%25202024-10-04%2520at%252016.56.48.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be4b734c64f94bc3ad9_6862e92804138be81c4c76c5_Screenshot%25202024-10-05%2520at%252008.19.50.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be4b734c64f94bc3acc_6862e92edd2a7be67bb285b6_Screenshot%25202024-10-05%2520at%252008.20.18.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be4b734c64f94bc3adf_6862e934382ed5c68b5b9949_Screenshot%25202024-10-05%2520at%252008.20.37.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be4b734c64f94bc3ae2_6862e938bbd3ea24c5b9b282_Screenshot%25202024-10-05%2520at%252008.20.58.jpeg',
    ],
    featured: false,
    summary: 'I designed an investor-grade pitch deck that clarified Underpin’s vision, simplified its complex model, and combined clean UX mockups with storytelling to win early-stage funding.',
    theAsk: 'Design an investor-ready pitch deck that explained the concept, proved demand, and mapped monetization with a clear go-to-market plan.',
    challenge: `• Value built on trust and network effects, hard to quantify; 
• Needed balance between technical clarity and user appeal; 
• Complex monetization model had to be simplified`,
    solution: `• Structured story around problem → solution → benefits → investment; 
• Used travel imagery, map pins, and UI mockups for clarity; 
• Simplified monetization into a clean flowchart; Backed traction with infographic-style stats`,
    outcome: 'The deck translated a complex app vision into a polished, emotionally appealing investor story that built confidence in Underpin’s potential.',
  },

  {
    slug: 'university-startups',
    client: 'University Startups',
    project: 'Pitch Deck — A Better Future for Students',
    format: 'Pitch & Investor Deck',
    industry: 'Education / EdTech',
    year: 2022,
    tagline: 'Social entrepreneurship — framed to inspire and fund.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be585c9b2f4b9712acd_6851c4054f42396e1e83c052_Portfolio_Slides_University-Startups-Pitch-Deck_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be585c9b2f4b9712aeb_6851c4241a2570d958e832a5_Portfolio_Slides_University-Startups-Pitch-Deck_0002.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be585c9b2f4b9712aee_6851c42476548e1008795a7a_Portfolio_Slides_University-Startups-Pitch-Deck_0004.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be585c9b2f4b9712af6_6851c42472abb3514053ed29_Portfolio_Slides_University-Startups-Pitch-Deck_0005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be585c9b2f4b9712af3_6851c424a711bafa36594da8_Portfolio_Slides_University-Startups-Pitch-Deck_0007.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be585c9b2f4b9712ae8_6851c4257e6e6548ab51d85c_Portfolio_Slides_University-Startups-Pitch-Deck_0014.jpeg',
    ],
    featured: false,
    summary: 'University Startups was building a platform to bridge the gap between university innovation and real-world commercialization. Their mission: help academic founders turn big ideas into viable ventures by streamlining access to funding, mentors, and go-to-market resources. But to raise capital themselves, they needed a pitch deck that felt less like a research abstract and more like a business case. I partnered with their founding team to bring clarity to their model, focus to their message, and visual structure to a complex ecosystem story—resulting in a deck that positioned them as both visionary and credible.',
    theAsk: 'Create a fundraising deck that explained the model, sharpened the investor hook, and turned academic credibility into venture-ready traction.',
    challenge: 'Mission was strong but hard to explain at scale; Narrative drifted into academia, visuals lacked clarity; Each slide had to both educate and convince',
    solution: `• Reframed story around mission and impact; 
• Used bold layouts, colors, and photography for clarity; 
• Added student and founder stories to humanize outcomes; Mapped ecosystem partners to ground the model`,
    outcome: 'The deck positioned University Startups as credible, compelling, and scalable, translating academic strength into investor appeal.',
  },

  {
    slug: 'mcs-healthcare-lupus',
    client: 'Lupus Association × JPMorgan',
    project: 'Lupus Awareness Campaign Deck',
    format: 'Executive Presentation',
    industry: 'Healthcare / Finance',
    year: 2024,
    tagline: 'A sensitive subject — handled with authority and care.',
    images: [
      `${CDN}/MCS-Healthcare-Lupus-JPM-01.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-02.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-03.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-04.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-05.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-06.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-07.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-08.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-09.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-10.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-11.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-12.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-13.jpg`,
      `${CDN}/MCS-Healthcare-Lupus-JPM-14.jpg`,
    ],
    featured: false,
    summary: 'Lupus doesn\'t look like what most people expect. That invisibility — the gap between how someone appears and how they feel — was the central challenge of this deck. Created through MCS Healthcare for JPMorgan\'s wellness and advocacy initiative, the goal was to transform clinical data into a story that moved decision-makers to act. Not a brochure. Not a report. A case for why this disease deserves more attention, more funding, and more seats at the table.',
  },

  {
    slug: 'rapp-spectrum-enterprise',
    client: 'Spectrum Enterprise × RAPP',
    project: 'Creative Immersion Session',
    format: 'Sales & Agency Deck',
    industry: 'Telecommunications',
    year: 2023,
    tagline: 'Agency thinking — made tangible for an enterprise client.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1473ae2fd117e5f13_683f46bad2c7f4eec55f8758_6830b0d200991d0e8d6cdabc_Portfolio_Slides_RAPP-Spectrum_0001.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1473ae2fd117e5f28_6862f9d066975ab1d2ffe76f_Portfolio_Slides_RAPP-Spectrum-Workshop_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1473ae2fd117e5f10_6862f9e04f75134e66035c19_Portfolio_Slides_RAPP-Spectrum-Workshop_0003.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1473ae2fd117e5f22_6862f9f052fcbef841633ac6_Portfolio_Slides_RAPP-Spectrum-Workshop_0005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1473ae2fd117e5f1f_6862f9febb1d3ae9dfb2d6a1_Portfolio_Slides_RAPP-Spectrum-Workshop_0008.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1473ae2fd117e5f19_6862fa09a37f212a69af01f4_Portfolio_Slides_RAPP-Spectrum-Workshop_0017.jpeg',
    ],
    featured: false,
    agency: 'RAPP',
    summary: 'RAPP hosted a strategic immersion workshop for Spectrum Enterprise to establish creative alignment, revisit brand positioning, and uncover communication opportunities across their B2B offerings. The goal was to bridge internal silos and create a cohesive narrative that would inform campaigns moving forward.I developed a modular deck system that blended enterprise-scale themes (technology, infrastructure, data) with emotionally resonant visuals (human connection, trust, diversity). The structure was deliberately color-coded and animated to guide participants through each phase of the session — from historical relationship timelines to brand strategy discussion points.',
    theAsk: 'Design an immersive, branded deck to guide a multi-agency workshop, clarify Spectrum Enterprise’s brand journey and goals, and visualize a roadmap for creative collaboration with RAPP.',
    challenge: `• Translating complex enterprise offerings into engaging, accessible visuals
• Balancing technical credibility (infrastructure, data) with emotional storytelling (trust, connection)
• Maintaining visual consistency across 12+ speakers and modules
• Building navigation and energy into a full-day workshop experience`,
    solution: `• Structured the deck into 8 color-coded modules with animation cues for seamless flow
• Combined high-tech backdrops with human-centered visuals to balance scale and warmth
• Included agenda breadcrumbs, relationship timelines, and strategic priority highlights
• Blended RAPP’s identity with Spectrum’s guidelines to foster co-ownership`,
    outcome: `• Reinforced strategic trust between RAPP and Spectrum Enterprise through clear visual framing
• Enabled better alignment across departments on priorities and audience needs
• Sparked new briefs and accelerated B2B brand development conversations
• Laid the groundwork for future co-developed messaging strategies and campaigns`,
  },

  {
    slug: 'projectbe-colorcode',
    client: 'ProjectBe — ColorCode',
    project: 'Brand Pitch Deck',
    format: 'Pitch & Investor Deck',
    industry: 'Consumer Technology',
    year: 2023,
    tagline: 'A brand concept — pitched with the confidence to match.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be166157f9f5c872c1f_683f46baca9d98ac51fa6b09_68191399b5f7d0203015acf2_6747787266a1e6bb456d3ae4_Portfolio_Slides_ProjectBe-ColorCode-Workshop_0003.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be166157f9f5c872c1c_6862f9481af818d9b1e54699_Portfolio_Slides_ProjectBe-ColorCode-Workshop_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be166157f9f5c872c17_6862f956e1d535ec33022931_Portfolio_Slides_ProjectBe-ColorCode-Workshop_0004.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be166157f9f5c872c2f_6862f95e7ca0376bedefa387_Portfolio_Slides_ProjectBe-ColorCode-Workshop_0005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be166157f9f5c872c23_6862f976c4b351f97af5aec5_Portfolio_Slides_ProjectBe-ColorCode-Workshop_0013.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be166157f9f5c872c2b_6862f982b0cfb705acf44883_Portfolio_Slides_ProjectBe-ColorCode-Workshop_0019.jpeg',
    ],
    featured: false,
    summary: 'Anya, founder of Project Be, wanted to introduce the science of ColorCode personality profiling to her audience of adult learners. She asked me to design a dynamic, story-driven presentation to make the model both memorable and actionable. The audience: ambitious, curious individuals interested in improving their relationships and self-awareness.',
    theAsk: 'Design a workshop deck that introduced the Color Code personality framework in an engaging, easy-to-grasp way for a diverse client audience.',
    challenge: `• Abstract psychology concepts risked feeling academic and dry
• Participants had varying familiarity with personality frameworks
• Needed a balance between credibility and interactivity
• Workshop materials had to be flexible for future reuse`,
    solution: `• Created story-driven slides blending bold visuals with simplified psychology concepts
• Designed interactive exercises to let participants map their own personality types
• Used color-coded visual system for clarity and memorability
• Built modular deck adaptable for both in-person and virtual sessions`,
    outcome: 'Delivered an interactive workshop that made the Color Code framework accessible and memorable, energizing participants, sparking conversation, and giving Project Be a reusable tool for future trainings.',
  },

  // ── ADDITIONAL PROJECTS (from Webflow) ────────────────────────────────────

  {
    slug: 'rapp-and-evolus',
    client: 'Evolus',
    project: 'A Lifestyle-Driven Pharma Pitch Deck That Breaks the Mold',
    format: 'Pitch & Investor Deck',
    industry: 'Pharmaceutical',
    year: 2023,
    tagline: 'Helping a global agency cut through clinical clutter with a lifestyle-first, high-touch pitch deck for a modern aesthetics brand.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be15b2139addb3912b6_683f46ba0845e65a13ecb3a3_6830b476a23481588a2f808f_Portfolio_Slides_RAPP-Evolus-Pitch-Deck_0007.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be15b2139addb3912c3_6862fa6edd2a7be67bbc8e2f_Portfolio_Slides_RAPP-Evolus-Pitch-Deck_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be15b2139addb3912d0_6862fa7c32d1c7376f1aaf8e_Portfolio_Slides_RAPP-Evolus-Pitch-Deck_0005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be15b2139addb3912c0_6862fa8499a8ac60a2ae040e_Portfolio_Slides_RAPP-Evolus-Pitch-Deck_0006.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be15b2139addb3912ba_6862fa932d4e0097514a1570_Portfolio_Slides_RAPP-Evolus-Pitch-Deck_0011.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be15b2139addb3912c7_6862faa2093165a77379f32d_Portfolio_Slides_RAPP-Evolus-Pitch-Deck_0018.jpeg',
    ],
    featured: false,
    agency: 'RAPP',
    summary: 'Evolus is not your average pharma brand. Disrupting the aesthetics market with a bold, lifestyle-forward take on neurotoxins, Evolus needed a creative partner who could match that energy. RAPP, the global agency tasked with winning the account, reached out to develop a pitch deck that could both respect the clinical category and break out of its generic, overly-medical tropes. The result? A deck that felt more like a fashion campaign than a sales tool—without losing an ounce of strategy.',
    theAsk: 'Design a bold immersion deck to position Evolus as a disruptive aesthetics brand and align RAPP’s creative strategy with leadership.',
    challenge: `• Needed balance between pharma credibility and lifestyle energy; 
• Risk of content feeling too clinical; 
• Highly competitive aesthetics market required standout storytelling.`,
    solution: `• Created story-driven deck with bold visuals and lifestyle imagery; 
• Integrated consumer insights with emotional storytelling; 
• Designed modular layouts optimized for pitch delivery.`,
    outcome: `• Positioned Evolus as a disruptive challenger brand; 
• Equipped RAPP with a polished, energetic pitch tool that inspired confidence and creative alignment.`,
  },

  {
    slug: 'special-forces-project-starzplay',
    client: 'Starz',
    project: 'Special Forces Insights for StarzPlay UK',
    format: 'Executive Presentation',
    industry: 'Media / Entertainment',
    year: 2023,
    tagline: 'To help StarzPlay grow in the UK, Special Forces NYC ran a multi-phase insights program decoding British TV culture and its influence on VOD habits through semiotics, expert panels, and consumer research.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be13e4f05627924bc16_684dbcb524b78bf7f3c77680_Slide1.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be23e4f05627924bc2a_684dbcecc224e9fca39c55ec_Slide2.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be23e4f05627924bc39_6862f7e71e7f890c70a412bb_Slide3.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be23e4f05627924bc3c_6862f7ee479a7bf36da9f730_Slide5.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be23e4f05627924bc2d_6862f7fc5eb467cee1e99077_Slide7.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be23e4f05627924bc1c_6862f81cad26c7ceb2a7045a_Slide11.jpeg',
    ],
    featured: false,
    agency: 'Special Forces',
    summary: 'When StarzPlay UK needed to decode consumer behavior like a black ops mission, they tapped Special Forces Insights—and me—to design a high-stakes research and debrief deck. This wasn’t your average PowerPoint: it distilled complex data into a sharp, visual narrative that armed executives with actionable insights for strategic decisions. The result? A deck that didn’t just inform—it engaged, aligned, and empowered the StarzPlay team to execute with precision.',
    theAsk: 'Translate complex UK market insights into a clear, executive-ready deck to guide StarzPlay’s strategy.',
    challenge: 'Dense consumer data risked overwhelming; Needed clarity for executives; Insights had to be reframed as opportunities',
    solution: `• Structured narrative from context to insights to growth levers; 
• Simplified data into visual frameworks and story-led charts; 
• Conducted ethnographic deep dive, semiotics, and expert interviews`,
    outcome: 'The deck turned raw research into a strategic story that clarified opportunities and enabled executive alignment.',
  },

  {
    slug: 'the-special-event-company-20-b7a3c',
    client: 'The Special Event Company',
    project: 'The Special Event Company Capabilities Fully Animated Deck',
    format: 'Sales & Agency Deck',
    industry: 'Event Production',
    year: 2023,
    tagline: 'The Special Event Company is a woman-owned, award-winning agency known for producing live and virtual events worldwide. They needed a bold, fully animated PowerPoint deck to showcase their offerings and track record with a premium yet accessible look.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be40d989266b83f5c09_683f46bcb6954e3694ccdeac_6830a12061286329fcf3faaf_Portfolio_Slides_The-Special-Event-Company-Capabilities-Deck_0005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be40d989266b83f5c21_6862ecae4f75134e66fb893d_Portfolio_Slides_The-Special-Event-Company-Capabilities-Deck_0004.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be40d989266b83f5c0f_6862ecc3d1b2819f62bcaa92_Portfolio_Slides_The-Special-Event-Company-Capabilities-Deck_0006.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be40d989266b83f5c30_6862eccdfdd1c205da06f415_Portfolio_Slides_The-Special-Event-Company-Capabilities-Deck_0007.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be40d989266b83f5c1d_6862ecdd6003c768f84734d5_Portfolio_Slides_The-Special-Event-Company-Capabilities-Deck_0009.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be40d989266b83f5c43_6862ece77ca0376bede7eddf_Portfolio_Slides_The-Special-Event-Company-Capabilities-Deck_0012.jpeg',
    ],
    featured: false,
    summary: 'I transformed a content-rich but disjointed presentation into a polished, fully animated deck that spotlighted the agency’s achievements, clarified its services, and delivered a premium client-ready experience.',
    theAsk: 'Create a polished and fully animated capabilities presentation that captures the agency’s expertise, energy, and approach, while helping them stand out in high-stakes pitch meetings.',
    challenge: `• Strong content lacked cohesion and visual impact
• Needed an engaging narrative and elevated design from scratch
• Animation had to enhance, not distract
• Required polish for C-level pitches and flexibility across industries`,
    solution: `• Built a dynamic two-part flow: What We Do and How We Do It
• Added custom transitions and smooth animation logic to hold attention
• Used bold typography to spotlight key stats and milestones
• Designed photo-led layouts highlighting real events
• Structured service pillars in grid layouts for clarity
• Created process visuals mapping Strategy → Evaluation
• Delivered a fluid, premium deck that’s easy to narrate in meetings`,
    outcome: 'The deck became a cornerstone of the agency’s client outreach, helping land new business by articulating both depth and creativity. It elevated their perception with enterprise prospects and brought visual unity to their pitch process. The client was thrilled with the animation pacing and how the design helped crystallize their identity.',
  },

  {
    slug: 'sunrise-cellars',
    client: 'Sunrise Cellars',
    project: 'Rebranding Old Wine Stores to Become a Future-proof high-end, One-Stop Shop for Wine Lovers',
    format: 'Strategic Narrative',
    industry: 'Retail / E-Commerce',
    year: 2025,
    tagline: 'From supermarket aisle to boutique destination: I rebranded Sunrise Cellars into a premium wine store that celebrates discovery, craftsmanship, and everyday celebration.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/6956eb4e7518df320589d308_sunrise-cellars-storefront-2.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68c5de10a85b8ac60cc87dfb_Logo%20Sunrise%20Cellars%20Bottle%20Inside%202.jpg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68c5de2d98761777c79f7f3b_Logo%20Sunrise%20Cellars%20Variations%20Wine%20Stains%20and%20Glass.jpg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68c5de4537bccaed9d448c08_Logo%20Sunrise%20Cellars%20Glass%20Waves.jpg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68c5de5e8051364d2bcd9a7b_Logo%20Sunrise%20Cellars%20Shadows-Sunrise-Circle.jpg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68c5de9619427f4cb3d23d23_Screenshot%202025-09-11%20at%203.28.27%E2%80%AFPM.webp',
    ],
    featured: false,
    summary: 'Sunrise Cellars, with two stores in Westfield and Caldwell, NJ, wanted to evolve from their ShopRite-affiliated roots into a boutique wine destination. I guided the full transformation — from brand positioning and logo design to e-commerce optimization and promotional campaigns. The new identity highlights curated wines, natural and biodynamic selections, and a warm, expert tone of voice that resonates with both loyal locals and new customers. The result is a brand that feels modern, premium, and rooted in community.',
    theAsk: 'Rebrand two NJ wine shops into a boutique destination with a stronger identity, curated selection, and upgraded customer experience.',
    challenge: `•	Legacy branding tied to ShopRite made the stores feel generic
•	Needed to stand out in a crowded retail market
•	Website design and e-commerce lacked visual appeal and usability
•	Customer perception didn’t reflect the curated, boutique-quality wine selection`,
    solution: `•	Developed new logo concepts inspired by sun, soil, and grapes
•	Crafted a refined brand identity aligned with boutique positioning
•	Redesigned e-commerce visuals for clarity, elegance, and conversion
•	Curated wine promotions (organic, biodynamic, natural) with lifestyle-driven storytelling`,
    outcome: 'Positioned Sunrise Cellars as a distinctive boutique wine destination, elevating the in-store and online experience while signaling expertise and curation to customers.',
  },

  {
    slug: 'adm-prod-tgi-fridays-campaign',
    client: 'TGI Fridays Franchisor, LLC',
    project: 'Designing Impactful Visuals for a Food Franchisor\'s Keynote Event',
    format: 'Training Presentation',
    industry: 'Lifestyle / Consumer',
    year: 2023,
    tagline: 'Bringing sizzle to the stage: A bold, brand-forward visual campaign designed to unite global franchisees under one electrifying rallying cry — Ignite the Future.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdcb9f8ccfbb9fdf2e1_683f46b52e4ac4e436ea4e5d_6813b5af24a988ed532fb035_ADM-Prod-TGIF-IMG-1.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb9f8ccfbb9fdf2ee_6857ffa759d5e8647cff4794_ADM-Productions-TGIF-1.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb9f8ccfbb9fdf2f4_6857ffa73c86e278c148b5e4_ADM-Productions-TGIF-2.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb9f8ccfbb9fdf2f8_6857ffa73c86e278c148b5e9_ADM-Productions-TGIF-3.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb9f8ccfbb9fdf2f1_6857ffa79dc863770469a7d4_ADM-Productions-TGIF-4.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb9f8ccfbb9fdf300_68640491a2c22b47bb851c6c_ADM-Productions-TGIF-5.webp',
    ],
    featured: false,
    agency: 'ADM Productions',
    summary: 'TGI Fridays teamed up with ADM Productions to develop the full visual identity and screen content for its 2020 Global Business Conference. Tasked with building cohesion and energy across a multi-day leadership summit, we brought the brand’s bold voice and iconic flavor to life through layered motion graphics, nostalgic callouts, and cheeky visual storytelling — all grounded in a high-energy theme: “Ignite the Future.”',
    theAsk: 'Develop a full-stage visual language for a high-stakes global business conference.Design a look and feel that celebrates the brand’s past while galvanizing franchise owners and execs around a future-forward growth agenda.Unite diverse stakeholders with punchy, brand-immersive storytelling.',
    challenge: `• Create excitement while balancing business content and entertainment
• Maintain TGI Fridays’ edgy and nostalgic tone without feeling outdated
• Ensure consistency across video, slides, historical visuals, and food-centric storytelling
• Design for a massive LED screen backdrop, with animation synced to live presenter pacing`,
    solution: `• Designed motion-driven conference visuals anchored by the “IGNITE” theme
• Used metaphors like a deconstructed burger to symbolize brand layers
• Celebrated heritage with retro menu modules and iconic inventions
• Delivered custom animations, logo lockups, and seamless screen transitions for an immersive experience`,
    outcome: `• Energized hundreds of global attendees and franchisees with a unified creative thread
• Successfully reinforced brand legacy while repositioning Fridays for future relevance
• Created a re-usable asset library for regional markets and future leadership events
• Strengthened ADM’s relationship with the client through bold creative execution under tight production timelines`,
  },

  {
    slug: 'norigami-brand',
    client: 'Norigami',
    project: 'Designing a Full Food Startup Brand that Looks just like an Established Company',
    format: 'Strategic Narrative',
    industry: 'Startup / Venture',
    year: 2016,
    tagline: 'The lovechild of sushi and a sandwich, NORIGAMI’s bold brand identity slices through the noise with playful icons, witty copy, and color-coded clarity — proving healthy grab-and-go can be fresh, fun, and undeniably irresistible.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be000503ee3a477741e_686415fc502facd5e188b6bd_Norigami16361BLACKJPEG.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be000503ee3a47773ed_68641e3ed42bb5a09b007633_Norigami%2520Branding%2520-%25201.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be000503ee3a47773e7_68641e45f358441e4c0a9a61_Norigami%2520Branding%2520-%25202.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be000503ee3a47773ea_68641e4954b9a4c71085f556_Norigami%2520Branding%2520-%25203.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be000503ee3a47773f0_68641e4df3d10d25167081a0_Norigami%2520Branding%2520-%25204.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be000503ee3a4777421_68641e8738499ab6581c15c5_Screen%2520Shot%25202017-03-20%2520at%252017.46.14.png',
    ],
    featured: false,
    summary: 'NORIGAMI set out to redefine grab-and-go meals with a disruptive new concept: sushi sandwiches. I crafted a bold brand strategy and visual identity featuring playful dietary icons, striking black-and-white design with vibrant color coding, and messaging that made this innovative product instantly understandable and crave-worthy. The result? A standout brand that turned unfamiliar into undeniable.',
    theAsk: 'Create a disruptive food brand from scratch, blending identity, strategy, and visual storytelling.',
    challenge: `• Highly competitive London F&B market; 
• Needed identity with strong cultural roots; 
• Brand had to impress investors and connect with consumers.`,
    solution: `• Developed full identity system including name, logo, and packaging; 
• Built brand narrative and launch strategy; 
• Designed investor materials.`,
    outcome: 'Launched Norigami as a polished, resonant brand that impressed investors and won market attention.',
  },

  {
    slug: 'foodspace-lunch-learn-robotics',
    client: 'FoodSpace',
    project: 'Designing a Lunch & Learn Keynote for Architects: How Technology will change to ',
    format: 'Training Presentation',
    industry: 'Consulting / Foodservice',
    year: 2021,
    tagline: 'A futurist keynote designed to spark industry dialogue around AI, drones, and automation in foodservice.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc1ad3328c9238f815_683f46b79c13731e76da486f_6830b87dfa3aa9beff77c463_Foodspace%2525201_1.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd1ad3328c9238f829_6863ea401f1cace33397e65e_Foodspace%25202.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd1ad3328c9238f833_6863ea4c5f67b85150ffe0ce_Foodspace%25203_1.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd1ad3328c9238f83f_6863ea51f22100b412ec18a4_Foodspace%25204.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd1ad3328c9238f83c_6863ea5f57fb2a1ec0366b2a_Foodspace%25206.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd1ad3328c9238f821_6863ea69b7ba49c2fedab4de_Foodspace%25207.jpeg',
    ],
    featured: false,
    summary: 'This internal presentation, created for a FoodSpace Lunch & Learn, explored cutting-edge technologies reshaping food retail—from aerial shelf scanning to AI-driven kitchen ops. I built a modular, keynote-style deck that balanced vision and technical realism to provoke discussion and align teams on innovation priorities.',
    theAsk: 'FoodSpace requested a keynote-style deck for an internal Lunch & Learn session aimed at inspiring cross-functional teams around the future of foodservice technology. The theme was intentionally provocative: how robotics, automation, and inspiration (“eyes in the sky”) will reshape the way food is prepared, distributed, and monitored across retail chains.',
    challenge: `• The content was a mix of known tech and speculative innovation, which meant we needed to strike a balance between inspiration and credibility. 
• The audience ranged from operations staff to senior leadership, requiring layered messaging that didn’t alienate non-technical participants. 
• The subject matter, kitchen robots, AI vision, predictive inventory, also risked feeling cold or dystopian if not carefully framed.`,
    solution: `• I crafted a narrative that fused speculative storytelling with grounded case studies. 
• The deck opened with a high-energy teaser about the future of automation, then moved through themed sections: vision, movement, precision, and intelligence. 
• Each module was illustrated with rich visuals and real-world analogs to make the concepts tangible. 
• We used cinematic imagery, UI mockups, and annotated diagrams to stimulate curiosity while reinforcing feasibility.`,
    outcome: `• The session prompted lively internal discussion and sparked follow-up from multiple departments interested in integrating aspects of the tech roadmap. 
• More than just an educational deck, the presentation positioned innovation as a company-wide mindset and made the future of automation feel engaging, accessible, and actionable.
• The visual asset has since been reused for onboarding and investor demos.`,
  },

  {
    slug: 'grey-slide-sample-1-8439d',
    client: 'Post Consumer Brands',
    project: 'Designing a New Business Pitch Deck for a huge FMCG Brand',
    format: 'Pitch & Investor Deck',
    industry: 'FMCG / Consumer Goods',
    year: 2023,
    tagline: 'A compelling new business pitch for Post Consumer Brands, crafted with clarity, style, and confidence.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd74bd6bad207096f2_683f46b76275674a59bcf4a7_681913986835d6d2e0200b32_674779f36d564cb0b1eaf62e_220216_Grey_Mini-Brief_Arthur_Liegeois.001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd74bd6bad20709702_6863e997ffbceef6fd6cf5ab_220216_Grey_Mini-Brief_Arthur_Liegeois.003.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd74bd6bad20709707_6863e9a0b7ba49c2feda38de_220216_Grey_Mini-Brief_Arthur_Liegeois.005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd74bd6bad20709711_6863e9a70405eee179ce6588_220216_Grey_Mini-Brief_Arthur_Liegeois.006.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd74bd6bad20709718_6863e9b2e948cee4ea60f8b0_220216_Grey_Mini-Brief_Arthur_Liegeois.008.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd74bd6bad207096fc_6863e9ca089346c20dc23002_220216_Grey_Mini-Brief_Arthur_Liegeois.010.jpeg',
    ],
    featured: false,
    agency: 'Grey',
    summary: 'I was tasked by Grey to bring storytelling and design discipline to a major new business opportunity. The pitch deck combined insight-driven slides with bold creative to tell Post’s growth story across breakfast innovation, family appeal, and cultural relevance—while maintaining a crisp, modern visual style throughout.',
    theAsk: 'Design a pitch deck for Grey to pitch for Honey Bunch of Oats to Post Consumer Brands.',
    challenge: `• The biggest challenge was navigating multiple stakeholders, strategy leads, creatives, account directors, each with different takes on tone, message, and structure. 
• The deck had grown too long and redundant during internal iteration. We needed to distill a sea of ideas into a concise, energetic pitch that told a compelling story. 
• Visually, it had to feel contemporary but still resonate with Post’s family-centric legacy.`,
    solution: `• I led a structural and visual overhaul, streamlining the pitch into clear chapters that mapped to Post’s business objectives. 
• The story arc moved from insight to opportunity to execution, using bold editorial slides, minimal copy, and audience-centered framing. Design cues balanced clean grids and whitespace with playful references to Post’s product portfolio. 
• Each slide reinforced momentum, helping Grey’s team tell a sharp, unified story.`,
    outcome: `• The new business pitch was not only visually elevated but also more focused and persuasive. 
• It gave Grey’s presenters a clear narrative structure to follow, and clients remarked on the clarity and polish of the final deck. 
• While the outcome of the pitch is proprietary, the process helped sharpen Grey’s creative storytelling approach for future RFPs and set a new internal standard for deck excellence.`,
  },

  {
    slug: 'ogilvy-for-cdw-1-98a9e',
    client: 'CDW',
    project: 'Designing a New Business Pitch Deck to online tech store CDW',
    format: 'Pitch & Investor Deck',
    industry: 'Technology',
    year: 2023,
    tagline: 'For a high-stakes pitch, Ogilvy brought me in to design a sharp, on-brand deck that positioned them as CDW’s ideal creative partner—blending storytelling, clarity, and strategic depth.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfc6bc26fb514f154d_683f46bc8b93d68c0fad3ce8_6830b6c49e2f1ea7689992ce_Portfolio_Slides_Ogilvy-CDW_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfc6bc26fb514f155f_6862e81dfdd1c205da0451ad_Portfolio_Slides_Ogilvy-CDW_0002.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfc6bc26fb514f157b_6862e83ae4911f2298180789_Portfolio_Slides_Ogilvy-CDW_0007.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfc6bc26fb514f157e_6862e854cabc4a262bbd5cf9_Portfolio_Slides_Ogilvy-CDW_0013.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfc6bc26fb514f1587_6862e8787ef8abe172aee422_Portfolio_Slides_Ogilvy-CDW_0016.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfc6bc26fb514f1573_6862e89e6ed2433eb39e1e56_Portfolio_Slides_Ogilvy-CDW_0025.jpeg',
    ],
    featured: false,
    agency: 'Ogilvy',
    summary: 'Ogilvy needed a high-impact deck that could confidently communicate the agency’s multi-practice capabilities while resonating with CDW’s specific B2B context.',
    theAsk: `This included showcasing:• Ogilvy’s five business units
• Their unified yet modular service model
• Sector-specific B2B experience
• Global scale and tech fluency
• All within a cohesive, emotionally intelligent narrative that emphasized creative firepower and strategic depth.`,
    challenge: `• The deck needed to speak to both marketing and procurement stakeholders — marrying creativity with business rigor
• CDW operates in a complex, solution-driven B2B space, requiring more than flashy visuals — every slide had to earn its place
• Internal stakeholders at Ogilvy wanted to present both horizontal integration and vertical expertise without overwhelming the client`,
    solution: `• Built narrative around “impact happens at the intersection,” Ogilvy’s core idea
• Highlighted five verticals with distinct but connected design blocks
• Designed modular layouts to navigate seamlessly across disciplines
• Added B2B proof points with logos, maps, and sector casework
• Kept storytelling human, distilling complexity into plain, relatable themes`,
    outcome: `• The deck served as the anchor narrative for Ogilvy’s relationship-building with CDW and aligned all practice leads under a single storytelling framework.
• Design and story choices made the agency’s breadth feel empowering, not overwhelming.
• Helped reinforce Ogilvy’s position as a modern, tech-competent creative powerhouse with depth in B2B.`,
  },

  {
    slug: 'international-advertising-association',
    client: 'IAA',
    project: 'Designing a new homepage for high-level marketing community event producers',
    format: 'Strategic Narrative',
    industry: 'Creative Agencies',
    year: 2024,
    tagline: 'A global reboot of the IAA’s web presence—clean, international, and built for a content-first future.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdf6a8af1081bc603a1_6863e8dc152147a164033a70_IAA-Website-Figma-Slide1.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdf6a8af1081bc603a5_6863e8dc152147a164033a70_IAA-Website-Figma-Slide1.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdf6a8af1081bc603a8_6863e8e1486b458fc2387b52_IAA-Website-Figma-Slide2.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdf6a8af1081bc603b9_6863e8e70a390fe0b89fc109_IAA-Website-Figma-Slide3.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdf6a8af1081bc603b4_6863e8ee44cb10580c9a655f_IAA-Website-Figma-Slide4.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdf6a8af1081bc603b1_6863e8f1c7486f209709cd43_IAA-Website-Figma-Slide5.webp',
    ],
    featured: false,
    summary: 'I designed a fully responsive, CMS-powered website for the International Advertising Association to support their worldwide initiatives. From member directories to thought leadership libraries, the platform is structured for scale and accessibility. The visual style strikes a balance between institutional credibility and global creative energy.',
    theAsk: 'The International Advertising Association (IAA) needed a complete overhaul of its global website — one that could support its multi-region operations, highlight its thought leadership, and offer a user-friendly experience to members worldwide. Their old website had become fragmented, slow, and difficult to update, making it hard for IAA to represent itself as a modern, globally connected organization.',
    challenge: 'IAA’s challenge was both technical and strategic: How do you build a digital presence that works equally well for visitors in Mumbai and New York, for students and CEOs, and for showcasing both regional and global content? The structure had to be scalable, intuitive, and on-brand, but also flexible enough for different regional teams to update their own pages. The existing content was outdated and inconsistent, requiring significant editorial restructuring and content strategy support.',
    solution: 'I designed and developed a clean, responsive website with a modular CMS that allows each IAA chapter to contribute and update content while preserving brand consistency. The information architecture was restructured around three core pillars: community, education, and advocacy. I created templates for events, news, leadership bios, and membership tiers, and integrated search and filter tools for easy navigation. The design language emphasized clarity, international accessibility, and visual storytelling.',
    outcome: 'The result is a future-proof digital home for IAA that reflects its global reach and mission. The centralized yet flexible CMS empowers local chapters to manage their own content, while the overarching brand voice and visual consistency reinforce IAA’s leadership in global advertising discourse. Engagement improved across key regions, and the platform now serves as both an advocacy hub and a membership engine for the organization.',
  },

  {
    slug: 'bloomberg-media-internal-dei-strategy',
    client: 'Bloomberg Media Group',
    project: 'Designing a fully detailed Internal DE&I Strategy Deck for the C-Suite',
    format: 'Executive Presentation',
    industry: 'Media / Entertainment',
    year: 2023,
    tagline: 'Designed an internal DE&I presentation deck for Bloomberg Media Group, transforming employee initiatives into a compelling visual story that celebrates inclusion, leadership, and cultural strategy.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc7810dcc814492b87_683f46b55977bd8d0d0d5f5c_6819139d02a93f8d215cb6a5_67004856b1c3c47b922e2d57_Bloomberg%252525201_1.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc7810dcc814492bb3_6862cc738f394c54997f965c_Portfolio_Slides_Bloomberg-Internal-Deck_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc7810dcc814492ba3_6851c2b648cc2b1acdc7c6bd_Portfolio_Slides_Bloomberg-Internal-Deck_0002.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc7810dcc814492baa_6851c2b6ddbdf7d50b86bce5_Portfolio_Slides_Bloomberg-Internal-Deck_0003.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc7810dcc814492bbf_6851c2b6df6881c80e29e236_Portfolio_Slides_Bloomberg-Internal-Deck_0005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc7810dcc814492bb9_6851c2b64010fbe1f81e850e_Portfolio_Slides_Bloomberg-Internal-Deck_0004.jpeg',
    ],
    featured: false,
    summary: 'Bloomberg Media Group engaged me to elevate an internal DE&I presentation for their People & Culture team. The objective was to bring clarity, structure, and polish to a complex and layered initiative spanning onboarding, events, leadership development, recognition, and wellness. Working closely with the Corporate DE&I Director, I translated diverse topics into a coherent narrative, using a modular slide system and Bloomberg’s brand voice to ensure executive-level clarity and emotional resonance.',
    theAsk: 'To visually structure and elevate a multi-topic presentation covering DE&I programs, people operations, macro trends, internal feedback, and employee development, all under one unified internal story.',
    challenge: 'The content was fragmented, word-heavy, and lacked hierarchy, making it hard for audiences to follow or feel inspired. Key ideas were buried. Visual consistency and messaging structure were missing across slides, and the narrative impact didn’t reflect the ambition of the program.',
    solution: `I built a modular, editorial-style slide system that:• Established a clear grid and typographic hierarchy
• Balanced data, programs, and people through storytelling
• Integrated real photography and custom icons for clarity
• Applied minimalist layouts with branded accents for cohesion
• Structured the flow from macro context → strategy → personal impact
Slide themes ranged from cultural trends and DE&I practices to leadership, well-being, and career growth.`,
    outcome: 'The final presentation was used across departments and C-level leadership to align teams around shared goals, DE&I strategy, and annual programming. It helped the People Ops team articulate their value in a clear, organized, and inspiring way, while reinforcing Bloomberg’s commitment to inclusion and conscious leadership.',
  },

  {
    slug: 'norigami-slide-1-7cc23',
    client: 'Norigami',
    project: 'Designing an Engaging Investor Pitch Deck for a Food Startup that closed the deal.',
    format: 'Pitch & Investor Deck',
    industry: 'Startup / Venture',
    year: 2019,
    tagline: 'A purpose-driven food brand redefining grab-and-go with sushi-quality, allergen-free onigirazu sandwiches and a bold mission to inspire healthier living.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfa84275b62afc2380_683f46b92e72db1f2d110787_68309fb7df4279c00afb4700_61dae6922083443c2c7ee4e8_220104_Static_Image.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfa84275b62afc237d_686405a9cfe2f9ac63ebb1c0_Norigami%2520-%2520Deck%2520-%2520Slide%25201.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfa84275b62afc239f_686406541f511dc01ea8fc52_Screenshot%25202024-10-07%2520at%252014.17.40.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfa84275b62afc23a6_6864065add3d1cc081436f22_Screenshot%25202024-10-07%2520at%252014.18.07.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfa84275b62afc2390_68640660c2ed341aabd07578_Screenshot%25202024-10-07%2520at%252014.19.22.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdfa84275b62afc2393_68640674efcfcb25532d8030_Screenshot%25202024-10-07%2520at%252014.19.46.jpeg',
    ],
    featured: false,
    summary: 'Norigami is a London-based food startup revolutionizing the grab-and-go category with a Japanese twist: Onigirazu — handheld rice sandwiches with premium fillings. This investor pitch deck was designed to help secure £400,000 in funding to launch Norigami’s first fixed-location store after validating the product through pop-ups and corporate catering. The brand pairs culinary innovation with wellness, tech-driven retail, and a deep sense of purpose — blending bold visual storytelling with mission-first positioning to engage investors and partners.',
    theAsk: 'Secure £400,000 in seed funding (SEIS/EIS advance assurance approved) in exchange for 15–20% equity to open Norigami’s first retail location in central London, optimize operational capabilities, and build out a scalable, tech-based, multi-channel expansion strategy.',
    challenge: 'Although the UK grab-and-go market is booming, it’s saturated with processed, bread-based, and nutritionally weak options. Food intolerances are rising, and consumers are demanding more innovation, transparency, and authenticity — but few players deliver. Norigami needed a compelling story and clear value proposition to stand out and resonate with purpose-driven investors.',
    solution: `• Designed narrative-rich pitch deck linking market trends, health awareness, and Japanese culture
• Structured clear problem/solution framework with founder-led storytelling
• Showcased product-market fit through pop-up success, press, and influencer traction
• Outlined scalable growth model (shops, kiosks, delivery, tech stack) and exit roadmap
• Applied minimal, modern identity that mirrored the brand’s personality`,
    outcome: `• Raised investor interest and began early-stage funding conversations
• Successfully positioned Norigami as a scalable, ethical, and forward-looking F&B brand
• Garnered continued press visibility and new collaboration offers from major corporate partners (e.g., Goldman Sachs, Facebook, Selfridges, WeWork)
• Built strong investor confidence through credible market analysis and a strong narrative of growth`,
  },

  {
    slug: 'project-be-project-wellness-keynote',
    client: 'Project Be',
    project: 'Designing an Engaging, Fully Animated, Digital Wellness Keynote',
    format: 'Training Presentation',
    industry: 'Event Production',
    year: 2023,
    tagline: 'Designed a thought-provoking keynote deck for a wellness tech conference, exploring the role of technology in digital burnout and reconnection.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be0a41a17d562e29541_6851a95741c391912b4d0496_Portfolio_Slides_ProjectBe-Digital-Wellness-Conference_0002.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1a41a17d562e29546_6851a98713b99c0917588911_Portfolio_Slides_ProjectBe-Digital-Wellness-Conference_0005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1a41a17d562e2954a_6862fb0fa4dea2ea7b26010d_Portfolio_Slides_ProjectBe-Digital-Wellness-Conference_0018.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1a41a17d562e29560_6862fb26fe3dc646bb7b6f2d_Portfolio_Slides_ProjectBe-Digital-Wellness-Conference_0023.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1a41a17d562e29566_6862fb3784a88652479df50d_Portfolio_Slides_ProjectBe-Digital-Wellness-Conference_0027.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1a41a17d562e2954e_6862fb439ed3f947d14f2e11_Portfolio_Slides_ProjectBe-Digital-Wellness-Conference_0030.jpeg',
    ],
    video: 'https://res.cloudinary.com/dryyhpqew/video/upload/v1782509410/project-be-wellness_qew0kx.mov',
    featured: false,
    summary: 'For Project Be’s inaugural Digital Wellness Conference, they needed a keynote that didn’t just talk about mindfulness in the digital age—it had to feel like it. I crafted a fully animated, visually immersive presentation that wove complex wellness insights into a cinematic experience. Every transition, motion cue, and visual metaphor was designed to keep the audience hooked and inspired, transforming a static keynote into a dynamic storytelling journey that left attendees reflecting on their relationship with technology long after the last slide.',
    theAsk: 'Design a keynote that addressed the impact of digital overload and inspired healthier tech habits, balancing data with emotional storytelling.',
    challenge: `• Topic risked feeling generic without strong narrative hooks
• Needed credibility with corporate audiences while remaining relatable
• Had to integrate both research insights and personal storytelling
• Keynote design required flexibility for multiple event formats`,
    solution: `• Structured keynote into a narrative arc: challenge → data → personal stories → actionable takeaways
• Designed slides with calming visuals, bold typography, and clean data points
• Blended research statistics with human-centered anecdotes to drive resonance
• Built modular deck adaptable for conferences, workshops, and internal talks`,
    outcome: 'Delivered a keynote that connected emotionally and intellectually, positioning Project Be as a thought leader in digital wellness and equipping audiences with memorable, actionable strategies. According to the Speaker herself, people were impressed by the design of the keynote.',
  },

  {
    slug: 'echo-society-pitch-deck-2',
    client: 'Echo Society',
    project: 'Designing an Investor-Ready Startup Pitch Deck, Pt. 1',
    format: 'Pitch & Investor Deck',
    industry: 'Startup / Venture',
    year: 2024,
    tagline: 'A vibrant, genre-bending pitch deck created for Echo Society to secure funding for their multi-platform IP production strategy.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdcb6e6b2f1c89456ca_683f46b79c13731e76da481d_681913964b04b5911efc873f_67044b8508f96686ce90b026_Echo%25252520Society%252525201_1.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdcb6e6b2f1c89456d6_6863eac85f67b8515000366a_Portfolio_Slides_Echo-Society-Pitch-Deck_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdcb6e6b2f1c89456f0_6863eacdb739082547d1d9bb_Portfolio_Slides_Echo-Society-Pitch-Deck_0002.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdcb6e6b2f1c8945702_6863ead2040a2ad602a9b0c0_Portfolio_Slides_Echo-Society-Pitch-Deck_0003.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdcb6e6b2f1c89456fc_6863ead7a1e326529435ab69_Portfolio_Slides_Echo-Society-Pitch-Deck_0004.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdcb6e6b2f1c89456d2_6863eadd3bfb79c82f5c994f_Portfolio_Slides_Echo-Society-Pitch-Deck_0005.jpeg',
    ],
    featured: false,
    summary: 'Echo Society, a bold new production startup, reimagines historical stories for today’s audiences across film, TV, podcasts, books, and immersive experiences. They commissioned me to create a dynamic, visually arresting investor pitch deck that would set them apart in a saturated content funding landscape.',
    theAsk: 'Design a cinematic, high-concept pitch deck for Echo Society’s investment round. The goal: convey the uniqueness of their IP model and multi-channel acceleration strategy in a format that blends editorial wit with visual punch. Needed to work across PDF, screen share, and print formats.',
    challenge: `• Mixed audience of VCs, execs, and indie investors
• Needed to make financials engaging and digestible
• Balance edgy storytelling with professional polish
• Visualize multichannel rollout clearly
• Align with Jessica’s founder-led brand`,
    solution: `• Designed bold, colorful system with pop culture + museum motifs
• Used playful juxtapositions (e.g., bubble gum over portraits) to signal irreverence
• Structured modular sections for IP model, case studies, financials, and founder story
• Kept charts and pitch language clear without losing creativity
• Added humor and energetic typography for memorability`,
    outcome: `• The deck positioned Echo Society as a serious yet inventive player in the IP development space. 
• It was shared with leading entertainment VCs and helped support fundraising conversations. 
• Jessica and her team praised the clarity, unexpectedness, and brand alignment of the final result.`,
  },

  {
    slug: 'foodspace-sales-deck',
    client: 'FoodSpace',
    project: 'Designing an engaging Sales Deck in Foodservice',
    format: 'Sales & Agency Deck',
    industry: 'Consulting / Foodservice',
    year: 2022,
    tagline: 'A sales tool that speaks startup energy with enterprise-level clarity—built to grow with the business.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb35144efa977f1a6_6851bd83de2aba37c6e89aea_210604_FoodSpace_Deck.001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb35144efa977f1b7_6851bda3019066c4132acb66_210604_FoodSpace_Deck.002.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb35144efa977f1bf_6851bda39fcef48e1e9bb99b_210604_FoodSpace_Deck.003.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb35144efa977f1ca_6851bda35d713125a6ec1a1b_210604_FoodSpace_Deck.005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb35144efa977f1bb_6851bda3e55d26082f941f88_210604_FoodSpace_Deck.006.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bddb35144efa977f1af_6851bda37b82897279d8b7e6_210604_FoodSpace_Deck.007.jpeg',
    ],
    featured: false,
    summary: 'I crafted a flexible sales deck for FoodSpace that clearly outlines their value proposition, solutions, and technology. Designed to support multiple audiences (from buyers to investors), the deck integrates modular storytelling with bold, brand-consistent visuals—empowering the team to adapt it quickly for different conversations.',
    theAsk: 'FoodSpace needed a master sales deck that could clearly articulate their value proposition to a range of stakeholders — from national grocery buyers and retail tech partners to investors and procurement teams. The ask wasn’t just for “pretty slides,” but for a modular storytelling system that could flex based on audience type, depth of conversation, and stage of engagement.',
    challenge: `• The company’s offering is multifaceted, combining AI, computer vision, data science, and retail UX, which makes it challenging to explain quickly without overwhelming the viewer. 
• Their prior decks leaned too heavily on text and internal language, which confused early-stage calls. 
• We needed to clarify the story, highlight benefits over features, and build a visual system that could support short intros and deep dives alike.`,
    solution: `• We created a dynamic, brand-aligned sales deck built around modular narrative blocks: What We Solve, How It Works, Why It’s Different, and Who It’s For. 
• The slides were minimal, graphic, and hierarchy-driven, with clear icons and bold headers guiding attention. 
• Animated flows and product mockups showed how the tech integrates into real retail environments, while a flexible “menu” structure allowed sales reps to tailor the story to each audience.`,
    outcome: `• The new deck became FoodSpace’s go-to communication tool across departments, used for sales calls, investor intros, and internal strategy meetings. 
• Teams reported improved understanding from external audiences, shorter sales cycles, and more confidence presenting the company’s capabilities. 
• It also reinforced design consistency and storytelling clarity across the broader brand ecosystem.`,
  },

  {
    slug: 'the-be-curious-group-iot-workshop',
    client: 'The Be Curious Group',
    project: 'Designing and Delivering a Training Deck to Explain the IoT to Female Entrepreneurs',
    format: 'Training Presentation',
    industry: 'Education / EdTech',
    year: 2020,
    tagline: 'A visually rich, animated keynote that demystifies the Internet of Things (IoT) for non-tech audiences — turning abstract tech into relatable, real-world use cases.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be482c328140e178db2_68630012b4d779c5cc746d91_TBCG-IoT-Slide-0.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be582c328140e178dc6_68630025537370a643c95ef8_TBCG-IoT-Slide-1.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be582c328140e178dbb_68630029eca4998ff56477e8_TBCG-IoT-Slide-2.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be582c328140e178dc3_6863002f94cfa76cd81f04a9_TBCG-IoT-Slide-3.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be582c328140e178dd7_68630033776adf05f7ed527b_TBCG-IoT-Slide-4.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be482c328140e178db5_68630036b8cb0f2c94e19d00_TBCG-IoT-Slide-5.webp',
    ],
    featured: false,
    summary: 'Following the success of our first Apple Life Hacks workshop, The Be Curious Group invited me back to decode a much bigger mystery: the Internet of Things. Their goal? Help members understand what IoT means, how it shows up in daily life, and how to use it confidently — without the jargon. From smart doorbells to fitness trackers and kitchen devices, this session brought clarity and curiosity together.',
    theAsk: 'Create and present a fully animated keynote that:– Explains IoT in simple, visual terms– Highlights practical use cases across home, work, health, and parenting– Helps attendees choose between ecosystems (Apple, Alexa, Google)– Reassures the group about security, privacy, and device control',
    challenge: `• Tech fog: IoT is a buzzword, but most people don’t really know what it is. I had to make it feel tangible, familiar, and safe.
• Overwhelm: With so many devices and platforms, the audience needed clarity on what’s worth investing in.
• Trust gap: Many attendees were skeptical or concerned about how much data these devices collect.`,
    solution: `• Opened with a “digital nervous system” metaphor linking smart objects to daily life.
• Simplified Apple HomeKit, Alexa, and Google Home with side-by-side charts.
• Told relatable stories: yoga with Siri, nap-time security, energy savings, to humanize benefits.
• Designed modular “visual tiles” for a cohesive, flexible deck.
• Built-in navigation for quick jumps during live Q&A.`,
    outcome: 'The deck helped transform buzzword confusion into playful “aha!” moments. Members left the session excited to explore smart plugs, fitness integrations, and voice automation. Several even texted photos of their new setups weeks later. The presentation was so well received that the group suggested turning it into a recurring seasonal series on tech fluency.',
  },

  {
    slug: 'ibm-quantum-summit-2022-cn3q3',
    client: 'IBM Quantum',
    project: 'IBM Quantum Summit 2022 Keynote',
    format: 'Training Presentation',
    industry: 'Technology',
    year: 2022,
    tagline: 'Presentation design for IBM’s flagship Quantum Summit keynote — turning dense, technical material into a clean, confident, and brand-consistent visual experience.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdd18815e14f89b7a65_6851ae03b922d85fc40351d1_Portfolio_Slides_IBM-Quantum-Summit_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bde18815e14f89b7a72_6862e1998530314532fd50d6_Portfolio_Slides_IBM-Quantum-Summit_0017.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bde18815e14f89b7a6f_6862e1b37cf867806ba8b00e_Portfolio_Slides_IBM-Quantum-Summit_0011.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bde18815e14f89b7a79_6862e1da28f0ced0aa167e81_Portfolio_Slides_IBM-Quantum-Summit_0020.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bde18815e14f89b7a93_6862e203b0cfb705ace55b15_Portfolio_Slides_IBM-Quantum-Summit_0012.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bde18815e14f89b7a90_6862e20c548794ef2793c469_Portfolio_Slides_IBM-Quantum-Summit_0005.jpeg',
    ],
    featured: false,
    summary: 'IBM Quantum tapped me to refine and elevate their 2022 Summit keynote, a highly confidential presentation addressing cryptography, education, and quantum safety. The task: ensure visual consistency, legibility, and engagement across a complex technical narrative for a high-stakes global audience.',
    theAsk: 'Ensure the full Summit deck was visually cohesive with IBM Quantum’s brand guidelines, while simplifying slide structures, improving layout clarity, and animating transitions to keep audience attention high across a wide range of topics, from encryption protocols to ecosystem partnerships.',
    challenge: `• Highly technical content: Complex quantum computing concepts, statistical data, and timeline graphics that needed simplification without dumbing down.
• Strict brand compliance: Every color, font, layout, and spacing had to follow IBM’s global standards precisely.
• Confidentiality: Most content was internal or sensitive, with strict data-handling protocols.
• Multiple speakers: The deck needed to support a seamless flow across various speakers and subject shifts.`,
    solution: `• Visual consistency: Audited and redesigned 100+ slides using IBM’s carbon design system principles—ensuring typographic rhythm, uniform margins, and consistent visual hierarchy.
• Information architecture: Reorganized slides by topic and subtopic to improve pacing.
• Subtle storytelling: Employed clean layouts, full-bleed imagery, and minimal animations to emphasize precision and forward-thinking innovation.
• Speaker support: Structured slide sequences to enhance presenter flow across breakout topics like quantum-safe cryptography and OpenQASM.`,
    outcome: `• The refined keynote debuted at the IBM Quantum Summit 2022 and was praised for its elegance and clarity. 
• The internal team highlighted how the design helped distill complex science into accessible narratives without compromising technical depth, earning positive feedback from internal stakeholders, external press, and industry analysts.`,
  },

  {
    slug: 'special-forces-project-google',
    client: 'Google',
    project: 'Special Forces Insights Deck for Google',
    format: 'Executive Presentation',
    industry: 'Technology',
    year: 2023,
    tagline: 'Helping a strategy agency turn high-level insights into a sleek, story-driven deck for Google’s executive teams.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be2d67f6e3e1113a785_683f46bb695c96606a401ce8_6819139a3036e170c959176f_6701418528a69477c90cbe5b_Screenshot%252525202024-10-05%25252520at%2525252009.03.39.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be3d67f6e3e1113a79c_6862eec8f1d88feb86b82d7f_Portfolio_Slides_Special-Forces-Google_0001.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be3d67f6e3e1113a796_6862eed2e1d535ec33fc3a05_Portfolio_Slides_Special-Forces-Google_0002.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be3d67f6e3e1113a7a8_6862eee0488cd4d5ae861671_Portfolio_Slides_Special-Forces-Google_0003.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be3d67f6e3e1113a793_6862eee8fced5a94d9652e74_Portfolio_Slides_Special-Forces-Google_0004.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be3d67f6e3e1113a7a2_6862eef14802cdc23dcaeb21_Portfolio_Slides_Special-Forces-Google_0005.webp',
    ],
    featured: false,
    agency: 'Special Forces',
    summary: 'Special Forces, a boutique strategy agency in New York, was tapped by Google to decode the evolving dynamics of modern commerce—and needed help turning a complex research initiative into a deck that would resonate with senior stakeholders. I came in to transform their dense findings into a clean, narrative-driven visual story. Working closely with the Special Forces strategy team, I designed and structured the most critical section of the final presentation: a modular, insight-led deck that balanced rigor with rhythm, and gave Google leadership the clarity they needed to act on it.',
    theAsk: 'Turn dense commerce research into an executive-ready presentation that sparked action from Google leadership.',
    challenge: `• Complex data risked losing non-specialists; 
• Needed to balance depth with clarity; 
• A demanding C-level audience required authority and relevance`,
    solution: `• Structured narrative: context → insight → opportunity → action; 
• Reframed findings into clear frameworks and metaphors; 
• Designed a confident, visual deck optimized for executive delivery`,
    outcome: 'The deck transformed research into a compelling strategic story, enabling Google leaders to align on priorities and new opportunities.',
  },

  {
    slug: 'toddstreet-intercept-regional-sales-training',
    client: 'Intercept Pharmaceuticals',
    project: 'ToddStreet for Intercept',
    format: 'Training Presentation',
    industry: 'Pharmaceutical',
    year: 2024,
    tagline: 'A regional training deck for Intercept’s salesforce, designed to align teams around market needs with clarity, consistency, and strong visual structure.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be363640197079c38aa_683f46bcc32c933d239b21b5_6819139a74f694dfc17f0ba6_67478480fe8a9b5567450067_Portfolio_Slides_ToddStreet-Intercept-OCA-Aug-Training_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be563640197079c3914_6862f134728b5359932e05ff_Portfolio_Slides_ToddStreet-Intercept_0001.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be563640197079c390d_6862f1502ba68c09210f7e5a_Portfolio_Slides_ToddStreet-Intercept_0004.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be563640197079c3903_6862f15e7ca0376bedeaa28a_Portfolio_Slides_ToddStreet-Intercept_0006.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be563640197079c38f4_6862f16db1748ae2b44dd598_Portfolio_Slides_ToddStreet-Intercept_0007.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be563640197079c38fd_6862f1806439bed9fba473eb_Portfolio_Slides_ToddStreet-Intercept_0010.webp',
    ],
    featured: false,
    agency: 'ToddStreet',
    summary: 'ToddStreet brought me in to design a sales training deck to support Intercept’s regional teams across different U.S. territories. The goal was to unify the field’s understanding of market challenges and boost their competitive positioning. The design needed to simplify complex pharmaceutical data, reflect the brand’s visual identity, and enable flexibility for regional managers to personalize content delivery.',
    theAsk: 'Design a presentation for regional leaders that worked in-person and virtually while staying legible, energetic, and on-brand.',
    challenge: `• Dense data, charts, and acronyms made the content hard to follow.
• Inconsistent slide styles across regions diluted the brand and confused the narrative.
• Presentation needed to work live and virtually, staying legible, energetic, and easy to adapt.`,
    solution: `• Introduced a clear grid system with hierarchy, whitespace, and branded callouts.
• Standardized slide styles with modular blocks and icons for easy regional use.
• Built a master PowerPoint deck with editable layouts to keep updates on-brand.
• Added flexible slide types for data, storytelling, and activities.`,
    outcome: 'Delivered a unified deck that simplified complexity, reinforced brand authority, and gave leaders a scalable tool for consistent sales training.',
  },

  {
    slug: 'mcs-healthcare-public-relations-2',
    client: 'MCS Healthcare',
    project: 'Rebranding and Modernizing the Look and Feel of an Established, Healthcare-focused PR Agency ',
    format: 'Strategic Narrative',
    industry: 'Creative Agencies',
    year: 2025,
    tagline: 'A modernized brand identity system for a mission-driven PR agency specializing in healthcare and pharma.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdf95d8af8b0ebea0cc_683f46b8e8f86cf2ea6befe6_6830c5c4deb56e3e450c7cd4_Asset%25252016.png',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be095d8af8b0ebea0f4_68641475911ac8345730e250_MCS-Teams-BG-White-Office-1.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be095d8af8b0ebea0e4_68641479623510380fa55de5_MCS-Zoom-BG-1.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be095d8af8b0ebea0e7_6864147c731e05d19ceecdc1_MCS-Zoom-BG-2.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be095d8af8b0ebea0ee_68641493c79e341aae7a92b0_MCS-Teams-BG-6.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be095d8af8b0ebea0f1_686414a594276651c9aeaef1_MCS-Teams-BG-1.webp',
    ],
    featured: false,
    summary: 'I developed a refreshed visual identity for MCS Healthcare to better align with their strategic voice and credibility. The updated system includes a redesigned logo, custom iconography, a versatile color palette, and branded templates that project authority without losing warmth. The identity now reflects both their legacy and their future-facing ambition.',
    theAsk: 'After years of operating under a well-recognized but dated identity, MCS Healthcare sought a refreshed visual system to reflect its growth, relevance, and leadership in pharmaceutical communications. The rebrand needed to strike a delicate balance: maintaining continuity for long-time partners while signaling boldness and precision to new clients and prospects.',
    challenge: 'Healthcare communications require a tone of seriousness and reliability, but MCS also wanted to show creativity and warmth. The old visual identity lacked versatility, and there were no formal brand guidelines, which led to inconsistencies across internal documents, digital touchpoints, and pitch materials. We needed to create a flexible system that could work across print, web, PowerPoint, and day-to-day internal comms — all while keeping the rollout manageable for a mid-sized agency.',
    solution: 'We developed a modernized brand identity that preserved the legacy color palette but sharpened its contrast and hierarchy. The updated logo introduced clean typography and spacing, while a supporting visual system was built around modular layouts, flexible templates, and branded iconography. We also created an internal style guide and designed a series of presentation and document templates for the MCS team, enabling immediate adoption across departments.',
    outcome: 'The refreshed identity improved brand consistency and confidence, internally and externally. Teams found it easier to create visually strong deliverables, and leadership reported increased enthusiasm from both clients and staff. The rebrand helped MCS present a unified front across pitches, partnerships, and hiring — strengthening their position as a top-tier healthcare communications partner.',
  },

  {
    slug: 'mcs-healthcare-public-relations',
    client: 'MCS Healthcare PR',
    project: 'Redesigning the Website of an established PR Agency expert in Healthcare',
    format: 'Strategic Narrative',
    industry: 'Creative Agencies',
    year: 2025,
    tagline: 'A sleek, editorial-style website designed to elevate a top-tier healthcare PR agency with clarity, polish, and confidence.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68caea2ea143b05867e46ecd_MCS-WebP-1.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68caea6cd5b0c6896768cf98_MCS-WebP-4.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68caea7aa0b9a9bec254276a_MCS-WebP-5.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68caea84f121327a33a04151_MCS-WebP-6.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68caea8cb81bbe1f7d59dbff_MCS-WebP-7.webp',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68caea968391670e449921b9_MCS-WebP-8.webp',
    ],
    featured: false,
    summary: 'I redesigned MCS Healthcare’s website to better reflect their credibility and leadership in pharmaceutical communications. The new layout is content-forward and clean, with a modular CMS framework to showcase case studies, thought leadership, and culture. The result is a polished digital presence that feels as professional as the clients they serve.',
    theAsk: 'MCS Healthcare, a well-established public relations agency specializing in pharma and biotech communications, needed a website overhaul that reflected their credibility and modernity. Their existing site lacked both usability and storytelling flair, limiting their ability to showcase case studies, thought leadership, and recruitment appeal. They asked for a content-forward, strategically designed web experience that would resonate with healthcare decision-makers and future talent alike.',
    challenge: 'MCS’s legacy meant the redesign needed to respect a well-defined tone of professionalism and trust, while infusing a more contemporary and engaging digital presence. With a wide mix of long-form editorial content, case-based narratives, and dynamic team materials, the challenge was to create a system that could accommodate different formats and evolve over time — without sacrificing clarity or structure. Navigational logic and CMS scalability were key priorities, as was the integration of SEO best practices.',
    solution: `• I designed a modern, editorial-style website that balanced content richness with elegant restraint. The layout was modular and intuitive, allowing MCS to feature deep-dive case studies, strategic service descriptions, and real-time blog content without overwhelming the visitor. 
• Brand colors were updated slightly to improve legibility and impact, and content types were cleanly categorized to guide user flow. 
• The CMS infrastructure was built in Webflow with a flexible back-end to support ongoing internal updates by non-technical staff.`,
    outcome: `• The new website significantly elevated MCS’s digital presence and empowered the team with a scalable storytelling platform. 
• Stakeholders noted improved user experience, cleaner navigation, and increased time-on-site from both prospective clients and job applicants. 
• With a more accurate, compelling digital expression of the brand, MCS positioned itself for future growth and retained its edge in a highly competitive healthcare PR landscape.`,
  },

  {
    slug: 'adm-productions-emd-1-c6815',
    client: 'EMD Group Serono',
    project: 'EMD Serono Group 2024 MA&PS Summit',
    format: 'Training Presentation',
    industry: 'Pharmaceutical',
    year: 2023,
    tagline: 'A global keynote deck for EMD Serono’s leadership—unifying regional teams under a clear, empowering message.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc0d989266b83f5906_683f46b5b9cf4e400caf5723_681a4f19caabb50c6676879f_Portfolio_Slides_ADM-Productions-EMD_0010.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc0d989266b83f592a_686d1ba210002415ab8c47e8_Portfolio_Slides_ADM-Productions-EMD_0001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc0d989266b83f5940_686d1ba97f86ad483f16be4a_Portfolio_Slides_ADM-Productions-EMD_0002.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc0d989266b83f5936_686d1bb7f5f1252ee41b7ab6_Portfolio_Slides_ADM-Productions-EMD_0004.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc0d989266b83f5946_686d1bbf86825af5486830b7_Portfolio_Slides_ADM-Productions-EMD_0005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc0d989266b83f5939_686d1bcbb050842257f77d1d_Portfolio_Slides_ADM-Productions-EMD_0008.jpeg',
    ],
    featured: false,
    agency: 'ADM Productions',
    summary: 'Collaborating with ADM, we created the master keynote for EMD Group Serono’s internal global summit. The design language was structured yet expressive, emphasizing scientific excellence, regional unity, and mission alignment. The result was a high-energy deck that helped leadership energize, inform, and align a multinational audience.',
    theAsk: 'Design a high-stakes keynote that simplified complex pharmaceutical strategy and engaged both internal leaders and external stakeholders.',
    challenge: `• Dense scientific and business content risked overwhelming the audience
• Needed to balance technical accuracy with narrative clarity
• Presentation had to reflect pharma authority while feeling human and accessible`,
    solution: `• Built a clean narrative arc: challenge → science → strategy → impact
• Applied bold visuals, data callouts, and patient-centered imagery
• Created modular slides to flex between technical deep-dives and big-picture storytelling
• Designed layouts optimized for live delivery and post-event circulation`,
    outcome: 'Delivered a keynote that clarified EMD Serono’s strategy, inspired leadership confidence, and positioned the company as both scientifically rigorous and audience-focused.',
  },

  {
    slug: 'ogilvy-for-mastercard-1',
    client: 'Mastercard',
    project: '“Discover the Priceless in Us" High level, New Business Pitch Deck',
    format: 'Pitch & Investor Deck',
    industry: 'Financial Services',
    year: 2022,
    tagline: 'An internal global campaign pitch crafted to emotionally connect Mastercard employees through music — transforming staff spirit into song.',
    images: [
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be01501677bed35943c_6851aa7a7b735b55760a0c5f_Ogilvy-Mastercard%2520Pitch%2520Deck.001.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be01501677bed35944f_6851aa94b63f1e1afc8ba824_Ogilvy-Mastercard%2520Pitch%2520Deck.003.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be01501677bed359442_68630387cf1444d602265325_Ogilvy-Mastercard%2520Pitch%2520Deck.005.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be01501677bed359458_6851aa94b6594ba2a4669f45_Ogilvy-Mastercard%2520Pitch%2520Deck.009.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be01501677bed359455_686303a04f75134e6608dbe9_Ogilvy-Mastercard%2520Pitch%2520Deck.016.jpeg',
      'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be01501677bed359467_6851aa959529a8261f6e35c2_Ogilvy-Mastercard%2520Pitch%2520Deck.023.jpeg',
    ],
    featured: false,
    agency: 'Ogilvy',
    summary: 'Ogilvy developed a conceptual pitch for Mastercard centered on internal engagement through a unifying global song. Drawing inspiration from Mastercard’s “Priceless” brand DNA, the idea reimagined internal branding as a collaborative musical initiative, aiming to foster pride, cohesion, and brand identity among employees through creativity and shared experience.',
    theAsk: 'Reignite internal brand engagement post-pandemic by turning Mastercard’s “Priceless” positioning inward, reconnecting their audience worldwide with the company’s purpose.',
    challenge: `• Mastercard’s “Priceless” platform was already globally recognizable, but internally, employees felt disconnected from its meaning.
• Remote and hybrid work diluted team cohesion and cultural alignment.
• Mastercard needed a unique and emotionally resonant way to energize staff around a unifying purpose — without relying on dry presentations or top-down messaging.`,
    solution: `• Created “Discover the Priceless in Us,” a global anthem co-written and performed by employees with artist guidance
• Designed split-screen videos of staff and artists singing together to symbolize unity across regions
• Activated regional events with surprise celebrity appearances (e.g., Shakira) for cultural relevance
• Culminated in a global livestream where employees performed alongside music legends like Randy Newman
• Framed as a PR-worthy internal campaign strong enough to gain external media coverage`,
    outcome: `While speculative as a pitch, this concept had the potential to:• Deepen employee connection to Mastercard’s purpose and to one another.
• Create viral, shareable internal moments that elevate morale and culture.
• Reinforce Mastercard’s brand as not just a financial leader — but a human-first, emotionally intelligent organization.
• Enable participation and pride through creativity, not corporate mandates.`,
  },

]

/** Convenience: just the featured case studies, sorted by order */
export const featuredCaseStudies = caseStudies
  .filter((cs) => cs.featured)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

