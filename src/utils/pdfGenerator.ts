import { jsPDF } from 'jspdf';

export function generateResumePDF() {
  // Create instance of jsPDF in A4 format (210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Colors based on modern technical palette
  const COLOR_HEADER = [14, 13, 15]; // #0e0d0f (Charcoal Dark)
  const COLOR_PRIMARY = [0, 100, 150]; // Technical professional blue
  const COLOR_ACCENT = [78, 222, 163]; // Synkrato emerald #4edea3
  const COLOR_TEXT_DARK = [40, 40, 42]; // Main body text (#28282a)
  const COLOR_TEXT_MUTED = [100, 100, 105]; // Secondary text

  // Coordinate tracking
  let y = 14;

  // 1. HEADER SECTION (Full Width)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(COLOR_HEADER[0], COLOR_HEADER[1], COLOR_HEADER[2]);
  doc.text('SABHARI SHRINIVAS', 12, y);

  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Senior Unity Developer  |  Systems & Gameplay Programmer', 12, y);

  // Contact info line aligned to the right of header
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('Bangalore, Karnataka, India  |  +91 70107 99731  |  sabhari.thirumurugan@gmail.com', 12, y + 5);

  // Links line with styled dynamic clickable LinkedIn link
  const githubLabel = 'GitHub: github.com/sabharishrinivas';
  doc.text(githubLabel, 12, y + 9);
  
  const separatorText = '  |  ';
  const sepWidth = doc.getTextWidth(separatorText);
  const githubWidth = doc.getTextWidth(githubLabel);
  
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(separatorText, 12 + githubWidth, y + 9);
  
  const linkLabel = 'LinkedIn';
  const linkX = 12 + githubWidth + sepWidth;
  doc.setTextColor(0, 100, 150); // Theme standard primary blue link color
  doc.text(linkLabel, linkX, y + 9);
  doc.link(linkX, y + 9 - 3.2, doc.getTextWidth(linkLabel), 4, { url: 'https://www.linkedin.com/in/sabharishrinivas' });

  y += 14;

  // Thin separator line
  doc.setDrawColor(220, 220, 225);
  doc.setLineWidth(0.3);
  doc.line(12, y, 198, y);

  y += 8;

  // Set up two-column coordinates
  // Left Column: x = 12, width = 112
  // Right Column: x = 132, width = 66
  const colLeftX = 12;
  const colLeftWidth = 112;
  const colRightX = 132;
  const colRightWidth = 66;

  let yLeft = y;
  let yRight = y;

  // --- LEFT COLUMN CONTENT ---

  // Section: Profile Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_HEADER[0], COLOR_HEADER[1], COLOR_HEADER[2]);
  doc.text('PROFILE SUMMARY', colLeftX, yLeft);
  
  yLeft += 2.5;
  doc.line(colLeftX, yLeft, colLeftX + colLeftWidth, yLeft);
  
  yLeft += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  
  const profileText = "Accomplished Senior Unity Developer with over 5 years of experience in architecting complex gameplay systems and large-scale real-time simulations. Specialized in building high-performance Warehouse Digital Twins, focusing on snapshot-based state reconstruction, data-driven optimization, and seamless backend integration. Proven track record in delivering scalable C# architectures utilizing SOLID principles and design patterns.";
  const profileLines = doc.splitTextToSize(profileText, colLeftWidth);
  doc.text(profileLines, colLeftX, yLeft);
  yLeft += (profileLines.length * 4) + 6;

  // Section: Professional Experience
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_HEADER[0], COLOR_HEADER[1], COLOR_HEADER[2]);
  doc.text('PROFESSIONAL EXPERIENCE', colLeftX, yLeft);
  
  yLeft += 2.5;
  doc.line(colLeftX, yLeft, colLeftX + colLeftWidth, yLeft);
  yLeft += 5;

  const experiences = [
    {
      role: "Senior Unity Developer",
      period: "2025 - Present",
      company: "Gaea Global Technologies",
      bullets: [
        "Leading development of high-fidelity Warehouse Simulation Systems for massive industrial environments.",
        "Architected a Snapshot-based State Reconstruction engine allowing for time-scrubbing and real-time playback of historical telemetry.",
        "Optimized pathfinding and navigation mesh data for 1M+ sq. ft environments, reducing memory footprint by 40%.",
        "Integrated complex REST APIs and WebSocket streams to drive real-time digital twin synchronization."
      ]
    },
    {
      role: "Unity Developer",
      period: "2023 - 2025",
      company: "Gaea Global Technologies",
      bullets: [
        "Developed a modular Digital Twin Builder platform enabling rapid layout configuration for warehouse managers.",
        "Engineered custom Editor Tools in Unity to automate asset placement and metadata tagging for BIM models.",
        "Implemented data-driven systems for resource management and automated task allocation simulations."
      ]
    },
    {
      role: "Front-End Game Developer",
      period: "2022 - 2023",
      company: "Small World Games",
      bullets: [
        "Designed and implemented responsive UI systems for Roblox-based interactive experiences.",
        "Collaborated with UX designers to refine animation curves and input responsiveness, increasing player retention."
      ]
    },
    {
      role: "Freelance Game Developer",
      period: "2020 - 2022",
      company: "Indie & Client Pipelines",
      bullets: [
        "Successfully developed, programmed, and delivered a broad spectrum of 2D and 3D indie titles and mobile game titles, running the full developmental pipeline from code to asset configuration.",
        "Responsibilities included gameplay programming, UI implementation, animation systems, level design, and rapid prototyping."
      ]
    }
  ];

  experiences.forEach((exp) => {
    // Check page boundaries
    if (yLeft > 265) {
      doc.addPage();
      yLeft = 15;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(COLOR_HEADER[0], COLOR_HEADER[1], COLOR_HEADER[2]);
    doc.text(exp.role, colLeftX, yLeft);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
    const periodWidth = doc.getTextWidth(exp.period);
    doc.text(exp.period, colLeftX + colLeftWidth - periodWidth, yLeft);

    yLeft += 3.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(exp.company, colLeftX, yLeft);

    yLeft += 4;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    
    exp.bullets.forEach((bullet) => {
      const bulletLines = doc.splitTextToSize(bullet, colLeftWidth - 4);
      doc.text('•', colLeftX, yLeft);
      doc.text(bulletLines, colLeftX + 3.5, yLeft);
      yLeft += (bulletLines.length * 3.6) + 1.2;
    });

    yLeft += 3;
  });


  // --- RIGHT COLUMN CONTENT ---

  // Section: Core Competencies
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_HEADER[0], COLOR_HEADER[1], COLOR_HEADER[2]);
  doc.text('CORE COMPETENCIES', colRightX, yRight);

  yRight += 2.5;
  doc.line(colRightX, yRight, colRightX + colRightWidth, yRight);
  yRight += 5;

  const competencyGroups = [
    {
      title: "PROGRAMMING",
      skills: ["C#", "OOP", "SOLID", "DOTS", "ASYNC/AWAIT"]
    },
    {
      title: "UNITY ENGINE",
      skills: ["ADDRESSABLES", "TIMELINE", "WEBGL", "PROFILER", "URP"]
    },
    {
      title: "SYSTEMS DESIGN",
      skills: ["FSM", "AI SYSTEMS", "SIMULATION", "REPLAY ENGINES"]
    }
  ];

  competencyGroups.forEach((group) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
    doc.text(group.title, colRightX, yRight);
    yRight += 5.5; // Shift down properly so tags do not overlap title

    // Draw stylized square tags for skills
    let tagX = colRightX;
    group.skills.forEach((skill) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      const skillTextWidth = doc.getTextWidth(skill);
      const tagPadding = 2;
      const tagWidth = skillTextWidth + (tagPadding * 2);
      const tagHeight = 4.5;

      // Wrap tags to next line if they exceed right column boundary
      if (tagX + tagWidth > colRightX + colRightWidth) {
        tagX = colRightX;
        yRight += 6;
      }

      // Draw light grey rounded rect
      doc.setFillColor(242, 243, 245);
      doc.rect(tagX, yRight - 3.5, tagWidth, tagHeight, 'F');

      // Draw text
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      doc.text(skill, tagX + tagPadding, yRight - 0.3);

      tagX += tagWidth + 1.8;
    });

    yRight += 7.5;
  });

  yRight += 2;

  // Section: Technical Depth
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_HEADER[0], COLOR_HEADER[1], COLOR_HEADER[2]);
  doc.text('TECHNICAL DEPTH', colRightX, yRight);

  yRight += 2.5;
  doc.line(colRightX, yRight, colRightX + colRightWidth, yRight);
  yRight += 5;

  const depths = [
    { name: "PERFORMANCE OPTIMIZATION", pct: 95 },
    { name: "SYSTEM ARCHITECTURE", pct: 90 },
    { name: "EDITOR TOOLING", pct: 85 }
  ];

  depths.forEach((depth) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
    doc.text(depth.name, colRightX, yRight);
    
    doc.setFont('helvetica', 'normal');
    const pctText = `${depth.pct}%`;
    const pctTextWidth = doc.getTextWidth(pctText);
    doc.text(pctText, colRightX + colRightWidth - pctTextWidth, yRight);

    yRight += 2.2;

    // Draw bar background
    doc.setFillColor(235, 237, 240);
    doc.rect(colRightX, yRight - 1, colRightWidth, 1.8, 'F');
    // Draw bar value
    const valWidth = (colRightWidth * depth.pct) / 100;
    doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.rect(colRightX, yRight - 1, valWidth, 1.8, 'F');

    yRight += 5.5;
  });

  yRight += 4;

  // Section: Education
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_HEADER[0], COLOR_HEADER[1], COLOR_HEADER[2]);
  doc.text('EDUCATION', colRightX, yRight);

  yRight += 2.5;
  doc.line(colRightX, yRight, colRightX + colRightWidth, yRight);
  yRight += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('Bachelor of Computer Science', colRightX, yRight);

  yRight += 3.8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Sethu Institute of Technology', colRightX, yRight);

  yRight += 3.8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('CGPA: 8.0', colRightX, yRight);

  // Footer on both pages or at the bottom
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(230, 230, 235);
    doc.line(12, 283, 198, 283);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
    doc.text('© 2026 SABHARI SHRINIVAS  |  SENIOR UNITY DEVELOPER', 12, 288);
    
    const pageStr = `Page ${i} of ${totalPages}`;
    const pageStrWidth = doc.getTextWidth(pageStr);
    doc.text(pageStr, 198 - pageStrWidth, 288);
  }

  // Trigger Save File
  doc.save('Sabharishrinivas_Senior_Unity_Developer_Resume.pdf');
}
