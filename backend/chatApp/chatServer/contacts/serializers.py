from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')
    attachments = serializers.FileField(allow_null=True, required=False)
    
    class Meta:
        model = Contact
        fields = ['id', 'firstName', 'lastName', 'email', 'attachments', 'comments']
