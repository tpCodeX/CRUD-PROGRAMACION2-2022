import { Repository,EntityRepository } from "typeorm";
import { Cuenta } from "../entities/Cuenta";

@EntityRepository(Cuenta)
class CuentaRepository extends Repository<Cuenta>{ }

export { CuentaRepository };