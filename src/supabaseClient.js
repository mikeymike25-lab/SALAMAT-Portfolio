import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to get or generate a client-side UUID for the hybrid tracking method
function getOrCreateVisitorId() {
  let visitorId = localStorage.getItem('portfolio_visitor_uuid');
  if (!visitorId) {
    // Standard RFC4122 UUID v4 generator in pure JS
    visitorId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    localStorage.setItem('portfolio_visitor_uuid', visitorId);
  }
  return visitorId;
}

// Parses browser and hardware properties using modern User-Agent Client Hints + User-Agent regex fallback
async function getDeviceDetails() {
  if (typeof window === 'undefined' || !navigator) {
    return { 
      deviceType: 'Desktop', 
      deviceModel: 'Unknown Device', 
      osName: 'Unknown OS', 
      browserName: 'Unknown Browser',
      userAgent: 'Unknown'
    };
  }

  const ua = navigator.userAgent;
  let deviceType = 'Desktop';
  let deviceModel = 'Unknown Device';
  let osName = 'Unknown OS';
  let browserName = 'Unknown Browser';

  // 1. Determine Device Type (Mobile / Tablet / Desktop)
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) {
    deviceType = 'Mobile';
  }

  // 2. Determine OS Name
  if (/Windows/i.test(ua)) {
    osName = 'Windows';
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    osName = 'macOS';
  } else if (/Android/i.test(ua)) {
    osName = 'Android';
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    osName = 'iOS';
  } else if (/Linux/i.test(ua)) {
    osName = 'Linux';
  }

  // 3. Determine Browser Name
  if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr/i.test(ua)) {
    browserName = 'Chrome';
  } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua) && !/android/i.test(ua)) {
    browserName = 'Safari';
  } else if (/firefox|fxios/i.test(ua)) {
    browserName = 'Firefox';
  } else if (/edge|edg/i.test(ua)) {
    browserName = 'Edge';
  } else if (/opr/i.test(ua)) {
    browserName = 'Opera';
  }

  // Brave browser detection (Brave hides its name in the User-Agent to prevent fingerprinting)
  if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
    try {
      const isBrave = await navigator.brave.isBrave();
      if (isBrave) {
        browserName = 'Brave';
      }
    } catch (e) {
      console.warn('Error checking Brave browser:', e);
    }
  }

  // 4. Determine specific Device Model (Using modern Client Hints first for exact model, fallback to User Agent)
  let modelFound = false;

  if (navigator.userAgentData) {
    try {
      const uaData = await Promise.race([
        navigator.userAgentData.getHighEntropyValues(['model']),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 200))
      ]);
      if (uaData && uaData.model && uaData.model.trim() !== '') {
        deviceModel = uaData.model.trim();
        modelFound = true;
      }
    } catch (err) {
      // Client Hints model fetch timed out or failed, using fallback regex
    }
  }

  if (!modelFound) {
    if (deviceType === 'Mobile' || deviceType === 'Tablet') {
      if (/iPhone/i.test(ua)) {
        deviceModel = 'iPhone';
      } else if (/iPad/i.test(ua)) {
        deviceModel = 'iPad';
      } else {
        // Parse Android hardware model from user agent string (e.g. "SM-G981B" or "RMX3363")
        const androidMatch = ua.match(/Android\s+[^;]+;\s+([^;)]+)/i);
        if (androidMatch && androidMatch[1]) {
          let parsedModel = androidMatch[1].trim();
          // Remove Build tags if included in model segment
          if (parsedModel.includes('Build/')) {
            parsedModel = parsedModel.split('Build/')[0].trim();
          }
          deviceModel = parsedModel;
        } else {
          deviceModel = 'Android Device';
        }
      }
    } else {
      if (/Macintosh/i.test(ua)) {
        deviceModel = 'Mac';
      } else if (/Windows/i.test(ua)) {
        deviceModel = 'PC';
      } else {
        deviceModel = 'Linux PC';
      }
    }
  }

  return { deviceType, deviceModel, osName, browserName, userAgent: ua };
}

/**
 * Tracks the current visit using the Hybrid method, sending parsed device and user agent properties.
 */
export async function trackVisit() {
  const visitorId = getOrCreateVisitorId();

  if (!supabase) {
    // Local development fallback
    let localCount = parseInt(localStorage.getItem('mock_visitor_count') || '143', 10);
    const hasVisited = localStorage.getItem('mock_has_visited');
    if (!hasVisited) {
      localCount += 1;
      localStorage.setItem('mock_visitor_count', localCount.toString());
      localStorage.setItem('mock_has_visited', 'true');
    }
    return localCount;
  }

  // Parse browser device properties asynchronously
  const device = await getDeviceDetails();

  try {
    const { data, error } = await supabase.rpc('track_visit', { 
      client_uuid: visitorId,
      dev_type: device.deviceType,
      dev_model: device.deviceModel,
      os_name: device.osName,
      browser_name: device.browserName,
      u_agent: device.userAgent
    });
    if (error) {
      console.error('Supabase tracking failed:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Error in trackVisit client connection:', err);
    return null;
  }
}
