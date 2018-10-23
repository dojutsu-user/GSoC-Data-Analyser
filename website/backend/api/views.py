import json

from django.utils.text import slugify
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import utils

PATH_TO_JSON_DATA = '../../Dataset/final.json'
DATA = json.loads(open(PATH_TO_JSON_DATA, 'r').read())


@api_view(['GET'])
def search(request):
    """
    Returns the organisation's name with their slug
    """
    query = request.GET.get('q')
    if not query:
        return Response({'error': 'Search query is required'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        results = {}
        for year in DATA.keys():
            for org_name in DATA[year].keys():
                if query.lower() in org_name.lower():
                    results[org_name] = slugify(org_name)
        if results:
            return Response(results, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No Results Found', 'query': query}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def overview_of_specific_year(request, year):
    """
    Get the overview of a year
    """
    data_of_year = DATA.get(str(year))
    context_data = {}
    if not data_of_year:
        return Response({'error': f'Data not found for the year {year}'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        context_data['total_orgs_participated'] = utils.total_orgs_participated_year(
            data_of_year)
        context_data['total_projects_done'] = utils.total_projects_done_year(
            data_of_year)
        return Response(context_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def gsoc_overview(request):
    """
    Get the overview of the GSoC
    from the year 2009
    """
    context_data = {}
    total_orgs = 0
    total_projects = 0
    for year in DATA.keys():
        no_of_orgs = utils.total_orgs_participated_year(DATA[year])
        no_of_projects = utils.total_projects_done_year(DATA[year])
        total_orgs += no_of_orgs
        total_projects += no_of_projects
        context_data[year] = {
            'no_of_orgs': no_of_orgs,
            'no_of_projects': no_of_projects
        }
    context_data['total_orgs'] = total_orgs
    context_data['total_projects'] = total_projects
    return Response(context_data, status=status.HTTP_200_OK)
