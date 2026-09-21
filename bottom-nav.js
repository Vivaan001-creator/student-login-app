/* =========================================================
   bottom-nav.js — floating 5-icon bottom tab bar for the
   Android app shell (Student Desk redesign).

   Usage (see student-dashboard.html):

     <main id="studentProfileBox">
       <section class="tab-panel" data-tab-section="home">...</section>
       <section class="tab-panel" data-tab-section="attendance" hidden>...</section>
       ...
     </main>
     <div id="bottomNav"></div>

     <script src="bottom-nav.js"></script>
     <script>
       BottomNav.init({
         mountId: 'bottomNav',
         default: 'home',
         tabs: [
           { id: 'home',       icon: 'fa-house',              label: 'Home' },
           { id: 'attendance', icon: 'fa-calendar-check',     label: 'Attendance' },
           { id: 'results',    icon: 'fa-file-lines',         label: 'Results' },
           { id: 'fees',       icon: 'fa-indian-rupee-sign',  label: 'Fees' },
           { id: 'notices',    icon: 'fa-bell',               label: 'Notices' }
         ]
       });
     </script>

   Tapping a tab shows the matching [data-tab-section="<id>"]
   element and hides every other one — no page reload, feels
   like a real native app. Works with exactly 5 tabs (any count
   really, but 5 is what the design is built for).
========================================================= */
(function () {
  function init(opts) {
    opts = opts || {};
    const mount = document.getElementById(opts.mountId);
    if (!mount) return;
    const tabs = opts.tabs || [];
    let active = opts.default || (tabs[0] && tabs[0].id);

    function render() {
      mount.innerHTML = tabs.map(function (t) {
        const isActive = t.id === active;
        return (
          '<button type="button" class="bn-item' + (isActive ? ' bn-active' : '') + '" data-bn-tab="' + t.id + '">' +
            '<span class="bn-icon-wrap"><i class="fa-solid ' + t.icon + '"></i></span>' +
            '<span class="bn-label">' + t.label + '</span>' +
          '</button>'
        );
      }).join('');

      mount.querySelectorAll('[data-bn-tab]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          go(btn.getAttribute('data-bn-tab'));
        });
      });
    }

    function go(id) {
      active = id;
      document.querySelectorAll('[data-tab-section]').forEach(function (panel) {
        const show = panel.getAttribute('data-tab-section') === id;
        panel.hidden = !show;
      });
      mount.querySelectorAll('[data-bn-tab]').forEach(function (btn) {
        btn.classList.toggle('bn-active', btn.getAttribute('data-bn-tab') === id);
      });
      const content = document.querySelector('.app-content');
      if (content) content.scrollTo({ top: 0, behavior: 'auto' });
      window.dispatchEvent(new CustomEvent('bottomnav:change', { detail: { id: id } }));
    }

    render();
    go(active);

    window.BottomNav._go = go; // exposed so a page can switch tabs programmatically
  }

  window.BottomNav = { init: init, go: function (id) { if (window.BottomNav._go) window.BottomNav._go(id); } };
})();
