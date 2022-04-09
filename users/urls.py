from unicodedata import name
from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # path('', include(router.urls), name='router'),
    # For user
    path('registerEndpoint/', views.RegisterAPI.as_view(), name='register_user'),
    path('loginEndpoint/', views.LoginAPI.as_view(), name='login_user'),
    path('userByIdEndpoint/<int:id>/', views.UserByIdAPI.as_view(), name='get_user_by_id'),
    
    # For user Info
    path('registerUserInfoEndpoint/', views.RegisterUserInfoListViewSet.as_view(), name='register_user_info'),
    path('userInfoEndpoint/<int:user_id>/', views.UserInfoByUserIdAPI.as_view(), name='get_user_info'),
    path('userInfoByIdEndpoint/<int:id>/', views.UserInfoByIdAPI.as_view(), name='get_user_info_by_id'),
    path('updateUserInfoEndpoint/', views.UserInfoUpdateView.as_view(), name='update_user_info'),
    
    # For Patient
    path('patientCreateEndpoint/', views.PatientCreateViewSet.as_view(), name='patient_create'),
    path('patientUpdateEndpoint/', views.PatientUpdateViewSet.as_view(), name='patient_update'),
    path('patientByIdEndpoint/<int:id>/', views.PatientByIdAPI.as_view(), name='get_patient_by_id'),
    path('patientEndpoint/<int:user_info_id>/', views.PatientByUserInfoIdAPI.as_view(), name='get_patient'),
    
    # For Doctor
    path('doctorCreateListEndpoint/', views.DoctorListCreateViewSet.as_view(), name='doctor_create'),
    path('doctorByIdEndpoint/<int:id>/', views.DoctorByIdAPI.as_view(), name='get_doctor_by_id'),
    path('doctorEndpoint/<int:user_info_id>/', views.DoctorByUserInfoIdAPI.as_view(), name='get_doctor'),
    
    #Health Official
    path('HealthOfficialCreateListEndpoint/', views.HealthOfficialListCreateViewSet.as_view(), name='healthofficial_create'),
    path('HealthOfficialByIdEndpoint/<int:id>/', views.HealthOfficialByIdAPI.as_view(), name='get_healthofficial_by_id'),
    path('HealthOfficialEndpoint/<int:user_info_id>/', views.HealthOfficialByUserInfoIdAPI.as_view(), name='get_healthofficial'),


    # For PatientList
    path('patientListCreateEndpoint/', views.PatientListCreateViewSet.as_view(), name='patient_list_create'),
    path('newPatientListEndpoint/<int:doctor_id>/', views.NewPatientListByDoctorIdAPI.as_view(), name='get_new_patient_list'),
    path('patientListEndpoint/<int:doctor_id>/', views.PatientListByDoctorIdAPI.as_view(), name='get_patient_list'),
    path('patientListUpdateEndpoint/', views.PatientListUpdateViewSet.as_view(), name='update_patient_list'),
    path('patientListByPatientIdEndpoint/<int:patient_id>/', views.PatientListByPatientIdAPI.as_view(), name='get_patient_list_by_patient_id'),
    path('patientListByFormNumberEndpoint/', views.PatientListByFormNumberIdAPI.as_view(), name='patient_list_by_form_number'),    

    # for Admin
    path('adminCreateEndpoint/', views.AdminCreateViewSet.as_view(), name='admin_create'),
    path('adminUpdateEndpoint/', views.AdminUpdateViewSet.as_view(), name='admin_update'),
    # path('userEndpoint/<int:pk>/', views.UserAPI.as_view()),
    path('adminEndpoint/<int:user_info_id>/', views.AdminByUserInfoIdAPI.as_view(), name='get_administrator'),

    # for Appointment
    path('appointmentEndpoint/', views.AppointmentViewSet.as_view(), name='AppointmentViewSet'),
    path('newappointmentEndpoint/', views.NewAppointment.as_view(), name='new_appointment'),
    path('appointmentsByDoctorEndpoint/<int:id>/', views.GetAppointmentsByDrId.as_view(), name='get_appointments_by_dr'),
    path('appointmentsByPatientEndpoint/<int:id>/', views.GetAppointmentsByPatientId.as_view(), name='get_appointments_by_patient'),
    path(
        'api-auth/',
        include(
            'rest_framework.urls',
            namespace='rest_framework'))
]
