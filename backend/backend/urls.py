from django.urls import path,include   
from django.contrib import admin            
from rest_framework import routers                 
from SpeachToText import views                             

 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/SpeachToText/', views.speech_to_text)             
]