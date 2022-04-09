from dataclasses import field, fields
from pyexpat import model
from re import T
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import urllib.request

from .models import Doctor, HealthOfficial, Admin_Users, Patient, PatientList, UserInfo, Appointment

# Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RegisterUserInfoSerializer(serializers.ModelSerializer):
    # user = RegisterSerializer(required=True, many=False)

    class Meta:
        model = UserInfo
        fields = '__all__'

    def update(self, instance, validated_data):
        nested_serializer = self.fields['user']
        nested_instance = instance.user
        nested_data = validated_data.pop('user')
        nested_serializer.update(nested_instance, nested_data)
        return super(RegisterUserInfoSerializer, self).update(instance, validated_data)


class UserInfoSerializer(serializers.ModelSerializer):
    """
    """
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserInfo
        fields = '__all__'


class RegisterPatientSerializer(serializers.ModelSerializer):
    # user_info = RegisterUserInfoSerializer(required=True, many=False)

    class Meta:
        model = Patient
        fields = '__all__'

        def update(self, instance, validated_data):
            nested_serializer = self.fields['user_info']
            nested_instance = instance.user
            nested_data = validated_data.pop('user_info')
            nested_serializer.update(nested_instance, nested_data)
            return super(
                RegisterPatientSerializer,
                self).update(
                instance,
                validated_data)


class PatientSerializer(serializers.ModelSerializer):
    user_info = UserInfoSerializer(required=True, many=False)

    class Meta:
        model = Patient
        fields = '__all__'

class RegisterDoctorSerializer(serializers.ModelSerializer):
    # user_info = RegisterUserInfoSerializer(required=True, many=False)

    class Meta:
        model = Doctor
        fields = '__all__'

        def update(self, instance, validated_data):
            nested_serializer = self.fields['user_info']
            nested_instance = instance.user
            nested_data = validated_data.pop('user_info')
            nested_serializer.update(nested_instance, nested_data)
            return super(
                RegisterDoctorSerializer,
                self).update(
                instance,
                validated_data)

class DoctorSerializer(serializers.ModelSerializer):
    user_info = UserInfoSerializer(required=True, many=False)
    
    class Meta:
        model = Doctor
        fields = '__all__'


# Health Official Serializer
class HealthOfficialSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthOfficial
        fields = '__all__'


class PatientListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientList
        fields = '__all__'





# admin model serializer
class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin_Users
        fields = ('user_info', 'role')

        def update(self, instance, validated_data):
            nested_serializer = self.fields['user_info']
            nested_instance = instance.user
            nested_data = validated_data.pop('user_info')
            nested_serializer.update(nested_instance, nested_data)
            return super(
                AdminUserSerializer,
                self).update(
                instance,
                validated_data)

class AppointmentSerializer(serializers.ModelSerializer):
    # doctor = DoctorSerializer(required=True, many=False)
    # patient = PatientSerializer(required=True, many=False)
    
    class Meta:
        model = Appointment
        fields = '__all__'