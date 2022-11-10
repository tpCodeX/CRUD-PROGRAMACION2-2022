import {MigrationInterface, QueryRunner} from "typeorm";

export class micracionCuentas1668055095973 implements MigrationInterface {
    name = 'micracionCuentas1668055095973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cuentas" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "contraseña" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "precio" integer NOT NULL, "descripcion" varchar NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "categoriaId" varchar, CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_productos"("id", "nombreProducto", "precio", "descripcion", "fechaCreacion", "fechaModificacion", "categoriaId") SELECT "id", "nombreProducto", "precio", "descripcion", "fechaCreacion", "fechaModificacion", "categoriaId" FROM "productos"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`ALTER TABLE "temporary_productos" RENAME TO "productos"`);
        await queryRunner.query(`CREATE TABLE "temporary_categorias" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_categorias"("id", "nombre") SELECT "id", "nombre" FROM "categorias"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`ALTER TABLE "temporary_categorias" RENAME TO "categorias"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" RENAME TO "temporary_categorias"`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "categorias"("id", "nombre") SELECT "id", "nombre" FROM "temporary_categorias"`);
        await queryRunner.query(`DROP TABLE "temporary_categorias"`);
        await queryRunner.query(`ALTER TABLE "productos" RENAME TO "temporary_productos"`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "precio" integer NOT NULL, "descripcion" varchar NOT NULL, "categoria" varchar, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "categoriaId" varchar, CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "productos"("id", "nombreProducto", "precio", "descripcion", "fechaCreacion", "fechaModificacion", "categoriaId") SELECT "id", "nombreProducto", "precio", "descripcion", "fechaCreacion", "fechaModificacion", "categoriaId" FROM "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "cuentas"`);
    }

}
