from atexit import register
from datetime import datetime
from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

# from .models import Patient

from django.conf import settings
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from users.models import Admin_Users, Appointment, Doctor, HealthOfficial, Patient, PatientList, UserInfo


# Create your tests here.


class UserTestCase(APITestCase):

    register_url = reverse('register_user')
    login_url = reverse('login_user')

    def setUp(self):
        pass

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    # test on first name input
    def test_user_signup(self):
        data = {
            "username": "test123",
            "first_name": "Tester",
            "last_name": "Tester",
            "email": "Tester@gmail.com",
            "password": "test123"
        }
        response = self.client.post(
            self.register_url,
            data=data,
            format='json',
        )
        test_first_name = User.objects.get(pk=1)
        self.assertEqual(test_first_name.first_name, "Tester")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_login(self):

        # Create a new user and then login with that user.
        data = {
            "username": "test123",
            "first_name": "Tester",
            "last_name": "Tester",
            "email": "Tester@gmail.com",
            "password": "test123"
        }
        response = self.client.post(
            self.register_url,
            data=data,
            format='json',
        )

        # Login Section
        data = {
            "username": "test123",
            "password": "test123"
        }
        response = self.client.post(
            self.login_url,
            data=data,
            format='json',
        )

        # Test if the response returns any data from the user (ie. first_name)
        self.assertEqual(response.data['user']['first_name'], "Tester")
        # The login url was valid according to the response
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserInfoTestCase(APITestCase):
    create_user_info = reverse('register_user_info')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            username="test123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_user_info(self):
        data = {
            "user": self.user.pk,
            "phone_number": 5145145144,
            "user_identity": 1,
        }
        response = self.client.post(
            self.create_user_info,
            data=data,
            format='json',
        )
        #Get back the user_info stored in the table
        user_info = UserInfo.objects.get(pk=1)
        # Check if the data response stored the user_info correctly
        self.assertEqual(response.data['user_info']['user'], user_info.user.id)
        self.assertEqual(response.data['user_info']['phone_number'], user_info.phone_number)
        self.assertEqual(response.data['user_info']['user_identity'], user_info.user_identity)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class PatientTestCase(APITestCase):
    create_patient = reverse('patient_create')
    update_patient = reverse('patient_update')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            username="test123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        self.user_info = UserInfo.objects.create(
            user=self.user
        )
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_patient(self):
        data = {
            "user": self.user_info.id,
            "current_sex": 0,
            "current_age_range": 0,
            "current_test_status": False,
            #... Other values can be added but will keep this patient simple
        }
        response = self.client.post(
            self.create_patient,
            data=data,
            format='json',
        )
        # Get back the patient stored in the table
        patient = Patient.objects.get(pk=1)
        # Check if the data response stored the patient correctly
        self.assertEqual(response.data['user_info'], patient.user_info)
        self.assertEqual(response.data['current_sex'], patient.current_sex)
        self.assertEqual(response.data['current_age_range'], patient.current_age_range)
        self.assertEqual(response.data['current_test_status'], patient.current_test_status)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_update_patient_priority(self):
        patient = Patient.objects.create(user_info=self.user_info, is_prioritized=True)
        self.assertTrue(patient.is_prioritized)
        
        data = {
            "is_prioritized": False,
            "user_info": self.user_info.id
        }
        response = self.client.put(
            self.update_patient,
            data=data,
            format='json',
        )
        
        patient = Patient.objects.get(user_info=self.user_info)
        self.assertFalse(patient.is_prioritized)
        
    def test_update_patient_after_form_submition(self):
        # Test if one of the values can be changed for the response to change 
        patient = Patient.objects.create(user_info=self.user_info, current_test_result=True)
        self.assertTrue(patient.current_test_result)
        
        data = {
            "current_sex": 0,
            "current_age_range": 0,
            "current_test_status": True,
            "recent_test_date": 0,
            "current_test_result": False,
            "current_body_temp": 120.9,
            "current_weight": 190.8,
            "current_self_assessment": 0,
            "current_symptoms": "Fever",
            "current_vaxination_count": 0,
            "user_info": self.user_info.id
        }
        response = self.client.put(
            self.update_patient,
            data=data,
            format='json',
        )
        
        patient = Patient.objects.get(user_info=self.user_info)
        self.assertFalse(patient.current_test_result)

class DoctorTestCase(APITestCase):
    create_doctor = reverse('doctor_create')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            username="test123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        self.user_info = UserInfo.objects.create(
            user=self.user
        )
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_doctor(self):
        data = {
            "user": self.user_info.id,
            "profession": "Cardiology",
        }
        response = self.client.post(
            self.create_doctor,
            data=data,
            format='json',
        )
        # Get back the doctor stored in the table
        doctor = Doctor.objects.get(pk=1)
        # Check if the data response stored the doctor correctly
        self.assertEqual(response.data['user_info'], doctor.user_info)
        self.assertEqual(response.data['profession'], "Cardiology")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class HealthOfficialTestCase(APITestCase):
    create_health_official = reverse('healthofficial_create')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            username="test123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        self.user_info = UserInfo.objects.create(
            user=self.user
        )
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_health_official(self):
        data = {
            "user": self.user_info.id,
            "profession": "health official",
        }
        response = self.client.post(
            self.create_health_official,
            data=data,
            format='json',
        )
        # Get back the health_official stored in the table
        health_official = HealthOfficial.objects.get(pk=1)
        # Check if the data response stored the health_official correctly
        self.assertEqual(response.data['user_info'], health_official.user_info)
        self.assertEqual(response.data['profession'], "health official")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
class AdministratorTestCase(APITestCase):
    create_administrator = reverse('admin_create')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            username="test123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        self.user_info = UserInfo.objects.create(
            user=self.user
        )
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_administrator(self):
        data = {
            "user": self.user_info.id,
            "role": "1",
        }
        response = self.client.post(
            self.create_administrator,
            data=data,
            format='json',
        )
        # Get back the administrator stored in the table
        administrator = Admin_Users.objects.get(pk=1)
        # Check if the data response stored the administrator correctly
        self.assertEqual(response.data['user_info'], administrator.user_info)
        self.assertEqual(response.data['role'], "1")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class PatientListTestCase(APITestCase):
    create_patient_list = reverse('patient_list_create')
    update_patient_list = reverse('update_patient_list')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            username="test123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        self.user_info = UserInfo.objects.create(
            user=self.user
        )
        self.doctor = Doctor.objects.create(
            user_info=self.user_info
        )
        self.get_doctor_patient_list = reverse('get_patient_list', kwargs={'doctor_id': self.doctor.id})
        self.get_new_doctor_patient_list = reverse('get_new_patient_list', kwargs={'doctor_id': self.doctor.id})
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_patient_list(self):
        # Create patients for the patient list
        user1 = User.objects.create(username="t1", password="t1")
        user2 = User.objects.create(username="t2", password="t2")
        user3 = User.objects.create(username="t3", password="t3")
        
        user_info1 = UserInfo.objects.create(user=user1, phone_number=1, user_identity="2")
        user_info2 = UserInfo.objects.create(user=user2, phone_number=2, user_identity="2")
        user_info3 = UserInfo.objects.create(user=user3, phone_number=3, user_identity="2")
        
        Patient.objects.create(user_info=user_info1)
        Patient.objects.create(user_info=user_info2)
        Patient.objects.create(user_info=user_info3)

        for patient in Patient.objects.all():
            data = {
                "patient": patient.id,
                "doctor": self.doctor.id,
            }
            response = self.client.post(
                self.create_patient_list,
                data=data,
                format='json',
            )
            # Check if the data response stored the patient list correctly
            self.assertEqual(response.data['patient'], patient.id)
            self.assertEqual(response.data['doctor'], self.doctor.id)
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_patient_list(self):
        # First Create the patient list
        # Create patients for the patient list
        user1 = User.objects.create(username="t1", password="t1")
        user2 = User.objects.create(username="t2", password="t2")
        user3 = User.objects.create(username="t3", password="t3")
        
        user_info1 = UserInfo.objects.create(user=user1, phone_number=1, user_identity="2")
        user_info2 = UserInfo.objects.create(user=user2, phone_number=2, user_identity="2")
        user_info3 = UserInfo.objects.create(user=user3, phone_number=3, user_identity="2")
        
        patient1 = Patient.objects.create(user_info=user_info1)
        patient2 = Patient.objects.create(user_info=user_info2)
        patient3 = Patient.objects.create(user_info=user_info3)

        for patient in Patient.objects.all():
            data = {
                "patient": patient.id,
                "doctor": self.doctor.id,
                "is_new": False
            }
            response = self.client.post(
                self.create_patient_list,
                data=data,
                format='json',
            )
            # Check if the data response stored the patient list correctly
            self.assertEqual(response.data['patient'], patient.id)
            self.assertEqual(response.data['doctor'], self.doctor.id)
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            
        # Return a patient list for that doctor
        response = self.client.get(
            self.get_doctor_patient_list,
        )
        # print(response.data)
        self.assertEqual(response.data[0]['patient'], patient1.id)
        self.assertEqual(response.data[1]['patient'], patient2.id)
        self.assertEqual(response.data[2]['patient'], patient3.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_get_new_patient_list(self):
        # First Create the patient list
        # Create patients for the patient list
        user1 = User.objects.create(username="t1", password="t1")
        user2 = User.objects.create(username="t2", password="t2")
        user3 = User.objects.create(username="t3", password="t3")
        
        user_info1 = UserInfo.objects.create(user=user1, phone_number=1, user_identity="2")
        user_info2 = UserInfo.objects.create(user=user2, phone_number=2, user_identity="2")
        user_info3 = UserInfo.objects.create(user=user3, phone_number=3, user_identity="2")
        
        patient1 = Patient.objects.create(user_info=user_info1)
        patient2 = Patient.objects.create(user_info=user_info2)
        patient3 = Patient.objects.create(user_info=user_info3)

        for patient in Patient.objects.all():
            data = {
                "patient": patient.id,
                "doctor": self.doctor.id,
                "is_new": True
            }
            response = self.client.post(
                self.create_patient_list,
                data=data,
                format='json',
            )
            # Check if the data response stored the patient list correctly
            self.assertEqual(response.data['patient'], patient.id)
            self.assertEqual(response.data['doctor'], self.doctor.id)
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            
        # Return a patient list for that doctor
        response = self.client.get(
            self.get_new_doctor_patient_list,
        )
        # print(response.data)
        self.assertEqual(response.data[0]['patient'], patient1.id)
        self.assertEqual(response.data[1]['patient'], patient2.id)
        self.assertEqual(response.data[2]['patient'], patient3.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_patient_list(self):
        '''Create the patient and the patient list for that patient'''
        user1 = User.objects.create(username="t1", password="t1")
        
        user_info1 = UserInfo.objects.create(user=user1, phone_number=1, user_identity="2")
        
        patient = Patient.objects.create(user_info=user_info1)
        
        patient_list = PatientList.objects.create(
            is_new = True,
            patient = patient,
            doctor = self.doctor
        )
        
        # Before it is a new patient
        self.assertEqual(patient_list.is_new, True)
        
        # Calling the route we should update the is_new variable in teh patient_list
        
        data = {
            "is_new": False,
            "patient": patient.id,
            "doctor": self.doctor.id,
        }
        
        response = self.client.put(
            self.update_patient_list,
            data=data,
            format='json',
        )
        
        # print(response.data)
        
        patient_list = PatientList.objects.get(id=1)
        
        # After it is not a new patient
        self.assertEqual(patient_list.is_new, False)
        self.assertEqual(patient_list.is_new, response.data["is_new"])
        
        # print(patient_list)




class AppointmentTestCase(APITestCase):
    appointment_view_set = reverse('AppointmentViewSet')
    new_appointment = reverse("new_appointment")
    
    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user_doctor = User.objects.create_superuser(
            username="doctor123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        self.user_patient = User.objects.create_superuser(
            username="patient123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        
        self.user_info_doctor = UserInfo.objects.create(
            user=self.user_doctor
        )
        self.user_info_patient = UserInfo.objects.create(
            user=self.user_patient
        )
        
        self.doctor = Doctor.objects.create(
            user_info=self.user_info_doctor
        )
        self.patient = Patient.objects.create(
            user_info=self.user_info_patient
        )
        
        self.get_appointment_list = reverse('get_appointments_by_dr', kwargs={'id': self.doctor.id})
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()
        
    def api_authentication(self):
        self.client.force_authenticate(user=self.user_doctor)
        
    def test_appointment_creation(self):
        data = {
            "appointment_day_and_time": "2022-04-29T20:11:00Z",
            "short_note": "appointment test",
            "doctor": self.doctor.pk,
            "patient": self.patient.pk
        }
        response = self.client.post(
            self.new_appointment,
            data=data,
            format='json',
        )
        
        appointment = Appointment.objects.get(pk=1)
        # print(appointment)
        print(response.data)
        # print(self.doctor)
        self.assertEqual(response.data["appointment_day_and_time"], '2022-04-29T20:11:00Z')
        self.assertEqual(response.data["short_note"], 'appointment test')
        self.assertEqual(response.data["doctor"], self.doctor.pk)
        self.assertEqual(response.data["patient"], self.patient.pk)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_get_appointment(self):
        appointment = Appointment.objects.create(
            appointment_day_and_time = "2022-04-29T20:11:00Z",
            short_note = "appointment test",
            doctor = self.doctor,
            patient = self.patient
        )
        response = self.client.get(
            self.appointment_view_set,
            # format='json',
        )
        
        # print(appointment)
        # print(response.data[0]["appointment_day_and_time"])
        # print(self.doctor)
        self.assertEqual(response.data[0]["appointment_day_and_time"], appointment.appointment_day_and_time)
        self.assertEqual(response.data[0]["short_note"], appointment.short_note)
        self.assertEqual(response.data[0]["doctor"], appointment.doctor.id)
        self.assertEqual(response.data[0]["patient"], appointment.patient.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_appointment_by_doctor(self):
        appointment1 = Appointment.objects.create(
            appointment_day_and_time = "2022-04-29T20:11:00Z",
            short_note = "appointment test",
            doctor = self.doctor,
            patient = self.patient
        )
        appointment2 = Appointment.objects.create(
            appointment_day_and_time = "2022-04-29T20:11:00Z",
            short_note = "appointment test",
            doctor = self.doctor,
            patient = self.patient
        )
        appointment3 = Appointment.objects.create(
            appointment_day_and_time = "2022-04-29T20:11:00Z",
            short_note = "appointment test",
            doctor = self.doctor,
            patient = self.patient
        )
        
        for appointment in [appointment1, appointment2, appointment3]:
            response = self.client.get(
                self.get_appointment_list,
                # format='json',
            )

            # print(appointment)
            # print(response.data[0]["appointment_day_and_time"])
            # print(self.doctor)
            self.assertEqual(response.data[0]["appointment_day_and_time"], appointment.appointment_day_and_time)
            self.assertEqual(response.data[0]["short_note"], appointment.short_note)
            self.assertEqual(response.data[0]["doctor"], appointment.doctor.id)
            self.assertEqual(response.data[0]["patient"], appointment.patient.id)
            self.assertEqual(response.status_code, status.HTTP_200_OK)