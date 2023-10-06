import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from './schemas/shop.schema';
import { ShopCommon } from './shop.common';
import { HaravanCommon } from './shop.haravan';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    private haravanCommon: HaravanCommon,
    private shopCommon: ShopCommon,
    private jwtService: JwtService,
  ) {}

  async getLogin(orgid: string) {
    const shopExists = await this.shopCommon.findShopByOrgid(orgid);
    if (shopExists) {
      return `http://localhost:3000/?orgid=${shopExists?.orgid}`;
    }
    return `https://accounts.haravan.com/connect/authorize?response_mode=${process.env.HRV_RES_MODE}&response_type=${process.env.HRV_RES_TYPE}&scope=${process.env.HRV_SCOPE_LOGIN}&client_id=${process.env.HRV_CLIENT_ID}&redirect_uri=${process.env.HRV_LOGIN_CB_URL}&nonce=${process.env.HRV_NONCE}`;
  }

  async postLogin(response, request) {
    const decodeToken: any = this.jwtService.decode(request.body.id_token);
    if (decodeToken?.role[0] === 'admin') {
      const object_token_login: any = await this.haravanCommon.haravanBuilder(
        request,
        process.env.HRV_LOGIN_CB_URL,
      );
      const accessTokenLogin = object_token_login?.access_token;
      const frontendDomain = process.env.FRONTEND_DOMAIN.toString();
      response.cookie('f1multi_token', accessTokenLogin, {
        httpOnly: true,
        domain: frontendDomain,
      });
      return `https://accounts.haravan.com/connect/authorize?response_mode=${process.env.HRV_RES_MODE}&response_type=${process.env.HRV_RES_TYPE}&scope=${process.env.HRV_SCOPE_APP}&client_id=${process.env.HRV_CLIENT_ID}&redirect_uri=${process.env.HRV_INSTALL_CB_URL}&nonce=${process.env.HRV_NONCE}&orgid=${decodeToken.orgid}`;
    } else {
      throw new UnauthorizedException();
    }
  }

  async getGrandService(request): Promise<string> {
    const object_token_install: any = await this.haravanCommon.haravanBuilder(
      request,
      process.env.HRV_INSTALL_CB_URL,
    );

    const decodeToken: any = this.jwtService.decode(
      object_token_install?.id_token,
    );
    await this.shopCommon.createShop({
      orgid: decodeToken?.orgid,
      access_token_login: request.cookies['f1multi_token'],
      access_token_install: object_token_install.refresh_token,
      expire_time_install: object_token_install.expires_at,
      refresh_token_install: object_token_install.refresh_token,
      status_app: true,
      shop_metafields: [{ key: 'vi' }],
    });
    const frontendDomain = process.env.FRONTEND_URL.toString(); //
    return frontendDomain;
  }
}
