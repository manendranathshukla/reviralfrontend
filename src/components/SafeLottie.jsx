import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

/**
 * SafeLottie — fetches a Lottie JSON from a URL and renders it.
 * Falls back gracefully if the URL returns 403/404 or network fails.
 * Accepts a `fallbackSrc` secondary URL to try before showing placeholder.
 */
export default function SafeLottie({
  src,
  fallbackSrc,
  style,
  className = '',
  loop = true,
  autoplay = true,
  placeholder,
}) {
  const [animData, setAnimData] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    if (!src) { setStatus('error'); return; }
    setStatus('loading');
    setAnimData(null);

    const tryFetch = (url) =>
      fetch(url, { cache: 'force-cache' })
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        });

    tryFetch(src)
      .then((data) => { setAnimData(data); setStatus('ready'); })
      .catch(() => {
        if (fallbackSrc) {
          tryFetch(fallbackSrc)
            .then((data) => { setAnimData(data); setStatus('ready'); })
            .catch(() => setStatus('error'));
        } else {
          setStatus('error');
        }
      });
  }, [src, fallbackSrc]);

  if (status === 'loading') {
    return (
      <div
        style={style}
        className={`${className} rounded-2xl animate-pulse bg-white/10`}
      />
    );
  }

  if (status === 'error' || !animData) {
    return placeholder || (
      <div
        style={style}
        className={`${className} rounded-2xl bg-white/5 flex items-center justify-center`}
      >
        <span className="text-5xl opacity-30">✨</span>
      </div>
    );
  }

  return (
    <Lottie
      animationData={animData}
      loop={loop}
      autoplay={autoplay}
      style={style}
      className={className}
    />
  );
}
