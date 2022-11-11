import {MigrationInterface, QueryRunner} from "typeorm";

export class migracion21668150715316 implements MigrationInterface {
    name = 'migracion21668150715316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion" FROM "productos"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`ALTER TABLE "temporary_productos" RENAME TO "productos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos" RENAME TO "temporary_productos"`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" varchar PRIMARY KEY NOT NULL, "nombreProducto" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "fechaCreacion" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificacion" datetime NOT NULL DEFAULT (datetime('now')), "tipo" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "productos"("id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion") SELECT "id", "nombreProducto", "descripcion", "precio", "fechaCreacion", "fechaModificacion" FROM "temporary_productos"`);
        await queryRunner.query(`DROP TABLE "temporary_productos"`);
    }

}
