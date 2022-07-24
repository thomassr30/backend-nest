import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './interfaces/car.interface';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars(){
        return this.carsService.findAll()
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id ){
        return this.carsService.findCardById(id)
    }

    @Post()
    createCar(@Body() body: Car){
        return body
    }

    @Patch(':id')
    updateCar(@Param('id') id,@Body() body: any){
        return body
    }

    @Delete(':id')
    deleteCar(@Param(':id') id){
        return {
            method: 'DELETE',
            id
        }
    }

}
