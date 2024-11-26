# Database field limits
CHAR_SHORT_LIMIT = 50
CHAR_MEDIUM_LIMIT = 100
CHAR_LONG_LIMIT = 250
CHAR_VERY_LONG_LIMIT = 500

# Status constants
DECLARED = 'Declared'
NOMINATIONS = 'Nominations'
LIVE = 'Live'
COMPLETED = 'Completed'
CLOSED = 'Closed'

ELECTION_STATUS_CHOICES = [
    ('Declared', 'Declared'),
    ('Nominations', 'Nominations'),
    ('Live', 'Live'),
    ('Completed', 'Completed'),
    ('Closed', 'Closed')
]

ELECTION_LIST_FIELDS = [
            'election_id', 'election_title', 'election_cutoff', 
            'election_status', 'nomination_start_date', 
            'nomination_end_date', 'voting_start_date', 
            'voting_end_date', 'created_by_name', 'created_at'
        ]

NOMINATION_LIST_FIELDS = [
    'election_id',
    'election_title',
    'election_cutoff',
    'election_status',
    'nomination_start_date',
    'nomination_end_date'
]
        
OVERVIEW_DETAILS_FIELDS = [
    'election_title',
    'created_by_name',
    'created_at',
    'election_cutoff',
    'election_reward',
    'election_status'
]

NOMINATION_DETAILS_FIELDS = [
    'nomination_start_date',
    'nomination_end_date'
]

# Field constants
ELECTION_ID = 'election_id'
NOMINATION_ID = 'nomination_id'
EMP_ID = 'emp_id'

# Error constants
ELECTION_ID_REQUIRED = 'Election id is required'
EMP_ID_REQUIRED = 'Emp id is required'
NO_WINNER_FOR_ELECTION = 'No winner found for this election'

# Colors Array
COLORS_LIST = [
    'violet.0',
    'violet.1',
    'violet.2',
    'violet.3',
    'violet.4',
    'violet.5',
    'blue.0',
    'blue.1',
    'blue.2',
    'blue.3',
    'blue.4',
    'blue.5',
]