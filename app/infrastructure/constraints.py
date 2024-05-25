import logging

logger = logging.getLogger('django')


def _check_time(start_time, stop_time, hour):
    output = 1

    if start_time is not None and hour < start_time:
        output = 0

    if stop_time is not None and hour > stop_time:
        output = 0

    return output


def check_time(start_time, stop_time, hour):
    logger.debug(f'check_time(start_time={start_time}, stop_time={stop_time}, hour={hour})')

    # If the interval is overnight, swap the hours and invert the comparison
    # For example, only in 20:00 - 05:00 means not within 05:00 - 20:00
    if start_time and stop_time and stop_time < start_time:
        return 1 - _check_time(stop_time, start_time, hour)
    else:
        return _check_time(start_time, stop_time, hour)


def check_price(start_price, stop_price, price):
    logger.debug(f'check_price(start_price={start_price}, stop_price={stop_price}, price={price})')

    output = 1

    if start_price is not None and price < start_price:
        output = 0

    if stop_price is not None and price > stop_price:
        output = 0

    return output
