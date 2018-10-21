import os
import json
import requests

from bs4 import BeautifulSoup
from utils import get_response

HOME_PAGE = 'https://summerofcode.withgoogle.com'
MAIN_PAGE = f'{HOME_PAGE}/archive/'
PATH_TO_OUTPUT_FILE = os.path.join(
    '..', '..', 'Dataset', '2016-2018.json')


def get_year_with_links():
    """Get year with links

    :returns: A dictionary with years as keys and their links as values.
    :rtype: dict
    """
    response = get_response(MAIN_PAGE)
    if response.ok:
        soup = BeautifulSoup(response.text, 'html.parser')
        years_li = soup.find_all(
            'md-card-footer'
        )
        years_dict = {}
        # Not including the last <a> tag because that is not relevant.
        for years_html in years_li[:-1]:
            year = [num for num in years_html.text.split() if num.isdigit()][0]
            relative_link = years_html.select('a')[0].get('href')
            full_link = HOME_PAGE + relative_link
            years_dict[year] = full_link
        return years_dict
    else:
        print('Something Went Wrong')
        print(f'Status Code: {response.status_code}')
        sys.exit(1)


def get_organizations_list_with_links(year_link):
    """Get all organizations and their links

    :param year_link: Valid link to the list of organisations of a specific year
    :type year_link: str
    :returns: A dictionary with the names of the organisations as keys and their links as values
    :rtype: dict
    """
    response = get_response(year_link)
    if response.ok:
        soup = BeautifulSoup(response.text, 'html.parser')
        orgs_li = soup.find_all(
            'li', attrs={'class': 'organization-card__container'})
        orgs_dict = {}
        for orgs_html in orgs_li:
            org_name = orgs_html.select('h4')[0].text.replace('\n', '')
            relative_link = orgs_html.select('a')[0].get('href')
            full_link = HOME_PAGE + relative_link
            orgs_dict[org_name] = full_link
        return orgs_dict
    else:
        print('Something Went Wrong')
        print(f'Status Code: {response.status_code}')
        sys.exit(1)


def get_org_projects_info(org_link):
    """Get organisation's projects information

    :param org_link: Valid link to organisation's info page of a specific year
    :type org_link: str
    :return: A list of dictionaries of each project's title, description and link
    :rtype: list
    """
    response = get_response(org_link)
    if response.ok:
        soup = BeautifulSoup(response.text, 'html.parser')
        projects_li = soup.find_all(
            'li', attrs={'layout': True}
        )
        project_info = []
        for proj_html in projects_li:
            proj_info = {}
            proj_title = proj_html.get('aria-label').replace('\n', '')
            proj_desc = proj_html.find(
                'div', attrs={'class': 'archive-project-card__content'}).text.replace('\t', '')
            proj_relative_link = proj_html.select('a')[0].get('href')
            proj_full_link = HOME_PAGE + proj_relative_link
            proj_info['title'] = proj_title
            proj_info['description'] = proj_desc
            proj_info['link'] = proj_full_link
            project_info.append(proj_info)
        return project_info


def main():
    final_dict = {}
    year_with_link = get_year_with_links()

    for year in year_with_link.keys():
        orgs = get_organizations_list_with_links(year_with_link[year])
        final_dict[year] = orgs

        for org in final_dict[year].keys():
            org_info = get_org_projects_info(final_dict[year][org])
            final_dict[year][org] = org_info

    json_dict = json.dumps(final_dict)
    open(PATH_TO_OUTPUT_FILE, 'w').write(json_dict)


if __name__ == '__main__':
    main()
