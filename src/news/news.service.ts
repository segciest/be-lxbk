import { Injectable} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService){}
  create(createNewsDto: CreateNewsDto) {
    return 'This action adds a new news';
  }

  // Lay tat ca tin tuc
  findAll() {
    return this.prisma.tin_tuc.findMany();
  }
  // Lay tin tuc theo id 
  findById(id:number){
    return this.prisma.tin_tuc.findUnique({
      where:{
        tin_tuc_id:id
      }
    })
  }
  // Lay tat ca tin tuc theo loai tin tuc
  findByType(type: number){
    return this.prisma.tin_tuc.findMany({
      where :{
        type_id:type
      }
    })
  }
  // tin-tuc.service.ts
  async updateNews(id: number, data: { tieu_de?: string; noi_dung?: string; uploaded_at?: Date }) {
    return this.prisma.tin_tuc.update({
      where: { tin_tuc_id: id },
      data,
    });
  }






  // Lay tat ca loai tin tuc
  findAllNewsType(){
    return this.prisma.news_type.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }

  
}