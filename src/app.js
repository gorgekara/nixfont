import os from 'os';
import { remote } from 'electron';

import env from './env';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('platform-info').innerHTML = os.platform();
  document.getElementById('env-name').innerHTML = env.name;
});
