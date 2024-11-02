import re
import hashlib


def check_fio(fio_: str) -> bool | str:
    try:
        fio_ = fio_.strip()
    except:
        return False
    if re.search(
            r'^([а-яёА-ЯЁ]{2,} [а-яёА-ЯЁ]{2,} [а-яёА-ЯЁ]{2,})|([а-яёА-ЯЁ]{2,} [а-яёА-ЯЁ]{2,})$', fio_
    ) is None:
        return False
    return fio_


def check_phone_number(phone_number_: str) -> bool | int:
    try:
        tel_number = phone_number_.strip().replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
    except:
        return False
    if re.search(r'^(([+][0-9]{1,3})[0-9]{10})|(8+[0-9]{10})$', tel_number) is None:
        return False
    return int(tel_number[-10:])


def check_code_check(full_code: str) -> bool | tuple:
    try:
        if full_code is None or full_code == "" or len(full_code) != 18:
            return False
        full_code = full_code.upper()

        # dict_replace = {'Y': '9', 'A': '0', 'H': 'F', 'I': 'E', 'J': 'D', 'K': 'C', 'L': 'B', 'Z': 'A'}
        # new_code = "".join([dict_replace[i] if i in dict_replace else i for i in full_code[:16]])

        new_code = full_code[:16].replace(
            'Y', '9'
        ).replace(
            'A', '0'
        ).replace(
            'H', 'F'
        ).replace(
            'I', 'E'
        ).replace(
            'J', 'D'
        ).replace(
            'K', 'C'
        ).replace(
            'L', 'B'
        ).replace(
            'Z', 'A'
        )

        crc = full_code[-2:]
        h = hashlib.sha256(full_code[:-2].encode('utf-8')).hexdigest()[0:7:6].upper()
        if h != crc:
            return False

        sum_ = int(new_code[12:16], 16)
        new_code = str(int(new_code[:12][::-1], 16))

        shopcode = new_code[0:6]
        cashcode = new_code[1:6]
        shiftnum = new_code[6:11]
        checknum = new_code[11:15]

        return sum_, f"{shopcode}-{cashcode}-{shiftnum}-{checknum}-{sum_}", full_code
    except:
        return False
