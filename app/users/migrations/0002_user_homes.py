# Generated by Django 5.0.6 on 2024-05-15 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('infrastructure', '0003_remove_device_category_device_device_type'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='homes',
            field=models.ManyToManyField(to='infrastructure.home'),
        ),
    ]
