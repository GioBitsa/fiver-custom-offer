# Generated by Django 4.0.2 on 2022-04-06 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_merge_20220329_2209'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='hasMessage',
            field=models.BooleanField(default=False),
        ),
    ]
