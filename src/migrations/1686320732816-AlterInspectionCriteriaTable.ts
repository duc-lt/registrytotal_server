import { TableName } from '../config/constants';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterInspectionCriteriaTable1686320732816
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      TableName.INSPECTION_CRITERIA,
      'pass',
      new TableColumn({
        name: 'pass',
        type: 'boolean',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
