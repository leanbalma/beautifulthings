import { changeHash, SCREENS_HASHES } from 'AppRouter';
import { getCurrentDateString } from 'utils/date';

import es from 'locale/es';

const DAILY = 1;
const WEEKLY = 2;

const SUNDAY_WEEKDAY = 7;

const language = navigator.language.split(/[-_]/)[0];

const NOTIFICATION_ID = "What’s your beautiful thing today?";
const NOTIFICATIONS_TITLE = {
  en: NOTIFICATION_ID,
  es: es[NOTIFICATION_ID],
}

function _showAddScreen() {
  const currentDate = getCurrentDateString();

  changeHash(SCREENS_HASHES.edit(currentDate));
}

function setNotifications(schedule = DAILY) {
  if (!window.cordova) return;

  const text = NOTIFICATIONS_TITLE[language] || NOTIFICATION_ID;
  const notification = {
    id: schedule,
    title: 'Beautiful Things',
    text,
    icon: 'res://icon',
    vibrate: true,
    foreground: true,
    trigger: {
      every: {
        hour: 22,
        minute: 0,
      },
    }
  }

  if (schedule === WEEKLY) notification.trigger.every.weekday = SUNDAY_WEEKDAY;

  return new Promise(resolve => {
    const callback = () => {
      window.cordova.plugins.notification.local.on('click', _showAddScreen);
      resolve();
    }

    clearNotifications()
      .then(() => window.cordova.plugins.notification.local.schedule(notification, callback));
  });
}

function clearNotifications() {
  if (!window.cordova) return;

  return new Promise(resolve => window.cordova.plugins.notification.local.cancelAll(resolve));
}

function getSchedule() {
  let scheduledNotificationId = DAILY;

  if (!window.cordova) return scheduledNotificationId;

  return new Promise(resolve => {
    window.cordova.plugins.notification.local.getIds(notificationsArray => {
      if (notificationsArray.length) scheduledNotificationId = +notificationsArray[0];

      resolve(scheduledNotificationId);
    });
  });
}

export { setNotifications, clearNotifications, getSchedule, DAILY, WEEKLY }
