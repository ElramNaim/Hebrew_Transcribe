from django.db import models

class SpeachToText(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text