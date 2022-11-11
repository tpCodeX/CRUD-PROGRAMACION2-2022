import {MigrationInterface, QueryRunner} from "typeorm";

export class migracion21668198805131 implements MigrationInterface {
    name = 'migracion21668198805131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "categoria" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion" FROM "productos"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`ALTER TABLE "temporary_productos" RENAME TO "productos"`);
        await queryRunner.query(`CREATE TABLE "temporary_productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "categoria" varchar, CONSTRAINT "FK_bc615edbbc3d598723bd6b090de" FOREIGN KEY ("categoria") REFERENCES "categorias" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion", "categoria") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion", "categoria" FROM "productos"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`ALTER TABLE "temporary_productos" RENAME TO "productos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos" RENAME TO "temporary_productos"`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "categoria" varchar)`);
        await queryRunner.query(`INSERT INTO "productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion", "categoria") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion", "categoria" FROM "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "temporary_productos"`);
        await queryRunner.query(`ALTER TABLE "productos" RENAME TO "temporary_productos"`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion" FROM "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "temporary_productos"`);
    }

}
