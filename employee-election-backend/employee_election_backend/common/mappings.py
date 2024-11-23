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
    elif(title == 'Total'):
        return '<IconSum size={28}/>'
    elif(title == 'Cut Off'):
        return '<IconLockCheck size={28}/>'
    
def get_results_stat_cards(total_election_votes, total_nominations, election_cut_off):
    result = [
        {
            'title': 'Total Votes',
            'value': total_election_votes,
            'icon': getIconForCard('Total')
        },
        {
            'title': 'Total Nominations',
            'value': total_nominations,
            'icon': getIconForCard('Nominations')
        },
        {
            'title': 'Election Cutoff',
            'value': election_cut_off,
            'icon': getIconForCard('Cut Off')
        }
    ]
    return result

def get_winner_details_query():
    query = """
    SELECT 
        nvc.emp_id, 
        nm.emp_name, 
        nm.emp_role, 
        nvc.total_votes
    FROM 
        nomination_vote_count nvc
    JOIN 
        nominations nm ON nvc.nomination_id = nm.nomination_id
    WHERE 
        nvc.election_id = %s
    ORDER BY 
        nvc.total_votes DESC 
    LIMIT 1
    """
    return query

def results_winner_table_col_data():
    col_data = [
        {
            'title': 'Name',
            'field': 'emp_name',
            'type': 'data'
        },
        {
            'title': 'Role',
            'field': 'emp_role',
            'type': 'data'
        },
        {
            'title': 'Total Votes',
            'field': 'total_votes',
            'type': 'data'
        },
        {
            'title': 'Total Votes(%)',
            'field': 'total_votes_%',
            'type': 'data'
        },
        {
            'title': 'Created At',
            'field': 'created_at',
            'type': 'datetime'
        },
    ]
    return col_data