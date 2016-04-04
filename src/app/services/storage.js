import Q from 'q'

export default {
  get: (key) => Q.Promise((res, rej) => {
    try {
      // let data = JSON.parse(window.localStorage.getItem(key) || "[]");
      let data = [Math.random(), Math.random(), Math.random()];
      return res(data);
    } catch(e) {
      return rej(e);
    }
  })
}
