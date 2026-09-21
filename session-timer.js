/* =========================================================
   session-timer.js — persistent login guard (Android app build)

   ANDROID APP CHANGE: the old version force-logged everyone out
   after 20 minutes (countdown banner + expiry overlay). For the
   app, login should persist until the user taps Logout — so all
   of that has been removed. This file now does ONE thing: if
   nobody is logged in, it bounces the page to loginUrl. That's
   it. No timer, no countdown, no auto-logout.

   Login itself now lives in localStorage (not sessionStorage),
   which is what makes it survive closing and reopening the app.

   Usage is unchanged from before, so no other file needed to
   change just because of this:

     SessionTimer.start({ flagKey: 'adminLoggedIn', loginUrl: 'admin.html' });

   For pages reachable by more than one role (result.html,
   pay-fee.html) pass an array instead:

     SessionTimer.start({ flagKeys: ['parentLoggedIn','studentLoggedIn'], loginUrl: 'student-login.html' });
========================================================= */
(function () {
  function start(opts) {
    opts = opts || {};
    const flagKeys = Array.isArray(opts.flagKeys) ? opts.flagKeys : [opts.flagKey];
    const loginUrl = opts.loginUrl;

    function isLoggedIn() {
      return flagKeys.some(function (k) { return localStorage.getItem(k) === "true"; });
    }
    function guardOrBounce() {
      if (!isLoggedIn()) {
        window.location.replace(loginUrl);
        return false;
      }
      return true;
    }

    guardOrBounce();

    // Re-check when the page is restored from bfcache (e.g. the
    // Android back button) — this still matters, since a manual
    // Logout in one tab/webview should still be respected here.
    window.addEventListener("pageshow", function () {
      guardOrBounce();
    });
  }

  window.SessionTimer = { start };
})();
