import { ShopService } from './shop.service';
import {
  Controller,
  Get,
  Res,
  Req,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
@Controller('')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/install/login')
  async getLogin(@Query() query: any, @Res() res) {
    const login_cb_url = await this.shopService.getLogin(query?.orgid);
    if (!login_cb_url) {
      throw new NotFoundException('Login callback url not exists!');
    }
    return res.redirect(login_cb_url);
  }

  @Post('/install/login')
  async postLogin(
    @Res({ passthrough: true }) response,
    @Req() request: Request,
  ): Promise<any> {
    const install_cb_url = await this.shopService.postLogin(response, request);
    if (!install_cb_url) {
      throw new NotFoundException('Install callback url not exists!');
    }
    return response.redirect(install_cb_url);
  }

  @Post('/install/grandservice')
  async getGrandService(@Req() request: Request, @Res() res) {
    const url = await this.shopService.getGrandService(request);
    return res.redirect(url);
  }
}
