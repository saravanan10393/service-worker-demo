const createRequst = (url, reqConfig) => {
  var headers = Object.assign({}, {
    "Content-Type": "application/json"
  }, reqConfig.header || {});

  if(reqConfig.query) {
    url = serializeQueryParams(url, reqConfig.query);
  }

  var requestOption = {
    method: reqConfig.method,
    headers: headers,
    //mandatory for sending cookie along with request.
    //to block sending cookie set "omit" which is default as per fetch's spec
    credentials: reqConfig.isCORS ? "include" : "same-origin",
    body: reqConfig.data
  };

  return new Request(url, requestOption);
};

const serializeQueryParams = (url, params = {}) => {
  var queryString = url.lastIndexOf('?') !== -1 ? `&` : `?`;
  Object.keys(params)
    .forEach((key) => {
      queryString += `${key}=${params[key]}`;
    });
  return `${url}${queryString}`;
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
};

const parseJSON = (response) => {return response.json();};

const sendRequst = (request) => {
  return fetch(request)
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const service = {
  get: (url, options = {}) => {
    options.method = "GET";
    var request = createRequst(url, options);
    return sendRequst(request);
  },

  post: (url, options = {}) => {
    options.method = options.method || "POST";
    options.data = (typeof options.data !== "string") ? JSON.stringify(options.data) : options.data;
    var request = createRequst(url, options);
    return sendRequst(request);
  },

  update: (url, options = {}) => {
    options.method = "PUT";
    return this.post(url, options);
  },

  delete: (url, options = {}) => {
    options.method = "DELETE";
    var request = createRequst(url, options);
    return sendRequst(request);
  }
};
