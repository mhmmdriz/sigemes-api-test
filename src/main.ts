import { WebServer } from "./infrastructure/config/web";
import { prisma } from "./infrastructure/config/database";
import { RenterRepository } from "./infrastructure/repository/renter";
import { RenterUsecase } from "./usecase/renter";
import { RenterController } from "./presentation/controller/renter";

import { AdminRepository } from "./infrastructure/repository/admin";
import { AdminUsecase } from "./usecase/admin";
import { AdminController } from "./presentation/controller/admin";

import { CityHallRepository } from "./infrastructure/repository/city-hall";
import { CityHallUsecase } from "./usecase/city-hall";
import { CityHallController } from "./presentation/controller/city-hall";

import { GuesthouseRepository } from "./infrastructure/repository/guesthouse";
import { GuesthouseUsecase } from "./usecase/guesthouse";
import { GuesthouseController } from "./presentation/controller/guesthouse";

import { GuesthouseRoomRepository } from "./infrastructure/repository/guesthouse-room";
import { GuesthouseRoomUsecase } from "./usecase/guesthouse-room";
import { GuesthouseRoomController } from "./presentation/controller/guesthouse-room";

import { RentRepository } from "./infrastructure/repository/rent";
import { RentUsecase } from "./usecase/rent";
import { RentController } from "./presentation/controller/rent";

import { PaymentRepository } from "./infrastructure/repository/payment";
import { PaymentUsecase } from "./usecase/payment";
import { PaymentController } from "./presentation/controller/payment";


import { DashboardUsecase } from "./usecase/dashboard";
import { DashboardController } from "./presentation/controller/dashboard";

import { ReviewRepository } from "./infrastructure/repository/review";
import { ReviewUsecase } from "./usecase/review";
import { ReviewController } from "./presentation/controller/review";

import { JwtService } from "./infrastructure/authentication/jwt";
import { BcryptService } from "./infrastructure/authentication/bcrypt";
import { CryptoService } from "./infrastructure/authentication/crypto";
import { MailerService } from "./infrastructure/mailer/mailer";
import { CloudStorageService } from "./infrastructure/object-storage/cloud-storage";
import { LocalStorageService } from "./infrastructure/object-storage/local-storage";
import { MidtransService } from "./infrastructure/payment-gateway/midtrans";
import { DbTransaction } from "./infrastructure/repository/db-transaction";

import { JwtInterface } from "./domain/interface/library/jwt";
import { BcryptInterface } from "./domain/interface/library/bcrypt";
import { CryptoInterface } from "./domain/interface/library/crypto";
import { RenterRepositoryInterface } from "./domain/interface/repository/renter";
import { AdminRepositoryInterface } from "./domain/interface/repository/admin";
import { CityHallRepositoryInterface } from "./domain/interface/repository/city-hall";
import { GuesthouseRepositoryInterface } from "./domain/interface/repository/guesthouse";
import { GuesthouseRoomRepositoryInterface } from "./domain/interface/repository/guesthouse-room";
import { RentRepositoryInterface } from "./domain/interface/repository/rent";
import { PaymentRepositoryInterface } from "./domain/interface/repository/payment";
import { ReviewRepositoryInterface } from "./domain/interface/repository/review";
import { MailerInterface } from "./domain/interface/external-service/mailer";
import { ObjectStorageInterface } from "./domain/interface/external-service/object-storage";
import { DbTransactionInterface } from "./domain/interface/repository/db-transaction";
import { PaymentGatewayInterface } from "./domain/interface/external-service/payment-gateway";
import { APIRouter } from "./presentation/router/api";

export async function main(): Promise<void> {

    // Third Party Library or External Service Instance
    const jwtService: JwtInterface = new JwtService();
    const bcryptService: BcryptInterface = new BcryptService();
    const cryptoService: CryptoInterface = new CryptoService();
    const mailerService: MailerInterface = new MailerService();
    const objectStorageService: ObjectStorageInterface = new CloudStorageService();
    const localStorageService: ObjectStorageInterface = new LocalStorageService(); // Optional, if you want to use local storage
    const paymentGatewayService: PaymentGatewayInterface = new MidtransService();
    const dbTransaction: DbTransactionInterface = new DbTransaction(prisma);
    
    // Repository Instance
    const renterRepository: RenterRepositoryInterface = new RenterRepository(prisma);
    const adminRepository: AdminRepositoryInterface = new AdminRepository(prisma);
    const cityHallRepository: CityHallRepositoryInterface = new CityHallRepository(prisma);
    const guesthouseRepository: GuesthouseRepositoryInterface = new GuesthouseRepository(prisma);
    const guesthouseRoomRepository: GuesthouseRoomRepositoryInterface = new GuesthouseRoomRepository(prisma);
    const rentRepository: RentRepositoryInterface = new RentRepository(prisma);
    const paymentRepository: PaymentRepositoryInterface = new PaymentRepository(prisma);
    const reviewRepository: ReviewRepositoryInterface = new ReviewRepository(prisma);
    
    // Usecase Instance
    const renterUsecase: RenterUsecase = new RenterUsecase(renterRepository, jwtService, bcryptService, mailerService, localStorageService);
    const adminUsecase: AdminUsecase = new AdminUsecase(adminRepository, jwtService, bcryptService, localStorageService);
    const cityHallUsecase: CityHallUsecase = new CityHallUsecase(cityHallRepository, rentRepository, localStorageService, dbTransaction);
    const guesthouseUsecase: GuesthouseUsecase = new GuesthouseUsecase(guesthouseRepository, localStorageService, dbTransaction);
    const guesthouseRoomUsecase: GuesthouseRoomUsecase = new GuesthouseRoomUsecase(guesthouseRoomRepository, rentRepository, localStorageService, dbTransaction);
    const rentUsecase: RentUsecase = new RentUsecase(rentRepository, guesthouseRoomRepository, cityHallRepository, paymentRepository, dbTransaction, paymentGatewayService, cryptoService);
    const paymentUsecase: PaymentUsecase = new PaymentUsecase(paymentRepository, rentRepository, dbTransaction, paymentGatewayService, cryptoService);
    const dashboardUsecase: DashboardUsecase = new DashboardUsecase(paymentRepository, guesthouseRepository, cityHallRepository);
    const reviewUsecase: ReviewUsecase = new ReviewUsecase(reviewRepository, rentRepository, dbTransaction, localStorageService);
    
    // Controller Instance
    const renterController: RenterController = new RenterController(renterUsecase);
    const adminController: AdminController = new AdminController(adminUsecase);
    const cityHallController: CityHallController = new CityHallController(cityHallUsecase);
    const guesthouseRoomController: GuesthouseRoomController = new GuesthouseRoomController(guesthouseRoomUsecase);
    const guesthouseController: GuesthouseController = new GuesthouseController(guesthouseUsecase);
    const rentController: RentController = new RentController(rentUsecase);
    const paymentController: PaymentController = new PaymentController(paymentUsecase);
    const dashboardController: DashboardController = new DashboardController(dashboardUsecase);
    const reviewController: ReviewController = new ReviewController(reviewUsecase);

    const router: APIRouter = new APIRouter(
        renterController,
        adminController,
        cityHallController,
        guesthouseController,
        guesthouseRoomController,
        rentController,
        paymentController,
        dashboardController,
        reviewController,
    );

    const webServer: WebServer = new WebServer(
        8080,
        router);
    webServer.start();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });