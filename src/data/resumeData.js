export const resumeData = {
  personal: {
    name: "MOHAMED SHAFIQ M",
    role: "Junior Embedded Engineer",
    tagline: "Embedded Systems // IoT // Firmware // Hardware",
    statement: "Building reliable embedded systems where hardware, firmware and intelligent connected devices meet.",
    location: "Naganathapura, Bangalore, Karnataka, India",
    email: "shafiq.mohamed2025@gmail.com",
    phones: ["+91 8778594535", "+91 7598349958"],
    status: "SYSTEM ONLINE",
    availability: "Available for Embedded / Firmware / IoT Roles",
    socials: {
      github: "https://github.com/MohamedShafiqM", // Placeholder / profile link format
      linkedin: "https://linkedin.com/in/mohamed-shafiq-m", // Placeholder / profile link format
    },
    telemetry: {
      mcu: "ONLINE",
      firmware: "VERIFIED",
      iotBus: "ACTIVE",
      pcbFab: "READY",
      missionId: "MS-EMB-2026",
      uptime: "99.98%",
      baudRate: "115200 bps",
      signalStrength: "-42 dBm",
      coreTemp: "38.2 °C",
      voltage: "3.30 V"
    }
  },

  about: {
    title: "ENGINEER PROFILE",
    subtitle: "MISSION BRIEFING // CAPABILITY MATRIX",
    bio: "Mohamed Shafiq M is a fresh Electronics and Communication Engineering graduate with hands-on experience in Embedded C/C++, microcontroller programming, sensor interfacing, digital and analog electronics. He has experience with ESP32, Arduino, UART, SPI, I2C, GPIO, KiCad and Proteus. He completed internships covering hardware design, embedded firmware, IoT systems, PCB design, circuit simulation, and hardware/software integration.",
    domains: [
      {
        id: "hw-design",
        title: "Hardware Design & PCB",
        tag: "CIRCUIT FABRICATION",
        description: "Schematic capture, PCB layout drafting using KiCad, component selection, power distribution, and mixed-signal breadboard prototyping.",
        icon: "Cpu"
      },
      {
        id: "firmware",
        title: "Embedded Firmware",
        tag: "BARE-METAL & HAL",
        description: "Microcontroller programming in C/C++, register configuration, hardware timer interrupts, ADC sampling, and peripheral device drivers.",
        icon: "Terminal"
      },
      {
        id: "iot",
        title: "IoT & Telemetry Systems",
        tag: "WIRELESS CLOUD UPLINK",
        description: "ESP32 Wi-Fi connectivity, RESTful cloud endpoints, real-time telemetry streaming, and dashboard visualization on Blynk and ThingSpeak.",
        icon: "Radio"
      },
      {
        id: "validation",
        title: "Simulation & Validation",
        tag: "SIGNAL INTEGRITY & TESTING",
        description: "Pre-fabrication circuit simulation in Proteus Design Suite, hardware-in-the-loop debugging, logic validation, and oscilloscope measurements.",
        icon: "Activity"
      }
    ]
  },

  skills: {
    title: "TECHNICAL SKILLS",
    subtitle: "HOLOGRAPHIC TECH STACK // EMBEDDED CAPABILITIES",
    categories: [
      {
        category: "Programming",
        badge: "CORE CODEBASE",
        items: [
          {
            name: "C",
            tag: "EMBEDDED C",
            description: "Fundamental language for microcontroller firmware, register manipulation, pointer arithmetic, bitwise masking, and memory-constrained execution."
          }
        ]
      },
      {
        category: "Communication Protocols",
        badge: "PERIPHERAL BUS",
        items: [
          {
            name: "UART",
            tag: "ASYNCHRONOUS SERIAL",
            description: "Full-duplex serial communication for console debugging, telemetry streaming, AT command parsing, and external module interfacing."
          },
          {
            name: "SPI",
            tag: "SYNCHRONOUS SERIAL",
            description: "High-speed synchronous master/slave communication for interfacing graphic displays, flash storage, and low-latency digital sensors."
          },
          {
            name: "I2C",
            tag: "TWO-WIRE INTERFACE",
            description: "Multi-device bus architecture with address arbitration for biomedical sensors (MAX30102), environmental sensors (BME280), and RTCs."
          },
          {
            name: "GPIO",
            tag: "DIGITAL I/O",
            description: "General-purpose digital input/output pin configuration, edge-triggered external interrupts, push-pull/open-drain drive, and software debounce."
          }
        ]
      },
      {
        category: "Microcontrollers / Platforms",
        badge: "SILICON ARCHITECTURES",
        items: [
          {
            name: "ESP32",
            tag: "DUAL-CORE SOC",
            description: "Tensilica Xtensa 32-bit dual-core processor with integrated 2.4 GHz Wi-Fi and Bluetooth, hardware cryptographic acceleration, and deep sleep modes."
          },
          {
            name: "ATmega328P",
            tag: "8-BIT AVR RISC",
            description: "Classic AVR microcontroller architecture featuring internal EEPROM, 10-bit ADC channels, hardware PWM timers, and bare-metal register control."
          },
          {
            name: "Arduino",
            tag: "PROTOTYPING PLATFORM",
            description: "Rapid firmware iteration platform, HAL peripheral abstraction, hardware shield integration, and cross-platform verification."
          }
        ]
      },
      {
        category: "Engineering Tools",
        badge: "EDA & WORKSPACE",
        items: [
          {
            name: "KiCad",
            tag: "EDA SUITE",
            description: "Schematic capture, hierarchical sheet routing, footprint association, multi-layer PCB design, design rule checking (DRC), and Gerber generation."
          },
          {
            name: "Proteus Design Suite",
            tag: "CIRCUIT SIMULATION",
            description: "SPICE-based interactive circuit simulation, microcontroller virtual system modeling (VSM), interactive schematic debugging, and signal tracing."
          },
          {
            name: "Arduino IDE",
            tag: "FIRMWARE ENVIRONMENT",
            description: "Firmware compilation, bootloader flashing, serial plotter telemetry tracking, and hardware library management."
          },
          {
            name: "VS Code",
            tag: "SOURCE EDITOR",
            description: "Primary editor for embedded C/C++ source code, modular firmware directory structure, Git version control, and toolchain integration."
          },
          {
            name: "LabVIEW",
            tag: "VIRTUAL INSTRUMENTATION",
            description: "Graphical system design and test engineering environment for automated measurement acquisition, signal monitoring, and instrumentation."
          }
        ]
      },
      {
        category: "IoT Platforms",
        badge: "TELEMETRY & CLOUD",
        items: [
          {
            name: "Blynk",
            tag: "MOBILE DASHBOARD",
            description: "Rapid IoT dashboard generation for mobile telemetry, virtual pin mapping, remote actuator triggering, and automated threshold alerts."
          },
          {
            name: "ThingSpeak",
            tag: "DATA ANALYTICS",
            description: "MathWorks-powered cloud IoT platform for time-series data storage, HTTP/MQTT sensor publishing, and real-time biometric analytics."
          }
        ]
      },
      {
        category: "Core Electronics",
        badge: "PHYSICAL LAYER",
        items: [
          {
            name: "Digital Electronics",
            tag: "LOGIC GATES & TIMING",
            description: "Combinational and sequential logic, flip-flops, multiplexers, shift registers, synchronous counters, and logic level translation."
          },
          {
            name: "Analog Electronics",
            tag: "SIGNAL CONDITIONING",
            description: "Operational amplifiers, active/passive RC filtering, voltage divider networks, transistor switching, and analog signal conditioning."
          },
          {
            name: "Microcontrollers",
            tag: "PROCESSOR DESIGN",
            description: "Understanding Harvard/Von Neumann architectures, interrupt vector tables, watchdog timers, brown-out detectors, and clock distribution."
          },
          {
            name: "Schematics",
            tag: "CIRCUIT DRAWINGS",
            description: "Reading, analyzing, and drafting industry-standard electrical schematics, netlists, reference designators, and wiring diagrams."
          },
          {
            name: "Datasheets",
            tag: "SPECIFICATION ANALYSIS",
            description: "Extracting electrical characteristics, timing diagrams, register maps, operating limits, and absolute maximum ratings from manufacturer datasheets."
          }
        ]
      }
    ]
  },

  experience: {
    title: "MISSION LOG",
    subtitle: "CHRONOLOGICAL ENGINEERING TIMELINE",
    missions: [
      {
        role: "HARDWARE INTERN",
        company: "Matt Engineering Solution",
        period: "Dec 2025 – Feb 2026",
        status: "MISSION COMPLETED",
        badge: "HARDWARE & FIRMWARE",
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
        status: "MISSION COMPLETED",
        badge: "WIRELESS & CLOUD",
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
        status: "MISSION COMPLETED",
        badge: "EMBEDDED SYSTEMS",
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
      code: "PRJ-01 // FLAGSHIP",
      title: "IoT-Enabled Digital Twin System for Real-Time Cardiovascular Disease Monitoring",
      shortDescription: "An IoT-enabled digital twin system designed for real-time cardiovascular monitoring.",
      tag: "FLAGSHIP RESEARCH & HARDWARE",
      technologies: ["ESP32", "MAX30102", "AD8232", "DS18B20", "BME280", "IoT communication", "Embedded firmware"],
      architectureSteps: [
        { label: "Biomedical Sensors", desc: "MAX30102 (PPG/SpO2), AD8232 (ECG Leads), DS18B20 (Skin Temp), BME280 (Ambient)" },
        { label: "ESP32 SoC", desc: "Analog-to-digital acquisition, I2C/OneWire bus arbitration & dual-core processing" },
        { label: "Embedded Firmware", desc: "Noise filtering, digital peak detection, BPM calculation & packet serialization" },
        { label: "IoT Communication", desc: "Wi-Fi data uplink, secure telemetry dispatch & cloud broker syncing" },
        { label: "Digital Twin / Monitoring", desc: "Virtual cardiac synchronized model, real-time waveform plotting & critical threshold alarms" }
      ],
      details: {
        objective: "To architect and construct an end-to-end cyber-physical digital twin that mirrors a patient's real-time cardiovascular telemetry with minimal latency, enabling early detection of arrhythmia, tachycardia, and abnormal physiological deviations.",
        hardware: [
          "ESP32 32-bit Dual-Core Microcontroller (240MHz, 520KB SRAM, 2.4GHz Wi-Fi)",
          "MAX30102 High-Sensitivity Pulse Oximeter & Heart-Rate Optical Sensor Module",
          "AD8232 Single-Lead Heart Rate / ECG Front-End Integrated Circuit with 3-lead electrodes",
          "DS18B20 Waterproof 1-Wire Digital Temperature Sensor (±0.5°C accuracy)",
          "BME280 Environmental Sensor (barometric pressure, ambient temperature, humidity)",
          "Low-noise regulated power supply circuit with LC decoupling filters"
        ],
        firmware: [
          "Developed in Embedded C/C++ with efficient non-blocking sampling intervals.",
          "I2C communication routines at 400kHz for high-resolution optical photoplethysmography (PPG).",
          "OneWire protocol implementation with CRC verification for DS18B20 probe telemetry.",
          "Digital bandpass filtering algorithm to eliminate 50Hz/60Hz AC mains noise and motion baseline drift on AD8232 ECG signals.",
          "Peak detection algorithm computing real-time Heart Rate (BPM) and blood oxygen saturation (SpO2 %)."
        ],
        sensors: [
          "MAX30102: Optical red (660nm) and infrared (880nm) LED absorption sensing over I2C.",
          "AD8232: Extracted analog biopotential cardiac signals processed through ESP32 ADC1 channel.",
          "DS18B20: High-precision single-wire digital thermometer measuring patient peripheral temperature.",
          "BME280: Measuring atmospheric barometric pressure and ambient conditions to correlate respiratory distress."
        ],
        iotArchitecture: [
          "Wi-Fi station mode configured with automatic reconnection daemon.",
          "Telemetry packets packaged and pushed over HTTP/REST and MQTT endpoints.",
          "Cloud dashboard telemetry endpoints (ThingSpeak / Blynk) displaying synchronized virtual twin state.",
          "Configurable threshold alarms triggering visual HUD indicators when BPM exceeds safe parameters."
        ],
        testing: [
          "Breadboard and prototype circuit simulation validated in Proteus Design Suite prior to hardware assembly.",
          "Oscilloscope and serial plotter verification of ECG QRS complex signals against known pulse rates.",
          "Calibrated photoplethysmography signal-to-noise ratio against ambient light interference.",
          "Long-duration stress testing verifying zero packet loss over continuous wireless transmission sessions."
        ]
      }
    },
    {
      id: "project-02",
      code: "PRJ-02",
      title: "Automatic Dual-Axis Solar Tracker",
      shortDescription: "An intelligent solar energy capture platform that automatically adjusts panel orientation along horizontal and vertical axes toward peak sunlight intensity.",
      tag: "EMBEDDED AUTOMATION & CONTROL",
      technologies: ["Arduino", "LDR Sensors", "Servo Motors"],
      details: {
        objective: "Maximize photovoltaic energy conversion efficiency by continuously aligning solar panels perpendicular to incident solar rays throughout the day.",
        hardware: [
          "Arduino Microcontroller board (ATmega328P)",
          "4x Cadmium-Sulfide Light Dependent Resistors (LDR) arranged in a four-quadrant matrix",
          "2x High-torque Precision Servo Motors (Azimuth horizontal rotation + Elevation vertical tilt)",
          "Cross-divider shadow baffle housing to create distinct directional light differentials",
          "5V dedicated servo power decoupling circuitry"
        ],
        firmware: [
          "Embedded C/C++ code reading 4 analog ADC channels sequentially.",
          "Differential comparator logic computing (Top vs Bottom) and (Left vs Right) light vectors.",
          "Deadband threshold hysteresis implemented in software to avoid servo jitter and excessive motor wear.",
          "Smooth micro-stepping servo trajectory control to minimize power draw during adjustment."
        ],
        testing: [
          "Circuit simulation and ADC response mapping conducted in Proteus.",
          "Dynamic angle tracking tested under variable directional lux levels and indoor artificial illumination sources."
        ]
      }
    },
    {
      id: "project-03",
      code: "PRJ-03",
      title: "Seven-Segment Display Digital Clock",
      shortDescription: "A precision digital timepiece utilizing multiplexing logic, timing cycles, and transistor switching to drive multi-digit displays efficiently.",
      tag: "DIGITAL LOGIC & MULTIPLEXING",
      technologies: ["Arduino", "Seven-Segment Display", "Multiplexing", "Timing Logic"],
      details: {
        objective: "Demonstrate fundamental digital electronics and microcontroller efficiency by driving a 4-digit common-cathode display using minimal GPIO lines via Persistence of Vision (POV) multiplexing.",
        hardware: [
          "Arduino / ATmega328P controller",
          "4-Digit Common-Cathode 7-Segment LED Display Module",
          "4x NPN Transistors (2N2222 / BC547) for digit common-cathode sinking",
          "Current-limiting resistors (220Ω) on segment pins (A through G + DP)",
          "Hardware push buttons for time setting and adjustment with software debounce"
        ],
        firmware: [
          "Precision timer interrupt routines generating 1-second system clock ticks.",
          "Multiplexing scan routine firing at ~200Hz to eliminate visible flicker.",
          "Binary-to-7-segment lookup table for fast segment mapping.",
          "Direct port register manipulation for rapid bit toggling without digitalRead/digitalWrite overhead."
        ],
        testing: [
          "Circuit validated in Proteus Design Suite verifying timing waveforms on virtual oscilloscope.",
          "Validated strobe duty cycles and zero ghosting across adjacent digit segments."
        ]
      }
    }
  ],

  education: {
    title: "ACADEMIC ORBIT",
    subtitle: "FORMAL ENGINEERING DEGREE",
    degree: "B.E. Electronics and Communication Engineering",
    institution: "C.S.I. Institute of Technology, Thovalai",
    affiliation: "Affiliated to Anna University",
    duration: "2022 – 2026",
    cgpa: "7.7 / 10",
    highlights: [
      "Specialization in Microcontrollers, Digital Signal Processing, Embedded System Design, and VLSI.",
      "Comprehensive laboratory training in Microprocessor & Microcontroller Interfacing, Analog/Digital Communication.",
      "Consistent academic performance in core hardware and circuit design coursework."
    ]
  },

  certifications: {
    title: "CERTIFICATION VAULT",
    subtitle: "VERIFIED TECHNICAL CREDENTIALS",
    items: [
      {
        id: "cert-01",
        name: "ADAS Advanced Level – 2",
        issuer: "ANCIT Edutech / Naan Mudhalvan",
        domain: "Automotive Electronics & Autonomous Systems",
        icon: "ShieldAlert"
      },
      {
        id: "cert-02",
        name: "ADAS ECU Simulation and Testing",
        issuer: "ANCIT Edutech / Naan Mudhalvan",
        domain: "Electronic Control Unit Validation & SIL",
        icon: "Cpu"
      },
      {
        id: "cert-03",
        name: "Network Essentials",
        issuer: "Cisco / Naan Mudhalvan",
        domain: "Computer Networking, IP Addressing & OSI Model",
        icon: "Network"
      },
      {
        id: "cert-04",
        name: "Experience-Based Project Learning",
        issuer: "IBM / Naan Mudhalvan",
        domain: "Agile Engineering & Applied Software Methodology",
        icon: "Award"
      },
      {
        id: "cert-05",
        name: "Microsoft Office Essentials",
        issuer: "Microsoft / Naan Mudhalvan",
        domain: "Technical Documentation & Data Analysis",
        icon: "FileCheck"
      }
    ]
  },

  leadership: {
    title: "COMMAND & LEADERSHIP",
    subtitle: "COLLABORATION & INITIATIVE",
    items: [
      {
        title: "Technical Symposium & Fest Organizer",
        organization: "College Technical Events & Engineering Seminars",
        description: "Volunteered in organizing college technical symposiums, seminars and engineering fests. Coordinated logistics, stage presentations, and technical student workshops.",
        icon: "Flag"
      },
      {
        title: "College Cricket Team Captain / Leader",
        organization: "Zonal Level Inter-Collegiate Tournaments",
        description: "Led the college cricket team in competitive zonal tournaments. Managed team strategy, match-day communication, motivation, and disciplined teamwork under pressure.",
        icon: "Trophy"
      }
    ]
  }
};
