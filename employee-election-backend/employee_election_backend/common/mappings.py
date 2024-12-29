from common import constants as ct

ELECTION_TABLE_COLUMN_DATA = [
    {
        'title': 'Election',
        'field': 'election_id',
        'type': 'link',
        'path': 'election-details/',
        'name': 'View election'
    },
    {
        'title': 'Election Title',
        'field': 'election_title',
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
        return 'IconCheck'
    elif (title == ct.NOMINATIONS):
        return 'IconUserPlus'
    elif (title == ct.LIVE):
        return 'IconCircleFilled'
    elif (title == ct.COMPLETED):
        return 'IconClipboardCheck'
    elif (title == ct.CLOSED):
        return 'IconX'
    elif(title == 'Total'):
        return 'IconSum'
    elif(title == 'Cut Off'):
        return 'IconLockCheck'
    elif(title == 'Scheduled'):
        return 'IconClockHour3'
    elif(title == 'Active'):
        return 'IconCircleFilled'
    
def get_results_stat_cards(total_election_votes, total_nominations):
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
            'title': 'Election Status',
            'value': 'Closed',
            'icon': getIconForCard('Closed')
        },
    ]
    return result

def get_winner_details_query():
    query = """
    SELECT 
        nvc.user_id, 
        nm.user_name, 
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
            'field': 'user_name',
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
    ]
    return col_data

def get_results_overview_list(overview_details):
    result = [
        {
            'title': 'Title',
            'value': overview_details['election_title'],
            'type': 'data'
        },
        {
            'title': 'Created By',
            'value': overview_details['created_by_name'],
            'type': 'data'
        },
        {
            'title': 'Created At',
            'value': overview_details['created_at'],
            'type': 'datetime'
        },
        {
            'title': 'Reward',
            'value': overview_details['election_reward'],
            'type': 'data'
        },
    ]
    return result

def get_nomination_list_col_data():
    result = [
        {
            'title': 'Election ID',
            'field': 'election_id',
            'type': 'link',
            'path': 'election-details/',
            'name': 'View election'
        },
         {
            'title': 'Election Title',
            'field': 'election_title',
            'type': 'data',
        }, 
        {
            'title': 'Election Status',
            'field': 'election_status',
            'type': 'status',
        },
        {
            'title': 'Nomination Start Date',
            'field': 'nomination_start_date',
            'type': 'datetime',
        },
        {
            'title': 'Nomination End Date',
            'field': 'nomination_end_date',
            'type': 'datetime',
        },
        {
            'title': 'Nomination Created At',
            'field': 'nomination_created_at',
            'type': 'datetime',
        },
    ]
    return result

def get_your_nominations_cards_list(total_nominations,active_nominations,scheduled_nominations,completed_nominations):
    result = [
        {
            'title': 'Total',
            'value': total_nominations,
            'icon': getIconForCard('Total')
        },
        {
            'title': 'Active',
            'value': active_nominations,
            'icon': getIconForCard('Active')
        },
        {
            'title': 'Scheduled',
            'value': scheduled_nominations,
            'icon': getIconForCard('Scheduled')
        },
        {
            'title': 'Completed',
            'value': completed_nominations,
            'icon': getIconForCard('Completed')
        },
    ]
    return result

def get_voting_list_column_data():
    result = [
        {
            'title': 'RCKR Employee ID',
            'field': 'rckr_emp_id',
            'type': 'data'
        },
        {
            'title': 'Emp Name',
            'field': 'user_name',
            'type': 'data'
        },
        {
            'title': 'Appeal',
            'field': 'appeal',
            'type': 'data'
        },
    ]
    return result