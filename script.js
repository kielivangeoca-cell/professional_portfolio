(function () {
  var root = document.documentElement;
  var addr = document.getElementById('addr');
  var tabs = document.querySelectorAll('.tabs a');

  // Light / dark toggle
  document.getElementById('theme').onclick = function () {
    var isDark =
      root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme:dark)').matches);
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  // Update the fake address bar and active tab while scrolling
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (x) {
          if (x.isIntersecting) {
            addr.textContent = x.target.getAttribute('data-url') || 'kielgeoca.dev/';
            tabs.forEach(function (t) {
              t.classList.toggle('on', t.getAttribute('href') === '#' + x.target.id);
            });
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    document.querySelectorAll('#home,section').forEach(function (s) { io.observe(s); });
  }
})();
