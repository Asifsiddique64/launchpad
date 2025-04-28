export interface Notice {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  date: string;
  hasAttachment: boolean;
  isUnread: boolean;
}

export type NoticeCategory = 'Academics' | 'Events' | 'General' | 'Sports'; 