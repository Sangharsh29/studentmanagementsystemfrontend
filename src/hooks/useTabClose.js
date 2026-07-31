import { useEffect } from 'react'

export function useTabClose() {
  useEffect(() => {
    function handleUnload(e) {
      // Check if this is a refresh or actual tab close
      // On refresh: the page is reloading so performance.navigation type is 1
      // On tab close: type is not reload

      const isRefresh =
        performance.navigation?.type === 1 ||
        performance.getEntriesByType('navigation')[0]?.type === 'reload'

      if (!isRefresh) {
        // Tab is closing — send logout to backend
        // sendBeacon works reliably on tab close unlike fetch
        navigator.sendBeacon(
          'https://studentmanagementsystem-kbv3.onrender.com/api/auth/logout'
        )
      }
    }

    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])
}