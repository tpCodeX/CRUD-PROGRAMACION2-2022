import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategorias1666467776570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "categorias",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nombre",
                        type: "varchar"
                    },
                    {
                        name: "fechaCreacion",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "fechaModificacion",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categorias");
    }

}
