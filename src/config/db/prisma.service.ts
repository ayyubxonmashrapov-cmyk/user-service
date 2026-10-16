import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


@Injectable()
export class PrismaService 
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy{
        private readonly logger = new Logger(PrismaService.name)

        constructor(){
            const adapter = new PrismaPg({
                connectionString : process.env.DB_URL
            })

            super({
                adapter
            })
        }

        async onModuleInit():Promise<void> {
            await this.$connect()
            this.logger.log("database is connected")
        }

        async onModuleDestroy():Promise<void> {
            await this.$disconnect()
            this.logger.log("database is disconnected")
        }
    }