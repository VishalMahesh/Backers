import Images from "../constants/Images";

const authSchema = {
  LoginData: [],
  RegisterData: [],
  Network: true,
  searchedUsers: []
};

const feedSchema = {
  homeFeeds: [],
  postComments: []
};

const reelschema = {
  activeVideo: null,
  prevactiveTab: 1,
  reelVideos: []
}

const profileSchema = {
  userPosts: [],
  userReels: [],
  userSubscriptions: [],
  otherSubscriptions: [],
  bookedSubscriptions: [],
  sentAppreciation: [],
  receivedAppreciation: []
}

const storyschema = {
  stories: []
}

export const slotschema = {
  recurSlots: [
    {
      id: 0,
      selected: false,
      name: "Sun",
      title: "sunday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 1,
      selected: false,
      name: "Mon",
      title: "monday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 2,
      selected: false,
      name: "Tue",
      title: "tuesday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 3,
      selected: false,
      name: "Wed",
      title: "wednesday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 4,
      selected: false,
      name: "Thu",
      title: "thursday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 5,
      selected: false,
      name: "Fri",
      title: "friday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 6,
      selected: false,
      name: "Sat",
      title: "saturday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
  ],
  initSlot: [
    {
      id: 0,
      selected: false,
      name: "Sun",
      title: "sunday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 1,
      selected: false,
      name: "Mon",
      title: "monday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 2,
      selected: false,
      name: "Tue",
      title: "tuesday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 3,
      selected: false,
      name: "Wed",
      title: "wednesday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 4,
      selected: false,
      name: "Thu",
      title: "thursday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 5,
      selected: false,
      name: "Fri",
      title: "friday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
    {
      id: 6,
      selected: false,
      name: "Sat",
      title: "saturday",
      slots: [
        {
          id: 0,
          start: 0,
          end: 0,
          startTime: "12:00 PM",
          endTime: "12:30 PM",
          default: true
        }
      ]
    },
  ],
  userSlots: [],
  bookedSlots: []
}


export const Schemas = {
  USER: authSchema,
  FEED: feedSchema,
  REEL: reelschema,
  STORY: storyschema,
  SLOT: slotschema,
  PROFILE: profileSchema
};
