// Utility functions for handling URL parameters
export const getUrlParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search);
};

export const buildUrlWithParams = (baseUrl: string, additionalParams?: Record<string, string>): string => {
  const currentParams = getUrlParams();
  const url = new URL(baseUrl);
  
  // Add current URL parameters to the new URL
  currentParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  
  // Add any additional parameters
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  
  return url.toString();
};

export const getUtmParams = (): Record<string, string> => {
  const params = getUrlParams();
  const utmParams: Record<string, string> = {};
  
  // Common UTM and tracking parameters
  const trackingParams = [
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_term',
    'utm_content',
    'click_id',
    'fbclid',
    'gclid',
    'msclkid',
    'ttclid'
  ];
  
  trackingParams.forEach(param => {
    const value = params.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });
  
  return utmParams;
};
