"""empty message

Revision ID: 5cf0559b8103
Revises: 8d3de9086848
Create Date: 2021-05-17 16:54:35.225260

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5cf0559b8103'
down_revision = '8d3de9086848'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('events', 'id',
               existing_type=sa.INTEGER(),
               nullable=False,
               autoincrement=True)
    op.create_foreign_key(None, 'events', 'timeline', ['timeline_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'events', type_='foreignkey')
    op.alter_column('events', 'id',
               existing_type=sa.INTEGER(),
               nullable=True,
               autoincrement=True)
    # ### end Alembic commands ###
