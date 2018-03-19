const URI = require('url');
const request = require('superagent');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const API = 'https://apply.bjhjyd.gov.cn/apply';

exports.code = (session) => {
  return request
  .get(`${API}/validCodeImage.html`)
  .set('Cookie', `JSESSIONID=${session};`)
  .then(res => {
    const cookie = res.headers['set-cookie'];
    const m = /JSESSIONID=([^;]+)/.exec(cookie);
    session = m ? m[1] : session;
    return { session, img: res.body };
  })
};

exports.login = (session, params) => {
  const url = `${API}/user/person/login.html`;
  params = Object.assign({
    userType: 0,
    ranStr: '',
    userTypeSelect: 0,
    serviceUserTypeSelect: 0,
    serviceType: 1,
    personMobile: '',
    loginType: 'mobile',
    unitLoginTypeSelect: 0,
    unitMobile: '',
    orgCode: '',
    password: '',
    pin: '',
    validCode: ''
  }, params);
  return request
  .post(url)
  .set('Cookie', session)
  .type('form')
  .send(params)
  .then(res => {
    const messages = res.redirects.map(x => {
      const { query } = URI.parse(x, true);
      return query.message;
    });
    return messages;
  })
};