import './accounts';
// import '../both/api';
import './api';
// import './fixtures';
import './email';

import { WebApp } from 'meteor/webapp';
WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));