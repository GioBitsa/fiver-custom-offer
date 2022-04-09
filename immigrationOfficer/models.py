from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from users.models import UserInfo

class ImmigrationOfficer(models.Model):
    """
    immigration officer
    """
    user_info = models.OneToOneField(
        UserInfo,
        related_name='immigration',
        on_delete=models.CASCADE,
        null=True)

    def str(self) -> str:
        return self.user_info.user.username