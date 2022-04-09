import datetime
from statistics import mode
from django.utils import timezone
# from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User


from users.models import Patient, UserInfo

# Create your models here.


class PatientDailyForm(models.Model):
    """The Form that every patient has to fill out on a daily basis

    Args:
        models (Model): Generates tables in sqlite db
    """

    male = 0
    female = 1
    not_given = 2
    GENDER_CHOICE = (
        (male, 'Male'),
        (female, 'Female'),
        (not_given, 'Prefer Not to Say'),
    )

    Very_Bad = 0
    Bad = 1
    Ok = 2
    Good = 3
    Very_Good = 4

    ASSESMENT_CHOICES = (
        (Very_Bad, 'Very_Bad'),
        (Bad, 'Bad'),
        (Ok, 'Ok'),
        (Good, 'Good'),
        (Very_Good, 'Very_Good'))

    child = 0
    young_adult = 1
    adult = 2
    middle_aged = 3
    seniors = 4

    AGEGROUP_CHOICES = (
        (child, 'Under 18'),
        (young_adult, '18-35'),
        (adult, '36-55'),
        (middle_aged, '56-75'),
        (seniors, 'Over 75'),
    )



    # True is male, False is female
    sex = models.IntegerField(choices=GENDER_CHOICE, default=0)
    age_range = models.IntegerField(
        default=0, choices=AGEGROUP_CHOICES)
    test_status = models.BooleanField( #Have they taken their daily covid test
        null=True)  # True is Yes, No is false
    recent_test_date = models.IntegerField(null=True, blank=True)
    test_result = models.BooleanField(
        null=True)  # True is positive, false is negative
    body_temp = models.DecimalField(default=-1,
                                            blank=0, decimal_places=2, max_digits=120)
    weight = models.DecimalField(
        default=100, blank=0, decimal_places=2, max_digits=6)
    self_assessment = models.IntegerField(
        default=0, choices=ASSESMENT_CHOICES)


    symptoms =  models.TextField(blank=0, default='None')
    vaxination_count = models.IntegerField(blank=0, default=0)
    comments = models.TextField(blank=0, default='None')


class PatientStatusHistory(models.Model):
    """Stores all the forms made by all the patients

    Args:
        models (Model): Generates tables in sqlite db
    """
    patient = models.ForeignKey(
        Patient, related_name='patient', on_delete=models.CASCADE)
    patient_form = models.OneToOneField(
        PatientDailyForm, related_name='forms', on_delete=models.CASCADE)
    current_date = models.DateField(default=datetime.date.today)
    current_time = models.DateTimeField(default=timezone.now)
    
    def __str__(self) -> str:
        return self.patient.username

class ContactTracing(models.Model):

    patient = models.ForeignKey(
        Patient,
        related_name='contact_tracing',
        on_delete=models.CASCADE,
        null=True)
        
    covid_contact = models.BooleanField(null=True)
    self_isolate = models.BooleanField(null=True)
    contact_info_covid = models.TextField(default='None', max_length=500, blank=0)
    got_symptoms = models.BooleanField(null=True)
    travel = models.BooleanField(null=True)
    contact_info_travel = models.TextField(default='None', max_length=500, blank=0)
    mask_onboarding = models.BooleanField(null=True)

    def __str__(self) -> str:
        return self.user_info.username