import {MigrationInterface, QueryRunner} from "typeorm";

export class migracion11668137210471 implements MigrationInterface {
    name = 'migracion11668137210471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorias" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_productos" ("id" uuid PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" int NOT NULL, "fechaCreacion" timestamp NOT NULL DEFAULT (now()), "fechaModificacion" timestamp NOT NULL DEFAULT (now()), "tipo" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion" FROM "productos"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`ALTER TABLE "temporary_productos" RENAME TO "productos"`);
        await queryRunner.query(`CREATE TABLE "temporary_productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "tipo" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion", "tipo") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion", "tipo" FROM "productos"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`ALTER TABLE "temporary_productos" RENAME TO "productos"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuarios" ("id" varchar PRIMARY KEY NOT NULL, "nombreUsuario" varchar NOT NULL, "eMail" varchar NOT NULL, "teléfono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_usuarios"("id", "nombreUsuario", "eMail", "teléfono", "ciudad", "provincia", "fechaCreacion", "fechaModificacion") SELECT "id", "nombreUsuario", "eMail", "teléfono", "ciudad", "provincia", "fechaCreacion", "fechaModificacion" FROM "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuarios" RENAME TO "usuarios"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME TO "temporary_usuarios"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid PRIMARY KEY NOT NULL, "nombreUsuario" varchar NOT NULL, "eMail" varchar NOT NULL, "teléfono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar(2) NOT NULL, "fechaCreacion" timestamp NOT NULL DEFAULT (now()), "fechaModificacion" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "usuarios"("id", "nombreUsuario", "eMail", "teléfono", "ciudad", "provincia", "fechaCreacion", "fechaModificacion") SELECT "id", "nombreUsuario", "eMail", "teléfono", "ciudad", "provincia", "fechaCreacion", "fechaModificacion" FROM "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "temporary_usuarios"`);
        await queryRunner.query(`ALTER TABLE "productos" RENAME TO "temporary_productos"`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" uuid PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" int NOT NULL, "fechaCreacion" timestamp NOT NULL DEFAULT (now()), "fechaModificacion" timestamp NOT NULL DEFAULT (now()), "tipo" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion", "tipo") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion", "tipo" FROM "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "temporary_productos"`);
        await queryRunner.query(`ALTER TABLE "productos" RENAME TO "temporary_productos"`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" uuid PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" int NOT NULL, "fechaCreacion" timestamp NOT NULL DEFAULT (now()), "fechaModificacion" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion" FROM "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
    }

}
