import * as React from 'react';

import LoadingMask from './LoadingMask';
import NotificationItem, { Notification } from './NotificationItem';

export type NotificationListProps = {
  notifications: Notification[] | undefined;
};

function NotificationList(props: NotificationListProps) {
  const { notifications } = props;
  return (
    <LoadingMask active={!notifications}>
      <ul className="uk-list uk-list-striped uk-list-divider">
        {notifications?.map((notification: Notification) => {
          const { content, dateCreated } = notification;
          return (
            <NotificationItem
              key={dateCreated}
              content={content}
              dateCreated={dateCreated}
            />
          );
        })}
      </ul>
    </LoadingMask>
  );
}

export default NotificationList;
