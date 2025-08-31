import { Controller, Get, Put, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Req, Res, UseGuards, HttpCode, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesUploadDto, FileUploadDto } from 'src/fileUploadDTO/fileUploadDTO';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';


@ApiTags("News")
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}



  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  // Lay tat ca tin tuc
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  // Lay tin tuc theo loai tin tuc tuyen sinh
  @Get("/tuyen-sinh")
  findByTypeTuyenSinh() {
    return this.newsService.findByType(5);
  }

  @Get("/lich-thi-tot-nghiep")
  finyByTypeTotNghiep(){
    return this.newsService.findByType(6);
  }

  @Get("/lich-thi-sat-hach")
  finyByTypeSatHach(){
    return this.newsService.findByType(7);
  }

  @Put(':id')
  async updateTinTuc(
    @Param('id') id: string,
    @Body() body: { tieu_de?: string; noi_dung?: string; uploaded_at?: string },
  ) {
    return this.newsService.updateNews(Number(id), {
      ...body,
      uploaded_at: body.uploaded_at ? new Date(body.uploaded_at) : undefined,
    });
  }






  // Lay tin tuc theo id
  // @Get('/id/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(200)
  @Get("/news_type")
  findAllNewsType() {
    return this.newsService.findAllNewsType()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }

  // Hinh Anh
  // yarn add @types/multer
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FileUploadDto
  })
  @UseInterceptors(FileInterceptor("hinhAnh",{
    storage : diskStorage({
      destination: process.cwd() + "/public/img",
      filename:(req,file,callback)=>callback(null,new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload")
  upload(@UploadedFile() file: Express.Multer.File){
    // let {fileUpload} = req;
    let data = fs.readFileSync(process.cwd()+ "/public/img/" + file.filename)
    let base64 = Buffer.from(data).toString("base64");
    let src = `data:image/${file.mimetype};base64,${base64}`;
    fs.unlinkSync(process.cwd()+ "/public/img/" + file.filename); // xoa file sau khi luu vao db
    return src
    // return file;
  }

@ApiConsumes("multipart/form-data")
@ApiBody({
  type: FilesUploadDto
})
@UseInterceptors(FilesInterceptor("hinhAnh",10,{
    storage : diskStorage({
      destination: process.cwd() + "/public/img",
      filename:(req,file,callback)=>callback(null,new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload_multiple")
  uploadMultiple(@UploadedFiles() file:Express.Multer.File[]){
    return file;
  }
}
