from unicodedata import name
from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # Patient Daily Form Urls
    path('patientDailyFormCreateEndpoint/', views.PatientDailyFormCreateViewSet.as_view(), name='create_patient_daily_form'),
    path('patientDailyFormUpdateEndpoint/<int:pk>/', views.PatientDailyFormUpdateViewSet.as_view(),
         name='update_patient_daily_form'),

    # Patient Status History Urls
    path('patientStatusHistoryCreateEndpoint/', views.PatientStatusHistoryCreateViewSet.as_view(),
         name='create_patient_status_history'),
    path('patientStatusHistoryUpdateEndpoint/', views.PatientStatusHistoryUpdateViewSet.as_view(),
         name='update_patient_status_history'),
    path('patientStatusHistoryByPatientEndpoint/<int:patient>/', views.PatientStatusHistoryByPatient.as_view(),
         name='get_patient_status_history'),
    path('lastPatientStatusHistoryByPatientEndpoint/<int:patient>/', views.LastPatientStatusHistoryByPatient.as_view(),
         name='get_last_patient_status_history'),

    # Contact Tracing Form Urls
    path('patientContactTracingCreateEndpoint/', views.ContactTracingViewSet.as_view(), name='patient_contact_tracing'),
    path('patientContactTracing/<int:patient>/', views.ContactFormByPatientIdAPI.as_view(),
         name='patient_contact_form'),

]
