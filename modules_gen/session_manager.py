# modules_gen/session_manager.py
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

class SessionManager:
    @staticmethod
    def create_session() -> requests.Session:
        session = requests.Session()
        retries = Retry(total=5, backoff_factor=0.1, status_forcelist=[500, 502, 503, 504])
        adapter = HTTPAdapter(max_retries=retries)
        session.mount('http://', adapter)
        session.mount('https://', adapter)
        return session
