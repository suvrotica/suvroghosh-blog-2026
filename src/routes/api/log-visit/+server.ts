import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { analyticsLogs } from '$lib/server/db/schema';
import { UAParser } from 'ua-parser-js';
import crypto from 'crypto';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
    try {
        const body = await request.json();
        const userAgent = request.headers.get('user-agent') || '';
        
        // 1. Parse User Agent to get readable device info
        const parser = new UAParser(userAgent);
        const ua = parser.getResult();
        
        const browser = `${ua.browser.name || 'unknown'} ${ua.browser.version || ''}`;
        const os = `${ua.os.name || 'unknown'} ${ua.os.version || ''}`;
        const device = ua.device.type || 'desktop';

        // 2. Privacy-Friendly IP Hashing
        // We combine the IP + Today's Date so the hash changes every day.
        // This allows you to track unique users for 1 day, but not forever.
        const ip = getClientAddress();
        const dateSalt = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const ipHash = crypto
            .createHash('sha256')
            .update(ip + dateSalt)
            .digest('hex')
            .substring(0, 10);

        // 3. Insert into Drizzle
        await db.insert(analyticsLogs).values({
            path: body.path,
            referrer: body.referrer || null,
            screenWidth: body.screenWidth || 0,
            screenHeight: body.screenHeight || 0,
            browser,
            os,
            deviceType: device,
            ipHash,
        });

        return json({ success: true });
    } catch (error) {
        console.error('Analytics logging failed:', error);
        // Return success anyway so the client doesn't see an error in the console
        return json({ success: false }, { status: 500 });
    }
};