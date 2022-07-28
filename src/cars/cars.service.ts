import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid'
import { createCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ]

    findAll(){
        return this.cars
    }

    findCardById(id: string){

        const car = this.cars.find(car => car.id === id);

        if(!car){
            throw new NotFoundException(`Car with id ${id} not found`)
        }

        return car
    }

    create(createCarDto: createCarDto){

        const car: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push(car)

        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto){

        let carDb = this.findCardById(id)

        if(updateCarDto.id && updateCarDto.id !== id){
            throw new BadRequestException('car id is not valid')
        }

        this.cars = this.cars.map(car => {
            if(car.id === id){
                carDb = {
                    ...carDb,
                    ...updateCarDto,
                    id
                }
                return carDb
            }
            return car
        })
        return carDb

    }

}
