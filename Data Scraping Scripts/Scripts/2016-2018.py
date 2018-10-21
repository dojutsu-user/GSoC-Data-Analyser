import os
import requests
from bs4 import BeautifulSoup

from utils import get_response

HOME_PAGE = 'https://summerofcode.withgoogle.com'
MAIN_PAGE = f'{HOME_PAGE}/archive/'
PATH_TO_OUTPUT_FILE = os.path.join(
    '..', '..', '..', 'Dataset', '2016-2018.json')


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
            year = [int(num) for num in years_html.text.split() if num.isdigit()][0]
            relative_link = years_html.select('a')[0].get('href')
            full_link = HOME_PAGE + relative_link
            years_dict[year] = full_link
        return years_dict
    else:
        print('Something Went Wrong')
        print(f'Status Code: {response.status_code}')
        sys.exit(1)


if __name__ == '__main__':
    print(get_year_with_links())