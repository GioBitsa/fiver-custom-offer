from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *
from users.models import Patient, UserInfo

class LoginSerializer(serializers.Serializer):
    """
    immigration login
    """
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class ImmigrationOfficerSerializer(serializers.ModelSerializer):
    """
    ImmigrationOfficer
    """
    class Meta:
        model = ImmigrationOfficer
        fields = ('user_info', )

class UserInfoSerializer(serializers.ModelSerializer):
    """

    """
    class Meta:
        model = UserInfo
        fields = ('user_identity', )

class PatientSerializer(serializers.ModelSerializer):
    """
    As an immigration officer, 
    I can only check to identify information and the covid-19 
    status of a patient in the dashboard.

    M: The user must be an immigrant officer. 
    ● S: The immigrant officer should see the patient lists
    ● C: The immigrant officer can see patient identifying information and status.
    ● W: The immigrant officer won’t be able to see other information about this patient.
    """
    # user_info = serializers.PrimaryKeyRelatedField(read_only=True)
    user_info = UserInfoSerializer(read_only=True)
    current_symptoms = serializers.ChoiceField(Patient.SYMPTOMS_CHOICES)
    class Meta:
        model = Patient
        fields = ('is_prioritized', 'current_symptoms', 'current_self_assessment', 'user_info')

class PatientPrioritizedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('is_prioritized',)

def test():
    # from immigration.serializers import *
    qs = Patient.objects.all()
    ser = PatientSerializer(qs, many=True)
    print(ser.data)