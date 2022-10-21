import { Repository,EntityRepository } from "typeorm";
import { AppUser } from "../entities/AppUser";

@EntityRepository(AppUser)
class AppUserRepository extends Repository<AppUser>{ }

export { AppUserRepository };