Directory Folder : 
backend = Folder backend menggunakan node + express dan Mysql
frontend = Folder untuk frontend menggunakan react js

Stack : 
Node = v26.13.1
Express = 5.3.0
React js = 
Mysql = 8.4.9

1. jangan lupa untuk membuat file .env agar dapat menghubungkan Database dengan Backend
Menggunakan .env sesuai dengan example.env 


pake kode ini diatas kode await db.authenticate(); agar dapat otomatis membuat database yang baru

    const tmp = new Sequelize('',db.config.username,db.config.password,db.options);
    await tmp.getQueryInterface().createDatabase(db.config.database);
    await tmp.close();