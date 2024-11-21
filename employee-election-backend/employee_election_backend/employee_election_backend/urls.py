"""
URL configuration for employee_election_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from election_process.election_list_page.elections_list import get_elections_list
from election_process.election_list_page.elections_card import get_elections_card
from election_process.election_details_page.overview import get_election_overview_details
from election_process.election_details_page.nominations import get_nomination_candidates_list, get_nominations_details
from election_process.election_details_page.results import get_winner_details

urlpatterns = [
    path('admin/', admin.site.urls),
    path('election-cards/', get_elections_card),
    path('elections-list/', get_elections_list),
    path('election-overview-details/', get_election_overview_details),
    path('election-nomination-details/', get_nominations_details),
    path('election-nomination-candidates-list', get_nomination_candidates_list),
    path('election-winner-details/', get_winner_details)
]
