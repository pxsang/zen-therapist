export const STATUS = {
  OFFLINE: 0,
  ONLINE: 1,
  WAITING_FOR_ACCEPT: 2,
  ACCEPTED: 3,
  ARRIVED: 4,
  STARTED: 5,
  FINISHED: 6,
  COMPLETED: 7,
};

export const LANGUAGE = {
  ENGLISH: 'en',
  VIETNAMESE: 'vi',
};

export const LANGUAGE_TITLE = {
  en: 'English',
  vi: 'Tiếng Việt',
};

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

export const LANGUAGE_LIST = [
  {title: 'Tiếng Việt', value: LANGUAGE.VIETNAMESE},
  // {title: 'English', value: LANGUAGE.ENGLISH},
];

export const USER_SESSION_STATUS = {
  ONLINE: 1,
  OFFLINE: 2,
  BUSY: 2,
};

export const SESSION_STATUS = {
  WAITING_FOR_THERAPIST: 1,
  ACCEPTED: 2,
  ARRIVED: 3,
  STARTED: 4,
  COMPLETED: 5,
  FAILED: 6,
  CANCELED: 7,
  FINISHED: 8,
  REJECTED: 9,
};

export const USER_STATUS = {
  NEW: 1,
  VERIFIED: 2,
  REJECTED: 3,
};
