// /assets/consent-ga.js
(function () {
  var KEY = 'emk_cookie_consent';
  var GA_ID = 'G-W07T4YVG4E'; // ditt riktiga GA4-ID

  function q(sel) { return document.querySelector(sel); }
  function hideBanner() { var b = q('#cookieBanner'); if (b) b.style.display = 'none'; }
  function showBanner() { var b = q('#cookieBanner'); if (b) b.style.display = 'block'; }

  function loadGA() {
    if (!GA_ID || GA_ID === 'G-XXXXXXX' || window.__gaLoaded) return;
    window.__gaLoaded = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function wireButtons() {
    var a = q('#cookieAccept');
    var r = q('#cookieReject');
    if (a) a.addEventListener('click', function(){
      localStorage.setItem(KEY, 'accepted');
      hideBanner();
      loadGA();
    });
    if (r) r.addEventListener('click', function(){
      localStorage.setItem(KEY, 'rejected');
      hideBanner();
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    wireButtons();
    var v = localStorage.getItem(KEY);
    if (v === 'accepted') { hideBanner(); loadGA(); }
    else if (v === 'rejected') { hideBanner(); }
    else { showBanner(); }
  });
})();
