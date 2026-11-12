console.log('[sw] loaded');
self.addEventListener('install', e => console.log('[sw] install'));
self.addEventListener('activate', e => console.log('[sw] activate'));
self.addEventListener('push', function(e) {
  console.log('[sw] PUSH EVENT data=' + (e.data ? e.data.text() : 'null'));
  var d = {};
  try { d = e.data.json(); } catch (x) { d = { raw: e.data ? e.data.text() : null }; }
  e.waitUntil((async () => {
    try { await self.registration.showNotification('PUSH-ARRIVED', { body: JSON.stringify(d).slice(0, 200) }); console.log('[sw] shown'); }
    catch (err) { console.log('[sw] showNotification FAILED: ' + err); }
    const cl = await self.clients.matchAll({ type: 'window' });
    console.log('[sw] clients=' + cl.length);
    cl.forEach(function(c) { c.postMessage({ kind: 'PUSH', data: d, at: Date.now() }); });
  })());
});
self.addEventListener('pushsubscriptionchange', e => console.log('[sw] pushsubscriptionchange'));
