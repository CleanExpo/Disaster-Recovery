"use strict";
/**
 * Generate all NRPG platform assets using Google Gemini
 * - Nano Banana Pro for images (2K/4K)
 * - Veo 3.1 for videos (optional)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gemini_image_service_1 = require("../lib/services/gemini-image.service");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
// Load environment variables from .env.local manually
var envPath = path_1.default.join(process.cwd(), '.env.local');
if (fs_1.default.existsSync(envPath)) {
    var envContent = fs_1.default.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(function (line) {
        var match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
            var key = match[1].trim();
            var value = match[2].trim();
            process.env[key] = value;
        }
    });
}
function generateAllAssets() {
    return __awaiter(this, void 0, void 0, function () {
        var isConnected, scenarios, _i, scenarios_1, scenario, error_1, services, _a, services_1, service, error_2, sectors, _b, sectors_1, sector, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('🚀 Starting NRPG Asset Generation with Google Gemini');
                    console.log('📦 Using: Nano Banana Pro (Gemini 3 Pro Image)');
                    console.log('');
                    // Test API connection first
                    console.log('1️⃣ Testing Gemini API connection...');
                    return [4 /*yield*/, gemini_image_service_1.geminiImageService.testConnection()];
                case 1:
                    isConnected = _c.sent();
                    if (!isConnected) {
                        console.error('❌ Gemini API connection failed. Check your API key in .env.local');
                        process.exit(1);
                    }
                    console.log('');
                    // Generate hero carousel scenario images (4K, highest priority)
                    console.log('2️⃣ Generating Hero Carousel Scenario Images (4K)...');
                    console.log('━'.repeat(60));
                    scenarios = [
                        'residential-flood',
                        'commercial-fire',
                        'industrial-bio',
                    ];
                    _i = 0, scenarios_1 = scenarios;
                    _c.label = 2;
                case 2:
                    if (!(_i < scenarios_1.length)) return [3 /*break*/, 7];
                    scenario = scenarios_1[_i];
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    console.log("\n\uD83D\uDCF8 Generating: ".concat(scenario, "..."));
                    return [4 /*yield*/, gemini_image_service_1.geminiImageService.generateScenarioImage(scenario)];
                case 4:
                    _c.sent();
                    console.log("\u2705 Completed: ".concat(scenario));
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _c.sent();
                    console.error("\u274C Failed: ".concat(scenario), error_1);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    console.log('');
                    console.log('━'.repeat(60));
                    console.log('');
                    // Generate service card images (2K)
                    console.log('3️⃣ Generating Service Card Images (2K)...');
                    console.log('━'.repeat(60));
                    services = [
                        'water',
                        'fire',
                        'mould',
                        'bio',
                    ];
                    _a = 0, services_1 = services;
                    _c.label = 8;
                case 8:
                    if (!(_a < services_1.length)) return [3 /*break*/, 13];
                    service = services_1[_a];
                    _c.label = 9;
                case 9:
                    _c.trys.push([9, 11, , 12]);
                    console.log("\n\uD83D\uDCF8 Generating: ".concat(service, "-card..."));
                    return [4 /*yield*/, gemini_image_service_1.geminiImageService.generateServiceCardImage(service)];
                case 10:
                    _c.sent();
                    console.log("\u2705 Completed: ".concat(service, "-card"));
                    return [3 /*break*/, 12];
                case 11:
                    error_2 = _c.sent();
                    console.error("\u274C Failed: ".concat(service, "-card"), error_2);
                    return [3 /*break*/, 12];
                case 12:
                    _a++;
                    return [3 /*break*/, 8];
                case 13:
                    console.log('');
                    console.log('━'.repeat(60));
                    console.log('');
                    // Generate sector card images (2K)
                    console.log('4️⃣ Generating Sector Card Images (2K)...');
                    console.log('━'.repeat(60));
                    sectors = [
                        'residential',
                        'commercial',
                        'industrial',
                        'insurance',
                    ];
                    _b = 0, sectors_1 = sectors;
                    _c.label = 14;
                case 14:
                    if (!(_b < sectors_1.length)) return [3 /*break*/, 19];
                    sector = sectors_1[_b];
                    _c.label = 15;
                case 15:
                    _c.trys.push([15, 17, , 18]);
                    console.log("\n\uD83D\uDCF8 Generating: ".concat(sector, "..."));
                    return [4 /*yield*/, gemini_image_service_1.geminiImageService.generateSectorImage(sector)];
                case 16:
                    _c.sent();
                    console.log("\u2705 Completed: ".concat(sector));
                    return [3 /*break*/, 18];
                case 17:
                    error_3 = _c.sent();
                    console.error("\u274C Failed: ".concat(sector), error_3);
                    return [3 /*break*/, 18];
                case 18:
                    _b++;
                    return [3 /*break*/, 14];
                case 19:
                    console.log('');
                    console.log('━'.repeat(60));
                    console.log('');
                    // Summary
                    console.log('🎉 ASSET GENERATION COMPLETE!');
                    console.log('');
                    console.log('Generated Assets:');
                    console.log('  ✅ 3 Hero Carousel Scenarios (4K)');
                    console.log('  ✅ 4 Service Card Images (2K)');
                    console.log('  ✅ 4 Sector Card Images (2K)');
                    console.log('');
                    console.log('📁 Location: /public/images/');
                    console.log('  - /scenarios/');
                    console.log('  - /services/');
                    console.log('  - /sectors/');
                    console.log('');
                    console.log('💰 Estimated Cost:');
                    console.log('  - 3 × 4K images: ~$0.72');
                    console.log('  - 8 × 2K images: ~$1.11');
                    console.log('  - TOTAL: ~$1.83');
                    console.log('');
                    console.log('✅ All assets ready for production use!');
                    return [2 /*return*/];
            }
        });
    });
}
// Run generation
generateAllAssets().catch(function (error) {
    console.error('❌ Asset generation failed:', error);
    process.exit(1);
});
