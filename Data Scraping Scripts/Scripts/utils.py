import requests
from requests.exceptions import ConnectionError


def get_response(link):
    """Make a GET request to the link

    :param link: Valid HTTP/HTTPS link
    :type link: str
    :returns A response object
    :rtype: requests.models.Response
    :raises: ConnectionError: If there is some problem in connecting to the link
    """
    try:
        response = requests.get(link)
        return response
    except ConnectionError as e:
        print('Connection Error')
        print(e)
        sys.exit(1)
