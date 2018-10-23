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