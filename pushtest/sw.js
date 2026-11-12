self.addEventListener('push', e => {
  let t = '(no data)';
  try { t = e.data ? e.data.text() : t; } catch (err) { t = 'parse-error'; }
  e.waitUntil(self.registration.showNotification('zqx7 pushtest', { body: t }));
  if (self.clients && self.clients.matchAll) {
    e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => cs.forEach(c => c.postMessage({ got: t, ts: Date.now() }))));
  }
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window' }).then(cs => cs.length ? cs[0].focus() : clients.openWindow('/pushtest/')));
});
