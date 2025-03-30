import type { ResponseWithError, TResponse } from '@type/common.type';
import type { TCar } from '@type/car.type';
import { CustomError } from '@type/error.type';
import { Endpoint } from '@constant/request';
import { getCookies } from '@helper/cookies.helper';

export class CarService {
  async getCars(): ResponseWithError<TCar[]> {
    try {
      const cookies = getCookies();
      const accessToken = cookies.access_token;

      const response = await fetch(Endpoint.Cars, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new CustomError(response.status, response.statusText);
      }

      const responseBody = <TResponse<TCar[]>>await response.json();
      const tokens = responseBody.data;
      if (!tokens) throw new Error('');

      return [tokens, null];
    } catch (err) {
      if (err instanceof CustomError) return [null, err];
      return [null, new CustomError(400, 'Bad Request')];
    }
  }
}
