from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import password_validators_help_texts
from rest_framework import generics

from .serializers import *
from .models import *
from users.models import *


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # find user
        user = serializer.validated_data
        # find user from ImmigrationOfficer
        officer = ImmigrationOfficer.objects.get(user_info__user=user)
        if officer is None:
            return Response({
                'error': 1,
                'msg': f'No Immigration Officer named {user.username}'
            })
        return Response({
            # saves user and its data
            "user": ImmigrationOfficerSerializer(officer, context=self.get_serializer_context()).data,
            # creates token for that particular user
            "token": AuthToken.objects.create(user)[1]
        })


class ImmigrationOfficerListCreateViewSet(generics.ListCreateAPIView):
    """
    immigration register
    """
    queryset = ImmigrationOfficer.objects.all()
    serializer_class = ImmigrationOfficerSerializer
    
class ImmigrantionOfficerByUserInfoIdAPI(generics.ListAPIView):
    """Get a specific doctor from the user_info_id
    """
    queryset = ImmigrationOfficer.objects.all()
    serializer_class = ImmigrationOfficerSerializer

    lookup_url_kwarg = "user_info_id"

    def get_queryset(self):
        user_info_id = self.kwargs.get(self.lookup_url_kwarg)
        immigration_officer = ImmigrationOfficer.objects.filter(user_info_id=user_info_id)
        return immigration_officer


class PatientList(generics.ListAPIView):
    """
    patient list
    is_prioritized 
    """
    queryset = Patient.objects.all().order_by('-is_prioritized')
    serializer_class = PatientSerializer


class PatientPrioritizedUpdate(generics.UpdateAPIView):
    """
    update patient is_Prioritized
    """
    model = Patient
    serializer_class = PatientPrioritizedSerializer
    queryset = Patient.objects.all().order_by('-is_prioritized')
