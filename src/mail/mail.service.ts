import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'head@laixebachkhoa.net',
      pass: 'uobgixqpyuhmafzm' // KHÔNG PHẢI MẬT KHẨU GMAIL THƯỜNG
    }
  });

  async sendMail(data: any) {
    const mailOptions = {
      from: '"Trung tâm GDNN Lái Xe Bách Khoa" <head@laixebachkhoa.net>',
      to: 'head@laixebachkhoa.net',
      subject: 'Tuyển Sinh | Lái Xe Bách Khoa',
      html: `
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Họ tên:</strong> ${data.full_name}</p>
        <p><strong>Khóa học:</strong> ${data.khoa_hoc}</p>
        <p><strong>Khóa học:</strong> ${data.so_dien_thoai}</p>
        <p><strong>Nội dung:</strong> ${data.noi_dung}</p>
      `
    };

    await this.transporter.sendMail(mailOptions);
  }


  create(createMailDto: CreateMailDto) {
    return 'This action adds a new mail';
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
