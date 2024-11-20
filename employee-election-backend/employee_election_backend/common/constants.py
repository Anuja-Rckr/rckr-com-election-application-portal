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
        ('DECLARED', 'Declared'),
        ('NOMINATION', 'Nominations'),  
        ('LIVE', 'Live'),
        ('COMPLETED', 'Completed'),
        ('CLOSED', 'Closed')
    ]

ELECTION_LIST_FIELDS = [
            'election_id', 'election_title', 'election_cutoff', 
            'election_status', 'nomination_start_date', 
            'nomination_end_date', 'voting_start_date', 
            'voting_end_date', 'created_by_name', 'created_at'
        ]
        
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

# Field constants
ELECTION_ID = 'election_id'