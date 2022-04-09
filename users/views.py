from distutils.log import error
from django.shortcuts import render

from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import password_validators_help_texts
import urllib.request
from .serializers import DoctorSerializer, HealthOfficialSerializer, PatientListSerializer, PatientSerializer, RegisterDoctorSerializer, RegisterPatientSerializer, \
    RegisterSerializer, RegisterUserInfoSerializer, UserInfoSerializer, UserSerializer, \
    LoginSerializer, AdminUserSerializer, Appointment, AppointmentSerializer
from .models import Doctor, HealthOfficial, Patient, PatientList, UserInfo, Admin_Users


# Create your views here.

class PatientCreateViewSet(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = RegisterPatientSerializer


class PatientListCreateViewSet(generics.ListCreateAPIView):
    queryset = PatientList.objects.all()
    serializer_class = PatientListSerializer


# admin create view set
class AdminCreateViewSet(generics.ListCreateAPIView):
    queryset = Admin_Users.objects.all()
    serializer_class = AdminUserSerializer


# Admin Update view set

class AdminUpdateViewSet(generics.UpdateAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    # queryset = Patient.objects.all()
    serializer_class = AdminUserSerializer

    def get_object(self):
        #         print("---------------------------------------------------------------")
        #         print(self.request.data)
        return Admin_Users.objects.get(user_info=self.request.data.get('user_info'))


class UserInfoUpdateView(generics.UpdateAPIView):
    #permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserInfoSerializer

    def get_object(self):
        return UserInfo.objects.get(user=self.request.user)


class PatientViewSet(generics.UpdateAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    # queryset = Patient.objects.all()
    serializer_class = RegisterPatientSerializer

    def get_object(self):
        #         print("---------------------------------------------------------------")
        #         print(self.request.data)
        return Patient.objects.get(user_info=self.request.data.get('user_info'))


class AppointmentViewSet(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()


class NewAppointment(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()


class GetAppointmentsByDrId(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    lookup_url_kwarg = "id"

    def get_queryset(self):
        id = self.kwargs.get(self.lookup_url_kwarg)
        appointments_by_dr = Appointment.objects.filter(doctor_id=id)
        return appointments_by_dr


class GetAppointmentsByPatientId(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    lookup_url_kwarg = "id"

    def get_queryset(self):
        id = self.kwargs.get(self.lookup_url_kwarg)
        appointments_by_patient = Appointment.objects.filter(patient_id=id)
        return appointments_by_patient


class PatientUpdateViewSet(generics.UpdateAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    # queryset = Patient.objects.all()
    serializer_class = RegisterPatientSerializer

    def get_object(self):
        #         print("---------------------------------------------------------------")
        #         print(self.request.data)
        return Patient.objects.get(user_info=self.request.data.get('user_info'))


class DoctorListCreateViewSet(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = RegisterDoctorSerializer


# HealthOfficial
class HealthOfficialListCreateViewSet(generics.ListCreateAPIView):
    queryset = HealthOfficial.objects.all()
    serializer_class = HealthOfficialSerializer


class RegisterUserInfoListViewSet(generics.ListCreateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = RegisterUserInfoSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_info = serializer.save()
        return Response({
            # saves user_info and its data
            "user_info": RegisterUserInfoSerializer(user_info, context=self.get_serializer_context()).data,
        })


# Register API


class RegisterAPI(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            # saves user and its data
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # creates token for that particular user
            "token": AuthToken.objects.create(user)[1],
            "passwordValidators": password_validators_help_texts(password_validators=None)
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            # saves user and its data
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # creates token for that particular user
            "token": AuthToken.objects.create(user)[1]
        })


class UserByIdAPI(generics.ListAPIView):
    """Get a specific user's info from the user_id
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    lookup_url_kwarg = "id"

    def get_queryset(self):
        id = self.kwargs.get(self.lookup_url_kwarg)
        user = User.objects.filter(id=id)
        return user


class UserInfoByUserIdAPI(generics.ListAPIView):
    """Get a specific user's info from the user_id
    """
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

    lookup_url_kwarg = "user_id"

    def get_queryset(self):
        user_id = self.kwargs.get(self.lookup_url_kwarg)
        user_info = UserInfo.objects.filter(user_id=user_id)
        return user_info


class UserInfoByIdAPI(generics.ListAPIView):
    """Get a specific user's info from the user_id
    """
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

    lookup_url_kwarg = "id"

    def get_queryset(self):
        id = self.kwargs.get(self.lookup_url_kwarg)
        user_info = UserInfo.objects.filter(id=id)
        return user_info


class PatientByUserInfoIdAPI(generics.ListAPIView):
    """Get a specific patient from the user_info_id
    """
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    lookup_url_kwarg = "user_info_id"

    def get_queryset(self):
        user_info_id = self.kwargs.get(self.lookup_url_kwarg)
        patient = Patient.objects.filter(user_info_id=user_info_id)
        return patient


class PatientByIdAPI(generics.ListAPIView):
    """Get a specific user's info from the user_id
    """
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    lookup_url_kwarg = "id"

    def get_queryset(self):
        id = self.kwargs.get(self.lookup_url_kwarg)
        patient = Patient.objects.filter(id=id)
        return patient


class DoctorByUserInfoIdAPI(generics.ListAPIView):
    """Get a specific doctor from the user_info_id
    """
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    lookup_url_kwarg = "user_info_id"

    def get_queryset(self):
        user_info_id = self.kwargs.get(self.lookup_url_kwarg)
        doctor = Doctor.objects.filter(user_info_id=user_info_id)
        return doctor


# HealthOfficial
class HealthOfficialByUserInfoIdAPI(generics.ListAPIView):
    """Get a specific health official from the user_info_id
    """
    queryset = HealthOfficial.objects.all()
    serializer_class = HealthOfficialSerializer

    lookup_url_kwarg = "user_info_id"

    def get_queryset(self):
        user_info_id = self.kwargs.get(self.lookup_url_kwarg)
        healthofficial = HealthOfficial.objects.filter(
            user_info_id=user_info_id)
        return healthofficial


# Admin
class AdminByUserInfoIdAPI(generics.ListAPIView):
    """Get a specific health official from the user_info_id
    """
    queryset = Admin_Users.objects.all()
    serializer_class = AdminUserSerializer

    lookup_url_kwarg = "user_info_id"

    def get_queryset(self):
        user_info_id = self.kwargs.get(self.lookup_url_kwarg)
        admin = Admin_Users.objects.filter(user_info_id=user_info_id)
        return admin


class DoctorByIdAPI(generics.ListAPIView):
    """Get a specific user's info from the user_id
    """
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    lookup_url_kwarg = "id"

    def get_queryset(self):
        id = self.kwargs.get(self.lookup_url_kwarg)
        doctor = Doctor.objects.filter(id=id)
        return doctor


# HealthOfficial
class HealthOfficialByIdAPI(generics.ListAPIView):
    """Get a specific HealthOfficial's info from the user_id
    """
    queryset = HealthOfficial.objects.all()
    serializer_class = HealthOfficialSerializer

    lookup_url_kwarg = "id"

    def get_queryset(self):
        id = self.kwargs.get(self.lookup_url_kwarg)
        healthofficial = HealthOfficial.objects.filter(id=id)
        return healthofficial


class NewPatientListByDoctorIdAPI(generics.ListAPIView):
    """Get the New patient list for a specific doctor, filter by is_new=True
    """
    queryset = PatientList.objects.all()
    serializer_class = PatientListSerializer

    lookup_url_kwarg = "doctor_id"

    def get_queryset(self):
        doctor_id = self.kwargs.get(self.lookup_url_kwarg)
        patient_list = PatientList.objects.filter(
            doctor_id=doctor_id, is_new=True)
        return patient_list


class PatientListByDoctorIdAPI(generics.ListAPIView):
    """Get the patient list for a specific doctor, filter by is_new=False
    """
    queryset = PatientList.objects.all()
    serializer_class = PatientListSerializer

    lookup_url_kwarg = "doctor_id"

    def get_queryset(self):
        doctor_id = self.kwargs.get(self.lookup_url_kwarg)
        patient_list = PatientList.objects.filter(
            doctor_id=doctor_id, is_new=False)
        # for i in range(len(patient_list)):
        #     print(patient_list[i].id)
        #     patient_list[i].id +=90
        return patient_list


class PatientListUpdateViewSet(generics.UpdateAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    # queryset = Patient.objects.all()
    serializer_class = PatientListSerializer
    lookup_url_kwarg = "doctor_id"

    def get_object(self):
        #         print("---------------------------------------------------------------")
        #         print(self.request.data)
        doctor_id = self.kwargs.get(self.lookup_url_kwarg)
        return PatientList.objects.get(patient=self.request.data.get('patient'), doctor=self.request.data.get('doctor'))


class PatientListByPatientIdAPI(generics.ListAPIView):
    """Get the patient list for a specific doctor
    """
    queryset = PatientList.objects.all()
    serializer_class = PatientListSerializer

    lookup_url_kwarg = "patient_id"

    def get_queryset(self):
        patient_id = self.kwargs.get(self.lookup_url_kwarg)
        patient_list = PatientList.objects.filter(patient_id=patient_id)
        # for i in range(len(patient_list)):
        #     print(patient_list[i].id)
        #     patient_list[i].id +=90
        return patient_list


class PatientListByFormNumberIdAPI(generics.ListAPIView):
    """Get the patient list for a specific form 
    """
