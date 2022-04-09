from django.urls import include, path
from rest_framework import routers
from .views import *

app_name = 'immigration'

urlpatterns = [
    path('ImmigrationCreateEndpoint/', ImmigrationOfficerListCreateViewSet.as_view(), name='create_immigration_officer'),
    path('immigratintPatientListEndpoint/', PatientList.as_view(), name='immigration_patient_list'),
    path('immigrantOfficerEndpoint/<int:user_info_id>/', ImmigrantionOfficerByUserInfoIdAPI.as_view(), name='get_immigrant_officer_by_id'),
    path('patientsUpdatePrioritizedEndpoint/<int:pk>/', PatientPrioritizedUpdate.as_view(), name='immigration_update_patient_prioritized'),
    path(
        'api-auth/',
        include(
            'rest_framework.urls',
            namespace='rest_framework'))

]