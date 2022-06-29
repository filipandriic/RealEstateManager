import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user_router from './routers/user.routes';
import agency_router from './routers/agency.routes';
import real_estate_router from './routers/real_estate.routes';
import characteristics_router from './routers/characteristics.routes';
import favourites_router from './routers/favourites.routes';
import city_router from './routers/city.routes';
import municipality_router from './routers/municipality.routes';
import microlocation_router from './routers/microlocation.routes';

const app = express();
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb'}));
app.use(cors());
app.use(bodyParser());

mongoose.connect('mongodb://localhost:27017/realestate');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok')
})

const router = express.Router();
router.use('/users', user_router)
router.use('/agencies', agency_router)
router.use('/real_estates', real_estate_router)
router.use('/characteristics', characteristics_router)
router.use('/favourites', favourites_router)
router.use('/cities', city_router)
router.use('/municipalities', municipality_router)
router.use('/microlocations', microlocation_router)

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));