import { format, subDays, subHours } from 'date-fns'
import { residents } from './residents'

const categories = [
  'Water Supply','Electricity','Lift / Elevator','Parking','Security',
  'Cleaning / Sanitation','Plumbing','Common Area','Noise Complaint',
  'Internet / Cable','Gardening','Fire Safety','Other',
]

const priorities = ['low','medium','high','critical']
const statuses = ['open','in_progress','resolved','closed','rejected']

const complaintsText = [
  { title: 'No water supply in Block A', desc: 'There has been no water supply in Block A for the past 3 days. This is causing severe inconvenience to residents.' },
  { title: 'Lift not working on 5th floor', desc: 'The elevator in Tower B stops unexpectedly between floors 4 and 5, posing a safety risk.' },
  { title: 'Power outage in parking area', desc: 'The parking area lights have been off for a week, creating safety concerns at night.' },
  { title: 'Water leakage in ceiling', desc: 'There is a major water leak from the ceiling in flat C-201, damaging the walls and floor.' },
  { title: 'Garbage not collected', desc: 'Garbage bins near Block D have not been cleared for 4 days and it is causing foul smell.' },
  { title: 'Security guard misbehavior', desc: 'The night shift security guard was rude to residents and refused entry to a valid visitor.' },
  { title: 'Broken gate at main entrance', desc: 'The main entrance gate is not closing properly, creating a security vulnerability.' },
  { title: 'Noise complaint from adjacent flat', desc: 'The residents in B-304 play loud music past midnight regularly, disturbing neighbors.' },
  { title: 'Internet connection down in Tower C', desc: 'The society Wi-Fi connection in Tower C has been down since Monday.' },
  { title: 'Swimming pool maintenance needed', desc: 'The swimming pool water appears dirty and has not been cleaned in over a month.' },
  { title: 'Gym equipment damaged', desc: 'The treadmill in the gymnasium is broken and poses a safety risk to users.' },
  { title: 'Pest infestation in common area', desc: 'There are cockroaches and rodents spotted in the common corridor on floor 2.' },
  { title: 'Parking slot occupied by unauthorized vehicle', desc: 'My designated parking slot P-42 has been taken by an unregistered vehicle.' },
  { title: 'Fire extinguisher expired', desc: 'The fire extinguisher in corridor B-3 shows expired date. Immediate replacement needed.' },
  { title: 'Garden area in poor condition', desc: 'The society garden has overgrown weeds and the sprinklers are not working.' },
  { title: 'Leaking pipe in common bathroom', desc: 'Ground floor common bathroom pipe is leaking and water is flooding the area.' },
  { title: 'Street lights not working', desc: 'All street lights near the east side parking area are non-functional since last week.' },
  { title: 'Door intercom not working', desc: 'The intercom system in Block F has stopped working completely.' },
  { title: 'Sewage smell in basement', desc: 'Strong sewage odor is coming from the basement area near the water tank.' },
  { title: 'Children play area damaged', desc: 'The swings and slide in the children play area are broken and unsafe.' },
]

const timelines = [
  { action: 'Complaint Submitted', author: 'System' },
  { action: 'Complaint Acknowledged', author: 'Admin' },
  { action: 'Assigned to Maintenance Team', author: 'Admin' },
  { action: 'Work in Progress', author: 'Maintenance Staff' },
  { action: 'Issue Resolved', author: 'Maintenance Staff' },
  { action: 'Resolution Verified', author: 'Admin' },
]

export const complaints = Array.from({ length: 300 }, (_, i) => {
  const resident = residents[i % residents.length]
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const priority = priorities[Math.floor(Math.random() * priorities.length)]
  const category = categories[Math.floor(Math.random() * categories.length)]
  const textItem = complaintsText[i % complaintsText.length]
  const daysAgo = Math.floor(Math.random() * 180)
  const createdAt = subDays(new Date(), daysAgo)

  const timelineCount = status === 'open' ? 1
    : status === 'in_progress' ? 3
    : status === 'resolved' ? 5
    : 6

  return {
    id: `CMP-${String(i + 1).padStart(4, '0')}`,
    title: textItem.title,
    description: textItem.desc,
    category,
    priority,
    status,
    residentId: resident.id,
    residentName: resident.name,
    residentApartment: resident.apartment,
    residentAvatar: resident.avatar,
    createdAt: format(createdAt, 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subHours(new Date(), Math.floor(Math.random() * 72)), 'yyyy-MM-dd HH:mm:ss'),
    resolvedAt: status === 'resolved' || status === 'closed' ? format(subDays(new Date(), Math.floor(Math.random() * daysAgo)), 'yyyy-MM-dd') : null,
    assignedTo: status !== 'open' ? ['Rajesh Maintenance','Vijay Electrician','Mohan Plumber','Security Team','Cleaning Staff'][Math.floor(Math.random() * 5)] : null,
    images: Math.random() > 0.6 ? [`https://picsum.photos/seed/${i + 100}/400/300`, `https://picsum.photos/seed/${i + 200}/400/300`] : [],
    comments: Math.floor(Math.random() * 8),
    timeline: timelines.slice(0, timelineCount).map((t, ti) => ({
      ...t,
      timestamp: format(subDays(new Date(), Math.max(0, daysAgo - ti * 2)), 'yyyy-MM-dd HH:mm'),
      note: ti === timelineCount - 1 && status === 'resolved' ? 'Issue has been fixed. Please verify and close.' : null,
    })),
    rating: status === 'resolved' || status === 'closed' ? Math.floor(Math.random() * 2) + 4 : null,
    isUrgent: priority === 'critical',
    viewCount: Math.floor(Math.random() * 50) + 1,
  }
})

export default complaints
