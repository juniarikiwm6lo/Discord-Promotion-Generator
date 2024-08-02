# modules_gen/promo_manager.py
import concurrent.futures
import logging
from random import choice
from .promo_generator import PromoGenerator

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')

class PromoManager:
    def __init__(self):
        self.num_threads = int(input(f"{PromoGenerator.get_timestamp()} {PromoGenerator.BLUE} Enter Number Of Threads : "))
        with open("proxies.txt") as f:
            self.proxies = f.read().splitlines()

    def start_gen(self):
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.num_threads) as executor:
            futures = [executor.submit(self.generate_promo) for _ in range(self.num_threads)]
            try:
                concurrent.futures.wait(futures)
            except KeyboardInterrupt:
                logging.info("Interrupted by user")

    def generate_promo(self):
        proxy = choice(self.proxies) if self.proxies else None
        generator = PromoGenerator(proxy)
        while True:
            generator.generate_promo()
