const DAILY = 1;
const WEEKLY = 2;

const SUNDAY_WEEKDAY = 7;

function _showAddScreen() { /** TODO */ }

function setNotifications(schedule = DAILY) {
  if (!window.cordova) return;

  const notification = {
    id: schedule,
    title: 'BeautifulThingsApp',
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
  if (!window.cordova) return true;

  return new Promise(resolve => {
    const processNotificationsArray = notifications => {
      let scheduledNotificationId = null;
      if (notifications.length) scheduledNotificationId = notifications[0];

      resolve(scheduledNotificationId);
    }

    window.cordova.plugins.notification.local.getIds(processNotificationsArray);
  });
}

export { setNotifications, clearNotifications, getSchedule, DAILY, WEEKLY }
