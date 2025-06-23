"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Language } from "@/components/language-switcher"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
type TranslationDict = { [key: string]: string }

const translations: { [lang: string]: TranslationDict } = {
  en: {
    // Navbar
    "navbar.about": "About",
    "navbar.education": "Education",
    "navbar.skills": "Skills",
    "navbar.projects": "Projects",
    "navbar.certifications": "Certifications",
    "navbar.contact": "Contact",
    "navbar.myjourney": "My Journey",
    "navbar.testimonial": "Testimonials",

    // Hero section
    "hero.title": "Transforming Data into Insights",
    "hero.description":
      "I'm a motivated Computer Science student at Johannes Gutenberg-Universität Mainz, specializing in Data Science \
       with a minor in Economics. With a strong grade of 1.9 of german grading system, I'm passionate about extracting meaningful insights from \
        data and developing innovative solutions.",
    "hero.viewProjects": "View Projects",
    "hero.downloadCV": "Download CV",
    "hero.role": "Data Science Student",
    "hero.location": "Mainz, Germany",

    // About section
    "about.title": "About Me",
    "about.description":
      "My technical toolkit includes Python, SQL, Pandas, and visualization tools like PowerBI and Seaborn. \
       I've worked on projects ranging from sports analytics to recommendation systems using big data technologies.",
    "about.languages": "Languages",
    "about.german": "Business fluent",
    "about.english": "Business fluent",
    "about.vietnamese": "Native",
    "about.certification": "German Language Certification",
    "about.dshResult": "Result: DSH-2 • Dec. 2021",
    "about.written": "Written:",
    "about.oral": "Oral:",
    "about.techInterests": "Technical Interests",
    "about.techInterest.analytics": "Data Analytics",
    "about.techInterest.analyticsDesc": "Analyzing data to extract meaningful insights and support decision-making processes.",
    "about.techInterest.datamanagementDesc": "Organizing, storing, and maintaining data to ensure its accessibility, reliability, and security.",
    "about.techInterest.datascienceDesc": "Extracting insights from data using statistical methods and machine learning algorithms.",
    "about.techInterest.dataengineeringDesc": "Building and maintaining data pipelines and infrastructure for efficient data processing.",
    
    // Education section
    "education.title": "Education",
    "education.bsc": "Bachelor of Science, Informatik",
    "education.focus": "Focus",
    "education.dataScience": "Focus: Data Science",
    "education.economics": "Minor: Economics",
    "education.projects": "Projects",
    "education.programming": "Programming (Computer Games)",
    "education.database": "Database (Web Development)",
    "education.software": "Software Engineering (Agile Methods)",
    "education.bigData": "Big Data (Recommendation System)",
    "education.keySkills": "Key Skills",
    "education.prep": "College/University Preparatory",
    "timeline.grade": "Grade",
    "timeline.viewCourses": "View Courses",
    "timeline.bachelor.description": "Developed skills in relational databases, data warehousing, and NoSQL technologies through coursework and projects.",
    "timeline.focus.major": "Major: Data Science",
    "timeline.focus.minor": "Minor: Economics",
    "timeline.projects.programming": "Programming (Computer Games)",
    "timeline.projects.database": "Database (Web Development)",
    "timeline.projects.software": "Software Engineering (Agile Methods)",
    "timeline.projects.bigData": "Big Data (Recommendation System)",
    "timeline.schulzeit.title": "School Years",

    // Courses
    "courses.ds_algo.name": "Data Structures and Efficient Algorithms",
    "courses.ds_algo.desc": "Study of various algorithms and data structures for efficient computation.",
    "courses.db.name": "Database Systems",
    "courses.db.desc": "Relational databases, data warehouses, data lakes, transactions, normalization. Included a block practical course.",
    "courses.statistik.name": "Statistics",
    "courses.statistik.desc": "Statistical methods for computer science: descriptive statistics, hypothesis testing, regression, probability theory.",
    "courses.se.name": "Software Engineering",
    "courses.se.desc": "Requirements engineering, project management, agile methods. Included a block practical course.",
    "courses.nosql.name": "Non-Standard Database",
    "courses.nosql.desc": "Covers unstructured, graph, text, image databases, NoSQL, Redis. Included a seminar on Temporal Information Retrieval.",
    "courses.bigdata.name": "Big Data",
    "courses.bigdata.desc": "Apache Spark, RDDs, and algorithms such as collaborative filtering for large-scale data analysis.",
    "courses.ml.name": "Machine Learning",
    "courses.ml.desc": "Supervised learning: linear regression, logistic regression, random forest, neural networks, etc.",
    "courses.programmanalyse.name": "Program Analysis",
    "courses.programmanalyse.desc": "Programming language analysis, inference rules, with a seminar on Shape Analysis.",
    // View Certificate
    "certificates.view": "View Certificate",

    // Testimonial section
    "testimonials.title": "Testimonials",
    "testimonials.demirkan.quote":
      "I’ve come to know Viet as a dedicated and very helpful fellow student.\
      He’s always ready to support others and brings a positive energy to every collaboration.",
    "testimonials.csjgu.role":
      "Fellow Computer Science Student, JGU Mainz",
    "testimonials.huonggiang.quote":
      "Viet is a very responsible person, has excellent planning skills, \
      and outstanding judgment and problem-solving abilities. He can work independently \
      as well as lead a team very well with creative and bold strategies.",

    // Certificate date
    "certificates.date": "Date",

    // Technical Interests (titles and categories)
    "about.techInterest.datamanagement": "Data Management",
    "about.techInterest.datascience": "Data Science",
    "about.techInterest.dataengineering": "Data Engineering",

    // Technical Interests (categories)
    "skills.webDevelopment": "Web Development",
    "skills.databases": "Databases",
    "skills.toolsPlatforms": "Tools & Platforms",

    // Skill names and levels
    "skills.python": "Python",
    "skills.sql": "SQL",
    "skills.dataAnalysis": "Data Analysis",
    "skills.machineLearning": "Machine Learning",
    "skills.dataVisualization": "Data Visualization",
    "skills.bigData": "Big Data",
    "skills.expert": "Expert",
    "skills.advanced": "Advanced",
    "skills.intermediate": "Intermediate",

    // Skill descriptions
    "skills.pythonDesc": "Proficient in data analysis libraries (Pandas, NumPy) and ML frameworks (Scikit-learn)",
    "skills.sqlDesc": "Database design, complex queries, and data manipulation",
    "skills.dataAnalysisDesc": "Data cleaning, exploration, and generating actionable insights",
    "skills.machineLearningDesc": "Supervised and unsupervised learning, model evaluation",
    "skills.dataVisualizationDesc": "PowerBI, Seaborn, Matplotlib for creating insightful visualizations",
    "skills.bigDataDesc": "Apache Spark, Scala, distributed computing",

    // Skills section
    "skills.title": "Technical Skills",
    "skills.programming": "Programming & Data Skills",
    "skills.other": "Other Technical Skills",
    "skills.softSkills": "Soft Skills",
    "skills.problemSolving": "Problem Solving",
    "skills.teamCollaboration": "Team Collaboration",
    "skills.projectManagement": "Project Management",
    "skills.communication": "Communication",

    "language.german": "German",
    "language.english": "English",
    "language.vietnamese": "Vietnamese",

    // Projects section
    "projects.all": "All",
    "projects.tabs.report": "Report",
    "projects.title": "Projects",
    "projects.football.title": "Football Team Analysis",
    "projects.football.description": "Personal project for data analysis of a football team using Python, Pandas, Seaborn, and PowerBI. Explored player statistics, match outcomes, and visualized insights for performance improvement.",
    "projects.bananaairlines.title": "Banana Airlines Website",
    "projects.bananaairlines.description": "Development of a website for an airline as part of the Database module at JGU Mainz. Features included search, booking, payment, and check-in for flights. Frontend implemented with HTML/CSS/JavaScript, backend with Flask, SQL, and database management with MariaDB/PostgreSQL.",
    "projects.f1etl.title": "Automated F1 ETL-Pipeline",
    "projects.f1etl.description": "Automated ETL pipeline for Formula 1 data using Python for parallel extraction, dynamic schema detection, and transformation. Loads data into BigQuery with automated tables, bulk loading, weekly GitHub Actions orchestration, plus analytical SQL and ML for race prediction.",
    "projects.foodrec.title": "Big Data Food Recommendation System",
    "projects.foodrec.description": "Development of a recommendation system in the Big Data module for analyzing about 1 GB of food reviews using Apache Spark and Scala. Implementation of algorithms such as collaborative filtering, TF-IDF, item profiles, min hashing, and locality-sensitive hashing (LSH).",
    "projects.flappybird.title": "Flappy Bird Game",
    "projects.flappybird.description": "Development of a classic Flappy Bird game as part of the Introduction to Programming module. Used Simple I/O package provided by JGU Mainz to display basic graphical objects and simulate game mechanics.",
    "projects.softwareeng.title": "Software Engineering",
    "projects.softwareeng.description": "Development of a website for data cleaning and visualization as part of an agile software engineering project. Served as a backend team member responsible for designing and implementing the database using Django. Collaborated closely within a team structured into three clusters: Documentation, Frontend, and Backend.",
    "projects.tabs.overview": "Overview",
    "projects.tabs.analysis": "Analysis",
    "projects.date": "Date",

    // Timeline section
    "timeline.title": "My Journey",
    "timeline.year": "Year",
    "timeline.period": "Period",
    "timeline.focus": "Focus",
    "timeline.projects": "Projects",
    "timeline.keySkills": "Key Skills",
    "timeline.viewFiles": "View Files",
    "timeline.images": "Images",
    "timeline.courses": "Courses",
    "courses.name": "Course Name",
    "courses.description": "Description",
    "courses.grade": "Grade",

    // Certifications section
    "certifications.title": "Certifications",

    // Contact section
    "contact.title": "Get In Touch",
    "contact.info": "Contact Information",
    "contact.lookingFor": "Career Interests",
    "contact.opportunities": "I'm currently seeking intern, trainee, or full-time opportunities in:",
    "contact.workinglocation": "Open to both remote and on-site roles throughout Germany.",
    "contact.sendMessage": "Send a Message",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your Name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "Your Email",
    "contact.subject": "Subject",
    "contact.subjectPlaceholder": "Subject",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Your Message",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.sent": "Message sent!",
    "contact.error": "Failed to send message.",

    // Footer
    "footer.rights": "All rights reserved.",

    // Timeline additional entries
    "timeline.fsp.description": "Preparatory studies for university admission and language preparation.",
    "timeline.schulzeit.description": `Top student in class for three consecutive years at Viet Duc High School (grades 10 to 12).
    Graduated with a diploma from a general upper secondary school (equivalent to Abitur).
    
    `,
    // Certificates
    "Transcript of Records": "Transcript of Records",
    "DSD-I Certificate": "DSD-I Certificate",
    "University Entrance Exam Results": "University Entrance Exam Results",
    "Transcript of Records in High School": "High School Transcript",
  },
  de: {
    // Navbar
    "navbar.about": "Über mich",
    "navbar.education": "Ausbildung",
    "navbar.skills": "Fähigkeiten",
    "navbar.projects": "Projekte",
    "navbar.certifications": "Zertifikate",
    "navbar.contact": "Kontakt",
    "navbar.myjourney": "Mein Werdegang",
    "navbar.testimonial": "Referenzen",

    // Hero section
    "hero.title": "Daten in Erkenntnisse umwandeln",
    "hero.description":
      "Ich bin ein motivierter Informatikstudent an der Johannes Gutenberg-Universität Mainz, \
       spezialisiert auf Data Science mit Nebenfach Wirtschaftswissenschaften. Mit einem starken \
        Notendurchschnitt von 1,9 bin ich leidenschaftlich daran interessiert, aussagekräftige Erkenntnisse \
         aus Daten zu gewinnen und innovative Lösungen zu entwickeln.",
    "hero.viewProjects": "Projekte ansehen",
    "hero.downloadCV": "Lebenslauf herunterladen",
    "hero.role": "Data Science Student",
    "hero.location": "Mainz, Deutschland",

    "projects.date": "Datum",

    // About section
    "about.title": "Über mich",
    "about.description":
      "Mein technisches Toolkit umfasst Python, SQL, Pandas und Visualisierungstools wie PowerBI und Seaborn.\
       Ich habe an Projekten gearbeitet, die von Sportanalysen bis hin zu Empfehlungssystemen mit \
        Big-Data-Technologien reichen.",
    "about.languages": "Sprachen",
    "about.german": "Verhandlungssicher",
    "about.english": "Verhandlungssicher",
    "about.vietnamese": "Muttersprache",
    "about.certification": "Deutsche Sprachzertifizierung",
    "about.dshResult": "Ergebnis: DSH-2 • Dez. 2021",
    "about.written": "Schriftlich:",
    "about.oral": "Mündlich:",
    "about.techInterests": "Technische Interessen",
    "about.techInterest.analytics": "Datenanalyse",
    "about.techInterest.analyticsDesc": "Analyse von Daten, um aussagekräftige Erkenntnisse zu gewinnen und Entscheidungsprozesse zu unterstützen.",
    "about.techInterest.datamanagementDesc": "Organisation, Speicherung und Pflege von Daten, um deren Zugänglichkeit, Zuverlässigkeit und Sicherheit zu gewährleisten.",
    "about.techInterest.datascienceDesc": "Gewinnung von Erkenntnissen aus Daten mittels statistischer Methoden und Algorithmen des maschinellen Lernens.",
    "about.techInterest.dataengineeringDesc": "Aufbau und Wartung von Datenpipelines und -infrastrukturen für eine effiziente Datenverarbeitung.",
    
    // Education section
    "education.title": "Ausbildung",
    "education.bsc": "Bachelor of Science, Informatik",
    "education.focus": "Schwerpunkt",
    "education.dataScience": "Schwerpunkt: Data Science",
    "education.economics": "Nebenfach: Wirtschaftswissenschaften",
    "education.projects": "Projekte",
    "education.programming": "Programmierung (Computerspiele)",
    "education.database": "Datenbank (Webentwicklung)",
    "education.software": "Software Engineering (Agile Methode)",
    "education.bigData": "Big Data (Recommendation System)",
    "education.keySkills": "Schlüsselkompetenzen",
    "education.prep": "Studienkolleg",
    "timeline.grade": "Note",
    "timeline.viewCourses": "Kurse anzeigen",
    "timeline.bachelor.description": "Entwicklung von Fähigkeiten in relationalen Datenbanken, Data Warehousing und NoSQL-Technologien durch Kurse und Projekte.",
    "timeline.focus.major": "Schwerpunkt: Data Science",
    "timeline.focus.minor": "Nebenfach: Wirtschaftswissenschaften",
    "timeline.projects.programming": "Programmierung (Computerspiele)",
    "timeline.projects.database": "Datenbank (Webentwicklung)",
    "timeline.projects.software": "Software Engineering (Agile Methoden)",
    "timeline.projects.bigData": "Big Data (Empfehlungssystem)",
    "timeline.schulzeit.title": "Schulzeit",


    // Courses
    "courses.ds_algo.name": "Datenstrukturen und effiziente Algorithmen",
    "courses.ds_algo.desc": "Studium verschiedener Algorithmen und Datenstrukturen für effiziente Berechnungen.",
    "courses.db.name": "Datenbanksysteme",
    "courses.db.desc": "Relationale Datenbanken, Data Warehouses, Data Lakes, Transaktionen, Normalisierung. Enthielt einen Blockpraktikum.",
    "courses.statistik.name": "Statistik",
    "courses.statistik.desc": "Statistische Methoden für die Informatik: deskriptive Statistik, Hypothesentests, Regression, Wahrscheinlichkeitstheorie.",
    "courses.se.name": "Software Engineering",
    "courses.se.desc": "Anforderungsmanagement, Projektmanagement, agile Methoden. Enthielt einen Blockpraktikum.",
    "courses.nosql.name": "Nicht-Standard-Datenbanken",
    "courses.nosql.desc": "Behandelt unstrukturierte, Graph-, Text-, Bilddatenbanken, NoSQL, Redis. Enthielt ein Seminar zu Temporal Information Retrieval.",
    "courses.bigdata.name": "Big Data",
    "courses.bigdata.desc": "Apache Spark, RDDs und Algorithmen wie Collaborative Filtering für groß angelegte Datenanalysen.",
    "courses.ml.name": "Maschinelles Lernen",
    "courses.ml.desc": "Überwachtes Lernen: lineare Regression, logistische Regression, Random Forest, neuronale Netze usw.",
    "courses.programmanalyse.name": "Programmanalyse",
    "courses.programmanalyse.desc": "Analyse von Programmiersprachen, Inferenzregeln, mit einem Seminar zu Shape Analysis.",
    // Skills section
    "skills.title": "Technische Fähigkeiten",
    "skills.programming": "Programmierung & Datenfähigkeiten",
    "skills.other": "Andere technische Fähigkeiten",
    "skills.softSkills": "Soziale Kompetenzen",
    "skills.problemSolving": "Problemlösung",
    "skills.teamCollaboration": "Teamarbeit",
    "skills.projectManagement": "Projektmanagement",
    "skills.communication": "Kommunikation",

    // Technical Interests (titles and categories)
    "about.techInterest.datamanagement": "Datenmanagement",
    "about.techInterest.datascience": "Datenwissenschaft",
    "about.techInterest.dataengineering": "Datenengineering",

    // Technical Interests (categories)
    "skills.webDevelopment": "Webentwicklung",
    "skills.databases": "Datenbanken",
    "skills.toolsPlatforms": "Werkzeuge & Plattformen",

    // Skill names and levels
    "skills.python": "Python",
    "skills.sql": "SQL",
    "skills.dataAnalysis": "Datenanalyse",
    "skills.machineLearning": "Maschinelles Lernen",
    "skills.dataVisualization": "Datenvisualisierung",
    "skills.bigData": "Big Data",
    "skills.expert": "Experte",
    "skills.advanced": "Fortgeschritten",
    "skills.intermediate": "Mittelstufe",

    // Skill descriptions
    "skills.pythonDesc": "Versiert in Datenanalyse-Bibliotheken (Pandas, NumPy) und ML-Frameworks (Scikit-learn)",
    "skills.sqlDesc": "Datenbankdesign, komplexe Abfragen und Datenmanipulation",
    "skills.dataAnalysisDesc": "Datenbereinigung, Exploration und Gewinnung umsetzbarer Erkenntnisse",
    "skills.machineLearningDesc": "Überwachtes und unüberwachtes Lernen, Modellevaluierung",
    "skills.dataVisualizationDesc": "PowerBI, Seaborn, Matplotlib zur Erstellung aussagekräftiger Visualisierungen",
    "skills.bigDataDesc": "Apache Spark, Scala, verteiltes Rechnen",
    "projects.tabs.overview": "Übersicht",
    "projects.tabs.analysis": "Analyse",
    "projects.all": "Alle",

    // View Certificate
    "certificates.view": "Zertifikat anzeigen",

    // Testimonial section
    "testimonials.title": "Referenzen",
    "testimonials.demirkan.quote":
      "Ich habe Viet als engagierten und sehr hilfsbereiten Kommilitonen kennengelernt.\
      Er ist immer bereit, andere zu unterstützen, und bringt positive Energie in jede Zusammenarbeit.",
    "testimonials.csjgu.role":
      "Mitstudent der Informatik, JGU Mainz",
    "testimonials.huonggiang.quote":
      "Viet ist eine sehr verantwortungsbewusste Person, verfügt über ausgezeichnete Planungsfähigkeiten \
      sowie herausragendes Urteilsvermögen und Problemlösungskompetenz. Er kann sowohl eigenständig \
      arbeiten als auch ein Team mit kreativen und mutigen Strategien sehr gut führen.",

    // Certificate date
    "certificates.date": "Datum",

    // Projects section
    "projects.title": "Projekte",
    "projects.tabs.report": "Bericht",
    "projects.football.title": "Fußballteam-Analyse",
    "projects.football.description": "Eigenes Projekt zur Datenanalyse eines Fußballteams mit Python, Pandas, Seaborn und PowerBI. Analyse von Spielerstatistiken, Spielergebnissen und Visualisierung von Erkenntnissen zur Leistungsverbesserung.",
    "projects.bananaairlines.title": "Banana Airlines Webseite",
    "projects.bananaairlines.description": "Entwicklung einer Website für eine Fluggesellschaft im Rahmen des Datenbankmoduls an der JGU Mainz. Funktionen: Suche, Buchung, Bezahlung und Check-in für Flüge. Frontend mit HTML/CSS/JavaScript, Backend mit Flask, SQL und Datenbankmanagement mit MariaDB/PostgreSQL.",
    "projects.f1etl.title": "Automatisierte F1 ETL-Pipeline",
    "projects.f1etl.description": "Automatisierte ETL-Pipeline für Formel-1-Daten mit Python für parallele Extraktion, dynamische Schemenerkennung und Transformation. Lädt Daten in BigQuery mit automatisierten Tabellen, Bulk-Loading, wöchentlicher GitHub Actions-Orchestrierung sowie analytischem SQL und ML für Rennvorhersagen.",
    "projects.foodrec.title": "Big Data Food Empfehlungssystem",
    "projects.foodrec.description": "Entwicklung eines Empfehlungssystems im Big Data Modul zur Analyse von ca. 1 GB Lebensmittelbewertungen mit Apache Spark und Scala. Implementierung von Algorithmen wie Collaborative Filtering, TF-IDF, Item Profiles, Min Hashing und Locality Sensitive Hashing (LSH).",
    "projects.flappybird.title": "Flappy Bird Spiel",
    "projects.flappybird.description": "Entwicklung eines klassischen Flappy Bird Spiels im Rahmen des Einführungskurses in die Programmierung. Verwendung des Simple I/O-Pakets der JGU Mainz zur Anzeige grafischer Objekte und Simulation der Spielmechanik.",
    "projects.softwareeng.title": "Software Engineering",
    "projects.softwareeng.description": "Entwicklung einer Website zur Datenbereinigung und -visualisierung im Rahmen eines agilen Software-Engineering-Projekts. Backend-Teammitglied für Design und Implementierung der Datenbank mit Django. Enge Zusammenarbeit in drei Clustern: Dokumentation, Frontend und Backend.",

    // Timeline section
    "timeline.title": "Mein Werdegang",
    "timeline.year": "Jahr",
    "timeline.period": "Zeitraum",
    "timeline.focus": "Schwerpunkt",
    "timeline.projects": "Projekte",
    "timeline.keySkills": "Schlüsselkompetenzen",
    "timeline.viewFiles": "Dateien anzeigen",
    "timeline.images": "Bilder",
    "timeline.courses": "Kurse",
    "courses.name": "Kursname",
    "courses.description": "Beschreibung",
    "courses.grade": "Note",

    // Certifications section
    "certifications.title": "Zertifizierungen",

    // Contact section
    "contact.title": "Kontakt",
    "contact.info": "Kontaktinformationen",
    "contact.lookingFor": "Ich suche nach",
    "contact.opportunities": "Ich suche derzeit nach Möglichkeiten in:",
    "contact.workinglocation": "Offen für sowohl Remote- als auch Vor-Ort-Stellen in ganz Deutschland.",
    "contact.sendMessage": "Nachricht senden",
    "contact.name": "Name",
    "contact.namePlaceholder": "Ihr Name",
    "contact.email": "E-Mail",
    "contact.emailPlaceholder": "Ihre E-Mail",
    "contact.subject": "Betreff",
    "contact.subjectPlaceholder": "Betreff",
    "contact.message": "Nachricht",
    "contact.messagePlaceholder": "Ihre Nachricht",
    "contact.send": "Senden",
    "contact.sending": "Wird gesendet...",
    "contact.sent": "Nachricht gesendet!",
    "contact.error": "Nachricht konnte nicht gesendet werden.",

    // Footer
    "footer.rights": "Alle Rechte vorbehalten.",

    // Timeline additional entries
    "timeline.fsp.description": "Vorbereitungsstudium für die Hochschulzulassung und Sprachvorbereitung.",
    "timeline.schulzeit.description": `Klassenbester für drei aufeinanderfolgende Jahre am Viet Duc Oberschule (Klassen 10 bis 12).
    Abschluss mit einem Diplom einer allgemeinen Oberstufe (entspricht dem Abitur).
    
    `,
    // Certificates
    "Transcript of Records": "Notenübersicht",
    "DSD-I Certificate": "DSD-I Zertifikat",
    "University Entrance Exam Results": "Hochschulaufnahmeprüfung",
    "Transcript of Records in High School": "Notenübersicht (Oberschule)",
  },
  vi: {
    // Navbar
    "navbar.about": "Giới thiệu",
    "navbar.education": "Học vấn",
    "navbar.skills": "Kỹ năng",
    "navbar.projects": "Dự án",
    "navbar.certifications": "Chứng chỉ",
    "navbar.contact": "Liên hệ",
    "navbar.myjourney": "Hành trình",
    "navbar.testimonial": "Nhận xét",

    "projects.date": "Thời gian",

    // Hero section
    "hero.title": "Chuyển đổi dữ liệu thành thông tin hữu ích",
    "hero.description":
      "Tôi là một sinh viên Khoa học Máy tính đầy nhiệt huyết tại Đại học Johannes Gutenberg-Universität Mainz, \
      chuyên ngành Khoa học Dữ liệu với chuyên ngành phụ là Kinh tế học. Với điểm trung bình cao 1.9 theo thang điểm Đức, tôi đam mê trích xuất \
      thông tin có ý nghĩa từ dữ liệu và phát triển các giải pháp sáng tạo.",
    "hero.viewProjects": "Xem dự án",
    "hero.downloadCV": "Tải CV",
    "hero.role": "Sinh viên Khoa học Dữ liệu",
    "hero.location": "Mainz, Đức",

    // About section
    "about.title": "Về tôi",
    "about.description":
      "Bộ công cụ kỹ thuật của tôi bao gồm Python, SQL, Pandas và các công cụ trực quan hóa như PowerBI và Seaborn. \
      Tôi đã làm việc trên các dự án từ phân tích thể thao đến hệ thống đề xuất sử dụng công nghệ dữ liệu lớn.",
    "about.languages": "Ngôn ngữ",
    "about.german": "Thành thạo",
    "about.english": "Thành thạo",
    "about.vietnamese": "Tiếng mẹ đẻ",
    "about.certification": "Chứng chỉ tiếng Đức",
    "about.dshResult": "Kết quả: DSH-2 • Tháng 12/2021",
    "about.written": "Viết:",
    "about.oral": "Nói:",
    "about.techInterests": "Sở thích kỹ thuật",
    "about.techInterest.analytics": "Phân tích dữ liệu",
    "about.techInterest.analyticsDesc": "Phân tích dữ liệu để rút ra thông tin hữu ích và hỗ trợ quá trình ra quyết định.",
    "about.techInterest.datamanagementDesc": "Tổ chức, lưu trữ và duy trì dữ liệu để đảm bảo tính khả dụng, độ tin cậy và an ninh của dữ liệu.",
    "about.techInterest.datascienceDesc": "Rút ra thông tin từ dữ liệu bằng các phương pháp thống kê và thuật toán học máy.",
    "about.techInterest.dataengineeringDesc": "Xây dựng và duy trì các pipeline và hạ tầng dữ liệu để xử lý dữ liệu hiệu quả.",
    
    // Education section
    "education.title": "Học vấn",
    "education.bsc": "Cử nhân Khoa học, Khoa học Máy tính",
    "education.focus": "Trọng tâm",
    "education.dataScience": "Chuyên ngành: Khoa học Dữ liệu",
    "education.economics": "Phụ: Kinh tế học",
    "education.projects": "Dự án",
    "education.programming": "Lập trình (Trò chơi máy tính)",
    "education.database": "Cơ sở dữ liệu (Phát triển web)",
    "education.software": "Kỹ thuật phần mềm (Phương pháp Agile)",
    "education.bigData": "Dữ liệu lớn (Hệ thống đề xuất)",
    "education.keySkills": "Kỹ năng chính",
    "education.prep": "Khóa dự bị đại học",
    "timeline.grade": "Điểm",
    "timeline.viewCourses": "Xem các khóa học",
    "timeline.bachelor.description": "Phát triển kỹ năng về cơ sở dữ liệu quan hệ, kho dữ liệu và công nghệ NoSQL thông qua các môn học và dự án.",
    "timeline.focus.major": "Chuyên ngành: Khoa học Dữ liệu",
    "timeline.focus.minor": "Phụ: Kinh tế học",
    "timeline.projects.programming": "Lập trình (Trò chơi máy tính)",
    "timeline.projects.database": "Cơ sở dữ liệu (Phát triển web)",
    "timeline.projects.software": "Kỹ thuật phần mềm (Phương pháp Agile)",
    "timeline.projects.bigData": "Dữ liệu lớn (Hệ thống đề xuất)",
    "timeline.schulzeit.title": "Thời học sinh",
    
    // Courses
    "courses.ds_algo.name": "Cấu trúc dữ liệu và thuật toán hiệu quả",
    "courses.ds_algo.desc": "Nghiên cứu các thuật toán và cấu trúc dữ liệu khác nhau cho tính toán hiệu quả.",
    "courses.db.name": "Hệ thống cơ sở dữ liệu",
    "courses.db.desc": "Cơ sở dữ liệu quan hệ, kho dữ liệu, hồ dữ liệu, giao dịch, chuẩn hóa. Bao gồm một khóa thực hành.",
    "courses.statistik.name": "Thống kê",
    "courses.statistik.desc": "Các phương pháp thống kê cho khoa học máy tính: thống kê mô tả, kiểm định giả thuyết, hồi quy, xác suất.",
    "courses.se.name": "Kỹ thuật phần mềm",
    "courses.se.desc": "Kỹ thuật yêu cầu, quản lý dự án, phương pháp Agile. Bao gồm một khóa thực hành.",
    "courses.nosql.name": "Cơ sở dữ liệu phi chuẩn",
    "courses.nosql.desc": "Bao gồm cơ sở dữ liệu không cấu trúc, đồ thị, văn bản, hình ảnh, NoSQL, Redis. Bao gồm một hội thảo về Truy xuất Thông tin Thời gian.",
    "courses.bigdata.name": "Dữ liệu lớn",
    "courses.bigdata.desc": "Apache Spark, RDDs và các thuật toán như collaborative filtering cho phân tích dữ liệu quy mô lớn.",
    "courses.ml.name": "Học máy",
    "courses.ml.desc": "Học có giám sát: hồi quy tuyến tính, hồi quy logistic, rừng ngẫu nhiên, mạng nơ-ron, v.v.",
    "courses.programmanalyse.name": "Phân tích chương trình",
    "courses.programmanalyse.desc": "Phân tích ngôn ngữ lập trình, quy tắc suy luận, với một hội thảo về Shape Analysis.",
    // Skills section
    "skills.title": "Kỹ năng kỹ thuật",
    "skills.programming": "Lập trình & Kỹ năng dữ liệu",
    "skills.other": "Kỹ năng kỹ thuật khác",
    "skills.softSkills": "Kỹ năng mềm",
    "skills.problemSolving": "Giải quyết vấn đề",
    "skills.teamCollaboration": "Làm việc nhóm",
    "skills.projectManagement": "Quản lý dự án",
    "skills.communication": "Giao tiếp",

    // Technical Interests (titles and categories)
    "about.techInterest.datamanagement": "Quản lý dữ liệu",
    "about.techInterest.datascience": "Khoa học dữ liệu",
    "about.techInterest.dataengineering": "Kỹ thuật dữ liệu",

    // Technical Interests (categories)
    "skills.webDevelopment": "Phát triển web",
    "skills.databases": "Cơ sở dữ liệu",
    "skills.toolsPlatforms": "Công cụ & Nền tảng",

    // Skill names and levels
    "skills.python": "Python",
    "skills.sql": "SQL",
    "skills.dataAnalysis": "Phân tích dữ liệu",
    "skills.machineLearning": "Học máy",
    "skills.dataVisualization": "Trực quan hóa dữ liệu",
    "skills.bigData": "Big Data",
    "skills.expert": "Chuyên gia",
    "skills.advanced": "Nâng cao",
    "skills.intermediate": "Trung bình",

    // Skill descriptions
    "skills.pythonDesc": "Thành thạo thư viện phân tích dữ liệu (Pandas, NumPy) và framework ML (Scikit-learn)",
    "skills.sqlDesc": "Thiết kế cơ sở dữ liệu, truy vấn phức tạp và thao tác dữ liệu",
    "skills.dataAnalysisDesc": "Làm sạch dữ liệu, khám phá và tạo ra thông tin hữu ích",
    "skills.machineLearningDesc": "Học có giám sát, không giám sát và đánh giá mô hình",
    "skills.dataVisualizationDesc": "PowerBI, Seaborn, Matplotlib để tạo trực quan hóa dữ liệu hữu ích",
    "skills.bigDataDesc": "Apache Spark, Scala, tính toán phân tán",

    // Project filter
    "projects.all": "Tất cả",
    "projects.tabs.overview": "Tổng quan",
    "projects.tabs.analysis": "Phân tích",
    "projects.tabs.report": "Báo cáo",
    // View Certificate
    "certificates.view": "Xem chứng chỉ",

    // Testimonial section
    "testimonials.title": "Nhận xét",
    "testimonials.demirkan.quote":
      "Tôi biết Việt là một sinh viên tận tâm và rất nhiệt tình giúp đỡ bạn bè. \
      Cậu ấy luôn sẵn sàng hỗ trợ mọi người và mang lại năng lượng tích cực cho mọi sự hợp tác.",
    "testimonials.csjgu.role":
      "Sinh viên Khoa học Máy tính, JGU Mainz",
    "testimonials.huonggiang.quote":
      "Việt là một người làm việc rất có trách nhiệm, có khả năng lên kế hoạch rất tốt, \
      cùng khả năng phán đoán và giải quyết vấn đề xuất sắc. Anh ấy có thể làm việc độc lập \
      cũng như dẫn dắt đội nhóm rất tốt với những chiến lược sáng tạo và táo bạo.",

    // Certificate date
    "certificates.date": "Ngày",

    // Projects section
    "projects.title": "Dự án",
    "projects.football.title": "Phân tích đội bóng đá",
    "projects.football.description": "Dự án cá nhân về phân tích dữ liệu của một đội bóng đá sử dụng Python, Pandas, Seaborn và PowerBI. Khám phá thống kê cầu thủ, kết quả trận đấu và trực quan hóa các thông tin để cải thiện hiệu suất.",
    "projects.bananaairlines.title": "Trang web Banana Airlines",
    "projects.bananaairlines.description": "Phát triển trang web cho một hãng hàng không trong học phần Cơ sở dữ liệu tại JGU Mainz. Bao gồm tìm kiếm, đặt vé, thanh toán và check-in chuyến bay. Frontend với HTML/CSS/JavaScript, backend với Flask, SQL và quản lý cơ sở dữ liệu bằng MariaDB/PostgreSQL.",
    "projects.f1etl.title": "ETL-Pipeline F1 tự động",
    "projects.f1etl.description": "Xây dựng pipeline ETL tự động cho dữ liệu Formula 1 bằng Python để trích xuất song song, phát hiện schema động và chuyển đổi dữ liệu. Tải dữ liệu vào BigQuery với bảng tự động, bulk loading, GitHub Actions hàng tuần, cùng SQL phân tích và ML dự đoán kết quả đua.",
    "projects.foodrec.title": "Hệ thống gợi ý thực phẩm Big Data",
    "projects.foodrec.description": "Phát triển hệ thống gợi ý trong học phần Big Data để phân tích khoảng 1 GB đánh giá thực phẩm bằng Apache Spark và Scala. Triển khai các thuật toán như collaborative filtering, TF-IDF, hồ sơ sản phẩm, min hashing và locality-sensitive hashing (LSH).",
    "projects.flappybird.title": "Trò chơi Flappy Bird",
    "projects.flappybird.description": "Phát triển trò chơi Flappy Bird cổ điển trong học phần Nhập môn Lập trình. Sử dụng gói Simple I/O của JGU Mainz để hiển thị các đối tượng đồ họa cơ bản và mô phỏng cơ chế trò chơi.",
    "projects.softwareeng.title": "Kỹ thuật phần mềm",
    "projects.softwareeng.description": "Phát triển trang web làm sạch và trực quan hóa dữ liệu trong dự án kỹ thuật phần mềm agile. Tham gia nhóm backend, thiết kế và triển khai cơ sở dữ liệu bằng Django. Hợp tác chặt chẽ trong ba nhóm: Tài liệu, Frontend và Backend.",

    // Timeline section
    "timeline.title": "Hành trình của tôi",
    "timeline.year": "Năm",
    "timeline.period": "Thời gian",
    "timeline.focus": "Trọng tâm",
    "timeline.projects": "Dự án",
    "timeline.keySkills": "Kỹ năng chính",
    "timeline.viewFiles": "Xem tệp",
    "timeline.images": "Hình ảnh",
    "timeline.courses": "Các khóa học",
    "courses.name": "Tên môn học",
    "courses.description": "Mô tả",
    "courses.grade": "Điểm",

    // Certifications section
    "certifications.title": "Chứng chỉ",

    // Contact section
    "contact.title": "Liên hệ",
    "contact.info": "Thông tin liên hệ",
    "contact.lookingFor": "Đang tìm kiếm",
    "contact.opportunities": "Tôi hiện đang tìm kiếm cơ hội trong:",
    "contact.workinglocation": "Sẵn sàng làm việc từ xa hoặc tại chỗ trên toàn nước Đức.",
    "contact.sendMessage": "Gửi tin nhắn",
    "contact.name": "Tên",
    "contact.namePlaceholder": "Tên của bạn",
    "contact.email": "Email",
    "contact.emailPlaceholder": "Email của bạn",
    "contact.subject": "Chủ đề",
    "contact.subjectPlaceholder": "Chủ đề",
    "contact.message": "Nội dung",
    "contact.messagePlaceholder": "Nội dung của bạn",
    "contact.send": "Gửi",
    "contact.sending": "Đang gửi...",
    "contact.sent": "Gửi thành công!",
    "contact.error": "Gửi tin nhắn thất bại.",

    // Footer
    "footer.rights": "Tất cả các quyền được bảo lưu.",

    // Timeline additional entries
    "timeline.fsp.description": "Học dự bị đại học và chuẩn bị ngôn ngữ.",
    "timeline.schulzeit.description": `Đạt danh hiệu học sinh xuất sắc ba năm liên tiếp tại trường THPT Việt Đức (lớp 10 đến 12).
    Tốt nghiệp THPT với bằng xuất sắc (tương đương Abitur của Đức).
    
    `,
    // Certificates
    "Transcript of Records": "Bảng điểm",
    "DSD-I Certificate": "Chứng chỉ DSD-I",
    "University Entrance Exam Results": "Kết quả thi đại học",
    "Transcript of Records in High School": "Học Bạ THPT",
  },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
