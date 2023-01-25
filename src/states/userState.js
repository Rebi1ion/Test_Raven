let pathToImages = "../assets/images";

let users = {
  1: {
    username: "Jeshua Stout",
    avatar: `${pathToImages}/user-avatar.jpg`,
    isOnline: true,
    status: "UI Designer",
    link: "@Jeshua",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
    email: "a-luna@gmail.com",
    skype: "amiluna",
  },
  2: {
    username: "Harold Adams",
    avatar: `${pathToImages}/user-avatar.jpg`,
    isOnline: false,
    status: "UX Designer",
    link: "@Adams",
    socialLinks: ["face", "twit", "inst"],
    email: "qwerty@gmail.com",
    skype: "amiluna123",
  },
  3: {
    username: "user",
    avatar: `${pathToImages}/user-avatar.jpg`,
    isOnline: true,
    status: "Front",
    link: "@qwerty",
    socialLinks: ["face", "twit", "inst"],
    email: "qwerty123@gmail.com",
    skype: "qwertyqwerty",
  },
  4: {
    username: "qwerty",
    avatar: `${pathToImages}/user-avatar.jpg`,
    isOnline: true,
    status: "Back",
    link: "@qwerty754",
    socialLinks: ["face", "twit", "inst"],
    email: "qwerty23123@gmail.com",
    skype: "qwerty_qwerty",
  },
};

export default users;
