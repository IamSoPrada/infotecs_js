export default class FetchData {
  constructor() {}

  async getData(data) {
    const res = await fetch(data)
      .then((result) => result.json())
      .then((json) => {
        return json;
      });
    return res;
  }
}
