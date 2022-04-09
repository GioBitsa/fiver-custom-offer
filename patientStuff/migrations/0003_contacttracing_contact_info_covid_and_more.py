# Generated by Django 4.0.1 on 2022-03-29 03:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patientStuff', '0002_contacttracing'),
    ]

    operations = [
        migrations.AddField(
            model_name='contacttracing',
            name='contact_info_covid',
            field=models.TextField(blank=0, default='None', max_length=500),
        ),
        migrations.AddField(
            model_name='contacttracing',
            name='contact_info_travel',
            field=models.TextField(blank=0, default='None', max_length=500),
        ),
        migrations.AddField(
            model_name='contacttracing',
            name='covid_contact',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='contacttracing',
            name='got_symptoms',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='contacttracing',
            name='mask_onboarding',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='contacttracing',
            name='self_isolate',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='contacttracing',
            name='travel',
            field=models.BooleanField(null=True),
        ),
    ]