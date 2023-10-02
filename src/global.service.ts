export class globalService {
  static globalVar: any;
}
globalService.globalVar = {
  response_mode: 'form_post',
  url_authorize: 'https://accounts.haravan.com/connect/authorize',
  url_connect_token: 'https://accounts.haravan.com/connect/token',
  grant_type: 'authorization_code',
  nonce: 'f1genz_multilanguage',
  response_type: 'code id_token',
  app_id: 'b6a700570bd2dd75f7cb599c4fd0d13c',
  app_secret:
    '4738f395ae836026649e159eb5334fa94a46f97be2b2ad79991ba5fcbc23f8c0',
  scope_login: 'openid profile email org userinfo',
  scope:
    'openid profile email org userinfo com.write_products com.read_products grant_service',
  login_callback_url: `http://localhost:3333/install/login`,
  install_callback_url: `http://localhost:3333/install/grandservice`,
};
