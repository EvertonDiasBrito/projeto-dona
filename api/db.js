import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Admin1234567',
    database: 'crud'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao ligar ao MySQL:', err);
        return;
    }
    console.log('Ligado à base de dados MySQL!');
});