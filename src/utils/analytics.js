// utils/analytics.js
const GA_MEASUREMENT_ID = 'G-4TL430Y8DX'; // Your Measurement ID

export const trackEvent = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
