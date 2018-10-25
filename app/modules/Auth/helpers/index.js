import { SKIP_AUTH_PATHS } from '../constants/index.js';

export function shouldRedirectToLogin() {
    const { pathname } = window.location;
    return SKIP_AUTH_PATHS.indexOf(pathname) === -1;
}
