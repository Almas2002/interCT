import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {RoleGuards} from "./auth/guard/role.guard";
import {RoleModule} from "./role/role.module";
import {BusModule} from "./bus/bus.module";
import {FileModule} from "./file/file.module";
import {DistrictModule} from "./district/district.module";
import {CityModule} from "./city/city.module";
import {PlaceModule} from "./place/place.module";
import {SessionModule} from "./session/session.module";
import {AuthMiddleware} from "./middleware/auth.milddleaware";
import {TicketModule} from "./ticket/ticket.module";
require('dotenv').config()


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
    // url: process.env.DATABASE_URL,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),UserModule,AuthModule,RoleModule,BusModule,FileModule,DistrictModule,CityModule,PlaceModule,SessionModule,TicketModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
