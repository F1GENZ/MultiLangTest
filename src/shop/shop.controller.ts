import { globalService } from 'src/global.service';
import { ShopService } from './shop.service';
import { Controller, Get, Redirect, Req } from '@nestjs/common';
@Controller('')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/install/login')
  @Redirect(
    `https://accounts.haravan.com/connect/authorize?response_mode=${globalService.globalVar.response_mode}&response_type=${globalService.globalVar.response_type}&scope=${globalService.globalVar.scope_login}&client_id=${globalService.globalVar.app_id}&redirect_uri=${globalService.globalVar.login_callback_url}&nonce=${globalService.globalVar.nonce}`,
  )
  installLogin(@Req() req) {
    console.log(req);
  }
}
