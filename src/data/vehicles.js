import { format, subDays, addDays } from 'date-fns'
import { residents } from './residents'

const vehicleTypes = ['Car','SUV','Motorcycle','Scooter','Electric Car','Hatchback']
const brands = ['Maruti Suzuki','Hyundai','Honda','Toyota','Tata','Mahindra','Bajaj','Hero','TVS','Yamaha','Kia','MG']
const colors = ['White','Silver','Black','Red','Blue','Grey','Beige','Orange','Green']
const fuelTypes = ['Petrol','Diesel','CNG','Electric','Hybrid']

const generateVehicleNumber = (i) => {
  const states = ['MH','GJ','DL','KA','TN','UP','RJ','PB','HR','WB']
  const state = states[i % states.length]
  const dist = String(Math.floor(Math.random() * 50) + 1).padStart(2, '0')
  const letters = String.fromCharCode(65 + (i % 26)) + String.fromCharCode(65 + ((i * 3) % 26))
  const num = String(Math.floor(Math.random() * 9000) + 1000)
  return `${state} ${dist} ${letters} ${num}`
}

export const vehicles = Array.from({ length: 100 }, (_, i) => {
  const resident = residents[i % residents.length]
  const type = vehicleTypes[i % vehicleTypes.length]
  const regDate = subDays(new Date(), Math.floor(Math.random() * 800 + 30))
  return {
    id: `VEH-${String(i + 1).padStart(4, '0')}`,
    vehicleNumber: generateVehicleNumber(i),
    type,
    brand: brands[i % brands.length],
    model: `${brands[i % brands.length]} ${['i20','Swift','City','Nexon','Creta','Alto','XUV500'][i % 7]}`,
    color: colors[i % colors.length],
    fuelType: fuelTypes[i % fuelTypes.length],
    year: 2018 + (i % 7),
    residentId: resident.id,
    residentName: resident.name,
    residentApartment: resident.apartment,
    parkingSlot: `P-${String(i + 1).padStart(3, '0')}`,
    registrationDate: format(regDate, 'yyyy-MM-dd'),
    insuranceExpiry: format(addDays(regDate, 365 * 2), 'yyyy-MM-dd'),
    rcExpiry: format(addDays(regDate, 365 * 5), 'yyyy-MM-dd'),
    isActive: Math.random() > 0.05,
    tag: ['RFID-' + String(Math.floor(Math.random() * 900000) + 100000)][0],
    image: `https://picsum.photos/seed/car${i}/200/120`,
  }
})

export default vehicles
