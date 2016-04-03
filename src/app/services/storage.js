import Q from 'q'

export default {
  get: (key) => Q.Promise((res, rej) => {
    try {
      let data = JSON.parse(window.localStorage.getItem(key) || "[]");
      return res(data);
    } catch(e) {
      return rej(e);
    }
  })
}
