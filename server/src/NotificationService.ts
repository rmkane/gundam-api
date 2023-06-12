export type Notification = {
  content: string;
  dateCreated: number;
};

class NotificationService {
  notifications: Notification[];

  constructor() {
    this.notifications = [];
  }

  addNotification(content: string): Notification {
    const notification: Notification = {
      content,
      dateCreated: Date.now(),
    };
    this.notifications.push(notification);
    return notification;
  }

  retrieveAllNotifications(): Notification[] {
    return this.notifications;
  }
}

export default NotificationService;
