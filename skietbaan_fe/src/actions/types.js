import profilered from '../components/navbar-icons/profile-red.png';
import profilegray from '../components/navbar-icons/profile-grey.png';
import docsred from '../components/navbar-icons/docs-red.png';
import docsgray from '../components/navbar-icons/docs-grey.png';
import createred from '../components/navbar-icons/create-red.png';
import creategray from '../components/navbar-icons/create-grey.png';
import leaderboardred from '../components/navbar-icons/leaderboard-red.png';
import leaderboardgray from '../components/navbar-icons/leaderboard-grey.png';
import notificationsred from '../components/navbar-icons/notifications-red.png';
import notificationsgray from '../components/navbar-icons/notifications-grey.png';
import scorecapturered from '../components/navbar-icons/add-score-red.png';
import scorecapturegray from '../components/navbar-icons/add-score-grey.png';
import moregray from '../components/navbar-icons/more-grey.png';

export const NAV_BAR_ICONS = {
    PROFILE_RED: profilered,
    PROFILE_GRAY: profilegray,
    DOCS_RED: docsred,
    DOCS_GRAY: docsgray,
    CREATE_RED: createred,
    CREATE_GRAY: creategray,
    LEADERBOARD_RED: leaderboardred,
    LEADERBOARD_GRAY: leaderboardgray,
    NOTIFICATIONS_RED: notificationsred,
    NOTIFICATIONS_GRAY: notificationsgray,
    SCORE_CAPTURE_RED: scorecapturered,
    SCORE_CAPTURE_GRAY: scorecapturegray,
    MORE_GRAY: moregray
}

export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
export const FETCH_POSTS = 'FETCH_POSTS';
export const NEW_POST = 'NEW_POST';
export const NEW_COMP = 'NEW_COMP';
export const FETCH_COMP = 'FETCH_COMP';
export const UPDATE_COMP_STATUS = 'UPDATE_COMP_STATUS';
export const BASE_URL = "https://api.skietbaan.retrotest.co.za";
//leaderboard types
export const FETCH_LEADERBOARDFILTER_DATA = 'FETCH_LEADERBOARDFILTER_DATA';
export const FETCH_LEADERBOARDTABLE_DATA = 'FETCH_LEADERBOARDTABLE_DATA';


//groups types and constants
export const URL = "https://api.skietbaan.retrotest.co.za"; 
export const URLADD = "https://api.skietbaan.retrotest.co.za/api/groups/add"; 
export const URLUSER = "https://api.skietbaan.retrotest.co.za/api/user"; 
export const URLGROUP = "https://api.skietbaan.retrotest.co.za/api/groups"; 
export const UPDATENAME = 'UPDATENAME';
export const UPDATE_GROUPNAME = 'UPDATE_GROUPNAME';
export const CREATEGROUP = 'CREATEGROUP';
export const GETGROUP = 'GETGROUP';
export const PASS_ID = 'PASS_ID';
export const GETNAME = 'GETNAME';
export const LOCALURL = "http://localhost:50859"

FETCH_LEADERBOARDFILTER_DATA
