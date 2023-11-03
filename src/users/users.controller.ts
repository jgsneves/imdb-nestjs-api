import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, createUserSchema } from './dto/create-user-schema';
import { UserRole } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ZodValidationPipe } from '../validators/zod-validation-pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @UseGuards(AuthGuard)
  @Patch(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':uuid')
  inactivate(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.inactivate(uuid);
  }
}
