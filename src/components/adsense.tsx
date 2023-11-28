export const Adsense = () => (
  <div className="h-40 w-full my-4">
    <ins
      className="adsbygoogle block text-center"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-1801171681307308"
      data-ad-slot="4950823280"
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
      }}
    />
  </div>
);
