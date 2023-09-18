const CONTAINER_ID = "GTM-P3JMGJ7";

const GoogleTagManagerScript = () => (
  <script
    async
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${CONTAINER_ID}');`,
    }}
  />
);

const GoogleTagManagerIFrame = () => (
  <noscript>
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${CONTAINER_ID}`}
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    />
  </noscript>
);

interface DataLayerEvent {
  event?: string;
  [key: string]: any;
}

declare const window: DataLayerEvent;

const pushToDataLayer = (eventData: DataLayerEvent): void => {
  if (typeof window !== "undefined" && window?.dataLayer) {
    window.dataLayer.push(eventData);
  }
};

export {
  GoogleTagManagerScript,
  GoogleTagManagerIFrame,
  pushToDataLayer,
  CONTAINER_ID,
};
