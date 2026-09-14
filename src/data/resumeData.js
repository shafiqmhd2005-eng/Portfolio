export const resumeData = {
  personal: {
    name: "MOHAMED SHAFIQ M",
    role: "Junior Embedded Engineer",
    tagline: "Embedded Systems • IoT • Firmware • PCB Design",
    simpleTagline: "Building Smart Devices, Electronics & Connected Hardware",
    statement: "Building reliable embedded systems where hardware, firmware and intelligent connected devices meet.",
    location: "Naganathapura, Bangalore, Karnataka, India",
    email: "shafiq.mohamed2025@gmail.com",
    phones: ["+91 8778594535", "+91 7598349958"],
    status: "SYSTEM ONLINE",
    availability: "Available for Full-time Roles in Embedded Systems & IoT",
    socials: {
      github: "https://github.com/MohamedShafiqM",
      linkedin: "https://linkedin.com/in/mohamed-shafiq-m",
    },
    telemetry: {
      mcu: "READY",
      firmware: "VERIFIED",
      iotBus: "ACTIVE",
      pcbFab: "READY",
      missionId: "MS-EMB-2026",
      uptime: "99.98%",
      baudRate: "115200 bps",
      signalStrength: "Excellent (-42 dBm)",
      coreTemp: "38.2 °C",
      voltage: "3.3 V"
    }
  },

  about: {
    title: "ABOUT ME",
    subtitle: "Who I Am & What I Can Do",
    bio: "Mohamed Shafiq M is a fresh Electronics and Communication Engineering graduate with hands-on experience in Embedded C/C++, microcontroller programming, sensor interfacing, digital and analog electronics. He has experience with ESP32, Arduino, UART, SPI, I2C, GPIO, KiCad and Proteus. He completed internships covering hardware design, embedded firmware, IoT systems, PCB design, circuit simulation, and hardware/software integration.",
    simpleExplanation: "In simple words: I design electronic circuits on computers, build printed circuit boards (PCBs), write the code that runs inside microchip brains (like ESP32 and Arduino), connect sensors to measure things, and send that data to mobile apps and cloud websites over Wi-Fi.",
    domains: [
      {
        id: "hw-design",
        title: "Circuit Board Design",
        tag: "HARDWARE & PCB",
        simpleLabel: "Designing Physical Boards",
        description: "Designing circuit diagrams and drawing multi-layer printed circuit boards (PCBs) using KiCad, choosing components, and testing physical prototypes.",
        icon: "Cpu"
      },
      {
        id: "firmware",
        title: "Microcontroller Software",
        tag: "FIRMWARE (C/C++)",
        simpleLabel: "Coding the Microchip",
        description: "Writing fast, reliable code in C and C++ that directly controls microchip pins, timers, analog readings, and electronic components.",
        icon: "Terminal"
      },
      {
        id: "iot",
        title: "Smart Internet Devices",
        tag: "IOT & WIRELESS",
        simpleLabel: "Connecting to Cloud & Apps",
        description: "Connecting microcontrollers to Wi-Fi and Bluetooth, and sending live data to phone dashboards and cloud platforms like Blynk and ThingSpeak.",
        icon: "Radio"
      },
      {
        id: "validation",
        title: "Circuit Simulation & Testing",
        tag: "TESTING & DEBUGGING",
        simpleLabel: "Checking & Fixing Errors",
        description: "Testing circuits on a computer with Proteus software before manufacturing, and using test instruments like oscilloscopes to troubleshoot issues.",
        icon: "Activity"
      }
    ]
  },

  skills: {
    title: "TECHNICAL SKILLS",
    subtitle: "Tools, Languages & Technologies I Use",
    categories: [
      {
        category: "Programming Languages",
        badge: "SOFTWARE",
        items: [
          {
            name: "C",
            tag: "MAIN LANGUAGE",
            description: "The primary programming language used to program microcontrollers and control hardware with maximum speed and low memory usage."
          }
        ]
      },
      {
        category: "Hardware Communication",
        badge: "HOW CHIPS TALK",
        items: [
          {
            name: "UART",
            tag: "SERIAL PORT",
            description: "A standard two-wire method for chips to talk to computers or Bluetooth modules to print messages and debug code."
          },
          {
            name: "SPI",
            tag: "HIGH-SPEED BUS",
            description: "A fast connection used to send lots of data quickly, such as drawing on screens or reading high-speed memory cards."
          },
          {
            name: "I2C",
            tag: "2-WIRE BUS",
            description: "A convenient two-wire connection that lets multiple sensors (like heart-rate and temperature sensors) share the same wires."
          },
          {
            name: "GPIO",
            tag: "INPUT / OUTPUT PINS",
            description: "The general pins on a microchip used to turn LEDs on/off, read button presses, and control switches."
          }
        ]
      },
      {
        category: "Microcontroller Chips",
        badge: "CHIP PLATFORMS",
        items: [
          {
            name: "ESP32",
            tag: "WI-FI + BLUETOOTH CHIP",
            description: "A powerful, inexpensive microchip with built-in Wi-Fi and Bluetooth, ideal for IoT and smart connected devices."
          },
          {
            name: "ATmega328P",
            tag: "CLASSIC 8-BIT CHIP",
            description: "The famous microcontroller chip that powers the standard Arduino Uno board, great for learning core electronics."
          },
          {
            name: "Arduino",
            tag: "RAPID PROTOTYPING",
            description: "An easy-to-use electronics platform for quickly building, testing, and verifying electronic ideas."
          }
        ]
      },
      {
        category: "Engineering Software",
        badge: "DESIGN TOOLS",
        items: [
          {
            name: "KiCad",
            tag: "PCB DESIGN",
            description: "An industry-standard software used to draw electrical schematics and design printed circuit board (PCB) layouts."
          },
          {
            name: "Proteus Design Suite",
            tag: "CIRCUIT SIMULATOR",
            description: "Software that simulates virtual circuits and runs code on virtual chips on a computer screen before soldering real parts."
          },
          {
            name: "Arduino IDE",
            tag: "CODE EDITOR",
            description: "The software environment used to write code, compile it, and flash (upload) it onto Arduino and ESP32 boards."
          },
          {
            name: "VS Code",
            tag: "CODE EDITOR",
            description: "A modern, powerful code editor for writing clean C/C++ programs and managing project files."
          },
          {
            name: "LabVIEW",
            tag: "GRAPHICAL TESTING",
            description: "A visual programming environment from National Instruments for automated measurements, graphs, and hardware testing."
          }
        ]
      },
      {
        category: "IoT & Cloud Dashboards",
        badge: "INTERNET OF THINGS",
        items: [
          {
            name: "Blynk",
            tag: "PHONE DASHBOARD",
            description: "An app platform that lets you control hardware pins and view sensor gauges directly from a smartphone."
          },
          {
            name: "ThingSpeak",
            tag: "CLOUD DATA GRAPHS",
            description: "An online platform that stores sensor readings in the cloud and draws live graphs accessible from anywhere."
          }
        ]
      },
      {
        category: "Core Electronics",
        badge: "ELECTRONIC FOUNDATIONS",
        items: [
          {
            name: "Digital Electronics",
            tag: "LOGIC GATES & 1s/0s",
            description: "Understanding digital binary logic (0V and 5V/3.3V), logic gates, flip-flops, and counters."
          },
          {
            name: "Analog Electronics",
            tag: "SIGNALS & VOLTAGES",
            description: "Working with continuous signals, operational amplifiers, filters, and voltage regulators."
          },
          {
            name: "Microcontrollers",
            tag: "COMPUTER ON A CHIP",
            description: "Understanding CPU registers, memory, clock crystals, and interrupt routines that make a chip operate."
          },
          {
            name: "Schematics",
            tag: "CIRCUIT BLUEPRINTS",
            description: "Reading and drawing clear electrical blueprints that show how every resistor, capacitor, and chip connects."
          },
          {
            name: "Datasheets",
            tag: "COMPONENT MANUALS",
            description: "Reading technical manufacturer documentation to find pin voltages, operating limits, and wiring guidelines."
          }
        ]
      }
    ]
  },

  experience: {
    title: "WORK EXPERIENCE",
    subtitle: "My Engineering Internships & Industry Training",
    missions: [
      {
        role: "HARDWARE INTERN",
        company: "Matt Engineering Solution",
        period: "Dec 2025 – Feb 2026",
        status: "COMPLETED",
        badge: "CIRCUIT DESIGN & FIRMWARE",
        simpleSummary: "Designed printed circuit boards (PCBs) and wrote microchip programs for automation.",
        highlights: [
          "Developed microcontroller-based applications in C/C++ for hardware control and embedded automation.",
          "Performed hardware/software integration and prototype testing using Arduino IDE.",
          "Designed PCB layouts using KiCad.",
          "Conducted circuit simulation, debugging and functional validation using Proteus."
        ],
        technologies: ["C/C++", "KiCad", "Proteus", "Arduino IDE", "Microcontrollers", "PCB Layout"]
      },
      {
        role: "IoT INTERN",
        company: "Matt Engineering Solution",
        period: "Jul 2025 – Aug 2025",
        status: "COMPLETED",
        badge: "SMART CONNECTED DEVICES",
        simpleSummary: "Connected ESP32 microchips to Wi-Fi to send real-time sensor data to cloud dashboards.",
        highlights: [
          "Built IoT applications using ESP32.",
          "Implemented wireless data acquisition.",
          "Integrated Blynk and ThingSpeak.",
          "Developed real-time sensor monitoring and data visualization.",
          "Implemented multi-sensor interfacing and cloud communication."
        ],
        technologies: ["ESP32", "Blynk", "ThingSpeak", "Wi-Fi", "Sensor Interfacing", "Data Visualization"]
      },
      {
        role: "EMBEDDED SYSTEMS INTERN",
        company: "Srishti Innovative — Technopark",
        period: "Jul 2024 – Aug 2024",
        status: "COMPLETED",
        badge: "EMBEDDED BASICS & SENSORS",
        simpleSummary: "Programmed Arduino microcontrollers and tested electronic sensor circuits in Proteus.",
        highlights: [
          "Worked with Arduino and C/C++.",
          "Implemented sensor interfacing with analog and digital components.",
          "Simulated, tested and validated embedded circuits using Proteus."
        ],
        technologies: ["Arduino", "C/C++", "Analog & Digital Sensors", "Proteus", "Circuit Validation"]
      }
    ]
  },

  projects: [
    {
      id: "project-01",
      code: "PROJECT 01 // MAIN PROJECT",
      title: "IoT-Enabled Digital Twin System for Real-Time Cardiovascular Disease Monitoring",
      simpleTitle: "Smart Heart & Health Monitor with Live Cloud Twin",
      shortDescription: "An IoT-enabled digital twin system designed for real-time cardiovascular monitoring.",
      simpleExplanation: "A wearable smart medical device that reads heartbeats, pulse oxygen, body temperature, and surrounding air pressure, then sends the live data over Wi-Fi so doctors can see a virtual replica of the patient's heart on screen in real time.",
      tag: "FLAGSHIP PROJECT",
      technologies: ["ESP32", "MAX30102", "AD8232", "DS18B20", "BME280", "IoT communication", "Embedded firmware"],
      architectureSteps: [
        { label: "1. Health Sensors", desc: "Measures heart ECG signals, pulse oxygen, skin temperature, and room air." },
        { label: "2. ESP32 Microchip", desc: "Reads all sensors simultaneously and converts electric voltages into clean numbers." },
        { label: "3. Smart Code (Firmware)", desc: "Filters out electrical noise and calculates heartbeats per minute (BPM)." },
        { label: "4. Wi-Fi Cloud Uplink", desc: "Sends live health packets over the internet securely." },
        { label: "5. Digital Twin Screen", desc: "Displays real-time pulsing heart graphs and triggers alerts if abnormal." }
      ],
      details: {
        objective: "To build a complete health monitoring device that watches a patient's heart rate and oxygen levels in real time, alerting caregivers immediately if anything abnormal occurs.",
        hardware: [
          "ESP32 Microcontroller (Dual-core processor with built-in Wi-Fi)",
          "MAX30102 Pulse Oximeter Sensor (Optical sensor measuring blood oxygen & pulse)",
          "AD8232 ECG Sensor (Reads electrical signals produced by the heartbeat)",
          "DS18B20 Digital Thermometer (Accurately checks skin temperature)",
          "BME280 Environmental Sensor (Checks room humidity, air pressure, and ambient temp)",
          "Regulated power circuit with filter capacitors to avoid noise"
        ],
        firmware: [
          "Written in C/C++ with efficient timing to read all sensors smoothly.",
          "Digital noise filter to remove 50Hz electrical hum from wall outlets.",
          "Peak detection algorithm that detects each heartbeat and calculates heart rate (BPM).",
          "OneWire protocol code to read temperature sensor data accurately."
        ],
        sensors: [
          "MAX30102: Shines red and infrared light through the finger to check oxygen.",
          "AD8232: 3 chest pads pick up microscopic heart voltages.",
          "DS18B20: High-accuracy single-wire digital thermometer.",
          "BME280: Measures air pressure to detect environmental factors."
        ],
        iotArchitecture: [
          "Connects automatically to Wi-Fi with auto-reconnect if connection drops.",
          "Sends data packets every second to cloud platforms (ThingSpeak and Blynk).",
          "Triggers visual alerts whenever heart rate goes above or below safe limits."
        ],
        testing: [
          "Simulated the circuit inside Proteus software first before soldering.",
          "Tested heart wave signals on an oscilloscope to make sure pulses are crisp.",
          "Tested continuous Wi-Fi transmission over long hours without losing data."
        ]
      }
    },
    {
      id: "project-02",
      code: "PROJECT 02",
      title: "Automatic Dual-Axis Solar Tracker",
      simpleTitle: "Smart Sun-Tracking Solar Panel",
      shortDescription: "An automated solar panel that follows the sun across both horizontal and vertical axes to produce maximum electricity all day.",
      simpleExplanation: "A mini solar panel equipped with light sensors and two servo motors. When the sun moves, the sensors detect which side is brighter, and the motors tilt the panel directly toward the sun.",
      tag: "AUTOMATION & MOTORS",
      technologies: ["Arduino", "LDR Sensors", "Servo Motors"],
      details: {
        objective: "Maximize solar energy collection by keeping the solar panel pointed directly at the brightest part of the sky from sunrise to sunset.",
        hardware: [
          "Arduino Microcontroller (ATmega328P)",
          "4 Light Dependent Resistors (LDRs) positioned in 4 quadrants",
          "2 Precision Servo Motors (One for Left/Right rotation, One for Up/Down tilt)",
          "Cross-shaped divider wall that casts shadows when the sun is off-center",
          "5V dedicated power supply for smooth motor movements"
        ],
        firmware: [
          "C code continuously checks light levels on all 4 sensors.",
          "Compares Top vs Bottom and Left vs Right light intensity.",
          "Built-in threshold logic prevents motors from vibrating when sunlight is balanced.",
          "Smooth motor stepping to save power during movement."
        ],
        testing: [
          "Simulated light response in Proteus software.",
          "Tested with moving flashlights and outdoor sunlight to verify smooth tracking."
        ]
      }
    },
    {
      id: "project-03",
      code: "PROJECT 03",
      title: "Seven-Segment Display Digital Clock",
      simpleTitle: "Multiplexed Digital Clock",
      shortDescription: "A digital clock that uses multiplexing to display 4 digits clearly while saving wire connections on the microchip.",
      simpleExplanation: "A digital clock showing hours and minutes. Instead of using 32 separate wires for all numbers, it flashes each digit one at a time faster than the human eye can see, making all digits look continuously lit.",
      tag: "DIGITAL LOGIC",
      technologies: ["Arduino", "Seven-Segment Display", "Multiplexing", "Timing Logic"],
      details: {
        objective: "Showcase efficient circuit design by controlling a 4-digit display using minimal microchip pins through high-speed switching (Persistence of Vision).",
        hardware: [
          "Arduino / ATmega328P controller",
          "4-Digit 7-Segment LED display module",
          "4 Transistors used as fast electronic switches for each digit",
          "Resistors to protect LEDs from burning out",
          "Push buttons to adjust hours and minutes"
        ],
        firmware: [
          "Precise 1-second internal timer tick to keep exact time.",
          "High-speed 250Hz scanning loop that cycles between digits without visible flicker.",
          "Direct port manipulation in C for rapid switching."
        ],
        testing: [
          "Verified signal waveforms in Proteus software.",
          "Tested display under high speed and slow motion to confirm zero ghosting."
        ]
      }
    }
  ],

  education: {
    title: "EDUCATION",
    subtitle: "My College Degree & Academic Details",
    degree: "B.E. in Electronics and Communication Engineering",
    institution: "C.S.I. Institute of Technology, Thovalai",
    affiliation: "Affiliated to Anna University",
    duration: "2022 – 2026",
    cgpa: "7.7 / 10",
    highlights: [
      "Focused on Microcontrollers, Embedded Systems, Circuit Design, and Digital Signal Processing.",
      "Hands-on practical training in electronics laboratories, circuit troubleshooting, and microcontroller programming.",
      "Graduating in 2026 with consistent academic performance and strong practical skills."
    ]
  },

  certifications: {
    title: "CERTIFICATIONS",
    subtitle: "Verified Courses & Technical Training",
    items: [
      {
        id: "cert-01",
        name: "ADAS Advanced Level – 2",
        issuer: "ANCIT Edutech / Naan Mudhalvan",
        domain: "Automotive Electronics & Smart Vehicle Safety",
        simpleDesc: "Advanced Driver Assistance Systems & automotive smart sensors",
        icon: "ShieldAlert"
      },
      {
        id: "cert-02",
        name: "ADAS ECU Simulation and Testing",
        issuer: "ANCIT Edutech / Naan Mudhalvan",
        domain: "Vehicle Electronic Control Unit Testing",
        simpleDesc: "Testing virtual car control computers and validating vehicle software",
        icon: "Cpu"
      },
      {
        id: "cert-03",
        name: "Network Essentials",
        issuer: "Cisco / Naan Mudhalvan",
        domain: "Computer Networking & IP Connections",
        simpleDesc: "Understanding how computers and IoT devices connect over networks",
        icon: "Network"
      },
      {
        id: "cert-04",
        name: "Experience-Based Project Learning",
        issuer: "IBM / Naan Mudhalvan",
        domain: "Practical Project Development & Engineering",
        simpleDesc: "Working on structured technical projects following industry methods",
        icon: "Award"
      },
      {
        id: "cert-05",
        name: "Microsoft Office Essentials",
        issuer: "Microsoft / Naan Mudhalvan",
        domain: "Documentation & Technical Reports",
        simpleDesc: "Creating professional engineering reports, spreadsheets, and slides",
        icon: "FileCheck"
      }
    ]
  },

  leadership: {
    title: "LEADERSHIP & ACTIVITIES",
    subtitle: "Teamwork, Organizing & Sports",
    items: [
      {
        title: "College Technical Symposium & Fest Organizer",
        organization: "College Technical Events & Engineering Seminars",
        description: "Volunteered in organizing college technical symposiums, seminars, and engineering fests. Coordinated logistics, stage presentations, and technical student workshops.",
        simpleHighlight: "Organized technical fests and coordinated student workshops.",
        icon: "Flag"
      },
      {
        title: "College Cricket Team Captain",
        organization: "Zonal Level Inter-Collegiate Tournaments",
        description: "Led the college cricket team in competitive zonal tournaments. Managed team strategy, match-day communication, motivation, and disciplined teamwork under pressure.",
        simpleHighlight: "Led the team in zonal tournaments with strategy and strong teamwork.",
        icon: "Trophy"
      }
    ]
  }
};
