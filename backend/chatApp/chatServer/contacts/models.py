from django.db import models

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, blank=False, null=False)
    attachments = models.FileField(upload_to='attachments/', blank=True, null=True, default="")
    comments = models.TextField(blank=True)

def __str__(self):
    return f"{self.first_name} {self.last_name}"
