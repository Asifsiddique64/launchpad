import { Notice } from '../types/notice';

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Mid-term Examination Schedule',
    subtitle: 'Computer Science Department',
    description: 'The mid-term examinations for all computer science courses will begin from next week. Please check the detailed schedule in the attachment.',
    category: 'Academics',
    date: '2024-03-15T10:00:00',
    hasAttachment: true,
    isUnread: true
  },
  {
    id: '2',
    title: 'Annual Sports Day',
    description: 'Join us for the annual sports day celebration. Various events including track and field, team sports, and fun activities will be organized.',
    category: 'Sports',
    date: '2024-03-20T09:00:00',
    hasAttachment: false,
    isUnread: false
  },
  {
    id: '3',
    title: 'Tech Symposium 2024',
    subtitle: 'Department of Engineering',
    description: 'The annual tech symposium will feature workshops, paper presentations, and networking opportunities with industry experts.',
    category: 'Events',
    date: '2024-03-25T14:00:00',
    hasAttachment: true,
    isUnread: true
  },
  {
    id: '4',
    title: 'Campus Maintenance',
    description: 'Scheduled maintenance work will be carried out in Block A and B this weekend. Please plan accordingly.',
    category: 'General',
    date: '2024-03-18T08:00:00',
    hasAttachment: false,
    isUnread: false
  }
]; 