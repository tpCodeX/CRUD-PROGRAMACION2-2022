
import { EntityRepository,Repository} from "typeorm";
import { Cuenta } from "../entities/Cuenta";

@EntityRepository(Cuenta)
class CuentasRepository extends Repository<Cuenta>{ }

export {CuentasRepository};