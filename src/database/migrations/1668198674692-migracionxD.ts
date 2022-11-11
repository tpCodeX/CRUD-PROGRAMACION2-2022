import {MigrationInterface, QueryRunner} from "typeorm";

export class migracionxD1668198674692 implements MigrationInterface {
    name = 'migracionxD1668198674692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "cuentas" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "contraseña" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" varchar PRIMARY KEY NOT NULL, "nombreUsuario" varchar NOT NULL, "eMail" varchar NOT NULL, "teléfono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "cuentas"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "productos"`);
    }

}
