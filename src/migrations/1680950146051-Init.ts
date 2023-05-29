import { OwnerType } from '../owners/enums/owner-types.enum';
import { Role } from '../accounts/enums/role.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableName } from '../config/constants';
import { CarUse } from '../cars/enums/car-uses.enum';

export class Init1680950146051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.ACCOUNT,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isGenerated: true,
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'role',
            type: 'enum',
            enum: Object.values(Role),
            default: `'${Role.SERVICE_PROVIDER}'`,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'password',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.PROVINCE,
        columns: [
          {
            name: 'code',
            type: 'int',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '40',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.DISTRICT,
        columns: [
          {
            name: 'code',
            type: 'int',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '40',
          },
          {
            name: 'province_code',
            type: 'int',
            // foreignKeyConstraintName: `fk_${TableName.DISTRICT}_${TableName.PROVINCE}_code`,
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['province_code'],
        //     referencedTableName: TableName.PROVINCE,
        //     referencedColumnNames: ['code'],
        //   },
        // ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.COMMUNE,
        columns: [
          {
            name: 'code',
            type: 'int',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '40',
          },
          {
            name: 'district_code',
            type: 'int',
            // foreignKeyConstraintName: `fk_${TableName.COMMUNE}_${TableName.DISTRICT}_code`,
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['district_code'],
        //     referencedTableName: TableName.DISTRICT,
        //     referencedColumnNames: ['code'],
        //   },
        // ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.ADDRESS,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'street_address',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'commune_code',
            type: 'int',
            // foreignKeyConstraintName: `fk_${TableName.ADDRESS}_${TableName.COMMUNE}_code`,
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['commune_code'],
        //     referencedTableName: TableName.COMMUNE,
        //     referencedColumnNames: ['code'],
        //   },
        // ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.SERVICE_PROVIDER,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'code',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'address_id',
            type: 'varchar',
            // foreignKeyConstraintName: `fk_${TableName.SERVICE_PROVIDER}_${TableName.ADDRESS}_id`,
          },
          {
            name: 'account_id',
            type: 'varchar',
            // foreignKeyConstraintName: `fk_${TableName.SERVICE_PROVIDER}_${TableName.ACCOUNT}_id`,
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['address_id'],
        //     referencedTableName: TableName.ADDRESS,
        //     referencedColumnNames: ['id'],
        //   },
        //   {
        //     columnNames: ['account_id'],
        //     referencedTableName: TableName.ACCOUNT,
        //     referencedColumnNames: ['id'],
        //   },
        // ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.OWNER,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'type',
            type: 'enum',
            enum: Object.values(OwnerType),
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'address_id',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.PERSON,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'owner_id',
            type: 'varchar',
            // foreignKeyConstraintName: `fk_${TableName.PERSON}_${TableName.OWNER}_id`,
          },
          {
            name: 'identity_number',
            type: 'varchar',
            length: '12',
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['owner_id'],
        //     referencedTableName: TableName.OWNER,
        //     referencedColumnNames: ['id'],
        //   },
        //   {
        //     columnNames: ['birthplace_id'],
        //     referencedTableName: TableName.ADDRESS,
        //     referencedColumnNames: ['id'],
        //   },
        // ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.ORGANISATION,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'owner_id',
            type: 'varchar',
            // foreignKeyConstraintName: `fk_${TableName.ORGANISATION}_${TableName.OWNER}_id`,
          },
          {
            name: 'tax_id',
            type: 'varchar',
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['owner_id'],
        //     referencedTableName: TableName.OWNER,
        //     referencedColumnNames: ['id'],
        //   },
        //   {
        //     columnNames: ['address_id'],
        //     referencedTableName: TableName.ADDRESS,
        //     referencedColumnNames: ['id'],
        //   },
        // ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.REGISTRATION_CERT,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'cert_number',
            type: 'varchar',
          },
          {
            name: 'registration_number',
            type: 'varchar',
          },
          {
            name: 'registry_province_code',
            type: 'int',
            // foreignKeyConstraintName: `fk_${TableName.REGISTRATION_CERT}_${TableName.PROVINCE}_code`,
          },
          {
            name: 'created_at',
            type: 'date',
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['registry_province_code'],
        //     referencedTableName: TableName.PROVINCE,
        //     referencedColumnNames: ['code'],
        //   },
        // ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.INSPECTION_CERT,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'cert_number',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'expires_at',
            type: 'timestamp',
          },
          {
            name: 'provider_id',
            type: 'varchar',
            // foreignKeyConstraintName: `fk_${TableName.INSPECTION_CERT}_${TableName.SERVICE_PROVIDER}_id`,
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['provider_id'],
        //     referencedTableName: TableName.SERVICE_PROVIDER,
        //     referencedColumnNames: ['id'],
        //   },
        // ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.CAR,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'owner_id',
            type: 'varchar',
            // foreignKeyConstraintName: `fk_${TableName.CAR}_${TableName.OWNER}_id`,
          },
          {
            name: 'registration_cert_id',
            type: 'varchar',
            // foreignKeyConstraintName: `fk_${TableName.CAR}_${TableName.REGISTRATION_CERT}_id`,
          },
          {
            name: 'inspection_cert_id',
            type: 'varchar',
            // foreignKeyConstraintName: `fk_${TableName.CAR}_${TableName.INSPECTION_CERT}_id`,
            isNullable: true,
          },
          {
            name: 'maker',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'model',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'version',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'used_for',
            type: 'enum',
            enum: Object.values(CarUse),
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['owner_id'],
        //     referencedTableName: TableName.OWNER,
        //     referencedColumnNames: ['id'],
        //   },
        //   {
        //     columnNames: ['registration_cert_id'],
        //     referencedTableName: TableName.REGISTRATION_CERT,
        //     referencedColumnNames: ['id'],
        //   },
        //   {
        //     columnNames: ['inspection_cert_id'],
        //     referencedTableName: TableName.INSPECTION_CERT,
        //     referencedColumnNames: ['id'],
        //   },
        // ],
      }),
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.CAR, true, true);
    await queryRunner.dropTable(TableName.REGISTRATION_CERT, true, true);
    await queryRunner.dropTable(TableName.INSPECTION_CERT, true, true);
    await queryRunner.dropTable(TableName.PERSON, true, true);
    await queryRunner.dropTable(TableName.ORGANISATION, true, true);
    await queryRunner.dropTable(TableName.OWNER, true, true);
    await queryRunner.dropTable(TableName.SERVICE_PROVIDER, true, true);
    await queryRunner.dropTable(TableName.ADDRESS, true, true);
    await queryRunner.dropTable(TableName.COMMUNE, true, true);
    await queryRunner.dropTable(TableName.DISTRICT, true, true);
    await queryRunner.dropTable(TableName.PROVINCE, true, true);
    await queryRunner.dropTable(TableName.ACCOUNT, false, true);
  }
}
