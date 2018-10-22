import json

from django.utils.text import slugify
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def search(request):
    """
    Returns the organisation's name with their slug
    """
    query = request.GET.get('q')
    if not query:
        return Response({'error': 'Search query is required'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        DATA = json.loads(open('../../Dataset/final.json', 'r').read())
        results = {}
        for year in DATA.keys():
            for org_name in DATA[year].keys():
                if query.lower() in org_name.lower():
                    results[org_name] = slugify(org_name)
        if results:
            return Response(results, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No Results Found', 'query': query}, status=status.HTTP_400_BAD_REQUEST)
