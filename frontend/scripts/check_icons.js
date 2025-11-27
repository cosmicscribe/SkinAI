import * as Lucide from 'lucide-react';

const requiredIcons = [
    'Menu',
    'X',
    'Check',
    'Star',
    'MessageCircle',
    'ChevronRight',
    'ShieldCheck',
    'Award',
    'Brain',
    'Zap',
    'Globe',
    'Users',
    'Activity',
    'ArrowRight',
    'HandCoins',
    'Smartphone',
    'Clock',
    'ScanLine',
    'Send',
    'FileCheck'
];

console.log('Checking icons...');
requiredIcons.forEach(icon => {
    if (!Lucide[icon]) {
        console.log(`MISSING ICON: ${icon}`);
    } else {
        // console.log(`OK: ${icon}`);
    }
});
console.log('Done.');
