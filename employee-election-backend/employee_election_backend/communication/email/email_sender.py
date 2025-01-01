from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.models import User
from common import constants as ct
from communication.email.email_templates import get_email_message

# Send Email
def send_election_mails(subject, message, to_email):
    send_mail(
    subject=subject,
    message=None,
    from_email="anuja.aliveli@rckr.com",
    recipient_list=[to_email],
    fail_silently=False,
    html_message=message,
)
    
def trigger_email(type, election_details):
    to_user_list = list(User.objects.values('email', 'username'))
    for user in to_user_list:
        subject = ct.ELECTION_SUBJECT
        message = get_email_message(type, user['username'], election_details)
        to_email = user['email']
        print(user)
        send_election_mails(subject,message,to_email)

def trigger_single_email(type,  email_details):
    user = User.objects.filter(id=email_details['user_id']).values('email', 'username').first()
    subject = ct.ELECTION_SUBJECT
    message = get_email_message(type, user['username'], email_details)
    print(user)
    send_election_mails(subject,message,user['email'])