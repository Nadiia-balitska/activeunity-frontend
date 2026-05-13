export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  organizer?: {
    _id: string;
    name: string;
    email: string;
  };
  participants?: string[];
}