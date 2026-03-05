import { getSettings } from './lib/payload.ts';

async function run() {
    const settingsId = await getSettings('id');
    console.log('ID Settings:', JSON.stringify(settingsId.navigation, null, 2));

    const settingsZh = await getSettings('zh');
    console.log('ZH Settings:', JSON.stringify(settingsZh.navigation, null, 2));
    
    process.exit(0);
}

run();
