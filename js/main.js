/* Pipeline Partner — counters, scroll reveals, sticky nav */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- sticky nav border ---- */
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Cal.com inline booking embed (lazy-mounted) ---- */
  var calEl = document.getElementById("cal-inline-discovery");
  if (calEl) {
    var calLink = calEl.getAttribute("data-cal-link");
    var initCal = function () {
      /* official Cal.com embed loader (packages/embeds/embed-snippet) */
      (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      window.Cal("init", "discovery", { origin: "https://app.cal.com" });
      window.Cal.ns.discovery("inline", {
        elementOrSelector: "#cal-inline-discovery",
        config: { layout: "month_view" },
        calLink: calLink
      });
      window.Cal.ns.discovery("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#0e7a55" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
      var fallback = document.querySelector(".booking-fallback a");
      if (fallback) fallback.href = "https://cal.com/" + calLink;
    };
    if ("IntersectionObserver" in window) {
      var calObserver = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          calObserver.disconnect();
          initCal();
        }
      }, { rootMargin: "1200px 0px" });
      calObserver.observe(calEl);
    } else {
      initCal();
    }
  }

  /* ---- count-up counters ---- */
  function formatValue(value, decimals) {
    return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (reducedMotion) {
      el.textContent = formatValue(target, decimals);
      return;
    }
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3); /* ease-out cubic */
      el.textContent = formatValue(target * eased, decimals);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---- intersection observers ---- */
  var counters = document.querySelectorAll("[data-count]");
  var reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reducedMotion) {
    counters.forEach(function (el) {
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      el.textContent = formatValue(parseFloat(el.getAttribute("data-count")), decimals);
    });
    reveals.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(function (el) { counterObserver.observe(el); });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

  /* stagger siblings that reveal together */
  reveals.forEach(function (el, i) {
    var siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
    var idx = Array.prototype.indexOf.call(siblings, el);
    if (idx > 0) el.style.transitionDelay = Math.min(idx * 70, 350) + "ms";
    revealObserver.observe(el);
  });
})();
