import { globalService } from 'src/global.service';
import { ShopService } from './shop.service';
import {
  Controller,
  Get,
  Redirect,
  Res,
  Req,
  Body,
  Post,
} from '@nestjs/common';
@Controller('')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/install/login')
  @Redirect(
    `https://accounts.haravan.com/connect/authorize?response_mode=${globalService.hrvConfig.response_mode}&response_type=${globalService.hrvConfig.response_type}&scope=${globalService.hrvConfig.scope_login}&client_id=${globalService.hrvConfig.client_id}&redirect_uri=${globalService.hrvConfig.login_callback_url}&nonce=${globalService.hrvConfig.nonce}`,
  )
  getLogin() {}

  @Post('/install/login')
  postLogin(@Res() res, @Body() body) {
    globalService.hrvConfig.orgid = this.shopService.postLogin(body);
    res.redirect(
      `https://accounts.haravan.com/connect/authorize?response_mode=${globalService.hrvConfig.response_mode}&response_type=${globalService.hrvConfig.response_type}&scope=${globalService.hrvConfig.scope}&client_id=${globalService.hrvConfig.client_id}&redirect_uri=${globalService.hrvConfig.install_callback_url}&nonce=${globalService.hrvConfig.nonce}&orgid=${globalService.hrvConfig.orgid}`,
    );
  }

  @Post('/install/grandservice')
  async getGrandService(@Req() req) {
    await this.shopService.getGrandService(req);
  }
}
