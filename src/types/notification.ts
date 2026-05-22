export interface NotificationSender {
  _id?: string;
  id?: string;
  name: string;
  avatar?: string;
}

export interface NotificationEvent {
  _id?: string;
  id?: string;
  title: string;
}

export interface Notification {
  _id: string;
  recipient: string;
  sender?: NotificationSender;
  event?: NotificationEvent;
  type:
    | "event_joined"
    | "event_favorited"
    | "event_updated"
    | "event_completed"
    | "event_cancelled";
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  count: number;
  notifications: Notification[];
}