from django.utils.text import slugify


def total_orgs_participated_year(data):
    """
    Returns the total number of organisations participated
    in the specified year. The year data is passed as parameter
    to the function.
    """
    return len(data.keys())


def total_projects_done_year(data):
    """
    Returns the total number of projects completed in
    a year. The data of the year is passed as parameter
    to the function.
    """
    no_of_projects = 0
    for org in data.keys():
        no_of_projects += len(data[org])
    return no_of_projects


def get_org_name_from_slug(slug, DATA):
    """
    Returns the name of the org from its slug
    """
    for year in DATA.keys():
        for org_name in DATA[year].keys():
            if slug == slugify(org_name):
                return org_name

def get_years_of_participation(org_name, DATA):
    """
    Returns a list of the years the organisations
    has taken part in the GSoC
    """
    years_of_participation = []
    for year in DATA.keys():
        for org in DATA[year].keys():
            if org == org_name:
                years_of_participation.append(year)
    return years_of_participation


def get_no_of_projects_each_year(org_name, DATA):
    """
    Returns a dictionary of the year and number of projects
    of a organisation and also returns the total number of
    projects
    """
    context = {}
    total_projects = 0
    for year in DATA.keys():
        if DATA[year].get(org_name):
            context[year] = len(DATA[year][org_name])
            total_projects += len(DATA[year][org_name])
    return context, total_projects