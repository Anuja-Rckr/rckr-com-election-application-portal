from datetime import datetime

def format_date_with_time(date_string):
    if date_string:  
        date_obj = datetime.fromisoformat(date_string)
        return date_obj.strftime("%B %d, %Y at %I:%M %p")  
    return "To be announced" 



def get_email_message(type, username, election_details):
    if type == "creation":
        ELECTION_ANNOUNCEMENT_MESSAGE = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="width: 100%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h4 style="color: #333;">Dear {username},</h4>
            <p>We are excited to announce a new election in our organization! Below are the details:</p>
            <p><strong>Election Title:</strong> {election_details['election_title']}</p>
            <p><strong>Description:</strong> {election_details['election_description']}</p>
            <p><strong>Created By:</strong> {election_details['created_by_name']}</p>
            <p><strong>Nomination Dates:</strong> To be announced soon.</p>
            <p>Stay tuned for further updates, including nomination and election timelines. Your participation plays a vital role in the success of this initiative.</p>
        </div>
        </body>
        </html>
        """
        return ELECTION_ANNOUNCEMENT_MESSAGE
    elif type == "results":
        ELECTION_RESULTS_MESSAGE = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="width: 100%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #333;">Dear {username},</h2>
            <p>The results for the <strong>{election_details['election_title']}</strong> are declared.</p>
            <p><strong>Election Title:</strong> {election_details['election_title']}</p>
            <p><strong>Description:</strong> {election_details['election_description']}</p>
            <p>You can view the full results and further details on the <a href="http://127.0.0.1:3000/election-details/{election_details['election_id']}/Results">portal</a>.</p>
        </div>
        </body>
        </html>
        """
        return ELECTION_RESULTS_MESSAGE
    elif type == "voting":
        ELECTION_VOTING_MESSAGE = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="width: 100%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #333;">Dear {username},</h2>
            <p>Voting dates for the election are announced. Below are the details:</p>
            <p><strong>Election Title:</strong> {election_details['election_title']}</p>
            <p><strong>Description:</strong> {election_details['election_description']}</p>
            <p><strong>Voting start date:</strong> {format_date_with_time(election_details['voting_start_date'])}</p>
            <p><strong>Voting end date:</strong> {format_date_with_time(election_details['voting_end_date'])}</p>
        </div>
        </body>
        </html>
        """
        return ELECTION_VOTING_MESSAGE
    elif type == "nomination":
        ELECTION_NOMINATION_MESSAGE = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="width: 100%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #333;">Dear {username},</h2>
            <p>Nomination dates for the election are announced. Below are the details:</p>
            <p><strong>Election Title:</strong> {election_details['election_title']}</p>
            <p><strong>Description:</strong> {election_details['election_description']}</p>
            <p><strong>Nomination start Date:</strong> {format_date_with_time(election_details['nomination_start_date'])}</p>
            <p><strong>Nomination end Date:</strong> {format_date_with_time(election_details['nomination_end_date'])}</p>
        </div>
        </body>
        </html>
        """
        return ELECTION_NOMINATION_MESSAGE
    elif type == "create_nomination":
        ELECTION_NOMINATION_MESSAGE = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="width: 100%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #333;">Dear {username},</h2>
            <p>Your nomination for the election {election_details['election_title']} has been successfully submitted on 
            {format_date_with_time(election_details['created_at'])}</p>
        </div>
        </body>
        </html>
        """
        return ELECTION_NOMINATION_MESSAGE
    elif type == "record_vote":
        ELECTION_NOMINATION_MESSAGE = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="width: 100%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #333;">Dear {username},</h2>
            <p>Your vote for the election {format_date_with_time(election_details['election_title'])} has been successfully recorded
            at {election_details['created_at']}.</p>
        </div>
        </body>
        </html>
        """
        return ELECTION_NOMINATION_MESSAGE
