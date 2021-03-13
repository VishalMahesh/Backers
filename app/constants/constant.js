import React from 'react'
import { Platform } from 'react-native'
export const characterLimit = {
  password: 6,
};
// export const API_ROOT = 'https://loyal-fans.herokuapp.com/v1/';
export const API_ROOT = 'http://35.154.214.75:3000/v1/';
export const ImageSizeLimit = 2000000
export const VideoSizeLimit = 20000000
export const compressRatio = 30
export const BlurRadius = Platform.OS == 'ios' ? 30 : 10
export const errorMsg = "Something went wrong 😔"
export const AppURLs = {
  emailsignup: 'emailSignup',
  fbsignup: 'facebookSignup',
  googlesignup: 'googleSignup',
  emaillogin: 'emailLogin',
  fblogin: "facebookLogin",
  googlelogin: "googleLogin",
  createslot: "slots/createUpdate",
  slotfetch: "slots/fetch",
  onceSlotFetch: "slots/fetchMyOriginalSlotsOnce",
  slotFetchRecur: "slots/fetchMyOriginalSlots?slotType=recurring",
  bookslot: "slotBookings/create",
  postcreate: "posts/create",
  fetchPosts: "posts/fetchFeeds",
  likePosts: "likes/likePost",
  unlikePosts: "likes/unlikePost",
  deletePost: "posts/remove/",
  fetchComments: "comments/fetch",
  createComments: "comments/create",
  fetchReels: "posts/fetchReelFeeds",
  fetchStory: "posts/fetchStoryFeeds",
  likeComment: "likes/likeComment",
  unlikeComment: "likes/unlikeComment",
  fetchUserPosts: "posts/fetchPosts?userId=",
  fetchUserReels: "posts/fetchReels?userId=",
  searchUsers: "users/serchUserByUsername?userName=",
  followUnfollow: "follows/followUnfollow",
  updateSubscription: "subscriptions/update/",
  fetchUserSubscription: "subscriptions/fetch?userId=",
  fetchSubscriptionById: "subscriptions/fetch?id=",
  fetchMySubscriptions: "subscriptions/fetchMySubscriptions",
  updateProfile: "users/update",
  myBookedSlots: "slotBookings/myBookedSlots",
  checkUserNameAvailability: "CheckUserNameAvailability"
};

export const USER_AUTH = 'USER_AUTH';
export const USER_TOKEN = 'USER_TOKEN';

export const LoginParams = (email, password) => {
  return {
    email: email,
    password: password,
  };
};
export const ForgotParams = (email) => {
  return {
    email: email,

  };
};
export const RegisterParams = (
  fname,
  lname,
  uname,
  email,
  password,
  type
) => {
  return {
    "userName": uname,
    "firstName": fname,
    "lastName": lname,
    "email": email,
    "password": password,
    "deviceInfo": {
      device: Platform.OS
    },
    "loginType": type
  }
};
