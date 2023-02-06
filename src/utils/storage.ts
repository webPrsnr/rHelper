const prefix = "nice-prefix-";

export const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${prefix}token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${prefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${prefix}token`);
  },
};
