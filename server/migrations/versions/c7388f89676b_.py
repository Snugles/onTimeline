"""empty message

Revision ID: c7388f89676b
Revises: 5cf0559b8103
Create Date: 2021-05-21 18:52:22.962901

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c7388f89676b'
down_revision = '5cf0559b8103'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('events', sa.Column('day', sa.Integer(), nullable=True))
    op.add_column('events', sa.Column('month', sa.Integer(), nullable=True))
    op.add_column('events', sa.Column('time', sa.Integer(), nullable=True))
    op.add_column('events', sa.Column('year', sa.Integer(), nullable=True))
    op.drop_column('events', 'timeline_date')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('events', sa.Column('timeline_date', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('events', 'year')
    op.drop_column('events', 'time')
    op.drop_column('events', 'month')
    op.drop_column('events', 'day')
    # ### end Alembic commands ###