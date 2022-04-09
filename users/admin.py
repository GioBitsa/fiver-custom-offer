from django.contrib import admin
from .models import Patient, Doctor, UserInfo, Admin_Users, PatientList

# Register your models here.
admin.site.register(UserInfo)
admin.site.register(Patient)
admin.site.register(PatientList)
admin.site.register(Doctor)
admin.site.register(Admin_Users)
