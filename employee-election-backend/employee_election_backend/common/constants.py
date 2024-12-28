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
            'election_id', 'election_title', 
            'nomination_start_date', 
            'nomination_end_date', 'voting_start_date', 
            'voting_end_date', 'created_by_name', 'created_at', 
            'results_published_date'
        ]

NOMINATION_LIST_FIELDS = [
    'election_id',
    'election_title',
    'nomination_start_date',
    'nomination_end_date'
]
        
OVERVIEW_DETAILS_FIELDS = [
    'election_title',
    'created_by_name',
    'created_at',
    'election_reward',
]

NOMINATION_DETAILS_FIELDS = [
    'nomination_start_date',
    'nomination_end_date'
]

WINNER_DETAILS_LIST = [
    'user_id',
    'user_name',
]

DASHBOARD_ELECTION_LIST = [
    'election_id', 
    'election_title', 
    'nomination_start_date', 
    'nomination_end_date',
    'voting_start_date',
    'voting_end_date',
    'results_published_date'
    ]

ELECTION_REPORT_LISt = [
    'election_id', 
    'election_title', 
    'nomination_start_date', 
    'nomination_end_date',
    'voting_start_date',
    'voting_end_date',
    'created_by_empid',
    'created_by_name',
    'created_at',
    'results_published_date'
    ]

# Field constants
ELECTION_ID = 'election_id'
NOMINATION_ID = 'nomination_id'
USER_ID = 'user_id'
PAGE = 'page'
LIMIT = 'limit'
SEARCH_INPUT = 'search_input'
SORT = 'sort'

# Error constants
ELECTION_ID_REQUIRED = 'Election id is required'
EMP_ID_REQUIRED = 'User id is required'
NO_WINNER_FOR_ELECTION = 'No winner found for this election'
ELECTION_DETAILS_EMPTY = 'Election details are missing'
NOMINATION_DETAILS_EMPTY = 'Nominations details are missing'
NOMINATION_ALREADY_EXISTS = 'Nomination Already Exists'
ELECTION_CREATED_SUCCESSFULLY = 'Election created successfully'
ELECTION_NOT_FOUND = "Election not found"
USER_NOT_FOUND = "User not found"
ACCESS_DENIED= "Access Denied."

# Colors Array
COLORS_LIST = [
    'orange.0',
    'orange.1',
    'orange.2',
    'orange.3',
    'orange.4',
    'orange.5',
    'yellow.0',
    'yellow.1',
    'yellow.2',
    'yellow.3',
    'yellow.4',
    'yellow.5',
]

# Roles
ADMIN = 'Admin'
USER = 'User'