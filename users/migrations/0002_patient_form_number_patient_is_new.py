# Generated by Django 4.0.3 on 2022-03-26 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='form_number',
            field=models.IntegerField(choices=[(1, 'Form 1'), (2, 'Form 2')], default=0),
        ),
        migrations.AddField(
            model_name='patient',
            name='is_new',
            field=models.BooleanField(null=True),
        ),
    ]