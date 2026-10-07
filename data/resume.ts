export const resume = {
  personal: {
    firstName: "Abhiram",
    lastName: "Kalathur",
    fullName: "Abhiram Kalathur",
    role: "Manufacturing Engineer",
    email: "kalathurabhiram@outlook.com",
    phone: "+1 (770) 570-0483",
    phoneHref: "tel:+17705700483",
    linkedin: "https://www.linkedin.com/in/abhiram-kalathur",
    availability: "Based in Wichita, KS",
    heroLead: "improving",
    heroPhrases: [
      "production readiness",
      "manufacturing flow",
      "process consistency",
    ],
    heroSummary:
      "Manufacturing and Industrial Engineering professional with 2+ years of experience across aerospace manufacturing and high-volume operations, supporting production readiness, process improvement, design review, and shop-floor execution.",
  },
  summary:
    "Manufacturing and Industrial Engineering professional with 2+ years of experience across aerospace manufacturing and high-volume operations, supporting production readiness, process improvement, design review, and shop-floor execution. Experienced in working with Manufacturing, Design, and Quality teams to resolve production issues, evaluate manufacturability, and strengthen process consistency from engineering release through production. Brings a practical background in Lean manufacturing, production analysis, mechanical design support, and continuous improvement, with a strong focus on efficient, reliable, and manufacturable outcomes.",
  domains: ["Aerospace", "Manufacturing", "Lean Operations", "Automation"],
  stats: [
    { value: 2, suffix: "+", label: "Years Experience" },
    { value: 40, suffix: "%", label: "Processing Time Cut" },
    { value: 5, suffix: "-8", label: "New Parts / Quarter" },
  ],
  skillGroups: [
    {
      id: "manufacturing",
      items: [
        "Manufacturing Process Development",
        "Production Planning",
        "Production Readiness",
        "Process Mapping",
        "Process Flow Analysis",
        "Time Studies",
        "Line Balancing",
        "Cycle Time Analysis",
        "Capacity Analysis",
        "Bottleneck Analysis",
        "Process Optimization",
        "Standardized Work",
      ],
    },
    {
      id: "cad",
      items: [
        "CATIA V5/V6",
        "SolidWorks",
        "Creo (Exposure)",
        "AutoCAD (Exposure)",
        "3DEXPERIENCE",
        "GD&T",
        "Engineering Drawings",
        "Tolerance Analysis",
        "DFM",
        "Producibility Analysis",
      ],
    },
    {
      id: "lean",
      items: [
        "Lean Manufacturing",
        "Continuous Improvement",
        "6S",
        "Root Cause Analysis",
        "5 Whys",
        "FMEA",
        "Corrective Actions",
        "Non-Conformance Investigation",
        "Process Validation",
        "First-Pass Quality",
      ],
    },
    {
      id: "analytics",
      items: [
        "Advanced Excel",
        "Production KPI Analysis",
        "Cycle-Time Tracking",
        "Build Status Tracking",
        "Trend Analysis",
        "Process Performance Analysis",
      ],
    },
    {
      id: "systems",
      items: [
        "PLM",
        "Engineering Change Review",
        "Configuration Control",
        "Work Instructions",
        "Manufacturing Documentation",
      ],
    },
    {
      id: "simulation",
      items: [
        "RoboDK",
        "ABB IRB 4400/60",
        "Robotic Work-Cell Simulation",
        "Material Handling Simulation",
        "Motion-Path Optimization",
      ],
    },
    {
      id: "ai",
      items: [
        "Microsoft Copilot",
        "AI-Assisted Technical Documentation",
        "AI-Assisted Process Analysis",
      ],
    },
  ],
  experience: [
    {
      role: "Manufacturing Engineer (Research Associate)",
      company: "National Institute for Aviation Research (NIAR)",
      location: "Wichita, KS",
      dates: "Dec 2024 - Present",
      highlights: [
        "Streamlined component flow through time studies, line balancing, cycle-time analysis, and standardized work, cutting processing time by 40% while creating a more balanced production sequence.",
        "Built Advanced Excel trackers for build status, assembly progress, cycle time, and production KPIs, giving engineering teams clearer visibility into bottlenecks and more reliable inputs for production planning.",
        "Examined dimensional and yield data from pilot runs of 20-50 units, combining tolerance analysis with process validation to trace defect sources and strengthen first-pass production quality.",
        "Eliminated recurring manufacturing rework through 5 Whys, Root Cause Analysis, and corrective-action reviews, bringing engineering rework down to 10-20% through more consistent validation practices.",
        "Prepared production readiness for 5-8 new part numbers per quarter by reviewing process flow, capacity needs, manufacturing requirements, and work instructions before shop-floor release.",
        "Verified CATIA V5/V6 and 3DEXPERIENCE models, GD&T, engineering drawings, and PLM revisions using DFM and producibility analysis, catching tolerance and manufacturing risks before fabrication or assembly.",
        "Partnered with Design and Quality Engineering to close non-conformances through configuration control, process validation, and engineering-change review, helping maintain product conformity and dependable production schedules.",
        "Applied Microsoft Copilot to technical documentation and process analysis, refining work instructions and engineering summaries so manufacturing findings were easier to review, communicate, and reuse across teams.",
      ],
    },
    {
      role: "Operations Warehouse Associate | Lean & Process Improvement",
      company: "Amazon",
      location: "Newcastle upon Tyne, UK",
      dates: "Jul 2023 - Dec 2023",
      highlights: [
        "Inspected outbound packages against quality standards and work instructions, catching labeling and packaging errors before dispatch and helping maintain accurate order fulfillment.",
        "Coordinated material movement across picking, packing, and outbound handoffs, helping associates keep orders moving efficiently and limiting delays during high-volume shifts.",
        "Applied Lean Manufacturing and 6S practices to organize work areas and standardize material placement, decreasing unnecessary handling and making daily workflows easier to execute.",
        "Resolved recurring process deviations through structured quality checks and escalation procedures, limiting downstream errors and avoiding repeat handling of non-conforming orders.",
        "Lowered rework by 15% through clearer task sequencing and consistent process adherence, helping associates complete fulfillment activities with fewer corrective steps.",
        "Monitored order flow and operational handoffs during daily fulfillment activities, surfacing recurring delays to operations leads and supporting steadier outbound execution.",
        "Reinforced safety, quality, and standard operating procedures with team members, strengthening process discipline and consistency across routine warehouse activities.",
        "Partnered with warehouse associates and operations leads to address quality exceptions and flow disruptions, restoring smoother order movement and supporting dependable outbound performance.",
      ],
    },
  ],
  projects: [
    {
      index: "01",
      code: "ROBOTICS",
      title: "Robot Programming & Material Handling Automation",
      highlights: [
        "Configured a RoboDK work cell with an ABB IRB 4400/60 robot for a 4 × 4 pallet layout, programming pick-and-place sequences to establish repeatable material handling.",
        "Simulated robot travel, palletizing logic, and cycle-time behavior in RoboDK, tracing excess motion to repeated home-position transitions that slowed the handling sequence.",
        "Refined motion paths and transition logic to shorten non-value-added travel, demonstrating a more efficient robotic workflow before physical implementation.",
      ],
    },
    {
      index: "02",
      code: "LEAN FLOW",
      title: "Global Grab Productions - Manufacturing Business Simulation",
      highlights: [
        "Modeled an assembly system with Lean Manufacturing, SIPOC, process-flow analysis, and capacity analysis to expose sequencing constraints affecting throughput and delivery performance.",
        "Prioritized high-risk failure modes through FMEA and corrective-action analysis, targeting defect-driven rework that disrupted assembly flow and process consistency.",
        "Raised simulated on-time delivery from 85% to 95% by addressing critical failure modes and aligning corrective actions with production flow and capacity requirements.",
      ],
    },
    {
      index: "03",
      code: "MECHANICAL DFM",
      title: "Mechanical Component DFM & Tolerance Design",
      highlights: [
        "Modeled a mechanical component and assembly in SolidWorks using GD&T and tolerance analysis, defining manufacturable geometry and drawing requirements for repeatable production.",
        "Evaluated design features through DFM and producibility analysis, revising tolerances and component interfaces to simplify fabrication while preserving functional requirements.",
        "Documented the finalized design with engineering drawings and CAD revisions, creating a clearer manufacturing package for design review and downstream production use.",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Science in Engineering Management (Industrial & Manufacturing)",
      school: "Wichita State University",
      location: "Wichita, KS",
      dates: "Jan 2024 - Dec 2025",
    },
    {
      degree: "Master of Science in Mechanical Engineering with Advanced Practice",
      school: "Northumbria University",
      location: "Newcastle upon Tyne, UK",
      dates: "Jan 2020 - Dec 2022",
    },
    {
      degree: "Bachelor of Technology in Mechanical Engineering",
      school: "Raghu Institute of Technology",
      location: "Andhra Pradesh, India",
      dates: "Jun 2014 - May 2018",
    },
  ],
  certifications: [
    {
      name: "SolidWorks xDesign Associate Certification",
      issuer: "Dassault Systèmes",
    },
    {
      name: "SME Lean Bronze Knowledge Certification",
      issuer: "SME",
    },
    {
      name: "Six Sigma Principles",
      issuer: "Coursera",
    },
    {
      name: "Introduction to Operations Management",
      issuer: "Coursera",
    },
    {
      name: "Digital Manufacturing & Design Technology Specialization",
      issuer: "Coursera",
    },
    {
      name: "Lean Six Sigma Foundations",
      issuer: "LinkedIn Learning",
    },
  ],
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;
