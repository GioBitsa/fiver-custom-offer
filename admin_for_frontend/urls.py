from django.urls import include, path
from rest_framework import routers
from .views import *

app_name = 'admin_for_frontend'

urlpatterns = [
    path('set_flag', set_flag, name='set_flag'),
    path('get_priority', get_prority, name='get_priority'),
    path('people_num_count', people_num_count, name='people_num_count'),
    path('patients', PatientListByPriority.as_view(), name='patient_list'),
    path('doctors', DoctorList.as_view(), name='doctor_list'),
    path('patients_by_doctor', patients_by_doctor, name='patients_by_doctor'),
    path('immigration_officers', ImmigrationOfficerList.as_view(),
         name='immigration_list'),
    path(
        'api-auth/',
        include(
            'rest_framework.urls',
            namespace='rest_framework'))

]
