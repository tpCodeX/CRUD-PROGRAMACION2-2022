import {MigrationInterface, QueryRunner} from "typeorm";

export class Migracion1634445997734 implements MigrationInterface {
    name = 'Migracion1634445997734'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE "productos" (
            "id" varchar PRIMARY KEY NOT NULL, 
            "nombreProducto" varchar NOT NULL,
            "precio" integer NOT NULL,
            "descripcion" varchar NOT NULL,
            "categoria" varchar,
            "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')),
            "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), 
            "categoriaId" varchar)`);

        await queryRunner.query(`CREATE TABLE "categorias" (
        "id" varchar PRIMARY KEY NOT NULL, 
        "nombre" varchar NOT NULL)`);

        await queryRunner.query(`CREATE TABLE "usuarios" (
            "id" varchar PRIMARY KEY NOT NULL,
            "nombreUsuario" varchar NOT NULL,
            "eMail" varchar NOT NULL,
            "teléfono" varchar NOT NULL,
            "ciudad" varchar NOT NULL,
            "provincia" varchar NOT NULL,
            "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')),
            "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')))`);

        await queryRunner.query(`CREATE TABLE "temporary_productos"(
            "id" varchar PRIMARY KEY NOT NULL,
            "nombreProducto" varchar NOT NULL,
            "precio" integer NOT NULL,
            "descripcion" varchar NOT NULL,
            "categoria" varchar,
            "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')),
            "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')),
            "categoriaId" varchar, CONSTRAINT "FK_3150a2e74c18cfaddca910c9a8a" FOREIGN KEY ("categoriaId") 
            REFERENCES "categorias" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);

        await queryRunner.query(`INSERT INTO "temporary_productos"(
            "id",
            "nombreProducto",
            "precio",
            "descripcion",
            "fechaCreacion",
            "fechaModificacion",
            "categoria")
            SELECT
            "id",
            "nombreProducto",
            "precio",
            "descripcion",
            "fechaCreacion",
            "fechaModificacion",
            "categoriaId"
            FROM "productos"`);

        await queryRunner.query(`DROP TABLE "productos"`);

        await queryRunner.query(`ALTER TABLE "temporary_productos" RENAME TO "productos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "productos" RENAME TO "temporary_productos"`);

        await queryRunner.query(`CREATE TABLE "productos" (
            "id" varchar PRIMARY KEY NOT NULL, 
            "nombreProducto" varchar NOT NULL,
            "precio" integer NOT NULL,
            "descripcion" varchar NOT NULL,
            "categoria" varchar,
            "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')),
            "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), 
            "categoriaId" varchar)`);
            

        await queryRunner.query(`INSERT INTO "productos"(
            "id",
            "nombreProducto",
            "precio",
            "descripcion",
            "fechaCreacion",
            "fechaModificacion",
            "categoriaId")
            SELECT
            "id",
            "nombreProducto",
            "precio",
            "descripcion",
            "fechaCreacion",
            "fechaModificacion",
            "categoriaId"
            FROM "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cuentas"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
        await queryRunner.query(`DROP TABLE "productos"`);
    }

}
