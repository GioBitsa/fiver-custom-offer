from atexit import register
from datetime import datetime
from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from django.conf import settings
from django.contrib.auth.models import User
from django.urls import reverse
from patientStuff.models import ContactTracing, PatientDailyForm, PatientStatusHistory
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from users.models import Doctor, Patient, UserInfo

# class PatientListByPriorityTestCase(APITestCase):
#     create



