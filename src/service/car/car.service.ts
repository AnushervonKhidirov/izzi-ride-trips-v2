import type { ResponseWithError, TResponse } from '@type/common.type';
import type { TCar } from '@type/car.type';
import { HttpError, SimpleError } from '@error/http.error';
import { Endpoint, Token } from '@constant/request';
import { getCookies } from '@helper/cookies.helper';

export class CarService {
  async getCars(): ResponseWithError<TCar[]> {
    try {
      const accessToken = getCookies(Token.Access);

      const response = await fetch(Endpoint.Cars, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new HttpError(response.status, response.statusText);
      }

      const responseBody = <TResponse<TCar[]>>await response.json();
      const cars = responseBody.data;
      if (!cars) throw new Error();

      return [cars, null];
    } catch (err) {
      if (err instanceof HttpError) return [null, err];
      return [null, new SimpleError()];
    }
  }
}
