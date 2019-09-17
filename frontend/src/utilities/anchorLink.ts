const SCROLL_DISTANCE = 52;

/**
 * Given a URL containing a route path (first hash) and possibly an anchor (second hash),
 * returns only the anchor part, if it exists. (Does not include the query string, if any.)
 * If `url` has no hash, or only has a single hash (for the route path), returns an empty string.
 * @param url - Full or partial URL. Just the hash section is valid, as long as it's prepended with #.
 */
export function extractAnchorLink(url: string): string {
  // URLs containing anchors:
  // #/components/checkbox#Overview
  // http://whatever#/components/checkbox#Overview

  // URLs NOT containing anchors, by this function's definition:
  // #/components/checkbox
  // http://whatever#/components/checkbox
  // #Overview
  // http://whatever#Overview
  const split = url.split('#');
  if (split.length === 3) {
    // Also remove the query if present
    // (technically the query can't be after the hash, but this is likely with hash routing)
    return split[2].split('?')[0];
  }
  return '';
}

/**
 * Remove the anchor link from a full page URL or a hash.
 * Preserves any route path specified in the URL.
 * Behavior with more than two # in the URL is unspecified.
 * If there's a query string after the hash (not technically valid but possible with hash routing),
 * also removes that.
 */
export function removeAnchorLink(url: string): string {
  // First group: most of the URL
  // Second group: optional last hash with only word or dash characters following (an anchor)
  // Third group: optional post-hash query string
  const match = url.match(/^(.*?)((#[\w-]*)(\?.*)?)$/);
  if (match) {
    return match[1];
  }
  return url;
}

export function jumpToAnchor(anchor?: string, scrollDistance: number = SCROLL_DISTANCE): void {
  const hash = anchor || extractAnchorLink(window.location.hash);
  const el = hash && document.getElementById(hash);
  if (hash && el) {
    const elRect = el.getBoundingClientRect();
    const windowY = window.scrollY || window.pageYOffset;
    const currentScrollPosition = windowY + elRect.top;
    const top = currentScrollPosition - scrollDistance;
    if (window.scrollTo) {
      if (window.navigator.userAgent.indexOf('rv:11.0') > -1 || window.navigator.userAgent.indexOf('Edge') > -1) {
        // Edge currently has a bug that jumps to the top of the page if window.scrollTo is passed an object.
        window.scrollTo(0, top);
      } else {
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    }
  }
}
