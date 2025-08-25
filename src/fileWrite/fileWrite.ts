import fs from 'fs';
export function taoFile(content: string):void{
    fs.writeFile(process.cwd()+ "/data/log.txt",content,(err)=>{
        if (err) {
      console.error('Lỗi ghi file:', err);
    } else {
      console.log('Ghi file thành công!');
    }
    })
}