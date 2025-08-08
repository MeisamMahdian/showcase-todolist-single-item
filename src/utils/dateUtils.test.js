/**
 * Test file to demonstrate the date formatting utilities
 * Run this with: node -e "require('./src/utils/dateUtils.test.js')"
 */

const { formatRelativeDate, formatTooltipDate, formatUserInfo } = require('./dateUtils');

console.log('=== Date Formatting Examples ===\n');

const now = new Date();
const justNow = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
const lastYear = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000); // 1 year ago

const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day ahead
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days ahead

console.log('Past dates:');
console.log(`30 seconds ago: "${formatRelativeDate(justNow)}"`);
console.log(`5 minutes ago: "${formatRelativeDate(fiveMinutesAgo)}"`);
console.log(`2 hours ago: "${formatRelativeDate(twoHoursAgo)}"`);
console.log(`Yesterday: "${formatRelativeDate(yesterday)}"`);
console.log(`Last week: "${formatRelativeDate(lastWeek)}"`);
console.log(`Last month: "${formatRelativeDate(lastMonth)}"`);
console.log(`Last year: "${formatRelativeDate(lastYear)}"`);

console.log('\nFuture dates:');
console.log(`Tomorrow: "${formatRelativeDate(tomorrow)}"`);
console.log(`Next week: "${formatRelativeDate(nextWeek)}"`);

console.log('\nTooltip formatting:');
console.log(`Today: "${formatTooltipDate(now)}"`);
console.log(`Yesterday: "${formatTooltipDate(yesterday)}"`);

console.log('\nUser info formatting:');
console.log(`With user: "Created${formatUserInfo('John Doe')}"`);
console.log(`No user: "Created${formatUserInfo()}"`);
console.log(`Empty user: "Created${formatUserInfo('')}"`);

console.log('\n=== Test Complete ===');
