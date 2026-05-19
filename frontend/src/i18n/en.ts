import type { Translations } from './ru';

export const en: Translations = {
  brand: {
    name: 'PROFFI',
    tagline: 'Uninterruptible power solutions',
  },
  nav: {
    home: 'Home',
    boutique: 'Catalog',
    services: 'Services',
    about: 'About us',
    faq: 'FAQ',
    contacts: 'Contacts',
    quiz: 'Pick generator',
  },
  common: {
    callUs: 'Call',
    cta: {
      pickGenerator: 'Pick a generator',
      askExpert: 'Ask an expert',
      bookCall: 'Request a call',
      getCalculation: 'Get quote + checklist',
      seeAll: 'See all',
      details: 'Details',
      buy: 'Match to my panel',
      requestB2B: 'Request energy audit',
      send: 'Send',
      back: 'Back',
      next: 'Next',
    },
    privacy: 'I agree with the',
    privacyLink: 'privacy policy',
    requiredField: 'Required field',
    loading: 'Loading…',
  },
  hero: {
    eyebrow: 'Since 2013 • Moscow & region',
    title: {
      line1: 'Your reliable source',
      accent: 'of electricity',
      line2: '',
    },
    subtitle:
      'Power at home and business running without pause. We\'ll take care of the rest.',
    primaryCta: 'Find out the price of my peace of mind',
    inlineQuote: 'Sergey Krestovsky: “My home is always lit”',
    panel: {
      statusOk: 'Grid OK',
      statusBlackout: 'Grid fault…',
      triggerBlackout: 'Simulate outage',
    },
    blackout: {
      countdownLabel: 'Reserve auto-start',
      countdownHint: 'Switching to PROFI…',
      triggerManual: 'Run “blackout” demo manually',
      overlayLine1: 'Grid failure. Autostart in',
      overlayLine2: 'Your home will have light again.',
    },
    lever: {
      eyebrow: 'Reserve lever',
      statusOn: 'PROFI · reserve engaged',
      statusOff: 'GRID · power off',
      statusPostDemo: 'Reserve engaged. Your home has light.',
      statusCountdown: 'PROFI · reserve engaged',
      blackoutDetected: 'Blackout detected!',
      autoStartIn: 'Automatic start in…',
      launchShort: 'Launch',
      countdownFooterEn:
        'City grid failure. Profi backup system activating. Boiler heats, light is on, fridge works.',
      gridShort: 'Grid',
      profiShort: 'Profi',
      dragHint: 'Click or drag the lever to the right',
      dragHintPostDemo: 'Check the utility grid — drag left',
      questionBlackout: 'Lights just went out?',
      questionRestored: 'Reserve is on standby',
      questionPostDemo: 'Is utility power stable again?',
      button: 'Engage reserve',
      buttonRestored: 'Reserve engaged',
      hintBlackout:
        'Autonomous power kicks in within 10 seconds. Flip the lever — and backup power brings the house back online.',
      hintRestored:
        'The boiler runs, the lights are on, the fridge keeps cold. Your family will not even notice the city outage.',
      hintPostDemo:
        'The house is in warm light again; the generator stays ready. Switch back to Grid once you confirm utility power is stable.',
    },
    calmSwitch: {
      prompt: 'The lights just went out. What do you do?',
      off: 'OFF',
      on: 'ON',
      swipeHint: 'Swipe the lever right to start the generator',
      successLine: 'Generator running. Your home is alive again — and you can rest.',
      cta: 'Keep this peace of mind for good',
      achievement:
        'You just prevented about ₽15,000 in spoiled food and kept the house warm.',
      resetHint:
        'A real standby unit starts automatically. See how it works.',
    },
  },
  ribbon: {
    line1: 'Artists',
    line2: 'of Uma2rman',
    line3: 'trust us with their power',
    role: 'Musician of Uma2rman',
    listen: 'Listen to review',
  },
  usp: {
    eyebrow: 'How we work',
    title: 'We have been on the job since 2013 — any weather, any premises',
    subtitle: '',
    items: [
      {
        title: 'We work year-round',
        text: 'We install generators in winter and summer alike.',
      },
      {
        title: 'We bring everything needed for installation',
        text: 'If there is no mains power on site, we bring a generator.',
      },
      {
        title: 'We are not afraid of tough jobs',
        text: 'We mount in tight spaces and low ceilings; we work in challenging conditions.',
      },
      {
        title: 'We stay proactive',
        text: 'We call you after 11 months (and yearly thereafter) to remind you about scheduled maintenance.',
      },
      {
        title: 'We help remotely',
        text: 'Our engineers are always available by phone to resolve minor issues quickly — no waiting.',
      },
      {
        title: 'We come to you',
        text: 'If something breaks, we simply arrive and repair on site.',
      },
    ],
  },
  steps: {
    eyebrow: 'Process',
    title: '3 steps to bullet-proof power',
    items: [
      {
        title: 'Request',
        text: 'Send an inquiry or call us. We will tailor a solution to your task.',
      },
      {
        title: 'Pick & install',
        text: 'Our engineers deliver and install the equipment in one day.',
      },
      {
        title: 'Warranty & support',
        text: 'You get warranty up to 15 years and 24/7 support.',
      },
    ],
  },
  homeCatalog: {
    eyebrow: 'Catalog',
    title: 'Ready-made scenarios for your site',
    subtitle:
      'Flip the toggle and explore curated collections for home or business — we have pre-assembled the top configurations for every task.',
    viewAll: 'See the full catalog',
  },
  boutique: {
    title: 'Boutique of ready solutions',
    subtitle: 'Pick a lifestyle scenario — we will assemble a turnkey system',
    home: 'For home',
    business: 'For business',
    pickCollection: 'Pick collection',
    inCollection: 'in collection',
    notFound: {
      title: 'Did not find your model?',
      text: 'We have 328 more models that did not fit this top. Tell us your task — we will send 3 options.',
      engineerName: 'Alexey Ozerov',
      engineerRole: 'Lead engineer',
      cta: 'Get 3 options',
    },
    silence: 'Silence',
    silenceListen: 'Listen',
    silenceMeter: {
      ariaLevel: 'Silence level {{level}} of 3',
    },
    coverage: 'What it covers',
    productLanding: {
      passportBadge: 'Specifications',
      audienceEyebrow: 'Who it is for',
      passportNoiseNote: 'Compare the noise level with the datasheet in the table below.',
      passportNoiseNoteDb: 'Catalogued noise level {{db}} dB — see the full datasheet below.',
      finalTitle: 'Need a quote for your panel?',
      finalBody:
        'Send a request — our engineer will confirm the kit, engine oil, and starter battery for the {{name}}.',
    },
    coverageItems: {
      light: 'Light',
      cold: 'Fridge',
      water: 'Water & pump',
      heat: 'Boiler',
      wifi: 'Wi-Fi & comms',
      kitchen: 'Kitchen',
      tv: 'TV',
      ac: 'AC',
      pos: 'POS & terminals',
      machine: 'Production line',
      server: 'Server rack',
    },
    coverageHints: {
      light: 'Lighting and general-purpose outlets',
      cold: 'Fridge and freezer',
      water: 'Pump, well, domestic water supply',
      heat: 'Boiler and domestic hot water',
      wifi: 'Router, internet, connectivity',
      kitchen: 'Kitchen appliances and cooking',
      tv: 'TV and media equipment',
      ac: 'Air conditioning',
      pos: 'Till, card terminal, retail systems',
      machine: 'Machinery and production lines',
      server: 'Server room, rack, NAS',
    },
    productDetail: {
      openSpecs: 'Full specifications',
      specsHeading: 'Specifications',
      highlights: 'Highlights',
      power: 'Power output',
      phases: 'Phases',
      fuel: 'Fuel',
      start: 'Starting',
      enclosure: 'Enclosure',
      warranty: 'Warranty',
      silence: 'Noise level',
      silenceHint: '{{level}} of 3 (1 — quietest)',
      kW: 'kW',
      close: 'Close',
      orderCta: 'Match to my panel',
      fuelTypes: {
        petrol: 'Petrol',
        diesel: 'Diesel',
        gas: 'Gas',
        turnkey: 'Turnkey package',
      },
      startTypes: {
        manual: 'Recoil start',
        electric: 'Electric starter',
        auto: 'Auto-start (ATS)',
      },
      enclosureTypes: {
        open: 'Open frame',
        silent: 'Silent canopy',
        'all-weather': 'All-weather enclosure',
      },
      phases1: 'Single-phase',
      phases3: 'Three-phase',
      warrantyYears: 'Up to {{count}} years',
      backToBoutique: 'Back to catalog',
      notFound: 'This model is not in the catalog. Return to the showcase to pick another.',
      notFoundMetaTitle: 'Product not found',
    },
  },
  collections: {
    home: {
      country: {
        name: 'Country standard',
        promise: 'Forget candles and flashlights at a sensible price',
        scenario: 'Light, pump, boiler and fridge — sleep easy in any weather',
      },
      comfort: {
        name: 'Life in comfort',
        promise: 'Your family will not even notice the village blackout',
        scenario: 'Full home: TV, kitchen, AC, boiler, security',
      },
      fortress: {
        name: 'Autonomous fortress',
        promise: 'Total freedom from the city grid',
        scenario: 'Houses 300+ m\u00b2: sauna, pool, gates, workshop, guest house',
      },
    },
    business: {
      retail: {
        name: 'Retail & pharmacy',
        promise: 'Not a single ruined pack, not a single lost sale',
        scenario: 'Refrigeration, POS and terminals, security and comms',
      },
      production: {
        name: 'Production & shop floor',
        promise: 'Zero downtime. Phase-failure protection for machines',
        scenario: 'Industrial lines, compressors, lighting and ventilation',
      },
      datacenter: {
        name: 'Office & data-center',
        promise: 'Servers and comms run with zero downtime',
        scenario: 'UPS hybrid + generator. Server room, workstations, IP-telephony',
      },
    },
  },
  badges: {
    hit: 'Hit of 2026',
    kristovsky: 'Recommended by Kristovsky',
    coldproof: 'Cold-proof to \u221230\u00b0C',
    silent: 'Premium silence',
    turnkey: 'Turnkey',
  },
  quiz: {
    pageTitle: 'Find your perfect backup power system',
    pageSubtitle:
      'Answer 6 questions — we will pick 3 optimal configurations and send you our author\u2019s checklist “7 fatal mistakes”.',
    badge: 'Engineer consultation',
    progress: 'Step {{current}} of {{total}}',
    microTip: 'Engineer tip',
    questions: {
      q1: {
        title: 'What is the object?',
        helper: 'Defining the scope',
        options: {
          home: {
            label: 'Private house / Cottage',
            hint: 'Focus on silence and aesthetics so the equipment looks great on the plot.',
          },
          business: {
            label: 'Business: office, store, pharmacy',
            hint: 'Refrigeration safety and uninterrupted POS are critical.',
          },
          industry: {
            label: 'Production / Warehouse',
            hint: 'Industrial endurance and machine protection from phase faults.',
          },
        },
        tip: 'Homes need silence, businesses need instant automation.',
      },
      q2: {
        title: 'What must work first when the lights go out?',
        helper: 'Helps to size starting currents precisely',
        options: {
          minimum: {
            label: 'Minimum: heating, water, light, fridge',
            hint: 'The “survival base”. Compact and economical.',
          },
          comfort: {
            label: 'Comfort: + AC and TV',
            hint: 'Family will not even notice the city outage.',
          },
          maximum: {
            label: 'Maximum: + sauna, pool or machines',
            hint: 'Serious task. Diesel/gas with high power reserve.',
          },
        },
        tip: 'This sizes starting currents precisely — no overpaying for extra kW.',
      },
      q3: {
        title: 'How is the gas situation on site?',
        helper: 'Gas is the cheapest fuel (5\u20137x cheaper than petrol)',
        options: {
          none: {
            label: 'No gas (consider diesel/petrol)',
            hint: 'Diesel for long runs (24h+), petrol if outages are rare.',
          },
          mainline: {
            label: 'Mainline gas connected',
            hint: 'Gas generator is the quietest and cheapest to run.',
          },
          tank: {
            label: 'We use a gas tank',
            hint: 'Connect to the tank — full autonomy for weeks.',
          },
        },
        tip: 'Gas is the cheapest, diesel is the most reliable for long runs.',
      },
      q4: {
        title: 'Are there neighbours within 20 meters?',
        helper: 'Standard generator noise equals a chainsaw',
        options: {
          dense: {
            label: 'Yes, houses are dense',
            hint: 'Premium silent euro-enclosure — neighbours will not hear it.',
          },
          industrial: {
            label: 'Industrial zone, noise is fine',
            hint: 'Open frames or containers — focus on performance.',
          },
          spacious: {
            label: 'Spacious lot, neighbours far away',
            hint: 'Standard enclosure — savings without losing reliability.',
          },
        },
        tip: 'For dense areas we offer the euro-enclosure that drops noise to a whisper.',
      },
      q5: {
        title: 'Where will the equipment be placed?',
        helper: 'The right placement is 70% of engine longevity',
        options: {
          outside: {
            label: 'Outside (open area)',
            hint: 'All-weather enclosure with winter heating required.',
          },
          inside: {
            label: 'Indoors (garage, basement, boiler room)',
            hint: 'Engineered exhaust and supply ventilation.',
          },
          shed: {
            label: 'Separate building / utility shed',
            hint: 'We size cables and minimize current losses.',
          },
          consult: {
            label: 'Not sure, need engineer advice',
            hint: 'We measure on-site and pick the optimal spot per regs.',
          },
        },
        tip: 'A generator “breathes” and runs hot. In a tight garage without ventilation it dies in 15 minutes — we prevent that.',
      },
      q6: {
        title: 'Who starts the system on grid failure?',
        helper: 'Auto-start saves the house from frozen pipes when you are away',
        options: {
          remote: {
            label: 'Remotely: a tap in the app',
            hint: 'Convenient. You always know the grid status.',
          },
          manual: {
            label: 'Manually: I or guard will manage',
            hint: 'Most affordable, but requires presence.',
          },
          auto: {
            label: 'Full auto (ATS): starts in 10 sec',
            hint: 'The gold standard. Boiler will not freeze, alarm stays online.',
          },
        },
        tip: 'Auto-start protects the house from frozen pipes when you are away.',
      },
    },
    decibels: {
      raw: 'Without enclosure',
      rawCompare: 'Loud, like a motorbike',
      cased: 'With Profi enclosure',
      casedCompare: 'Quiet, like calm conversation',
      playSample: 'Play sample',
    },
    result: {
      title: 'Analysis complete',
      subtitle: 'We picked 3 optimal configurations for your object',
      configurationLabel: 'Configuration',
      socialProof:
        'We are trusted by Uma2rman musicians, doctors, cottage owners and Moscow restaurants.',
      checklistIncluded:
        'The “7 fatal mistakes” checklist is sent only after you leave contact — we’ll attach it with your quote via WhatsApp or Telegram.',
      formTitle: 'Get personalized recommendations and a quote',
      formSubtitle:
        'The author\u2019s checklist “7 fatal mistakes when choosing a generator” (PDF) — sent within a minute.',
      successTitle: 'Done!',
      successText:
        'We are sending the quote and the checklist to your WhatsApp / Telegram within a minute.',
      restart: 'Take quiz again',
    },
  },
  checklist: {
    title: 'Checklist “7 fatal mistakes”',
    subtitle: 'When picking and installing a generator',
    download: 'Download PDF',
    items: [
      {
        title: 'Three phases where they are not needed',
        text: 'Phase imbalance burns electronics — for a private house a powerful single-phase is often better.',
      },
      {
        title: 'A deadly trap: exhaust gases',
        text: 'Only stainless vibration compensators and sealed exhaust systems.',
      },
      {
        title: 'Saving on cable cross-section',
        text: 'A thin cable melts on pump start. Reserve cross-section by 30%+.',
      },
      {
        title: 'The generator suffocated: no air supply',
        text: 'Without ventilation in a garage — dies in 15 minutes from overheating.',
      },
      {
        title: 'Cheap ATS — explosion in the panel',
        text: 'Use ATS units with mechanical and electrical interlocks.',
      },
      {
        title: 'Forgotten maintenance schedule',
        text: 'Oil oxidizes even when the generator is idle. Annual change is mandatory.',
      },
      {
        title: 'Conflict with neighbours (noise)',
        text: 'Within 15 meters of the fence — only premium silent enclosure.',
      },
    ],
  },
  testimonials: {
    eyebrow: 'Reviews',
    title: 'Our clients recommend us',
    subtitle: 'Stories of successful installations from happy clients',
    audioMock: 'Audio review • demo',
    play: 'Play',
    pause: 'Pause',
  },
  faq: {
    eyebrow: 'Questions & answers',
    title: 'FAQ',
    subtitle: 'Did not find an answer? Ask the expert — we reply within an hour',
    items: [
      {
        q: 'Why can\u2019t I just buy a generator at a hypermarket and call an electrician?',
        a: 'You can buy a “box” anywhere. But a generator is the heart of your home power system. We design the auto-start, ensure the boiler does not burn from voltage spikes, and take responsibility.',
      },
      {
        q: 'Where to install the equipment?',
        a: 'Indoors — open frame, metal cradle, supply/exhaust ventilation, exhaust routing. Outdoors — premium silent enclosure with heating, all-weather. Color from RAL chart.',
      },
      {
        q: 'What if something breaks?',
        a: 'Check fuel and oil, battery state, restart. If not — contact our service: warranty and post-warranty repair for any models.',
      },
      {
        q: 'I have 3 phases at home. Do I need a 3-phase generator?',
        a: 'In 90% of cases — no. A single-phase generator with a phase commutation scheme avoids phase imbalance. Our engineer will explain the math in 5 minutes.',
      },
      {
        q: 'How fast will it be installed?',
        a: 'On average 1\u20133 days. Complex objects (separate ventilation, foundation) — up to a week. Timelines are agreed in advance.',
      },
      {
        q: 'How loud are the generators?',
        a: 'Open frames: 75\u201395 dB (motorbike). With silent enclosure: 55\u201370 dB (calm conversation). Plus vibration mounts and silencers.',
      },
      {
        q: 'How to start a generator?',
        a: 'Manual (cord), electric starter (key turn), automatic transfer switch (ATS). ATS is the gold standard — 10 seconds without you.',
      },
      {
        q: 'UPS (batteries) or a generator?',
        a: 'UPS gives instant transfer and silence, but lasts hours. Generator runs days. The Profi solution is hybrid: UPS picks up instantly, generator starts on long outages.',
      },
    ],
  },
  services: {
    title: 'PROFFI services',
    subtitle: 'Full cycle — from design to scheduled maintenance',
    items: [
      {
        title: 'Selection & sale',
        text: '340+ models in stock. Matched to object, budget and conditions.',
      },
      {
        title: 'Turnkey installation in 1 day',
        text: 'We deliver and install. Cables, ATS, connection — all included.',
      },
      {
        title: 'Service and scheduled maintenance',
        text: 'We call you in 11 months and yearly thereafter. Oil, filters.',
      },
      {
        title: 'Repair',
        text: 'Warranty and post-warranty repair for any models.',
      },
      {
        title: 'Remote support',
        text: 'Engineers on call — we resolve minor issues by phone fast.',
      },
      {
        title: 'Drainage, storm sewer, caissons',
        text: 'Beyond power — comprehensive engineering for the property.',
      },
    ],
  },
  about: {
    title: 'PROFFI',
    subtitle: 'Since 2013 protecting homes and businesses from blackouts',
    description:
      'We are a team of 12 engineering crews with up to 7 years of experience. We work in Moscow, region, and beyond. Turnkey power: from picking equipment to scheduled service.',
    metrics: [
      { value: '13+', label: 'years on the market' },
      { value: '340+', label: 'models in stock' },
      { value: '12', label: 'engineering crews' },
      { value: '15 yrs', label: 'max warranty' },
    ],
    caseTitle: 'Artists among our clients',
    caseText:
      'Sergey Krestovsky, musician of Uma2rman, chose us for his country house. Full kit: heating, enclosure, auto-start. Runs quietly and bothers no one.',
  },
  contacts: {
    title: 'Contacts',
    subtitle: 'Call, message us or visit the office',
    address: 'Russia, Zelenograd, Logvinenko st., 1401, office 105',
    schedule: 'Daily from 9:00 to 21:00',
    phone1: '+7 (977) 305-99-39',
    phone2: '+7 (495) 979-55-75',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    addressLabel: 'We are at',
    scheduleLabel: 'We work',
    phoneLabel: 'Our phones',
    selectedProductHint:
      'Boutique model: {{name}}. Leave your contact — we will match the connection to your panel.',
  },
  privacy: {
    title: 'Privacy policy',
    subtitle: 'Applies to this website',
  },
  footer: {
    rights: 'All rights reserved',
    privacy: 'Privacy policy',
    consent: 'Personal data consent',
    description:
      'PROFFI — turnkey backup power in 1 day. Moscow, region & beyond. Since 2013.',
  },
  leadForm: {
    name: 'What\u2019s your name?',
    phone: 'WhatsApp / Telegram',
    phonePlaceholder: '+7 (___) ___-__-__',
    consent: 'I consent to processing of personal data and confirm I have read the',
    submit: 'Get quote + checklist',
    submitting: 'Sending\u2026',
    successTitle: 'Request received',
    successDescription: 'We will contact you within 5 minutes.',
    errorTitle: 'Send error',
    errorDescription: 'Try again or call +7 (977) 305-99-39.',
    invalidName: 'Enter a name (min 2 characters)',
    invalidPhone: 'Enter a valid phone number',
    requireConsent: 'Confirm consent to personal data processing',
    boutiqueLeadComment:
      'Boutique / panel match: {{name}}, {{brand}}, {{kw}} kW, from {{price}}, id: {{id}}',
    boutiqueLeadCommentUnknownId:
      'Boutique / panel match: id {{id}} (model not found in the on-site catalog)',
    boutiqueLeadCommentById: 'Boutique / panel match: id {{id}}',
  },
  langName: 'English',
};
