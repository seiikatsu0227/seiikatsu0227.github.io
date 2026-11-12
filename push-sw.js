self.addEventListener('push', function(e) {
  var d = {};
  try { d = e.data.json(); } catch (x) { d = { raw: e.data ? e.data.text() : null }; }
  self.registration.showNotification('PUSH-ARRIVED', { body: JSON.stringify(d).slice(0, 200) });
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then(function(cl) {
    cl.forEach(function(c) { c.postMessage({ kind: 'PUSH', data: d, at: Date.now() }); });
  }));
});
