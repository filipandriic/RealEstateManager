"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const agency_routes_1 = __importDefault(require("./routers/agency.routes"));
const real_estate_routes_1 = __importDefault(require("./routers/real_estate.routes"));
const characteristics_routes_1 = __importDefault(require("./routers/characteristics.routes"));
const favourites_routes_1 = __importDefault(require("./routers/favourites.routes"));
const city_routes_1 = __importDefault(require("./routers/city.routes"));
const municipality_routes_1 = __importDefault(require("./routers/municipality.routes"));
const microlocation_routes_1 = __importDefault(require("./routers/microlocation.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb' }));
app.use((0, cors_1.default)());
app.use((0, body_parser_1.default)());
mongoose_1.default.connect('mongodb://localhost:27017/realestate');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/agencies', agency_routes_1.default);
router.use('/real_estates', real_estate_routes_1.default);
router.use('/characteristics', characteristics_routes_1.default);
router.use('/favourites', favourites_routes_1.default);
router.use('/cities', city_routes_1.default);
router.use('/municipalities', municipality_routes_1.default);
router.use('/microlocations', microlocation_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map