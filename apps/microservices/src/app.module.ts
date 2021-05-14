import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BugModule } from './bug/bug.module';
import { CustomerApiModule } from './customer-api/customer-api.module';
import { GroupModule } from './group/group.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ElectricityModule } from './electricity/electricity.module';
import { HealthzModule } from './healthz/healthz.module';
import { InvoiceModule } from './invoice/invoice.module';
import { LocationModule } from './location/location.module';
import { MainDashboardModule } from './main-dashboard/main-dashboard.module';
import { MessageModule } from './message/message.module';
import { MinerModule } from './miner/miner.module';
import { MinerGroupModule } from './miner-group/miner-group.module';
import { NotificationModule } from './notification/notification.module';
import { PoolModule } from './pool/pool.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { SettingsModule } from './settings/settings.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BugModule,
    CustomerApiModule,
    GroupModule,
    DashboardModule,
    ElectricityModule,
    HealthzModule,
    InvoiceModule,
    LocationModule,
    MainDashboardModule,
    MessageModule,
    MinerModule,
    MinerGroupModule,
    NotificationModule,
    PoolModule,
    RabbitmqModule,
    SettingsModule,
    UserModule,
    UtilsModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
