"use client";

export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 32;

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 64;
export const MIN_PASSWORD_CHAR_TYPES = 2;

const USERNAME_REGEX = new RegExp(`^[a-zA-Z0-9_]{${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}}$`);

export const isUsernameValid = (username: string) => {
  return USERNAME_REGEX.test(username);
};

export const countCharacterTypes = (password: string) => {
  let typesCount = 0;

  if (/[a-z]/.test(password)) typesCount += 1;
  if (/[A-Z]/.test(password)) typesCount += 1;
  if (/\d/.test(password)) typesCount += 1;
  if (/[^a-zA-Z\d]/.test(password)) typesCount += 1;

  return typesCount;
};
