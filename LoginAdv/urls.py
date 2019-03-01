from django.conf.urls import url
import loginreg.views as views

urlpatterns = [
	url(r'^register$', views.registerUser),
    url(r'^login$', views.loginUser)
]