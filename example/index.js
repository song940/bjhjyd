const fs = require('fs');
const bjhjyd = require('..');

let session = 'EDC5A2F73EE02EBDA40078004B5D14CB-n1.Tomcat1';

// bjhjyd
// .code(session)
// .then(({ session: code, img }) => {
//   session = code;
//   fs.writeFileSync('/tmp/code.png', img);
//   console.log(code);
// });

bjhjyd
.login(session, { 
  personMobile: '18888888888', 
  password: 'xxx',
  validCode: '3qu6'
})
.then(res => {
  console.log(res);
})