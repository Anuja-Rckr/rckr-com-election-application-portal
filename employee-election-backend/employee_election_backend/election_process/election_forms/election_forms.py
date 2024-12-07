from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from common import constants as ct
from election_process.models.election.election_serializer import ElectionSerializer
from election_process.models.election.election_model import ElectionModel

@api_view(['POST'])
def create_election(request):
    election_details = request.data
    if not election_details:
       return JsonResponse({
           'error': ct.ELECTION_DETAILS_EMPTY
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        serializer = ElectionSerializer(data=election_details)
        if serializer.is_valid():
            created_election = serializer.save()
            return JsonResponse({
                'data': ElectionSerializer(created_election).data
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
def update_election(request, election_id): 
    nomination_details = request.data
    nomination_details['election_status'] = ct.NOMINATIONS
    if not election_id:
        return JsonResponse({
           'error': ct.ELECTION_DETAILS_EMPTY
       }, status=status.HTTP_400_BAD_REQUEST)

    try:
        election = ElectionModel.objects.filter(election_id=election_id).first()
        if not election:
            return JsonResponse({
                'error': ct.ELECTION_NOT_FOUND
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = ElectionSerializer(election, data=nomination_details, partial=True)
        if serializer.is_valid():
            updated_election_details = serializer.save()
            return JsonResponse({
                'data': ElectionSerializer(updated_election_details).data
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)