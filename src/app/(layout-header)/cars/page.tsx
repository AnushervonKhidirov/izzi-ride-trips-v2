'use client';
import type { TCar } from '@type/car.type';
import type { TStyles } from '@type/common.type';

import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Alert from '@common/alert/alert';
import { CarService } from '@service/car/car.service';
import Section from '@common/section/section';
import CarList from '@component/car/car-list/car-list';
import { Button } from '@common/button/button';
import { Page } from '@constant/links';
import { requestWithRefresh } from '@helper/request.helper';

const CarsPage = () => {
  const carService = new CarService();

  const [carList, setCarList] = useState<TCar[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  async function getData() {
    const [data, err] = await requestWithRefresh<TCar[]>(carService.getCars);

    if (err) {
      return enqueueSnackbar(<Alert status={err.status} title={err.error} message={err.message} />, {
        variant: 'error',
      });
    }

    setCarList(data);
  }

  const btnStyles: TStyles = {
    position: 'absolute',
    inset: 0,
    fontSize: '1.5em',
    borderRadius: 0,
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Section title="Your cars">
      <CarList list={carList}>
        <Button title="Add New Car" href={Page.AddCar} sx={btnStyles} />
      </CarList>
    </Section>
  );
};

export default CarsPage;
