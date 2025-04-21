from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('order')
    serializer_class = EventSerializer

    @action(detail=False, methods=['post'])
    def reorder(self, request):
        for item in request.data:
            Event.objects.filter(id=item['id']).update(order=item['order'])
        return Response({'status': 'reordered'})
