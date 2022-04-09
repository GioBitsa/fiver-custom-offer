from django.shortcuts import render
from patientStuff.models import ContactTracing, PatientDailyForm, PatientStatusHistory
from patientStuff.serializers import ContactTracingSerializer, CreatePatientDailyFormSerializer, \
    CreatePatientStatusHistorySerializer, PatientStatusHistorySerializer

from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import password_validators_help_texts

from datetime import date


# Create your views here.


class PatientDailyFormCreateViewSet(generics.ListCreateAPIView):
    """Gives the view for Filling out the status form sheet

    Args:
        generics (_type_): _description_
    """
    queryset = PatientDailyForm.objects.all()
    serializer_class = CreatePatientDailyFormSerializer


class PatientDailyFormUpdateViewSet(generics.UpdateAPIView):
    serializer_class = CreatePatientDailyFormSerializer
    # queryset = PatientDailyForm.objects.all()
    lookup_url_kwarg = "pk"

    def get_object(self):
        pk = self.kwargs.get(self.lookup_url_kwarg)
        # print("---------------------------------------------------------------")
        # print(self.request)
        # print(PatientDailyForm.objects.get(pk=pk))
        return PatientDailyForm.objects.get(pk=pk)


class PatientStatusHistoryCreateViewSet(generics.ListCreateAPIView):
    """Gives the view for storing the patients status form in the history table

    Args:
        generics (_type_): _description_
    """
    queryset = PatientStatusHistory.objects.all()
    serializer_class = CreatePatientStatusHistorySerializer


class PatientStatusHistoryUpdateViewSet(generics.UpdateAPIView):
    serializer_class = CreatePatientStatusHistorySerializer

    # queryset = PatientDailyForm.objects.all()
    # lookup_url_kwarg = "pk"

    def get_object(self):
        print("---------------------------------------------------------------")
        print(self.request.data)
        return PatientStatusHistory.objects.get(patient=self.request.data.get('patient'),
                                                patient_form=self.request.data.get('patient_form'))


class PatientStatusHistoryByPatient(generics.ListAPIView):
    queryset = PatientStatusHistory.objects.all()
    serializer_class = PatientStatusHistorySerializer

    lookup_url_kwarg = "patient"

    def get_queryset(self):
        patient = self.kwargs.get(self.lookup_url_kwarg)
        patient_status_history = PatientStatusHistory.objects.filter(patient=patient)
        print("---------------------------------------------------------------")
        print(patient_status_history[0].current_date)
        return patient_status_history


class LastPatientStatusHistoryByPatient(generics.RetrieveAPIView):
    queryset = PatientStatusHistory.objects.all()
    serializer_class = PatientStatusHistorySerializer

    lookup_url_kwarg = "patient"

    def get_object(self):
        patient = self.kwargs.get(self.lookup_url_kwarg)
        print("---------------------------------------------------------------")
        try:
            patient_status_history = PatientStatusHistory.objects.filter(patient=patient,
                                                                         current_date=date.today()).latest(
                'patient_form')
            print(patient_status_history.current_date)
            return patient_status_history
        except:
            patient_status_history = {}
            print(patient_status_history)
        print("---------------------------------------------------------------")
        return patient_status_history


class ContactTracingViewSet(generics.ListCreateAPIView):
    queryset = ContactTracing.objects.all()
    serializer_class = ContactTracingSerializer


class ContactFormByPatientIdAPI(generics.ListAPIView):
    """Get the contact form for a specific patient
    """
    queryset = ContactTracing.objects.all()
    serializer_class = ContactTracingSerializer

    lookup_url_kwarg = "patient"

    def get_queryset(self):
        patient = self.kwargs.get(self.lookup_url_kwarg)
        contact_form = ContactTracing.objects.filter(patient=patient)

        return contact_form
