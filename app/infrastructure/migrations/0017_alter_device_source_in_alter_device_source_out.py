# Generated by Django 5.0.6 on 2024-05-23 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('infrastructure', '0016_device_power_in_device_power_out_device_source_in_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='source_in',
            field=models.CharField(blank=True, choices=[('SO', 'Solar panel'), ('BA', 'Battery'), ('GR', 'Grid')], max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name='device',
            name='source_out',
            field=models.CharField(blank=True, choices=[('SO', 'Solar panel'), ('BA', 'Battery'), ('GR', 'Grid')], max_length=2, null=True),
        ),
    ]