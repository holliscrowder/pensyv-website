"""add checked boolean to submission

Revision ID: 3836fcf55060
Revises: 740c4c046083
Create Date: 2024-06-06 15:41:24.316765

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3836fcf55060'
down_revision = '740c4c046083'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('submissions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('checked', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('submissions', schema=None) as batch_op:
        batch_op.drop_column('checked')

    # ### end Alembic commands ###