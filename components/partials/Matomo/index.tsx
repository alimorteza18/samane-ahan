const MatomoScript = () => (
  <script
    async
    dangerouslySetInnerHTML={{
      __html: `var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */

        (function() {
          var u="//matomo.samaneahan.com/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();`,
    }}
  />
);

const trackMatomoPage = () => {
  var _paq = (window._paq = window._paq || []);

  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
};

const setMatomoUser = (userId: any, userData: object | null = null) => {
  var _paq = (window._paq = window._paq || []);

  _paq.push(["setUserId", userId]); // Set the user_id

  // Send additional user data as custom dimensions
  if (userData) {
    Object.entries(userData).forEach(([key, value], index) => {
      _paq.push([
        "setCustomVariable",
        index + 1, //Index, the number from 1 to 5 where this custom variable name is stored
        key, // e.g: gender
        value, // e.g: male
        "visit", // page, visit
      ]);
    });
  }

  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
};

export { MatomoScript, trackMatomoPage, setMatomoUser };
