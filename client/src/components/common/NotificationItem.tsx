import * as React from 'react';

export type Notification = {
  content: string;
  dateCreated: number;
};

export type NotificationItemProps = Notification;

const dateFormatter: Intl.DateTimeFormat = Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeStyle: 'long',
});

function NotificationItem(props: NotificationItemProps) {
  const { content, dateCreated } = props;
  return (
    <div role="listitem">
      <div className="uk-card uk-card-body">
        <h3 className="uk-card-title">{dateFormatter.format(dateCreated)}</h3>
        {content}
      </div>
    </div>
  );
}

export default NotificationItem;
