const _baseUrl = 'http://39.108.80.64:3000';
export default {
  getPlayListByWhere (cat, order, offset, total, limit) {
    return _baseUrl + '/top/playlist?limit=9&order=new';
  },
  getSong (id) {
    return _baseUrl + '/song/url?id=' + id;
  },
  getPlayListDetail (id) {
    return _baseUrl + '/playlist/detail?id=' + id;
  }
};
