// server.cjs

const express = require( 'express' );
const cors = require( 'cors' );

const app = express();

app.use( cors() );

// その他のサーバーの設定

app.listen( 8000, () => {

	console.log( 'Server is running on port 8000' );

}　);
