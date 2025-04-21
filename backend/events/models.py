from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title