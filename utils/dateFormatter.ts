import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Check for invalid date
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Today
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`;
  }
  
  // Yesterday
  if (isYesterday(date)) {
    return `Yesterday, ${format(date, 'h:mm a')}`;
  }
  
  // Within the last week
  const daysDifference = 
    Math.floor((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24));
    
  if (daysDifference < 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  
  // More than a week ago
  return format(date, 'MMM d, yyyy');
}