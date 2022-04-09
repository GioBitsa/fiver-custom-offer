from email.policy import default
from pyexpat import model
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# class SeparatedValuesField(models.TextField):
#     __metaclass__ = models.SubfieldBase

#     def __init__(self, *args, **kwargs):
#         self.token = kwargs.pop('token', ',')
#         super(SeparatedValuesField, self).__init__(*args, **kwargs)

#     def to_python(self, value):
#         if not value: return
#         if isinstance(value, list):
#             return value
#         return value.split(self.token)

#     def get_db_prep_value(self, value):
#         if not value: return
#         assert(isinstance(value, list) or isinstance(value, tuple))
#         return self.token.join([unicode(s) for s in value])

#     def value_to_string(self, obj):
#         value = self._get_val_from_obj(obj)
#         return self.get_db_prep_value(value)


# Create your models here.

class UserInfo(models.Model):
    CHOICES = (
        ("1", "Doctor"),
        ("2", "Patient"),
        ("3", "Immigration Officer"),
        ("4", "Health Official"),
        ("5", "Administrator"),
    )
    user = models.OneToOneField(
        User, related_name='user', on_delete=models.CASCADE)
    phone_number = models.IntegerField(null=True)
    user_identity = models.CharField(
        max_length=500, choices=CHOICES, verbose_name='Category')
    hasMessage = models.BooleanField(default = False)
    hasCTForm = models.BooleanField(default = False)
    def __str__(self) -> str:
        return self.user.username


class Patient(models.Model):
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

    SYMPTOMS_CHOICES = (
        (0, 'No Symptoms'),
        (1, "New or worsening cough (dry or productive)"),
        (2, "Barking cough (croup)"),
        (3, "Shortness of breath/difficulty breathing<"),
        (4, "Sore throat"),
        (5, "Difficulty swallowing"),
        (6, "Loss of taste or smell"),
        (7, "Headache that is unusual or long-lasting"),
        (8, "Runny or stuffy nose (not related to seasonal allergies or other known causes or conditions)"),
        (9, "Nausea/vomiting/diarrhea/abdominal pain"),
        (10, "Muscle aches"),
    )

    FORM_TYPES = (
        (1, "Form 1"),
        (2, "Form 2"),
    )

    user_info = models.OneToOneField(
        UserInfo,
        related_name='patient',
        on_delete=models.CASCADE,
        null=True)

    # True is male, False is female
    current_sex = models.IntegerField(choices=GENDER_CHOICE, default=0)
    current_age_range = models.IntegerField(
        default=0, choices=AGEGROUP_CHOICES)
    current_test_status = models.BooleanField(  # Have they taken their daily covid test
        null=True)  # True is Yes, No is false
    recent_test_date = models.IntegerField(null=True, blank=True)
    current_test_result = models.BooleanField(
        null=True)  # True is positive, false is negative
    current_body_temp = models.DecimalField(default=-1,
                                            blank=0, decimal_places=2, max_digits=120)
    current_weight = models.DecimalField(
        default=100, blank=0, decimal_places=2, max_digits=6)
    current_self_assessment = models.IntegerField(
        default=0, choices=ASSESMENT_CHOICES)
    current_symptoms = models.TextField(blank=0, default='None')
    current_vaxination_count = models.IntegerField(blank=0, default=0)

    # Is the Patient asked to FIll out a contact Tracing form
    is_contact_tracing = models.BooleanField(default=False)

    # Is the Patient asked to FIll out a contact Tracing form
    is_quarantine = models.BooleanField(default=False)

    # Which daily form is the patient asked to fill out
    form_number = models.IntegerField(default=0, choices=FORM_TYPES)

    # Are they to update their Daily form or Submit a new daily form
    is_update_daily_form = models.BooleanField(default=False)

    # is_prioritized
    is_prioritized = models.BooleanField(verbose_name='is_prioritized', default=False)

    def __str__(self) -> str:
        return self.user_info.user.username


class Doctor(models.Model):
    user_info = models.OneToOneField(
        UserInfo,
        related_name='doctor',
        on_delete=models.CASCADE,
        null=True)
    # patient_list = models.ForeignKey(
    #     Patient, related_name="patient_list", on_delete=models.CASCADE, null=True)
    # patient_list = models.ExpressionList()
    profession = models.TextField(null=True, max_length=500, blank=True)

    def __str__(self) -> str:
        return self.user_info.user.username


class PatientList(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    is_new = models.BooleanField(default=True)

# @receiver(post_save, sender=User)
# def create_user_patient(sender, instance, created, **kwargs):
#     if created:
#         Patient.objects.create(user=instance)


# @receiver(post_save, sender=User)
# def save_user_patient(sender, instance, **kwargs):
#     instance.patient.save()

# Admin models class
class Admin_Users(models.Model):
    user_info = models.OneToOneField(
        UserInfo,
        related_name='Admin',
        on_delete=models.CASCADE,
        null=True)
    CHOICES = (
        ("1", "Staff"),
        ("2", "Admin"),

    )
    role = models.TextField(null=True, max_length=500, blank=True, choices=CHOICES)

    def __str__(self) -> str:
        return self.user_info.user.username


# Health Official table
class HealthOfficial(models.Model):
    user_info = models.OneToOneField(
        UserInfo,
        related_name='health_official',
        on_delete=models.CASCADE,
        null=True)

    profession = models.TextField(null=True, max_length=500, blank=True)

    def __str__(self) -> str:
        return self.user_info.user.username


class Appointment(models.Model):
    """Appointments for the Doctor and Patient to meetup
    Args:
        models (_type_): _description_
    """
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    appointment_day_and_time = models.DateTimeField()
    short_note = models.TextField(null=True)
