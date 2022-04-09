from django.shortcuts import render
from users.models import Patient, Doctor, UserInfo, PatientList
from django.db.models import Count
from immigrationOfficer.models import ImmigrationOfficer
from users.serializers import PatientListSerializer
from .serializers import PatientSerializer, DoctorSerializer, ImmigrationOfficerSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
# Create your views here.
@api_view(['GET', ])
def people_num_count(request):
    """
    count the patients, doctors, immigration officers num
    """
    data = {
        'patient': Patient.objects.count(),
        'doctor': Doctor.objects.count(),
        'immigrationOfficer': ImmigrationOfficer.objects.count(),
    }
    return Response(data)


class PatientListByPriority(generics.ListAPIView):
    """
    patient list
    is_prioritized 
    """
    queryset = Patient.objects.all().order_by('-is_prioritized')
    serializer_class = PatientSerializer


@api_view(['GET', ])
def patients_by_doctor(request):
    """
    Number of patients per doctor, ordered and grouped by doctor_id
    """
    data = PatientList.objects.values('doctor__user_info_id').annotate(no_patients=Count('doctor_id'))

    print(data)
    return Response(data)


class DoctorList(generics.ListAPIView):
    """
    Doctor list
    """
    queryset = Doctor.objects.all().order_by()
    serializer_class = DoctorSerializer


class ImmigrationOfficerList(generics.ListAPIView):
    """
    Immigration officer list
    """
    queryset = ImmigrationOfficer.objects.all()
    serializer_class = ImmigrationOfficerSerializer


@csrf_exempt
def set_flag(request):
    """
    set the Is_prioritized field
    """
    pat = request.GET.get("id")
    # pat = request.POST.get("id")
    print("ID-->>", pat)
    pate = Patient.objects.filter(id=pat)
    pate.update(is_prioritized=not pate[0].is_prioritized)
    return JsonResponse({"response": "success"})


@csrf_exempt
def get_prority(request):
    """
    """
    pat = request.GET.get("id")
    # pat = request.POST.get("id")
    print("ID-->>", pat)
    pate = Patient.objects.filter(id=pat)
    # pate.update(is_prioritized=not pate[0].is_prioritized)
    return JsonResponse({"response": pate[0].is_prioritized})
