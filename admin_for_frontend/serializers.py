from immigrationOfficer.models import ImmigrationOfficer
from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import UserInfo, Patient, Doctor


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class UserInfoSerializer(serializers.ModelSerializer):
    """
    """
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserInfo
        fields = ('user_identity', 'user', 'phone_number', 'id')


class PatientSerializer(serializers.ModelSerializer):
    """
    """
    # user_info = serializers.PrimaryKeyRelatedField(read_only=True)
    user_info = UserInfoSerializer(read_only=True)
    current_symptoms = serializers.ChoiceField(Patient.SYMPTOMS_CHOICES)

    class Meta:
        model = Patient
        fields = ('is_prioritized', 'current_symptoms', 'current_self_assessment', 'user_info',
                  'current_test_result', 'is_contact_tracing', 'is_quarantine', 'id')


class DoctorSerializer(serializers.ModelSerializer):
    user_info = UserInfoSerializer(read_only=True)

    class Meta:
        model = Doctor
        fields = ('user_info', 'profession',)


class ImmigrationOfficerSerializer(serializers.ModelSerializer):
    user_info = UserInfoSerializer(read_only=True)

    class Meta:
        model = ImmigrationOfficer
        fields = ('user_info', )