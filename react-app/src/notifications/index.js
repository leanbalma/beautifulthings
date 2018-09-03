import { changeHash, SCREENS_HASHES } from 'AppRouter';
import { getCurrentDateString } from 'utils/date';

const DAILY = 1;
const WEEKLY = 2;

const SUNDAY_WEEKDAY = 7;

function _showAddScreen() {
  const currentDate = getCurrentDateString();

  changeHash(SCREENS_HASHES.edit(currentDate));
}

function setNotifications(schedule = DAILY) {
  if (!window.cordova) return;

  const notification = {
    id: schedule,
    title: 'Beautiful Things',
    text: 'What\'s your beautiful thing today?',
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
