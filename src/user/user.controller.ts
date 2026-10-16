import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { YService } from './user.service';
import { CreateYDto } from './dto/create-y.dto';
import { UpdateYDto } from './dto/update-y.dto';

@Controller()
export class YController {
  constructor(private readonly yService: YService) { }

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() createYDto: CreateYDto) {
    return this.yService.create(createYDto);
  }

  @MessagePattern({ cmd: 'findAll' })
  findAll() {
    return this.yService.findAll();
  }

  @MessagePattern({ cmd: 'findOne' })
  findOne(@Payload() { id }: { id: number }) {
    return this.yService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload('id') id: number, @Payload('dto') updateYDto: UpdateYDto) {
    return this.yService.update(id, updateYDto);
  }

  @MessagePattern({ cmd: 'removeUser' })
  remove(@Payload() { id }: { id: number }) {
    return this.yService.remove(id);
  }
}
