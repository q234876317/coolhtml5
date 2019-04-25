module.exports = (options) => {
  return new Promise((resolve, reject) => {
    options = Object.assign(options, {
      success(result) {
        if (result.statusCode === 200) {
          let {data}=result
          if(data.code===200){
            resolve(data.data);
          }
          else {
            reject(result);
          }
        } else {
          reject(result);
        }
      },

      fail: reject,
    });

    wx.request(options);
  });
};