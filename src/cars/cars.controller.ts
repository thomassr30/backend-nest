import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { urlToHttpOptions } from 'url';
import { CarsService } from './cars.service';
import { createCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
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
    createCar(@Body() createCarDto: createCarDto){
        return this.carsService.create(createCarDto)
    }

    @Patch(':id')
    updateCar(@Param('id', ParseUUIDPipe) id, 
        @Body() updateCarDto: UpdateCarDto){
        return this.carsService.update(id, updateCarDto)
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string){
        return this.carsService.delete(id)
    }

}
