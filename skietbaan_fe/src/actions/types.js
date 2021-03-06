import profileRed from "../components/navbar-icons/new-nav-icons/new-profile-red.png";
import profileGray from "../components/navbar-icons/new-nav-icons/new-profile-grey.png";
import createRed from "../components/navbar-icons/new-nav-icons/new-create-red.png";
import createGray from "../components/navbar-icons/new-nav-icons/new-create-grey.png";
import leaderboardRed from "../components/navbar-icons/new-nav-icons/new-leaderboard-red.png";
import leaderboardGray from "../components/navbar-icons/new-nav-icons/new-leaderboard-grey.png";
import notificationsRed from "../components/navbar-icons/new-nav-icons/new-notification-red.png";
import notificationsGray from "../components/navbar-icons/new-nav-icons/new-notification-grey.png";
import notifyGrey from "../components/navbar-icons/notify-gray.png";
import notifyRed from "../components/navbar-icons/notify-red.png";
import scorecaptureRed from "../components/navbar-icons/new-nav-icons/new-add-score-red.png";
import scorecaptureGray from "../components/navbar-icons/new-nav-icons/new-add-score-grey.png";

export const NAV_BAR_ICONS = {
  PROFILE_RED: profileRed,
  PROFILE_GRAY: profileGray,
  CREATE_RED: createRed,
  CREATE_GRAY: createGray,
  LEADERBOARD_RED: leaderboardRed,
  LEADERBOARD_GRAY: leaderboardGray,
  NOTIFICATIONS_RED: notificationsRed,
  NOTIFICATIONS_GRAY: notificationsGray,
  NOTIFY_GREY: notifyGrey,
  NOTIFY_RED: notifyRed,
  SCORE_CAPTURE_RED: scorecaptureRed,
  SCORE_CAPTURE_GRAY: scorecaptureGray
};

export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const DELETE_BOOKMARK = "DELETE_BOOKMARK";
export const FETCH_POSTS = "FETCH_POSTS";
export const NEW_POST = "NEW_POST";
export const NEW_COMP = "NEW_COMP";
export const FETCH_COMP = "FETCH_COMP";
export const FETCH_REQ = "FETCH_REQUIREMENTS";
export const UPDATE_REQ = "UPDATE_REQUIREMENTS";
export const CHOOSEPAGE = "CHOOSEPAGE";
export const COMP_PAGE = "COMP_PAGE";
export const SCORES_PAGE = "SCORES_PAGE";
export const UPDATE_COMP_STATUS = "UPDATE_COMP_STATUS";
export const PARTICIPANTS_PER_COMP = "PARTICIPANTS_PER_COMP";
export const CHECK_ADMIN = "CHECK_ADMIN";
export const NEWCOMPSTATE = "NEWCOMPSTATE";
export const BASE_URL = "https://api.scoring.skietbaan.co.za";

//leaderboard types
export const FETCH_LEADERBOARDFILTER_DATA = "FETCH_LEADERBOARDFILTER_DATA";
export const EXPORT_BUTTON_TEXT = "EXPORT_BUTTON_TEXT";
export const FETCH_LEADERBOARDTABLE_DATA = "FETCH_LEADERBOARDTABLE_DATA";
export const UPDATE_SELECTED_COMPETITION = "UPDATE_SELECTED_COMPETITION";
export const UPDATE_SELECTED_GROUP = "UPDATE_SELECTED_GROUP";

//groups types and constants
export const UPDATENAME = "UPDATENAME";
export const UPDATE_GROUPNAME = "UPDATE_GROUPNAME";
export const CREATEGROUP = "CREATEGROUP";
export const GETGROUP = "GETGROUP";
export const PASS_ID = "PASS_ID";
export const PAGE = "PAGE";
export const GETNAME = "GETNAME";
export const EDITGROUPUSERS = "EDITGROUPUSERS";
export const FETCH_GROUPS = "FETCH_GROUPS";
export const ADDMEMBERS = "ADDMEMBERS";
export const GROUPDICT = "GROUPDICT";
export const EMPTY = "EMPTY";
export const NEWGROUPSTATE = "NEWGROUPSTATE";
export const GROUP_DATA_LOADING = "GROUP_DATA_LOADING";
export const BINSTATE = "BINSTATE";
export const SCREEN_SIZE = "SCREEN_SIZE";
export const ADMINSTAT = "ADMINSTAT";

//notification types
export const FETCH_NOTIFICATION = "FETCH_NOTIFICATION";
export const FETCH_NUMBER_OF_NOTIFICATIONS = "FETCH_NUMBER_OF_NOTIFICATIONS";
export const UPDATE_IS_READ = "UPDATE_IS_READ";
export const DATA_LOADING = "DATA_LOADING";

//profile types
export const PROFILE_SET_SELECTED_COMPETITION =
  "PROFILE_SET_SELECTED_COMPETITION";
export const LANDING_SET_SELECTED_PAGE = "LANDING_SET_SELECTED_PAGE";

//competition types
export const COMPETITION_DATA_LOADING = "COMPETITION_DATA_LOADING";

//document types
export const USER_LOGS = "USER_LOGS";
export const USER_LOS = "USER_LOS";
export const DOCCIE_SENT = "DOCCIE_SENT";

//member types
export const IS_CLICKED = "IS_CLICKED";
export const USER_IS_CLICKED = "USER_IS_CLICKED";
export const MEMBER_IS_CLICKED = "MEMBER_IS_CLICKED";
export const EXPIRED_IS_CLICKED = "EXPIRED_IS_CLICKED";
export const EXPORT_CSV = "EXPORT_CSV";
export const ADD_FILTER_NAME = "ADD_FILTER_NAME";

export const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
