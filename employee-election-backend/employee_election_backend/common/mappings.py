from common import constants as ct

ELECTION_TABLE_COLUMN_DATA = [
    {
        'title': 'Election Id',
        'field': 'election_id',
        'type': 'link'
    },
    {
        'title': 'Election Title',
        'field': 'election_title',
        'type': 'data'
    },
    {
        'title': 'Cut off',
        'field': 'election_cutoff',
        'type': 'data'
    },
    {
        'title': 'Created By',
        'field': 'created_by_name',
        'type': 'data'
    },
    {
        'title': 'Election Status',
        'field': 'election_status',
        'type': 'status'
    },
    {
        'title': 'Created At',
        'field': 'created_at',
        'type': 'datetime'
    },
    {
        'title': 'Nomination Start Date',
        'field': 'nomination_start_date',
        'type': 'datetime'
    },
    {
        'title': 'Nomination End Date',
        'field': 'nomination_end_date',
        'type': 'datetime'
    },
    {
        'title': 'Voting Start Date',
        'field': 'voting_start_date',
        'type': 'datetime'
    },
    {
        'title': 'Voting end Date',
        'field': 'voting_end_date',
        'type': 'datetime'
    }
]

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