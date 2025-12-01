import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const analyticsLogs = pgTable('analytics_logs', {
  id: serial('id').primaryKey(),
  path: text('path').notNull(),
  referrer: text('referrer'),
  browser: text('browser'),
  os: text('os'),
  deviceType: text('device_type'),
  ipHash: text('ip_hash'),
  screenHeight: integer('screen_height'),
  screenWidth: integer('screen_width'),
  timestamp: timestamp('timestamp').defaultNow()
});