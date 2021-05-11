"""empty message

Revision ID: 8d3de9086848
Revises: f6d547c6eb9b
Create Date: 2021-05-11 17:09:26.435815

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d3de9086848'
down_revision = 'f6d547c6eb9b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('events', sa.Column('timeline_date', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('events', 'timeline_date')
    # ### end Alembic commands ###
