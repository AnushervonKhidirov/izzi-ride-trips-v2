'use client';

import { useEffect, useState } from 'react';
import { CarService } from '@service/car/car.service';
import { TCar } from '@type/car.type';
import { TStyles } from '@type/common.type';
import Section from '@common/section/section';
import CarList from '@component/car/car-list/car-list';
import { Button } from '@common/button/button';
import { Page } from '@constant/links';
import { requestWithRefresh } from '@helper/request.helper';

const CarsPage = () => {
  const carService = new CarService();

  const [carList, setCarList] = useState<TCar[]>([]);

  async function getData() {
    const [data, err] = await requestWithRefresh<TCar[]>(carService.getCars);
    if (err) return;
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
