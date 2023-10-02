import { ShopService } from './shop.service';
import { Controller, Get, Redirect, Req } from '@nestjs/common';

@Controller('')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/install/login')
  @Redirect(
    `https://accounts.haravan.com/connect/authorize?response_mode=form_post&response_type=code id_token&scope=openid profile email org userinfo&client_id=b6a700570bd2dd75f7cb599c4fd0d13c&redirect_uri=http://localhost:3333/install/login&nonce=f1genzmultilanguage`,
  )
  installLogin(@Req() req) {
    console.log(req);
  }
}
