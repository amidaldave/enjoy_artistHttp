import { Module } from '@nestjs/common';
import { AdminCoreModuleFactory, AdminAuthModuleFactory } from 'nestjs-admin'
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminCredentialValidator } from '../user/credentialValidator';
import { User } from '../entities/user.entity';



const coreModule = AdminCoreModuleFactory.createAdminCoreModule({})
const authModule = AdminAuthModuleFactory.createAdminAuthModule({
    adminCoreModule: coreModule,
    credentialValidator:adminCredentialValidator,
    imports:[TypeOrmModule.forFeature([User])],
    providers:[],
})

@Module({
  imports: [coreModule, authModule],
  exports: [coreModule, authModule],
})
export class BackofficeModule {}
