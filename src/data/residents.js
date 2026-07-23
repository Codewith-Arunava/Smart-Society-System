import { format, subDays, subMonths, addDays } from 'date-fns'

const firstNames = [
  'Aarav','Vivaan','Aditya','Vihaan','Arjun','Sai','Reyansh','Ayaan',
  'Krishna','Ishaan','Priya','Ananya','Pooja','Neha','Kavya','Riya',
  'Meera','Sneha','Divya','Asha','Rahul','Rohit','Amit','Suresh','Rajesh',
  'Vijay','Manoj','Santosh','Deepak','Sunil','Ramesh','Ganesh','Mukesh',
  'Harish','Girish','Mahesh','Naresh','Dinesh','Rakesh','Umesh','Anjali',
  'Sunita','Geeta','Sita','Lata','Mala','Nita','Rita','Gita','Pita',
  'Aryan','Sahil','Karan','Vikram','Akash','Vishal','Nikhil','Gaurav',
  'Tushar','Rohan','Sanjay','Pankaj','Ajay','Vijay','Nitin','Anil',
  'Sudhir','Mohan','Shyam','Ram','Lakshmi','Saraswati','Durga','Parvati',
  'Radha','Sita','Ganga','Yamuna','Kaveri','Godavari','Champa','Kamla',
  'Rekha','Usha','Vimala','Shanta','Madhuri','Savita','Bindu','Jyoti',
  'Shobha','Pushpa','Kokila','Hema','Rupal','Jigna','Bhavna','Kiran',
]

const lastNames = [
  'Sharma','Patel','Verma','Singh','Kumar','Gupta','Joshi','Shah',
  'Mehta','Desai','Nair','Pillai','Rao','Reddy','Iyer','Iyengar',
  'Chopra','Kapoor','Malhotra','Arora','Bhatia','Kohli','Bansal','Agarwal',
  'Mittal','Garg','Khanna','Sinha','Mishra','Pandey','Tiwari','Dubey',
]

const apartments = [
  'A-101','A-102','A-103','A-201','A-202','A-203','A-301','A-302',
  'B-101','B-102','B-103','B-201','B-202','B-203','B-301','B-302',
  'C-101','C-102','C-103','C-201','C-202','C-203','C-301','C-302',
  'D-101','D-102','D-103','D-201','D-202','D-203','D-301','D-302',
  'E-101','E-102','E-103','E-201','E-202','E-203','E-301','E-302',
  'F-101','F-102','F-103','F-201','F-202','F-203','F-301','F-302',
  'G-101','G-102','G-103','G-201','G-202','G-203','G-301','G-302',
  'H-101','H-102','H-103','H-201','H-202','H-203','H-301','H-302',
  'I-101','I-102','I-103','I-201','I-202','I-203','I-301','I-302',
  'J-101','J-102','J-103','J-201','J-202','J-203','J-301','J-302',
  'K-101','K-102','K-103','K-201','K-202','K-203','K-301','K-302',
  'L-101','L-102','L-103','L-201','L-202','L-203','L-301','L-302',
]

const occupations = [
  'Software Engineer','Product Manager','Doctor','Lawyer','Teacher',
  'Business Owner','Accountant','Architect','Civil Engineer','Professor',
  'Nurse','Pharmacist','Data Scientist','Marketing Manager','HR Manager',
]

const generatePhone = () => `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`

const generateEmail = (first, last) =>
  `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(Math.random() * 999)}@gmail.com`

const generateAvatar = (id) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}&backgroundColor=b6e3f4,c0aede,d1d4f9`

export const residents = Array.from({ length: 100 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length]
  const lastName = lastNames[i % lastNames.length]
  const joinDate = subDays(new Date(), Math.floor(Math.random() * 1000 + 30))
  const isActive = Math.random() > 0.1
  return {
    id: `RES-${String(i + 1).padStart(4, '0')}`,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: generateEmail(firstName, lastName),
    phone: generatePhone(),
    apartment: apartments[i % apartments.length],
    occupation: occupations[Math.floor(Math.random() * occupations.length)],
    avatar: generateAvatar(i + 1),
    joinDate: format(joinDate, 'yyyy-MM-dd'),
    isActive,
    status: isActive ? 'active' : 'inactive',
    memberCount: Math.floor(Math.random() * 5) + 1,
    parkingSlots: Math.floor(Math.random() * 3),
    vehicleCount: Math.floor(Math.random() * 3),
    outstandingAmount: Math.random() > 0.7 ? Math.floor(Math.random() * 15000) + 1000 : 0,
    totalPaid: Math.floor(Math.random() * 200000) + 50000,
    complaintsCount: Math.floor(Math.random() * 10),
    emergencyContact: {
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastName}`,
      phone: generatePhone(),
      relation: ['Spouse','Parent','Sibling','Friend'][Math.floor(Math.random() * 4)],
    },
    address: `Flat ${apartments[i % apartments.length]}, Sunrise Heights Society, Sector 12, Navi Mumbai - 400706`,
    aadhaarVerified: Math.random() > 0.2,
    backgroundCheckDone: Math.random() > 0.15,
    tags: Math.random() > 0.7 ? ['Senior Citizen'] : Math.random() > 0.8 ? ['Committee Member'] : [],
  }
})

export default residents
