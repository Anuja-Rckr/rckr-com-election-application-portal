# Database field limits
CHAR_SHORT_LIMIT = 50
CHAR_MEDIUM_LIMIT = 100
CHAR_LONG_LIMIT = 250
CHAR_VERY_LONG_LIMIT = 500

ELECTION_STATUS_CHOICES = [
        ('DECLARED', 'Declared'),
        ('NOMINATION', 'Nomination'),  
        ('LIVE', 'Live'),
        ('COMPLETED', 'Completed'),
        ('CLOSED', 'Closed')
    ]