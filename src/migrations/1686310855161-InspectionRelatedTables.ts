import { Criteria } from '../inspection-certs/enums/criteria.enum';
import { InspectionStatus } from '../inspection-certs/enums/inspection-status.enum';
import { TableName } from '../config/constants';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InspectionRelatedTables1686310855161
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.INSPECTION_RESULT,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'car_id',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(InspectionStatus),
            default: `'${InspectionStatus.DRAFT}'`,
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
            name: 'revisit_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.INSPECTION_CRITERIA,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'result_id',
            type: 'varchar',
          },
          {
            name: 'criteria',
            type: 'enum',
            enum: Object.values(Criteria),
          },
          {
            name: 'pass',
            type: 'boolean',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.INSPECTION_RESULT, true, true);
    await queryRunner.dropTable(TableName.INSPECTION_CRITERIA, true, true);
  }
}
