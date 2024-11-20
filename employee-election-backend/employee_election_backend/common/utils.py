from common import constants as ct

def getIconForCard(title):
    if (title == ct.DECLARED):
        return '<IconCheck size={28} />'
    elif (title == ct.NOMINATIONS):
        return '<IconUserPlus size={28} />'
    elif (title == ct.LIVE):
        return '<IconCircleFilled size={28} />'
    elif (title == ct.COMPLETED):
        return '<IconClipboardCheck size={28} />'
    elif (title == ct.CLOSED):
        return '<IconX size={28} />'

def get_count_data(count_db_data):
    result = []
    for index, (status, count) in enumerate(count_db_data.items()):
        temp_dict = {
            'title': status.replace("_", " ").title(), 
            'value': count,
            'icon': getIconForCard(status)
        }
        result.append(temp_dict)
    return result