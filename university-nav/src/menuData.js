// Single source of truth for the nav structure.
// Navbar/Dropdown components read this via props — nothing about
// menu content is hardcoded inside the components themselves.
//
// Each node now carries real `description` text and a `facts` array
// (short highlight strings) instead of an auto-generated placeholder —
// PageTemplate reads these directly, so richer content per page never
// means touching App.jsx or PageTemplate.jsx.

const menuData = [
  {
    label: 'About Us',
    path: '/about',
    description: 'A community-first university built around research, industry ties, and a residential campus in Chennai.',
    facts: ['Founded with a research-first charter', 'Fully residential campus', 'Faculty drawn from IITs, IISc, and global universities'],
    children: [
      {
        label: 'Vision & Mission',
        path: '/about/vision-mission',
        description: 'To be a globally recognized institution producing socially conscious, industry-ready graduates.',
        facts: ['Focus on interdisciplinary learning', 'Strong emphasis on research output', 'Community and sustainability as core values'],
      },
      {
        label: 'Leadership',
        path: '/about/leadership',
        description: 'The university is led by an academic council of deans, department heads, and an advisory board.',
        facts: ['Chancellor-led governing council', 'Dean per school (Engineering, Management, Humanities)', 'Student representation on key committees'],
      },
      {
        label: 'Departments',
        path: '/about/departments',
        description: 'Departments span engineering, sciences, management, and humanities, each with dedicated labs.',
        facts: ['CSE, ECE, AI & DS, Mechanical', 'School of Management', 'School of Humanities & Social Sciences'],
      },
    ],
  },
  {
    label: 'Academics',
    path: '/academics',
    description: 'Programs span undergraduate, postgraduate, and doctoral levels across engineering, science, and management.',
    facts: ['Choice-based credit system', 'Minor and specialization tracks', 'Industry-aligned electives'],
    children: [
      {
        label: 'Undergraduate',
        path: '/academics/undergraduate',
        description: 'Four-year B.Tech programs including Computer Science, ECE, and AI & Data Science.',
        facts: ['8-semester structure', 'Mandatory internship component', 'Capstone project in final year'],
      },
      {
        label: 'Postgraduate',
        path: '/academics/postgraduate',
        description: 'M.Tech and MBA programs with research and industry specialization tracks.',
        facts: ['Thesis or coursework track', 'Lab-based specializations', 'Industry mentor program'],
      },
      {
        label: 'PhD',
        path: '/academics/phd',
        description: 'Doctoral research across engineering, sciences, and management with full-time funded positions.',
        facts: ['Funded research assistantships', 'Publication-driven milestones', 'Co-supervision with industry labs'],
      },
    ],
  },
  {
    label: 'Admissions',
    path: '/admissions',
    description: 'Admissions run through national entrance exams, direct applications, and merit-based scholarships.',
    facts: ['JEE / university entrance-based intake', 'Rolling scholarship evaluation', 'Dedicated international admissions cell'],
    children: [
      {
        label: 'Eligibility',
        path: '/admissions/eligibility',
        description: 'Minimum qualifying marks and subject requirements vary by program.',
        facts: ['10+2 with PCM for B.Tech', "Bachelor's degree for M.Tech/MBA", 'Entrance score cutoffs published yearly'],
      },
      {
        label: 'Application Process',
        path: '/admissions/application-process',
        description: 'Applications are submitted online with document verification and an optional interview round.',
        facts: ['Online application portal', 'Document + score upload', 'Interview for select programs'],
      },
      {
        label: 'Important Dates',
        path: '/admissions/important-dates',
        description: 'Key deadlines for application submission, entrance results, and orientation.',
        facts: ['Applications open March–June', 'Merit list released in July', 'Orientation week in August'],
      },
    ],
  },
  {
    label: 'Research',
    path: '/research',
    description: 'Active research spans AI, robotics, materials science, and social sciences, backed by funded labs.',
    facts: ['Multiple government-funded projects', 'Industry-sponsored research chairs', 'Undergraduate research opportunities'],
    children: [
      {
        label: 'Research Areas',
        path: '/research/areas',
        description: 'Core areas include AI/ML, computer vision, embedded systems, and sustainable materials.',
        facts: ['AI & Data Science lab', 'IoT and embedded systems group', 'Materials and sustainability lab'],
      },
      {
        label: 'Publications',
        path: '/research/publications',
        description: 'Faculty and student research is published in peer-reviewed journals and top-tier conferences.',
        facts: ['Regular IEEE/ACM publications', 'Student co-authorship encouraged', 'Annual research symposium'],
      },
    ],
  },
  {
    label: 'Campus Life',
    path: '/campus-life',
    description: 'A residential campus with hostels, sports facilities, cultural fests, and 50+ student clubs.',
    facts: ['On-campus hostels for all years', 'Annual cultural and tech fests', '50+ student-run clubs'],
    children: [],
  },
  {
    label: 'Placements',
    path: '/placements',
    description: 'A dedicated placement cell connects students with recruiters across tech, consulting, and core engineering.',
    facts: ['100+ recruiting companies annually', 'Pre-placement training program', 'Dedicated internship drives'],
    children: [],
  },
  {
    label: 'Contact Us',
    path: '/contact',
    description: 'Reach the university through the admissions office, general enquiry desk, or department-specific contacts.',
    facts: ['Admissions helpline for applicants', 'Campus address and map', 'Department-wise email directory'],
    children: [],
  },
]

export default menuData
