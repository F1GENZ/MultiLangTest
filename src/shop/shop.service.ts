import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Issuer, custom } from 'openid-client';
import { globalService } from 'src/global.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from './schemas/shop.schema';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    private jwtService: JwtService,
  ) {}

  postLogin(data: any): string {
    const decodeToken: any = this.jwtService.decode(data?.id_token);
    if (decodeToken?.role[0] === 'admin') {
      return decodeToken?.orgid;
    } else {
      throw new UnauthorizedException();
    }
  }

  async getGrandService(data) {
    const haravanIssuer = await Issuer.discover(
      'https://accounts.haravan.com/.well-known/openid-configuration',
    );
    const client = new haravanIssuer.Client({
      client_id: globalService.hrvConfig.client_id,
      client_secret: globalService.hrvConfig.client_secret,
      redirect_uris: [globalService.hrvConfig.install_callback_url],
      response_types: ['code id_token'],
    });

    const nonce = globalService.hrvConfig.nonce;
    const params = client.callbackParams(data);
    params.client_id = globalService.hrvConfig.client_id;
    params.client_secret = globalService.hrvConfig.client_secret;
    params.grant_type = globalService.hrvConfig.grant_type;

    const CLOCK_TOLERANCE = custom.clock_tolerance;
    client[CLOCK_TOLERANCE as any] = 10;
    const getToken: string = await client
      .callback(globalService.hrvConfig.install_callback_url, params, { nonce })
      .then(async function (tokenSet) {
        return tokenSet.access_token;
      });

    const newShop = new this.shopModel({
      ...CreateShopDto,
      accessToken: getToken,
    });
    await newShop.save();

    console.log(await this.shopModel.find({}).exec());
  }
}
