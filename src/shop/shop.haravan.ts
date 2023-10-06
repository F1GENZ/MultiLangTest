import { Issuer, custom } from 'openid-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HaravanCommon {
  async haravanBuilder(req_data, cb_url): Promise<object> {
    const haravanIssuer = await Issuer.discover(
      'https://accounts.haravan.com/.well-known/openid-configuration',
    );
    const client = new haravanIssuer.Client({
      client_id: process.env.HRV_CLIENT_ID,
      client_secret: process.env.HRV_CLIENT_SECRET,
      redirect_uris: [cb_url],
      response_types: ['code id_token'],
    });
    const CLOCK_TOLERANCE = custom.clock_tolerance;
    client[CLOCK_TOLERANCE as any] = 10;
    const nonce = process.env.HRV_NONCE;
    const params = client.callbackParams(req_data);
    params.client_id = process.env.HRV_CLIENT_ID;
    params.client_secret = process.env.HRV_CLIENT_SECRET;
    params.grant_type = process.env.HRV_GRANT_TYPE;

    const getToken = await client
      .callback(cb_url, params, { nonce })
      .then(async function (result) {
        const finalToken = { ...result };
        return finalToken;
      });

    return getToken;
  }
}
