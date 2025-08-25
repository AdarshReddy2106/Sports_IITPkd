import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Building, Trophy, Phone } from 'lucide-react';
import '../components/SportsPage.css'; 

// Sports data with detailed information
const sportsData = {
  badminton: {
    title: 'Badminton',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Our badminton program fosters athletic excellence and strategic thinking. With state-of-the-art courts and expert coaching, we develop players from beginners to competitive athletes. The sport emphasizes agility, precision, and mental toughness, making it one of our most popular programs.',
    },
    facilities: [
      {
        name: 'Indoor Badminton Court ',
        description: 'Professional-grade court with competition lighting and ventilation',
        location: 'Agora Auditorium',
        features: ['Professional nets', 'LED lighting', 'Air conditioning']
      },
      {
        name: 'Hostel Outdoor Courts',
        location: 'Malhar, Saveri Hostels - Ground Floor',
        features: ['Standard nets', 'Natural lighting', 'Equipment']
      }
    ],
    rules: [
      {
        title: 'Timing Slots for Agora Badminton Court',
        description: 'The badminton court is available during the following time slots:',
        timingTable: [
          { category: 'Common', time: '6.00 am to 09.00 am and 8.30 pm to 10.00 pm' },
          { category: 'PhD and Institute employees', time: '4.30 pm to 6.00 pm' },
          { category: 'Institute Team practice and NSO Class', time: '6.00 pm to 8.30 pm' }
        ]
      },
      {
        title: 'Only Members of IIT Palakkad community having valid identity card, will have access to the Badminton court.',
        description: '',
      },
      {
        title: 'Institute employees who participate in inter-IIT events or use the sports facilities must pay a gymkhana fee of INR 250 per month.',
        description: '',
      },
      {
        title: 'Courts should be used only for playing Badminton.',
        description: '',
      },
      {
        title: 'Courts would be available on a first come-first serve basis.',
        description: '',
      },
      {
        title: 'Vacation of the court is to be done for pre-reserved events.',
        description: '',
      },
      {
        title: 'One player can play for a maximum of 30 minutes if other players are waiting to play.',
        description: '',
      },
      {
        title: 'Women\'s Hostel court is reserved for females.',
        description: '',
      },
      {
        title: 'Sports Rigs are compulsory for everyone. In case of improper attire, entry to the courts will be denied.',
        description: '',
      },
      {
        title: 'Players should wear clean, non-marking gum sole shoes in the court.',
        description: '',
      },
      {
        title: 'Institute Badminton team will be given priority for the team practice.',
        description: '',
      },
      {
        title: 'Lights will be switched off by 2200hrs. To use them after 2200hrs, prior permission from Sports Office is compulsory.',
        description: '',
      },
      {
        title: 'Issued equipment should be used properly and returned after use without any damage.',
        description: '',
      },
      {
        title: 'Damage to the courts or equipment would imply a strict disciplinary action and/or fine against the offender.',
        description: '',
      },
      {
        title: 'Disposing of the trash is to be done in proper receptacles.',
        description: '',
      },
      {
        title: 'Eatables are not allowed on the courts.',
        description: '',
      },
      {
        title: 'For getting sports equipment, students need to enter his/her details in a logbook corresponding to their hostel (available with security or hostel supervisor), submit their ID and get the equipment\'s, they can collect ID as soon they return the equipment.',
        description: '',
      },
      {
        title: 'Above-mentioned rules are not exhaustive, and Institute is free to modify/amend/delete/add new rules.',
        description: '',
      },
      {
        title: 'Non-compliance of the above-mentioned rules would invite strict disciplinary action. Decision of the Institute would be final.',
        description: '',
      }
    ],
    contact: [
      {
        name: 'Dr. Priya Sharma',
        role: 'Head Coach',
        email: 'priya.sharma@institute.edu',
        phone: '+91 98765 43210',
        location: 'Sports Complex - Room 101'
      },
      {
        name: 'Arjun Kumar',
        role: 'Assistant Coach',
        email: 'arjun.kumar@institute.edu',
        phone: '+91 98765 43211'
      }
    ]
  },
  volleyball: {
    title: 'Volleyball',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Our volleyball program promotes communication, coordination, and athletic excellence. With dedicated courts and experienced coaching staff, we build strong teams that compete at various levels.',
    },
    facilities: [
      {
        name: 'Outdoor Volleyball Court',
        description: 'Full-size court with professional net and lighting',
        location: 'Sports Complex - Outdoor Area',
        features: ['Sand flooring', 'Professional nets', 'Floodlights', 'Spectator seating']
      }
    ],
    rules: [
      {
        title: 'Only Members of IIT Palakkad community having valid identity card, will have access to the Volleyball court.',
        description: '',
      },
      {
        title: 'Institute employees who participate in inter-IIT events or use the sports facilities must pay a gymkhana fee of INR 250 per month.',
        description: '',
      },
      {
        title: 'Courts should be used only for playing Volleyball.',
        description: '',
      },
      {
        title: 'Volleyball Courts would be available on a first come-first serve basis.',
        description: '',
      },
      {
        title: 'Vacation of the Volleyball court is to be done for pre-reserved events.',
        description: '',
      },
      {
        title: 'Sports Rigs are compulsory for everyone. In case of improper attire, entry to the Volleyball courts shall be denied.',
        description: '',
      },
      {
        title: 'Institute Volleyball team will be given priority for the team practice.',
        description: '',
      },
      {
        title: 'Flood lights will be switched off by 2300hrs. To use them after 2300hrs, prior permission from Sports Office is compulsory.',
        description: '',
      },
      {
        title: 'Issued equipment should be used properly and returned after use without any damage.',
        description: '',
      },
      {
        title: 'Damage to the courts or equipment would imply a strict disciplinary action and/or fine against the offender.',
        description: '',
      },
      {
        title: 'Disposing of the trash is to be done in proper receptacles.',
        description: '',
      },
      {
        title: 'Eatables are not allowed on the courts.',
        description: '',
      },
      {
        title: 'For getting sports equipment, students need to enter his/her details in a logbook corresponding to their hostel (available with security or hostel supervisor), submit their ID and get the equipment\'s, they can collect ID as soon they return the equipment.',
        description: '',
      },
      {
        title: 'Above-mentioned rules are not exhaustive, and Institute is free to modify/amend/delete/add new rules.',
        description: '',
      },
      {
        title: 'Non-compliance of the above-mentioned rules would invite strict disciplinary action. Decision of the Institute would be final.',
        description: '',
      }
    ],
    contact: [
      {
        name: 'Coach Rajesh Kumar',
        role: 'Head Coach',
        email: 'rajesh.kumar@institute.edu',
        phone: '+91 98765 43212',
        location: 'Sports Complex - Room 102'
      }
    ]
  },
  basketball: {
    title: 'Basketball',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Dynamic team sport combining strategy, skill, and competitive spirit. Our basketball program develops both individual skills and team coordination.',
    },
    facilities: [
      {
        name: 'Indoor Basketball Court',
        description: 'Full-size court with professional hoops and flooring',
        location: 'Sports Complex - First Floor',
        features: ['Wooden flooring', 'Professional hoops', 'LED lighting', 'Sound system']
      }
    ],
    rules: [
      {
        title: 'Only Members of IIT Palakkad community having valid identity card, will have access to the Basketball court.',
        description: '',
      },
      {
        title: 'Institute employees who participate in inter-IIT events or use the sports facilities must pay a gymkhana fee of INR 250 per month.',
        description: '',
      },
      {
        title: 'Courts should be used only for playing Basketball.',
        description: '',
      },
      {
        title: 'Vacation of the court is to be done for pre-reserved events.',
        description: '',
      },
      {
        title: 'Sports Rigs are compulsory for everyone. In case of improper attire, entry to the courts shall be denied.',
        description: '',
      },
      {
        title: 'Players should wear clean, non-marking shoes in the court.',
        description: '',
      },
      {
        title: 'Institute Basket team will be given priority for the team practice.',
        description: '',
      },
      {
        title: 'Flood lights will be switched off by 2300hrs. To use them after 2300hrs, prior permission from Sports Office is compulsory.',
        description: '',
      },
      {
        title: 'Issued equipment should be used properly and returned after use without any damage.',
        description: '',
      },
      {
        title: 'Damage to the courts or equipment would imply a strict disciplinary action and/or fine against the offender.',
        description: '',
      },
      {
        title: 'Disposing of the trash is to be done in proper receptacles.',
        description: '',
      },
      {
        title: 'Eatables are not allowed on the courts.',
        description: '',
      },
      {
        title: 'For getting sports equipment, students need to enter his/her details in a logbook corresponding to their hostel (available with security or hostel supervisor), submit their ID and get the equipment\'s, they can collect ID as soon they return the equipment.',
        description: '',
      },
      {
        title: 'Above-mentioned rules are not exhaustive, and Institute is free to modify/amend/delete/add new rules.',
        description: '',
      },
      {
        title: 'Non-compliance of the above-mentioned rules would invite strict disciplinary action. Decision of the Sports Committee would be final.',
        description: '',
      }
    ],
    contact: [
      {
        name: 'Coach Michael Johnson',
        role: 'Head Coach',
        email: 'michael.johnson@institute.edu',
        phone: '+91 98765 43213',
        location: 'Sports Complex - Room 103'
      }
    ]
  },
  cricket: {
    title: 'Cricket',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Traditional sport requiring technique, patience, and mental strength. Our cricket program focuses on developing all aspects of the game.',
    },
    facilities: [
      {
        name: 'Cricket Ground',
        description: 'Full-size ground with turf wicket and practice nets',
        location: 'Sports Complex - Main Field',
        features: ['Turf wicket', 'Practice nets', 'Pavilion', 'Scoreboard']
      }
    ],
    rules: [
      {
        title: 'Only Members of IIT Palakkad community having valid identity card, will have access to the Cricket Ground.',
        description: '',
      },
      {
        title: 'Institute employees who participate in inter-IIT events or use the sports facilities must pay a gymkhana fee of INR 250 per month.',
        description: '',
      },
      {
        title: 'To use any of the main pitches, prior permission from the Cricket club or Sports Office is mandatory.',
        description: '',
      },
      {
        title: 'Morning /Evening walkers/joggers are allowed on the ground but restricted to circumference only.',
        description: '',
      },
      {
        title: 'For organizing cricket event/tournament, approval from Sports Office should be taken.',
        description: '',
      },
      {
        title: 'Person using the ground shall have proper kit (which includes sport shoes, white/ team jerseys, equipment).',
        description: '',
      },
      {
        title: 'Cricket ground would be available on a first come-first serve basis.',
        description: '',
      },
      {
        title: 'Vacation of the ground is to be done for pre-reserved events.',
        description: '',
      },
      {
        title: 'Usage of any ball other than leather is strictly prohibited in main pitches.',
        description: '',
      },
      {
        title: 'usage of ground is prohibited during the maintenance hours or when the ground is wet.',
        description: '',
      },
      {
        title: 'Ground will remain shut during monsoon until otherwise notified.',
        description: '',
      },
      {
        title: 'Issued equipment should be used properly and returned after use without any damage.',
        description: '',
      },
      {
        title: 'Damage to the ground or equipment would imply a strict disciplinary action and/or fine against the offender.',
        description: '',
      },
      {
        title: 'Institute Cricket team will be given priority for the team practice.',
        description: '',
      },
      {
        title: 'Flood lights will be switched off by 2300hrs. To use them after 2300hrs, prior permission from Sports Office is compulsory.',
        description: '',
      },
      {
        title: 'Disposing of the trash is to be done in proper receptacles.',
        description: '',
      },
      {
        title: 'Eatables are not allowed on the ground.',
        description: '',
      },
      {
        title: 'For getting sports equipment, students need to enter his/her details in a logbook corresponding to their hostel (available with security or hostel supervisor), submit their ID and get the equipment\'s, they can collect ID as soon they return the equipment.',
        description: '',
      },
      {
        title: 'Above-mentioned rules are not exhaustive, and Institute is free to modify/amend/delete/add new rules.',
        description: '',
      },
      {
        title: 'Non-compliance of the above-mentioned rules would invite strict disciplinary action. Decision of the Sports Committee would be final.',
        description: '',
      }
    ],
    contact: [
      {
        name: 'Coach Suresh Raina',
        role: 'Head Coach',
        email: 'suresh.raina@institute.edu',
        phone: '+91 98765 43214',
        location: 'Sports Complex - Room 104'
      }
    ]
  },
  football: {
    title: 'Football',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'The beautiful game that builds teamwork and athletic prowess. Our football program emphasizes skill development and tactical understanding.',
    },
    facilities: [
      {
        name: 'Football Field',
        description: 'Full-size grass field with goals and lighting',
        location: 'Sports Complex - Main Field',
        features: ['Natural grass', 'Professional goals', 'Floodlights', 'Dugouts']
      }
    ],
    rules: [
      {
        title: 'Only Members of IIT Palakkad community having valid identity card, will have access to the Football Field.',
        description: '',
      },
      {
        title: 'Institute employees who participate in inter-IIT events or use the sports facilities must pay a gymkhana fee of INR 250 per month.',
        description: '',
      },
      {
        title: 'Ground should be used only for playing Football.',
        description: '',
      },
      {
        title: 'Sports Rigs are compulsory for everyone. In case of improper attire, entry to the courts shall be denied.',
        description: '',
      },
      {
        title: 'Institute Football team will be given priority for the team practice.',
        description: '',
      },
      {
        title: 'Vacation of the ground is to be done for pre-reserved events.',
        description: '',
      },
      {
        title: 'Issued equipment should be used properly and returned after use without any damage.',
        description: '',
      },
      {
        title: 'Damage to the ground or equipment would imply a strict disciplinary action and/or fine against the offender.',
        description: '',
      },
      {
        title: 'Flood lights will be switched off by 2300hrs. To use them after 2300hrs, prior permission from Sports Office is compulsory.',
        description: '',
      },
      {
        title: 'Disposing of the trash is to be done in proper receptacles.',
        description: '',
      },
      {
        title: 'Eatables are not allowed on the ground.',
        description: '',
      },
      {
        title: 'For getting sports equipment, students need to enter his/her details in a logbook corresponding to their hostel (available with security or hostel supervisor), submit their ID and get the equipment\'s, they can collect ID as soon they return the equipment.',
        description: '',
      },
      {
        title: 'Above-mentioned rules are not exhaustive, and Institute is free to modify/amend/delete/add new rules.',
        description: '',
      },
      {
        title: 'Non-compliance of the above-mentioned rules would invite strict disciplinary action. Decision of the Sports Committee would be final.',
        description: '',
      }
    ],
    contact: [
      {
        name: 'Coach Diego Martinez',
        role: 'Head Coach',
        email: 'diego.martinez@institute.edu',
        phone: '+91 98765 43215',
        location: 'Sports Complex - Room 105'
      }
    ]
  },
  'table-tennis': {
    title: 'Table Tennis',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Quick reflexes and precision in this fast-paced indoor sport. Our table tennis program develops hand-eye coordination and strategic thinking.',
    },
    facilities: [
      {
        name: 'Table Tennis Hall',
        description: 'Multiple tables with professional lighting',
        location: 'Sports Complex - Ground Floor',
        features: ['Professional tables', 'LED lighting', 'Air conditioning', 'Equipment storage']
      }
    ],
    rules: [
      {
        title: 'Only Members of IIT Palakkad community having valid identity card, will have access to the Table Tennis Arena.',
        description: '',
      },
      {
        title: 'Institute employees who participate in inter-IIT events or use the sports facilities must pay a gymkhana fee of INR 250 per month.',
        description: '',
      },
      {
        title: 'TT Table should be used only for playing Table Tennis.',
        description: '',
      },
      {
        title: 'TT Tables are available on a first come-first serve basis.',
        description: '',
      },
      {
        title: 'Sports Rigs are compulsory for everyone. In case of improper attire, entry to the courts shall be denied.',
        description: '',
      },
      {
        title: 'Institute Table Tennis team will be given priority for the team practice.',
        description: '',
      },
      {
        title: 'Vacation of the TT Table is to be done for pre-reserved events.',
        description: '',
      },
      {
        title: 'Issued equipment should be used properly and returned after use without any damage.',
        description: '',
      },
      {
        title: 'Damage to the table or equipment would imply a strict disciplinary action and/or fine against the offender.',
        description: '',
      },
      {
        title: 'Disposing of the trash is to be done in proper receptacles.',
        description: '',
      },
      {
        title: 'Eatables are not allowed on the ground.',
        description: '',
      },
      {
        title: 'For getting sports equipment, students need to enter his/her details in a logbook corresponding to their hostel (available with security or hostel supervisor), submit their ID and get the equipment\'s, they can collect ID as soon they return the equipment.',
        description: '',
      },
      {
        title: 'Above-mentioned rules are not exhaustive, and Institute is free to modify/amend/delete/add new rules.',
        description: '',
      },
      {
        title: 'Non-compliance of the above-mentioned rules would invite strict disciplinary action. Decision of the Institute would be final.',
        description: '',
      }
    ],
    contact: [
      {
        name: 'Coach Li Wei',
        role: 'Head Coach',
        email: 'li.wei@institute.edu',
        phone: '+91 98765 43216',
        location: 'Sports Complex - Room 106'
      }
    ]
  },
  chess: {
    title: 'Chess',
    subtitle: 'Excellence in Mind Sports',
    about: {
      description: 'Our chess program focuses on strategic thinking, mental fortitude, and analytical skills. Whether you\'re a beginner or an experienced player, our program offers opportunities for intellectual growth and competitive play in a supportive environment.',
    },
    facilities: [
      {
        name: 'Chess Training Center',
        description: 'Dedicated space for chess practice, training, and tournaments',
        location: 'Academic Block - First Floor',
        features: ['Digital chess boards', 'Chess clocks', 'Analysis software', 'Reference library']
      },
      {
        name: 'Chess Club Room',
        description: 'Casual space for friendly matches and chess discussions',
        location: 'Student Center - Ground Floor',
        features: ['Multiple chess sets', 'Comfortable seating', 'Strategy boards', 'Chess literature']
      }
    ],
    achievements: [
      {
        title: 'Inter-University Chess Championship',
        year: '2024',
        description: 'First place in team category and individual board prizes',
        level: 'State'
      },
      {
        title: 'FIDE Rated Tournament',
        year: '2023',
        description: 'Three players achieved national ratings',
        level: 'National'
      },
      {
        title: 'College Chess League',
        year: '2023',
        description: 'Champions in the regional division',
        level: 'Regional'
      }
    ],
    contact: [
      {
        name: 'Prof. Ramesh Kumar',
        role: 'Chess Coach',
        email: 'ramesh.kumar@institute.edu',
        phone: '+91 98765 43220',
        location: 'Academic Block - Room 104'
      },
      {
        name: 'Shreesh Amit',
        role: 'Chess Secretary',
        email: '112301046@smail.iitpkd.ac.in',
        phone: '+91 98765 43221'
      }
    ]
  },
  gym: {
    title: 'Gym',
    subtitle: 'Strength and Conditioning Excellence',
    about: {
      description: 'Our state-of-the-art gym facility offers comprehensive strength training and conditioning programs for all fitness levels. With modern equipment and expert guidance, we focus on proper technique, sustainable progress, and overall physical development.',
    },
    facilities: [
      {
        name: 'Main Fitness Center',
        description: 'Comprehensive fitness facility with strength and cardio equipment',
        location: 'Sports Complex - First Floor',
        features: ['Free weights section', 'Machine training area', 'Cardio zone', 'Functional training space']
      },
      {
        name: 'Cross-Training Zone',
        description: 'Dedicated space for functional fitness and high-intensity workouts',
        location: 'Sports Complex - Ground Floor',
        features: ['Olympic lifting platform', 'Pull-up stations', 'Battle ropes', 'Box jump platforms']
      }
    ],
    rules: [
      {
        title: 'Timing slots for Kedaram Gym is as follows:',
        description: '',
        timingTable: [
          { category: 'Common', time: '6.00 am to 10.00 am and 5 pm to 10 pm' }
        ]
      },
      {
        title: 'Timing slots for Malhar Gym is as follows:',
        description: '',
        timingTable: [
          { category: 'Common', time: '6.00 am to 10.00 am and 6 pm to 10 pm' },
          { category: 'Faculty Member/ Staff/ Students (Women)', time: '5.00 pm to 6.00 pm' }
        ]
      },
      {
        title: 'Only Members of IIT Palakkad community having valid identity card, will have access to the Gym.',
        description: '',
      },
      {
        title: 'Institute employees who participate in inter-IIT events or use the sports facilities must pay a gymkhana fee of INR 250 per month.',
        description: '',
      },
      {
        title: 'Entry and exit times must be entered in the logbook.',
        description: '',
      },
      {
        title: 'All gym users are advised to seek medical consultation and clearance before embarking on any exercise programs. Be sure to always integrate warm-ups, stretching, and cooling- down into your program. This will reduce your risk of injury by increasing your blood flow and preparing your muscles for the workout. Proper use of all machines & free weights is important not only to work your muscles correctly, but also to prevent injury.',
        description: '',
      },
      {
        title: 'NO sandals, boots, slippers, open-toed shoes, or bare feet are permitted.',
        description: '',
      },
      {
        title: 'Sports attire is mandatory for all gym users. Entry will be denied to those not dressed appropriately. Sleeveless clothing is strictly prohibited to maintain hygiene standards.',
        description: '',
      },
      {
        title: 'The management & gym staff on duty reserve the right to decide on the suitability of the sporting attire worn by gym users. Dry, closed-top athletic shoes must be worn at all times.',
        description: '',
      },
      {
        title: 'Outside footwear is strictly prohibited on the treadmills or any other machines so bring along a proper gym shoe for your workout.',
        description: '',
      },
      {
        title: 'A personal towel must be used at all times. Gym users are not allowed to share towels. Please bring your own towel and wipe your sweat off the seats or machines that you have used. Other users wish to use the seats or/and machines in the gym without your sweat. Wear clean and dry clothes while working out.',
        description: '',
      },
      {
        title: 'Do not monopolize the machines. Cardio machines are restricted to 15 minutes per use during peak hours. All other equipment shall be shared among gym users at all times.',
        description: '',
      },
      {
        title: 'Do not slam, drop, clang, or throw dumbbells or free weights on the floor when you are finished.',
        description: '',
      },
      {
        title: 'Do not leave equipment lying around so someone could trip over it. Replace equipment to its original state and location after use.',
        description: '',
      },
      {
        title: 'No bags are allowed in the gym',
        description: '',
      },
      {
        title: 'No equipment shall be moved from its original place.',
        description: '',
      },
      {
        title: 'Damage to the equipment would imply a strict disciplinary action and fine against the offender.',
        description: '',
      },
      {
        title: 'Eatables are not allowed inside the Gym.',
        description: '',
      },
      {
        title: 'Please dispose off the trash in proper receptacles.',
        description: '',
      },
      {
        title: 'Above-mentioned rules are not exhaustive, and Institute is free to modify/amend/delete/add new rules.',
        description: '',
      },
      {
        title: 'Non-compliance of the above-mentioned rules would invite strict disciplinary action. Decision of the Institute would be final.',
        description: '',
      }
    ],
    achievements: [
      {
        title: 'University Strength Competition',
        year: '2024',
        description: 'Multiple medals across weight categories',
        level: 'State'
      },
      {
        title: 'Fitness Challenge Series',
        year: '2023',
        description: 'Overall champions in inter-college fitness challenge',
        level: 'Regional'
      }
    ],
    contact: [
      {
        name: 'Mr. Raj Singh',
        role: 'Head Fitness Trainer',
        email: 'raj.singh@institute.edu',
        phone: '+91 98765 43222',
        location: 'Sports Complex - Gym Office'
      },
      {
        name: 'Siddharth Bharti',
        role: 'Gym Secretary',
        email: '132301033@smail.iitpkd.ac.in',
        phone: '+91 98765 43223'
      }
    ]
  },
  athletics: {
    title: 'Athletics',
    subtitle: 'Track and Field Excellence',
    about: {
      description: 'Our athletics program covers track events, field events, and long-distance running, fostering speed, endurance, and athletic prowess. We train athletes for individual excellence and team competitions at various levels.',
    },
    facilities: [
      {
        name: 'Athletic Track',
        description: 'Standard 400m track with proper lane markings',
        location: 'Sports Complex - Outdoor',
        features: ['Synthetic track surface', 'Long jump pit', 'High jump area', 'Javelin/shot put field']
      },
      {
        name: 'Indoor Training Facility',
        description: 'All-weather facility for continuous training',
        location: 'Sports Complex - First Floor',
        features: ['Sprint track', 'Plyometric area', 'Technique training zone', 'Video analysis setup']
      }
    ],
    achievements: [
      {
        title: 'University Athletics Championships',
        year: '2024',
        description: 'Gold medals in 400m, long jump, and 4x100m relay',
        level: 'State'
      },
      {
        title: 'National Inter-University Games',
        year: '2023',
        description: 'Silver medal in men\'s 800m and bronze in women\'s javelin',
        level: 'National'
      },
      {
        title: 'Cross Country Meet',
        year: '2023',
        description: 'Overall team championship',
        level: 'Regional'
      }
    ],
    rules: [
      {
        title: 'Table and Equipment Specifications',
        year: '',
        description: 'A table tennis table is 2.74m long, 1.525m wide, and 76cm high. The ball must be 40mm in diameter and weigh 2.7g.',
      }
    ],
    contact: [
      {
        name: 'Coach Anand Kumar',
        role: 'Head Athletics Coach',
        email: 'anand.kumar@institute.edu',
        phone: '+91 98765 43224',
        location: 'Sports Complex - Track Office'
      },
      {
        name: 'M Kishore',
        role: 'Athletics Secretary',
        email: '112201035@smail.iitpkd.ac.in',
        phone: '+91 98765 43225'
      }
    ]
  }
};

const SportPage = () => {
  const { sportName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  
  const sport = sportsData[sportName];
  
  if (!sport) {
    return <div>Sport not found</div>;
  }

  const tabs = [
    { id: 'about', label: 'About', icon: User },
    { id: 'facilities', label: 'Facilities', icon: Building },
    { id: sportName === 'athletics' ? 'achievements' : 'rules', label: sportName === 'athletics' ? 'Achievements' : 'Rules', icon: Trophy },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="sport-card-wrapper">
            <div className="sport-content-card">
              <div className="sport-section-header">
                <User />
                <h3>About {sport.title}</h3>
              </div>
              <p>
                {sport.about.description}
              </p>
            </div>
          </div>
        );
      
      case 'facilities':
        return (
          <div className="sport-facilities-grid">
            {sport.facilities.map((facility, index) => (
              <div key={index} className="sport-card-wrapper">
                <div className="sport-facility-card">
                  <div className="sport-section-header">
                    <Building />
                    <h3>{facility.name}</h3>
                  </div>
                  <p>
                    {facility.description}
                  </p>
                  <div className="sport-facility-location">
                    <span>📍</span>
                    {facility.location}
                  </div>
                  <div className="sport-features-list">
                    {facility.features.map((feature, idx) => (
                      <span key={idx} className="sport-feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'achievements':
        return (
          <div className="sport-achievements-grid">
            {sport.achievements.map((achievement, index) => (
              <div key={index} className="sport-card-wrapper">
                <div className="sport-achievement-card">
                  <div className="sport-achievement-header">
                    <div className="sport-achievement-title-section">
                      <Trophy />
                      <h3 className="sport-achievement-title">{achievement.title}</h3>
                    </div>
                    <span className="sport-achievement-year">{achievement.year}</span>
                  </div>
                  <p className="sport-achievement-description">{achievement.description}</p>
                  <span className={`sport-level-badge ${achievement.level.toLowerCase()}`}>
                    {achievement.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'rules':
        return (
          <div className="sport-card-wrapper">
            <div className="sport-achievement-card badminton-rules-card">
              {/* Special timing tables for badminton or gym */}
              {(sportName === 'badminton' || sportName === 'gym') && (
                <>
                  {/* First rule with timing table */}
                  <div className="sport-achievement-header">
                    <div className="sport-achievement-title-section">
                      <Trophy />
                      <h3 className="sport-achievement-title">{sport.rules[0].title}</h3>
                    </div>
                  </div>
                  {sport.rules[0].description && (
                    <p className="sport-achievement-description">{sport.rules[0].description}</p>
                  )}
                  
                  {/* Timing table styled to match image */}
                  <div className="timing-table-container">
                    <table className="badminton-timing-table">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sport.rules[0].timingTable.map((slot, idx) => (
                          <tr key={idx}>
                            <td>{slot.category}</td>
                            <td>{slot.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Second timing table for gym */}
                  {sportName === 'gym' && (
                    <>
                      <div className="sport-achievement-header" style={{ marginTop: '20px' }}>
                        <div className="sport-achievement-title-section">
                          <Trophy />
                          <h3 className="sport-achievement-title">{sport.rules[1].title}</h3>
                        </div>
                      </div>
                      <div className="timing-table-container">
                        <table className="badminton-timing-table">
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th>Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sport.rules[1].timingTable.map((slot, idx) => (
                              <tr key={idx}>
                                <td>{slot.category}</td>
                                <td>{slot.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              )}
              
              {/* Rules as bullet points for all sports */}
              <div className="badminton-rules-list">
                {/* For badminton and gym, skip the timing tables that are already displayed */}
                {(sportName === 'badminton' || sportName === 'gym') ? 
                  sport.rules.slice(sportName === 'gym' ? 2 : 1).map((rule, index) => (
                    <div key={index} className="badminton-rule-item">
                      <div className="badminton-rule-bullet">•</div>
                      <div className="badminton-rule-text">{rule.title}</div>
                    </div>
                  ))
                  :
                  // For all other sports, display all rules
                  sport.rules.map((rule, index) => (
                    <div key={index} className="badminton-rule-item">
                      <div className="badminton-rule-bullet">•</div>
                      <div className="badminton-rule-text">{rule.title}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="sport-contact-grid">
            {sport.contact.map((contact, index) => (
              <div key={index} className="sport-card-wrapper">
                <div className="sport-contact-card">
                  <div className="sport-contact-header">
                    <User />
                    <div className="sport-contact-info">
                      <h3 className="sport-contact-name">{contact.name}</h3>
                      <p className="sport-contact-role">{contact.role}</p>
                    </div>
                  </div>
                  <div className="sport-contact-details">
                    <div className="sport-contact-item">
                      <span>✉️</span>
                      <a href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    </div>
                    <div className="sport-contact-item">
                      <span>📞</span>
                      <a href={`tel:${contact.phone}`}>
                        {contact.phone}
                      </a>
                    </div>
                    {contact.location && (
                      <div className="sport-contact-item">
                        <span>📍</span>
                        <span style={{ color: '#64748b' }}>{contact.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

return (
  <div className="sport-page">
    {/* Header */}
    <div className="sport-header">
      <div className="sport-header-content">
        <h1>{sport.title}</h1>
        <p>{sport.subtitle}</p>
        </div>
      </div>
      
      {/* Back button */}
      <div className="sport-back-button-container">
        <div className="sport-back-button-wrapper">
          <button 
            onClick={() => navigate('/clubs')} 
            className="sport-back-button"
          >
            <ArrowLeft size={20} />
            Back to Sports
          </button>
        </div>
    </div>
    
    {/* Navigation tabs */}
    <div className="sport-tabs-container">
      <div className="sport-tabs-wrapper">
        <nav className="sport-tabs-nav">
          {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`sport-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon />
                  {tab.label}
                </button>
              );
            })}
        </nav>
      </div>
    </div>

    {/* Content */}
    <div className="sport-content-container">
      {renderContent()}
    </div>
  </div>
  );
};

export default SportPage;