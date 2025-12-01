import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const analyticsLogs = pgTable('analytics_logs', {
  id: serial('id').primaryKey(),
  path: text('path').notNull(),        // URL visited
  referrer: text('referrer'),          // Where they came from
  browser: text('browser'),            // Chrome, Firefox, etc.
  os: text('os'),                      // Windows, MacOS, etc.
  deviceType: text('device_type'),     // mobile, desktop
  ipHash: text('ip_hash'),             // Anonymized IP address
  screenHeight: integer('screen_height'),
  screenWidth: integer('screen_width'),
  timestamp: timestamp('timestamp').defaultNow()
});