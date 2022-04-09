from django.contrib import admin

from patientStuff.models import PatientDailyForm, PatientStatusHistory

# Register your models here.
admin.site.register(PatientDailyForm)
admin.site.register(PatientStatusHistory)
