/**
 * @file src/app/~offline/page.tsx
 * @description Offline page, when user's internet connection is gone.
 *
 * @author TheDevMystic
 */

import { Metadata } from "next";

/**
 * @description Page metadata.
 */
export const metadata: Metadata = {
  title: "You're Offline, Buddy!",
};

/**
 * @description Page content.
 */
export default function OfflinePage() {
  return (
    <div class="single-measure">
      <h1>Seems like you're offline, buddy!</h1>
      <p>
        The page you requested is not in the cache. Consider checking your
	internet connection for the requested page to be fetched.
      </p>
      <div class="offline-page__mascot-design"></div>
    </div>
  );
}
