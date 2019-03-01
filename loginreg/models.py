from __future__ import unicode_literals
from django.db import models

import re, bcrypt
email_regex = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
name_regex = re.compile(r'^[a-zA-Z\s]+$')

class UserManager(models.Manager):
    def register(self, data):
        errors = []
        a = User.objects.filter(email = data["email"])

        if (len(data["name"]) < 2):
            errors.append("Name must be at least 2 characters long")
        elif not name_regex.match(data["name"]):
            errors.append("Name must contain only letters and spaces")
        
        if not email_regex.match(data["email"]):
            errors.append("Invalid e-mail format")
        elif a:
            errors.append("Email already exists in our system")
        
        if (len (data["password"]) < 5):
            errors.append("Password must be at least 5 characters long")

        if (data["password"] != data["password_confirm"]):
            errors.append("Passwords do not match")
        
        return errors
    
    def login(self, data):
        user = User.objects.filter(email = data["email"])

        if not email_regex.match(data["email"]):
            return "Invalid e-mail format"
        elif len(user) == 0:
            return "Cannot find e-mail in our system"
        elif not bcrypt.checkpw(data["password"].encode(), user[0].password.encode()):
            return "Incorrect password"
            
        return False

class User(models.Model):
    name = models.CharField(max_length = 45)
    email = models.CharField(max_length = 45)
    password = models.CharField(max_length = 25)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    last_login = models.DateTimeField(auto_now = True)
    objects = UserManager()