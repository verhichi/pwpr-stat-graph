from pathlib import Path
from datetime import datetime

# PATH RELATED
BASE_PATH = Path(__file__).parent.parent
CURRENT_DATETIME = datetime.now().strftime("%Y%m%d_%H%M%S")
OUTPUT_CSV_PATH = str(BASE_PATH / f'output/{CURRENT_DATETIME}.csv')
INPUT_VIDEO_PATH = str(BASE_PATH / 'video/test.mp4')

# COMMON STRING
CURRENT_DATETIME = datetime.now().strftime("%Y%m%d_%H%M%S")

# TESSERACT SETTINGS
TESSERACT_LANG = 'eng'
TESSERACT_CONFIG = '--psm 7 -c tessedit_char_whitelist=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%'

# OPENCV VIDEO CAPTURE
CAMERA_ID = 1

# GAME OCR UNIQUE VALUES
NEW_YEAR_MONTH_NUM = '01'
MONTH_MATCH_THRESHOLD = 0.9
MAX_PLAYERS_IN_STAT_SCREEN = 5
STAT_REGEXP_PATTERN = '^(\\d{3})%[ABCDEFGS](\\d{2}|100)[ABCDEFGS](\\d{2}|100)$'

PLAYER_NAMES = ['Arin', 'Brian', 'Carl', 'David', 'Edmond', 'Floyd', 'Gabe', 'Henry', 'Ivan']

# OUTPUT CSV
FIELD_NAMES = [
    'id',
    'date',
    'name',
    'pitching_speed',
    'control',
    'stamina'
]
