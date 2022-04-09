from dataclasses import field
# from importlib.metadata import MetadataPathFinder
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from users.serializers import PatientSerializer

from .models import ContactTracing, PatientDailyForm, PatientStatusHistory


class CreatePatientDailyFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientDailyForm
        fields = '__all__'
        
    def update(self, instance, validated_data):
        return super(
            CreatePatientDailyFormSerializer,
            self).update(
            instance,
            validated_data)


class PatientDailyFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientDailyForm
        fields = '__all__'


class CreatePatientStatusHistorySerializer(serializers.ModelSerializer):
    # patient_form = PatientDailyFormSerializer(read_only=True, many=False)
    # patient = PatientSerializer(read_only=True, many=False)
    
    class Meta:
        model = PatientStatusHistory
        fields = '__all__'


class PatientStatusHistorySerializer(serializers.ModelSerializer):
    patient_form = PatientDailyFormSerializer(read_only=True, many=False)
    patient = PatientSerializer(read_only=True, many=False)
    
    class Meta:
        model = PatientStatusHistory
        fields = '__all__'


class ContactTracingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactTracing
        fields = '__all__'
