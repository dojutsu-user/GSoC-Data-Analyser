import sys
import json

import requests
from requests.exceptions import ConnectionError
from bs4 import BeautifulSoup

HOME_PAGE = 'https://www.google-melange.com'
MAIN_PAGE = f'{HOME_PAGE}/archive/gsoc'

def get_response(link):
    try:
        response = requests.get(link)
        return response
    except ConnectionError as e:
        print('Connection Error')
        print(e)
        sys.exit(1)

def get_year_with_link():
    response = get_response(MAIN_PAGE)
    if response.ok:
        soup = BeautifulSoup(response.text, 'html.parser')
        years_li = soup.find_all('li', 'mdl-list__item mdl-list__item--one-line')
        years_dict = {}
        for years_html in years_li:
            year = years_html.text.replace('\n', '')
            relative_link = years_html.select('a')[0].get('href')
            full_link = HOME_PAGE + relative_link
            years_dict[year] = full_link
        return years_dict
    else:
        print('Something Went Wrong')
        print(f'Status Code: {response.status_code}')
        sys.exit(1)

def get_organizations_list_with_links(year_link):
    response = get_response(year_link)
    if response.ok:
        soup = BeautifulSoup(response.text, 'html.parser')
        orgs_li = soup.find_all('li', 'mdl-list__item mdl-list__item--one-line')
        orgs_dict = {}
        for orgs_html in orgs_li:
            org_name = orgs_html.select('a')[0].text.replace('\n', '')
            relative_link = orgs_html.select('a')[0].get('href')
            full_link = HOME_PAGE + relative_link
            orgs_dict[org_name] = full_link
        return orgs_dict
    else:
        print('Something Went Wrong')
        print(f'Status Code: {response.status_code}')
        sys.exit(1)

def get_org_info(org_link):
    response = get_response(org_link)
    if response.ok:
        soup = BeautifulSoup(response.text, 'html.parser')
        projects_li = soup.find_all('li', 'mdl-list__item mdl-list__item--two-line')
        project_info = []
        for proj_html in projects_li:
            proj_info={}
            proj_title = proj_html.select('a')[0].text.replace('\n', '')
            proj_desc = proj_html.select('span')[1].text.replace('\n', '')
            proj_relative_link = proj_html.select('a')[0].get('href')
            proj_full_link = HOME_PAGE + proj_relative_link
            proj_info['title'] = proj_title
            proj_info['description'] = proj_desc
            proj_info['link'] = proj_full_link
            project_info.append(proj_info)
        return project_info
    else:
        print('Something Went Wrong')
        print(f'Status Code: {response.status_code}')
        sys.exit(1)

if __name__ == '__main__':
    final_dict = {}
    year_with_link = get_year_with_link()
    
    for year in year_with_link.keys():
        orgs = get_organizations_list_with_links(year_with_link[year])
        final_dict[year] = orgs
        
        for org in final_dict[year].keys():
            org_info = get_org_info(final_dict[year][org])
            final_dict[year][org] = org_info
        
    json_dict = json.dumps(final_dict)
    open('output.json', 'w').write(json_dict)
