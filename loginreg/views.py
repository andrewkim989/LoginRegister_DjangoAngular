from django.http import JsonResponse

import json, bcrypt, datetime

from .models import User

def registerUser(request):
    reg = json.loads(request.body.decode())
    e = User.objects.register(reg)

    if len(e):
        return JsonResponse({"error": e})
    else:
        p = bcrypt.hashpw(reg["password"].encode(), bcrypt.gensalt())
        User.objects.create(name = reg["name"], email = reg["email"], password = p)

        user = User.objects.filter(email = reg["email"]).values()[0]

        return JsonResponse({"success": "Thanks for signing up, ", "user": user})

def loginUser(request):
    log = json.loads(request.body.decode())
    e = User.objects.login(log)

    if e:
        return JsonResponse({"error": e})
    else:
        u = User.objects.get(email = log["email"])
        u.last_login = datetime.datetime.now()
        u.save()

        user = User.objects.filter(email = log["email"]).values()[0]

        return JsonResponse({"success": "Welcome back, ", "user": user})

'''
nightprincess@eq.net Moon0204
purplesmart@eq.net Twily123
20cooler@eq.net Dashie20
partypony@eq.net Pinkie30
'''