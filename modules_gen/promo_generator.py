

import uuid
import time
import ctypes
import logging
from .session_manager import SessionManager
from .counter import Counter
from typing import Optional

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')

class PromoGenerator:
    RED = '\x1b[31m(-)\x1b[0m'
    BLUE = '\x1b[34m(+)\x1b[0m'
    GREEN = '\x1b[32m(+)\x1b[0m'
    YELLOW = '\x1b[33m(!)\x1b[0m'

    def __init__(self, proxy: Optional[str] = None):
        self.proxy = proxy
        self.session = SessionManager.create_session()

    def generate_promo(self):
        url = "https://api.discord.gx.games/v1/direct-fulfillment"
        headers = {
            'authority': 'api.discord.gx.games',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'origin': 'https://www.opera.com',
            'referer': 'https://www.opera.com/',
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Opera GX";v="106"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
        }
        data = {"partnerUserId": str(uuid.uuid4())}

        try:
            response = self.session.post(url, json=data, headers=headers, proxies={'http': self.proxy, 'https': self.proxy} if self.proxy else None, timeout=5)
            self.handle_response(response)
        except Exception as e:
            logging.error(f"{self.get_timestamp()} {self.RED} Request Failed : {e}")

    def handle_response(self, response):
        if response.status_code == 200:
            token = response.json().get('token')
            if token:
                Counter.count += 1
                ctypes.windll.kernel32.SetConsoleTitleW(f"Opera Gx Promo Gen | Generated : {Counter.count}")
                link = f"https://discord.com/billing/partner-promotions/1180231712274387115/{token}"
                with open("promos.txt", "a") as f:
                    f.write(f"{link}\n")
                logging.info(f"{self.get_timestamp()} {self.GREEN} Generated Promo Link : {link}")
        elif response.status_code == 429:
            logging.warning(f"{self.get_timestamp()} {self.YELLOW} You Are Being Rate-limited!")
        else:
            logging.error(f"{self.get_timestamp()} {self.RED} Request Failed : {response.status_code}")

    @staticmethod
    def get_timestamp() -> str:
        return f'[\x1b[90m{time.strftime("%H:%M:%S")}\x1b[0m]'
